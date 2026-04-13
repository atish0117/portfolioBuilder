import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js'
import {clearAuthCookies} from '../utils/cookie.js'
import { setAuthCookies } from '../utils/cookie.js'
import crypto from 'crypto'

//  REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: errors.array()[0].msg })
    }

    const { fullName, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    // Hash password
        const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword
    })
        // Generate JWT tokens
    const tokens = generateTokens(user)

      const refreshTokenHash = crypto
  .createHash("sha256")
  .update(tokens.refreshToken)
  .digest("hex")

user.refreshTokenHash = refreshTokenHash
await user.save()

      setAuthCookies(res, tokens)
      res.status(201)
      .json({
        success:true,
        message: 'User registered successfully',
        user
      })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ success:false,message: 'Server error during registration , Registration failed,' })
  }
}

//  LOGIN 
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, message: errors.array()[0].msg })
    }

    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({success:false, message: 'Invalid email or password' })
    }

    // Check if user has a password (not OAuth-only account)
    if (!user.password) {
      return res.status(400).json({
        message: 'Use social login',
        authProvider: user.authProvider
      })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const tokens = generateTokens(user)

    const refreshTokenHash = crypto
  .createHash("sha256")
  .update(tokens.refreshToken)
  .digest("hex")

user.refreshTokenHash = refreshTokenHash
await user.save()

          setAuthCookies(res,tokens)
    res.status(200)
      .json({
        success:true,
        message: 'Login successful',
        user
      })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error during login , Login failed' })
  }
}

//  GET PROFILE 
export const getProfile = async (req, res) => {
  try {
    const user =await User.findById(req.user._id)

    res.status(200).json({
      success:true,
      user:user.toObject()
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
      success:true,
      user:userDoc.toObject()
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Profile update failed' })
  }
}

//  REFRESH TOKEN  and ROTATION refresh Token
export const refreshTokenAndRotation = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" })
    }

    const decoded = verifyRefreshToken(refreshToken)

    const user = await User.findById(decoded.userId).select("-password")
    req.user = user
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    const hashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex")

    if (user.refreshTokenHash !== hashed) {
      return res.status(401).json({ message: "Invalid refresh token" })
    }

    const tokens = generateTokens(user)

    const newHash = crypto
      .createHash("sha256")
      .update(tokens.refreshToken)
      .digest("hex")

    user.refreshTokenHash = newHash
    await user.save()

    setAuthCookies(res, tokens)

    res.json({ message: "Token refreshed" })
  } catch (error) {
    res.status(401).json({ message: "Refresh failed" })
  }
}
//  LOGOUT 
export const logoutUser = async (req, res) => {

  const refreshToken = req.cookies?.refreshToken

  if (refreshToken) {

    const decoded = verifyRefreshToken(refreshToken)

    const user = await User.findById(decoded.userId)

    if (user) {
      user.refreshTokenHash = null
      await user.save()
    }

  }

  clearAuthCookies(res)

  res.json({ message: "Logged out successfully" })
}


