import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


// Required environment variables
const requiredEnv = [
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_EXPIRES_IN",
  "JWT_REFRESH_EXPIRES_IN",
];

for (const key of requiredEnv) {
  if (!process.env[key]?.trim()) {
    throw new Error(
      `Missing required environment variable: ${key}`
    );
  }
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN

const JWT_ISSUER = "portfolio-builder";
const JWT_AUDIENCE = "portfolio-users";


// Generate access and refresh tokens
export const generateTokens = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    tokenType: "access",
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    algorithm: "HS256",
  });

  const refreshToken = jwt.sign(
    {
      userId: user._id.toString(),
      tokenType: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithm: "HS256",
    }
  )

  return {
    token: accessToken,
    refreshToken,
    expiresIn: JWT_EXPIRES_IN,
    tokenType: 'Bearer'
  }
}

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ["HS256"],
    });

    if (decoded.tokenType !== "access") {
      throw new Error("INVALID_TOKEN_TYPE");
    }
    return decoded;

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("TOKEN_EXPIRED");
    }

    if (error.name === "JsonWebTokenError") {
      throw new Error("INVALID_TOKEN");
    }

    if (error.message === "INVALID_TOKEN_TYPE") {
      throw error;
    }

    throw new Error("TOKEN_VERIFICATION_FAILED");
  }
}


// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ["HS256"],
    });
    if (decoded.tokenType !== "refresh") {
      throw new Error("INVALID_REFRESH_TOKEN_TYPE");
    }

    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("REFRESH_TOKEN_EXPIRED");
    }

    if (error.name === "JsonWebTokenError") {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    if (error.message === "INVALID_REFRESH_TOKEN_TYPE") {
      throw error;
    }

    throw new Error("REFRESH_TOKEN_VERIFICATION_FAILED");
  }
}

// currently this function not in working because direct use this function on another page 
// Refresh access token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyRefreshToken(refreshToken);

    const User = (await import("../models/User.js")).default;

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    if (user.status !== "active") {
      throw new Error("ACCOUNT_NOT_ACTIVE");
    }

    const tokens = generateTokens(user);

    return tokens;
  } catch (error) {
    throw error;
  }
};