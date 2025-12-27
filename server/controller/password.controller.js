import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import User from '../models/User.js'
import { sendPasswordResetEmail } from '../services/emailService.js'


//  FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        message: 'If an account with that email exists, we have sent a password reset link.'
      })
    }
        // Check if user has a password (not OAuth-only account)
    if (!user.password) {
      return res.status(400).json({
        message: 'This account was created using social login.',
        authProvider: user.authProvider
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')

      // Set reset token and expiry (1 hour)
    user.passwordResetToken = resetTokenHash
    user.passwordResetExpires = Date.now() + 60 * 60 * 1000  // 1 hour
    await user.save()

    // Send reset email
    try {
      await sendPasswordResetEmail(user.email, resetToken, user.fullName)
      res.json({ message: 'Password reset link sent successfully' })
    } catch (err) {
         // Clear reset token if email fails
      user.passwordResetToken = undefined
      user.passwordResetExpires = undefined
      await user.save()
      res.status(500).json({ message: 'Failed to send reset email , Please try again later.' })
    }
  } catch (error) {
    console.error('Forgot password error:',error)
    res.status(500).json({ message: 'Forgot password failed' })
  }
}


//  RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Hash the token to compare with stored hash
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

      // Find user with valid reset token
    const user = await User.findOne({
      passwordResetToken: resetTokenHash,
      passwordResetExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({
         message: 'Invalid or expired reset token' 
        })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.passwordChangedAt = new Date()
    await user.save()

    res.json({ message: 'Password reset successful. You can now log in with your new password.' })
  } catch (error) {
    console.error('Reset password error:',error)
    res.status(500).json({ message: 'Reset password failed' })
  }
}


//  CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id)

    // Check if user has a password (not OAuth-only account)
    if (!user.password) {
      return res.status(400).json({
        message: 'Account created via social login and does not have a password.',
        authProvider: user.authProvider
      })
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password incorrect' })
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(newPassword, user.password)
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password must be different from current password' })
    }
        
    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10)
    user.passwordChangedAt = new Date()
    await user.save()

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Change password error:',error)
    res.status(500).json({ message: 'Change password failed' })
  }
}


//  VERIFY RESET TOKEN
export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')

    const user = await User.findOne({
      passwordResetToken: resetTokenHash,
      passwordResetExpires: { $gt: Date.now() }
    }).select('email fullName')

    if (!user) {
      return res.status(400).json({ 
         message: 'Invalid or expired password reset token',
        valid: false })
    }

    res.json({
    message: 'Reset token is valid',
    valid: true,
    email: user.email,
    fullName: user.fullName
    })
  } catch (error) {
    console.error('Verify reset token error:',error)
    res.status(500).json({ message: 'Token verification failed' })
  }
}
