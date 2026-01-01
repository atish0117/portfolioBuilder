// import express from 'express'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { body, validationResult } from 'express-validator'
// import User from '../models/User.js'
// import { auth } from '../middleware/auth.js'

// import { generateTokens } from '../utils/jwt.js'


// const router = express.Router()

// // Register
// router.post('/register', [
//   body('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
//   body('email').isEmail().withMessage('Please provide a valid email'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
// ], 
// async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { fullName, email, password } = req.body

//     // Check if user exists
//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email' })
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     // Create user
//     const user = new User({
//       fullName,
//       email,
//       password: hashedPassword
//     })

//     await user.save()


//     // Generate JWT tokens
//    const tokens = generateTokens(user)

//     res.status(201).json({
//       message: 'User created successfully',
//       ...tokens,

//       user: {
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//         profileImgUrl: user.profileImgUrl,
//         resumeUrl: user.resumeUrl,
//         title: user.title,

//         phoneNumber: user.phoneNumber,
//         location: user.location,
//         intro: user.intro,
//         tagLine: user.tagLine,
//         socialLinks: user.socialLinks,
//         skills: user.skills,
//         aboutSections: user.aboutSections,
//         availability: user.availability,
//         hourlyRate: user.hourlyRate,
//         preferredWorkType: user.preferredWorkType,
//         languages: user.languages,
//         timezone: user.timezone,

//         workExperience: user.workExperience,
//         experienceDetails: user.experienceDetails,
//         education: user.education,
//         testimonials: user.testimonials,
//         certifications: user.certifications,
//         sectionOrder: user.sectionOrder,
//         visibleSections: user.visibleSections,

//         selectedTemplate: user.selectedTemplate,
//         authProvider: user.authProvider,
//         createdAt: user.createdAt


//       }
//     })
//   } catch (error) {
//     console.error('Register error:', error)
//     res.status(500).json({ message: 'Server error during registration' })
//   }
// })

// // Login
// router.post('/login', [
//   body('email').isEmail().withMessage('Please provide a valid email'),
//   body('password').exists().withMessage('Password is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { email, password } = req.body

//     // Check if user exists
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' })
//     }


//       // Check if user has a password (not OAuth-only account)
//     if (!user.password) {
//       return res.status(400).json({ 
//         message: 'This account was created with social login. Please use the social login button.',
//         authProvider: user.authProvider
//       })
//     }


//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' })
//     }


//     // Generate JWT tokens
//     const tokens = generateTokens(user)

//     res.json({
//       message: 'Login successful',
//       ...tokens,

//       user: {
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//         profileImgUrl: user.profileImgUrl,
//         resumeUrl: user.resumeUrl,
//         title: user.title,

//         phoneNumber: user.phoneNumber,
//         location: user.location,
//         intro: user.intro,
//         tagLine: user.tagLine,
//         socialLinks: user.socialLinks,
//         skills: user.skills,
//         aboutSections: user.aboutSections,
//         availability: user.availability,
//         hourlyRate: user.hourlyRate,
//         preferredWorkType: user.preferredWorkType,
//         languages: user.languages,
//         timezone: user.timezone,

//         workExperience: user.workExperience,
//         experienceDetails: user.experienceDetails,
//         education: user.education,
//         testimonials: user.testimonials,
//         certifications: user.certifications,
//         sectionOrder: user.sectionOrder,
//         visibleSections: user.visibleSections,

//         selectedTemplate: user.selectedTemplate,
//         authProvider: user.authProvider,
//         createdAt: user.createdAt

//       }
//     })
//   } catch (error) {
//     console.error('Login error:', error)
//     res.status(500).json({ message: 'Server error during login' })
//   }
// })

// // Get Profile
// router.get('/profile', auth, async (req, res) => {
//   try {
//     res.json({
//       user: {
//         _id: req.user._id,
//         fullName: req.user.fullName,
//         username: req.user.username,
//         email: req.user.email,
//         role: req.user.role,
//         status: req.user.status,
//         profileImgUrl: req.user.profileImgUrl,
//         resumeUrl: req.user.resumeUrl,
//         title: req.user.title,

//         phoneNumber: req.user.phoneNumber,
//         location: req.user.location,
//         intro: req.user.intro,
//         tagLine: req.user.tagLine,
//         socialLinks: req.user.socialLinks,
//         skills: req.user.skills,
//         aboutSections: req.user.aboutSections,
//         availability: req.user.availability,
//         hourlyRate: req.user.hourlyRate,
//         preferredWorkType: req.user.preferredWorkType,
//         languages: req.user.languages,
//         timezone: req.user.timezone,

//         workExperience: req.user.workExperience,
//         experienceDetails: req.user.experienceDetails,
//         education: req.user.education,
//         testimonials: req.user.testimonials,
//         certifications: req.user.certifications,
//         sectionOrder: req.user.sectionOrder,
//         visibleSections: req.user.visibleSections,

//         selectedTemplate: req.user.selectedTemplate,
//         authProvider: req.user.authProvider,
//         createdAt: req.user.createdAt

