import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js'
import { clearAuthCookies } from '../utils/cookie.js'
import { setAuthCookies } from '../utils/cookie.js'
import crypto from 'crypto'


// Safe User DTO for authentication responses
const buildAuthUserDTO = (user) => {
  return {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    profileImgUrl: user.profileImgUrl,
    authProvider: user.authProvider,
  };
};

//  REGISTER USER

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Generate JWT tokens
    const tokens = generateTokens(user);

    // Hash refresh token before storing
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(tokens.refreshToken)
      .digest("hex");

    user.refreshTokenHash = refreshTokenHash;
    await user.save();

    // Set authentication cookies
    setAuthCookies(res, tokens);

    // Create safe User DTO
    const safeUser = buildAuthUserDTO(user);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: safeUser,
    });

  } catch (error) {
    console.error("Register error:", error);

    // Handle duplicate email/username race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during registration , Registration failed",
    });
  }
};

//  LOGIN 

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const { email, password } = req.body;

    // Explicitly select password because schema has select: false
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active",
      });
    }

    // Check OAuth-only account
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Please use social login",
        authProvider: user.authProvider,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT tokens
    const tokens = generateTokens(user);

    // Hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(tokens.refreshToken)
      .digest("hex");

    user.refreshTokenHash = refreshTokenHash;
    user.lastLoginAt = new Date();
    user.loginCount = (user.loginCount || 0) + 1;

    await user.save();

    // Set authentication cookies
    setAuthCookies(res, tokens);

    // Create safe User DTO
    const safeUser = buildAuthUserDTO(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: " Server error during login , Login failed",
    });
  }
};

//  GET PROFILE 
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    res.status(200).json({
      success: true,
      user: user.toObject()
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Failed to fetch profile' })
  }
}

//  UPDATE PROFILE 
export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'fullName', 'title', 'phoneNumber', 'location', 'intro', 'tagLine',
      'skills', 'aboutSections', 'availability', 'hourlyRate',
      'preferredWorkType', 'languages', 'timezone', 'workExperience',
      'experienceDetails', 'education', 'testimonials', 'certifications',
      'socialLinks', 'profileImgUrl', 'resumeUrl', 'selectedTemplate'
    ]

    const updateData = {}

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field]
      }
    })

    const userDoc = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    )

    res.status(200).json({
      success: true,
      user: userDoc.toObject()
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Profile update failed' })
  }
}


// REFRESH TOKEN + ATOMIC ROTATION
export const refreshTokenAndRotation = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token",
      });
    }

    // 1. Verify refresh JWT
    const decoded = verifyRefreshToken(refreshToken);

    // 2. Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Account is not active",
      });
    }

    // 3. Hash old refresh token
    const oldHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // 4. Verify old token hash
    if (user.refreshTokenHash !== oldHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid or already used refresh token",
      });
    }

    // 5. Generate new tokens
    const tokens = generateTokens(user);

    // 6. Hash new refresh token
    const newHash = crypto
      .createHash("sha256")
      .update(tokens.refreshToken)
      .digest("hex");

    // 7. Atomic compare-and-swap
    // Update only if the old hash is still stored in DB
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user._id,
        refreshTokenHash: oldHash,
        status: "active",
      },
      {
        $set: {
          refreshTokenHash: newHash,
        },
      },
      {
        new: true,
      }
    );

    // Another request may have rotated the token first
    if (!updatedUser) {
      return res.status(401).json({
        success: false,
        message: "Refresh token already used",
      });
    }

    // 8. Set cookies only after successful atomic update
    setAuthCookies(res, tokens);

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
    });

  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(401).json({
      success: false,
      message: "Refresh failed",
    });
  }
};

//  LOGOUT 
export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken);

        // Hash refresh token
        const hashed = crypto
          .createHash("sha256")
          .update(refreshToken)
          .digest("hex");

        // Invalidate only the matching session token
        await User.findOneAndUpdate(
          {
            _id: decoded.userId,
            refreshTokenHash: hashed,
          },
          {
            $set: {
              refreshTokenHash: null,
            },
          }
        );

      } catch (tokenError) {
        // Invalid or expired token
        // Continue to clear browser cookies
        console.log("Logout token verification failed");
      }
    }

  } catch (error) {
    console.error("Logout error:", error);

  } finally {
    // Always clear authentication cookies
    clearAuthCookies(res);
  }

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


