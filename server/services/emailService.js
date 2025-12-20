import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const sendPasswordResetEmail = async (email, resetToken, fullName) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@portfoliobuilder.com',
    to: email,
    subject: 'Password Reset Request - Portfolio Builder',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Portfolio Builder</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${fullName},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password for your Portfolio Builder account.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
              style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Reset Your Password
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            This link will expire in 1 hour for security reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6;">
            If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            This email was sent from Portfolio Builder. If you have questions, contact our support team.
          </p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Password reset email sent successfully')
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}

export const sendWelcomeEmail = async (email, fullName, username) => {
  const portfolioUrl = `${process.env.CLIENT_URL}/${username}`
  
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@portfoliobuilder.com',
    to: email,
    subject: 'Welcome to Portfolio Builder! 🎉',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Portfolio Builder!</h1>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-bottom: 20px;">Hi ${fullName}! 👋</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Welcome to Portfolio Builder! We're excited to help you create an amazing professional portfolio.
          </p>
          
          <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">Your Portfolio Details:</h3>
            <p style="color: #666; margin: 5px 0;"><strong>Username:</strong> ${username}</p>
            <p style="color: #666; margin: 5px 0;"><strong>Portfolio URL:</strong> <a href="${portfolioUrl}" style="color: #667eea;">${portfolioUrl}</a></p>
          </div>
          
          <h3 style="color: #333;">Next Steps:</h3>
          <ul style="color: #666; line-height: 1.8;">
            <li>Complete your profile information</li>
            <li>Upload a professional profile image</li>
            <li>Add your projects and work experience</li>
            <li>Choose a template that fits your style</li>
            <li>Share your portfolio with the world!</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      font-weight: bold;
                      display: inline-block;">
              Complete Your Portfolio
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, feel free to reach out to our support team. We're here to help!
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Thanks for joining Portfolio Builder! 🚀
          </p>
        </div>
      </div>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Welcome email sent successfully')
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    // Don't throw error for welcome email failure
  }
}