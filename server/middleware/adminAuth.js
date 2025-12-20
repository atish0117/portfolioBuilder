import { verifyAccessToken } from '../utils/jwt.js'
import User from '../models/User.js'

export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      })
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = verifyAccessToken(token)
      const user = await User.findById(decoded.userId).select('-password')
      
      if (!user) {
        return res.status(401).json({ 
          message: 'Token is valid but user not found.',
          code: 'USER_NOT_FOUND'
        })
      }

      // Check if user is admin
      if (user.role !== 'admin') {
        console.log('Access denied for user:', user.email, 'Role:', user.role)
        return res.status(403).json({ 
          message: 'Access denied. Admin privileges required.',
          code: 'INSUFFICIENT_PERMISSIONS'
        })
      }

      // Check if user account is active
      if (user.status !== 'active') {
        return res.status(403).json({ 
          message: 'Account is not active.',
          code: 'ACCOUNT_INACTIVE'
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
    console.error('Admin auth middleware error:', error)
    res.status(500).json({ 
      message: 'Internal server error during authentication.',
      code: 'AUTH_SERVER_ERROR'
    })
  }
}

export const moderatorAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      })
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = verifyAccessToken(token)
      const user = await User.findById(decoded.userId).select('-password')
      
      if (!user) {
        return res.status(401).json({ 
          message: 'Token is valid but user not found.',
          code: 'USER_NOT_FOUND'
        })
      }

      // Check if user is admin or moderator
      if (!['admin', 'moderator'].includes(user.role)) {
        return res.status(403).json({ 
          message: 'Access denied. Moderator privileges required.',
          code: 'INSUFFICIENT_PERMISSIONS'
        })
      }

      // Check if user account is active
      if (user.status !== 'active') {
        return res.status(403).json({ 
          message: 'Account is not active.',
          code: 'ACCOUNT_INACTIVE'
        })
      }

      req.user = user
      req.tokenData = decoded
      next()
    } catch (tokenError) {
      return res.status(401).json({ 
        message: 'Token verification failed.',
        code: 'TOKEN_VERIFICATION_FAILED'
      })
    }
  } catch (error) {
    console.error('Moderator auth middleware error:', error)
    res.status(500).json({ 
      message: 'Internal server error during authentication.',
      code: 'AUTH_SERVER_ERROR'
    })
  }
}