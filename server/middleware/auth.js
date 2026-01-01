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
    // 🔐 Read token from cookie
    const token = req.cookies?.access_token

    if (!token) {
      return res.status(401).json({
        message: 'Authentication required',
        code: 'NO_TOKEN'
      })
    }

    let decoded
    try {
      decoded = verifyAccessToken(token)
    } catch (err) {
      if (err.message === 'TOKEN_EXPIRED') {
        return res.status(401).json({
          message: 'Access token expired',
          code: 'TOKEN_EXPIRED'
        })
      }
      return res.status(401).json({
        message: 'Invalid access token',
        code: 'INVALID_TOKEN'
      })
    }

    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        code: 'USER_NOT_FOUND'
      })
    }

    req.user = user
    req.tokenData = decoded
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({
      message: 'Authentication failed',
      code: 'AUTH_SERVER_ERROR'
    })
  }
}


export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token
    if (!token) return next()

    const decoded = verifyAccessToken(token)
    const user = await User.findById(decoded.userId).select('-password')

    if (user) {
      req.user = user
      req.tokenData = decoded
    }
  } catch {
    // silently ignore
  }
  next()
}