//       }
//     })
//   } catch (error) {
//     console.error('Get profile error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // Update Profile
// router.put('/profile', auth, async (req, res) => {
//   try {
//     const {
//       fullName,
//       title,

//       phoneNumber,
//       location,
//       intro,
//       tagLine,
//       skills,
//       aboutSections,
//       availability,
//       hourlyRate,
//       preferredWorkType,
//       languages,
//       timezone,

//       workExperience,
//       socialLinks,
//       profileImgUrl,
//       resumeUrl,
//       experienceDetails,
//       education,
//       testimonials,
//       certifications,
//       selectedTemplate
//     } = req.body

//     console.log('Received profile update request:', {
//       profileImgUrl,
//       resumeUrl,
//       fullName,

//       title,
//       phoneNumber,
//       location

//     })

//     const updateData = {}
    
//     if (fullName) updateData.fullName = fullName
//     if (title !== undefined) updateData.title = title

//     if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber
//     if (location !== undefined) updateData.location = location
//     if (intro !== undefined) updateData.intro = intro
//     if (tagLine !== undefined) updateData.tagLine = tagLine

//     if (skills) updateData.skills = skills
//     if (workExperience) updateData.workExperience = workExperience
//     if (socialLinks) updateData.socialLinks = socialLinks
//     if (profileImgUrl !== undefined) updateData.profileImgUrl = profileImgUrl
//     if (resumeUrl !== undefined) updateData.resumeUrl = resumeUrl
//     if (aboutSections) updateData.aboutSections = aboutSections
//     if (availability) updateData.availability = availability
//     if (hourlyRate !== undefined) updateData.hourlyRate = hourlyRate
//     if (preferredWorkType) updateData.preferredWorkType = preferredWorkType
//     if (languages) updateData.languages = languages
//     if (timezone !== undefined) updateData.timezone = timezone

//     if (experienceDetails) updateData.experienceDetails = experienceDetails
//     if (education) updateData.education = education
//     if (testimonials) updateData.testimonials = testimonials
//     if (certifications) updateData.certifications = certifications
//     if (selectedTemplate) updateData.selectedTemplate = selectedTemplate

//     console.log('Updating user profile with data:', updateData)

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       updateData,
//       { new: true, runValidators: true }
//     ).select('-password')

//     console.log('Updated user profile:', {
//       userId: user._id,
//       profileImgUrl: user.profileImgUrl,
//       resumeUrl: user.resumeUrl,
//       fullName: user.fullName,

//     })

//     res.json({
//       message: 'Profile updated successfully',
//       user: {
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//         profileImgUrl: user.profileImgUrl,
//         resumeUrl: user.resumeUrl,
//         title: user.title,

//         phoneNumber: user.phoneNumber,
//         location: user.location,
//         intro: user.intro,
//         tagLine: user.tagLine,
//         socialLinks: user.socialLinks,
//         skills: user.skills,
//         aboutSections: user.aboutSections,
//         availability: user.availability,
//         hourlyRate: user.hourlyRate,
//         preferredWorkType: user.preferredWorkType,
//         languages: user.languages,
//         timezone: user.timezone,

//         workExperience: user.workExperience,
//         experienceDetails: user.experienceDetails,
//         education: user.education,
//         testimonials: user.testimonials,
//         certifications: user.certifications,
//         sectionOrder: user.sectionOrder,
//         visibleSections: user.visibleSections,

//         selectedTemplate: user.selectedTemplate,
//         authProvider: user.authProvider,
//         createdAt: user.createdAt

//       }
//     })
//   } catch (error) {
//     console.error('Update profile error:', error)
//     res.status(500).json({ message: 'Server error during profile update' })
//   }
// })


// // Refresh Token
// router.post('/refresh', async (req, res) => {
//   try {
//     const { refreshToken } = req.body
    
//     if (!refreshToken) {
//       return res.status(401).json({ message: 'Refresh token required' })
//     }

//     const { refreshAccessToken } = await import('../utils/jwt.js')
//     const tokens = await refreshAccessToken(refreshToken)
    
//     res.json({
//       message: 'Token refreshed successfully',
//       ...tokens
//     })
//   } catch (error) {
//     console.error('Token refresh error:', error)
//     res.status(401).json({ message: 'Invalid refresh token' })
//   }
// })

// export default router



import express from 'express'
import { body } from 'express-validator'
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  refreshToken,
  logoutUser
} from "../controller/auth.controller.js"
import { auth } from '../middleware/auth.js'
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router()

// Register
router.post(
  '/register',
  [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], 
  validateRequest,
  registerUser
)

// Login
router.post(
  '/login',
  [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required')
  ],
  validateRequest,
  loginUser
)

// LOGOUT
router.post('/logout', logoutUser)

// Profile
router.get('/profile', auth, getProfile)
router.put('/profile', auth, updateProfile)

// Refresh token
router.post(
  '/refresh',
  [body('refreshToken').notEmpty().withMessage('Refresh token required')],
  validateRequest,
  refreshToken
)


export default router
