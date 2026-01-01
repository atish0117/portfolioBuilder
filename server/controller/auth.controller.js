import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import User from '../models/User.js'
import { generateTokens, refreshAccessToken } from '../utils/jwt.js'
import {clearAuthCookies} from '../utils/cookie.js'
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
    const { token, refreshToken } = generateTokens(user)

    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      .status(201)
      .json({
        message: 'User registered successfully',
        user
      })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error during registration , Registration failed,' })
  }
}

//  LOGIN 
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
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

    const { token, refreshToken } = generateTokens(user)

    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      .json({
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
    res.json({ user: req.user })
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

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password')

    res.json({
      message: 'Profile updated successfully',
      user
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Profile update failed' })
  }
}

//  REFRESH TOKEN 
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token' })
    }

    const tokens = await refreshAccessToken(refreshToken)

    res
      .cookie('accessToken', tokens.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      .cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      .json({ message: 'Token refreshed' })
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' })
  }
}
//  LOGOUT 
export const logout = (req, res) => {
  clearAuthCookies(res)
  res.json({ message: 'Logged out successfully' })
}


