// import jwt from 'jsonwebtoken'
// import User from '../models/User.js'

// export const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '')
    
//     if (!token) {
//       return res.status(401).json({ message: 'No token, authorization denied' })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
//     const user = await User.findById(decoded.userId).select('-password')
    
//     if (!user) {
//       return res.status(401).json({ message: 'Token is not valid' })
//     }

//     req.user = user
//     next()
//   } catch (error) {
//     console.error('Auth middleware error:', error)
//     res.status(401).json({ message: 'Token is not valid' })
//   }
// }



import { verifyAccessToken } from '../utils/jwt.js'
import User from '../models/User.js'

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    try {
      const decoded = verifyAccessToken(token)
      const user = await User.findById(decoded.userId).select('-password')
      
      if (!user) {
        return res.status(401).json({ 
          message: 'Token is valid but user not found.',
          code: 'USER_NOT_FOUND'
        })
      }

      req.user = user
      req.tokenData = decoded
      next()
    } catch (tokenError) {
      if (tokenError.message === 'TOKEN_EXPIRED') {
        return res.status(401).json({ 
          message: 'Token has expired.',
          code: 'TOKEN_EXPIRED'
        })
      } else if (tokenError.message === 'INVALID_TOKEN') {
        return res.status(401).json({ 
          message: 'Invalid token.',
          code: 'INVALID_TOKEN'
        })
      } else {
        return res.status(401).json({ 
          message: 'Token verification failed.',
          code: 'TOKEN_VERIFICATION_FAILED'
        })
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({ 
      message: 'Internal server error during authentication.',
      code: 'AUTH_SERVER_ERROR'
    })
  }
}

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next() // Continue without authentication
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = verifyAccessToken(token)
      const user = await User.findById(decoded.userId).select('-password')
      
      if (user) {
        req.user = user
        req.tokenData = decoded
      }
    } catch (tokenError) {
      // Ignore token errors for optional auth
      console.log('Optional auth token error:', tokenError.message)
    }
    
    next()
  } catch (error) {
    console.error('Optional auth middleware error:', error)
    next() // Continue even if there's an error
  }
}