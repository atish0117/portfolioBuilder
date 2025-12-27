// import express from 'express'
// import bcrypt from 'bcryptjs'
// import crypto from 'crypto'
// import { body, validationResult } from 'express-validator'
// import User from '../models/User.js'
// import { auth } from '../middleware/auth.js'
// import { sendPasswordResetEmail } from '../services/emailService.js'

// const router = express.Router()

// // Forgot Password
// router.post('/forgot-password', [
//   body('email').isEmail().withMessage('Please provide a valid email')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { email } = req.body

//     const user = await User.findOne({ email })
//     if (!user) {
//       // Don't reveal if email exists for security
//       return res.json({ 
//         message: 'If an account with that email exists, we have sent a password reset link.' 
//       })
//     }

//     // Check if user has a password (not OAuth-only account)
//     if (!user.password) {
//       return res.status(400).json({ 
//         message: 'This account was created with social login. Please use the social login button.',
//         authProvider: user.authProvider
//       })
//     }

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString('hex')
//     const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')
    
//     // Set reset token and expiry (1 hour)
//     user.passwordResetToken = resetTokenHash
//     user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
//     await user.save()

//     // Send reset email
//     try {
//       await sendPasswordResetEmail(user.email, resetToken, user.fullName)
      
//       res.json({
//         message: 'Password reset link has been sent to your email address.',
//         resetTokenSent: true
//       })
//     } catch (emailError) {
//       console.error('Failed to send reset email:', emailError)
      
//       // Clear reset token if email fails
//       user.passwordResetToken = undefined
//       user.passwordResetExpires = undefined
//       await user.save()
      
//       res.status(500).json({ 
//         message: 'Failed to send password reset email. Please try again later.' 
//       })
//     }
//   } catch (error) {
//     console.error('Forgot password error:', error)
//     res.status(500).json({ message: 'Server error during password reset request' })
//   }
// })

// // Reset Password
// router.post('/reset-password', [
//   body('token').notEmpty().withMessage('Reset token is required'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//   body('confirmPassword').custom((value, { req }) => {
//     if (value !== req.body.password) {
//       throw new Error('Passwords do not match')
//     }
//     return true
//   })
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { token, password } = req.body

//     // Hash the token to compare with stored hash
//     const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex')

//     // Find user with valid reset token
//     const user = await User.findOne({
//       passwordResetToken: resetTokenHash,
//       passwordResetExpires: { $gt: Date.now() }
//     })

//     if (!user) {
//       return res.status(400).json({ 
//         message: 'Invalid or expired password reset token' 
//       })
//     }

//     // Hash new password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     // Update password and clear reset token
//     user.password = hashedPassword
//     user.passwordResetToken = undefined
//     user.passwordResetExpires = undefined
//     user.passwordChangedAt = new Date()
//     await user.save()

//     res.json({
//       message: 'Password has been reset successfully. You can now log in with your new password.',
//       passwordReset: true
//     })
//   } catch (error) {
//     console.error('Reset password error:', error)
//     res.status(500).json({ message: 'Server error during password reset' })
//   }
// })

// // Change Password (for authenticated users)
// router.put('/change-password', auth, [
//   body('currentPassword').notEmpty().withMessage('Current password is required'),
//   body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
//   body('confirmPassword').custom((value, { req }) => {
//     if (value !== req.body.newPassword) {
//       throw new Error('New passwords do not match')
//     }
//     return true
//   })
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { currentPassword, newPassword } = req.body
//     const user = await User.findById(req.user._id)

//     // Check if user has a password (not OAuth-only account)
//     if (!user.password) {
//       return res.status(400).json({ 
//         message: 'This account was created with social login and does not have a password.',
//         authProvider: user.authProvider
//       })
//     }

//     // Verify current password
//     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
//     if (!isCurrentPasswordValid) {
//       return res.status(400).json({ message: 'Current password is incorrect' })
//     }

//     // Check if new password is different from current
//     const isSamePassword = await bcrypt.compare(newPassword, user.password)
//     if (isSamePassword) {
//       return res.status(400).json({ message: 'New password must be different from current password' })
//     }

//     // Hash new password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(newPassword, salt)

//     // Update password
//     user.password = hashedPassword
//     user.passwordChangedAt = new Date()
//     await user.save()

//     res.json({
//       message: 'Password changed successfully',
//       passwordChanged: true
//     })
//   } catch (error) {
//     console.error('Change password error:', error)
//     res.status(500).json({ message: 'Server error during password change' })
//   }
// })

// // Verify Reset Token
// router.get('/verify-reset-token/:token', async (req, res) => {
//   try {
//     const { token } = req.params
//     const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex')

//     const user = await User.findOne({
//       passwordResetToken: resetTokenHash,
//       passwordResetExpires: { $gt: Date.now() }
//     }).select('email fullName')

//     if (!user) {
//       return res.status(400).json({ 
//         message: 'Invalid or expired password reset token',
//         valid: false
//       })
//     }

//     res.json({
//       message: 'Reset token is valid',
//       valid: true,
//       email: user.email,
//       fullName: user.fullName
//     })
//   } catch (error) {
//     console.error('Verify reset token error:', error)
//     res.status(500).json({ message: 'Server error during token verification' })
//   }
// })

// export default router




import express from 'express'
import { body } from 'express-validator'
import {
  forgotPassword,
  resetPassword,
  changePassword,
  verifyResetToken
} from '../controller/password.controller.js'
import { auth } from '../middleware/auth.js'
import { validateRequest } from '../middleware/validateRequest.js'

const router = express.Router()

// Forgot Password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email required')],
  validateRequest,
  forgotPassword
)

// Reset Password
router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').custom((v, { req }) => v === req.body.password).withMessage('Passwords do not match')
  ],
  validateRequest,
  resetPassword
)

// Change Password (for authenticated users)
router.put(
  '/change-password',
  auth,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    body('confirmPassword').custom((v, { req }) => v === req.body.newPassword).withMessage('Passwords do not match')
  ],
  validateRequest,
  changePassword
)

// Verify Reset Token
router.get('/verify-reset-token/:token', verifyResetToken)

export default router
