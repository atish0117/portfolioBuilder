import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'atishProjectSecret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'atishProjectRefreshSecret'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d'


export const generateTokens = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  }

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'portfolio-builder',
    audience: 'portfolio-users'
  })

  const refreshToken = jwt.sign(
    { 
      userId: user._id, 
      tokenType: 'refresh',
      iat: Math.floor(Date.now() / 1000)
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: 'portfolio-builder',
      audience: 'portfolio-users'
    }
  )

  return { 
    token: accessToken,
    refreshToken,
    expiresIn: JWT_EXPIRES_IN,
    tokenType: 'Bearer'
  }
}

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'portfolio-builder',
      audience: 'portfolio-users'
    })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('TOKEN_EXPIRED')
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('INVALID_TOKEN')
    }
    throw new Error('TOKEN_VERIFICATION_FAILED')
  }
}

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: 'portfolio-builder',
      audience: 'portfolio-users'
    })
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('REFRESH_TOKEN_EXPIRED')
    }

    if (error.name === 'JsonWebTokenError') {
      throw new Error('INVALID_REFRESH_TOKEN')
    }

    throw new Error('REFRESH_TOKEN_VERIFICATION_FAILED')
  }
}

// currently this function not in working because direct use this function on another page 
export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = verifyRefreshToken(refreshToken)
    
    if (decoded.tokenType !== 'refresh') {
      throw new Error('Invalid token type')
    }

    const User = (await import('../models/User.js')).default
    const user = await User.findById(decoded.userId)
    
    if (!user) {
      throw new Error('User not found')
    }

    const tokens = generateTokens(user)
    return tokens
  } catch (error) {
    throw new Error('Failed to refresh token')
  }
}