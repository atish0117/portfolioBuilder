import express from 'express'
import { body, validationResult, query } from 'express-validator'
import User from '../models/User.js'
import Project from '../models/Project.js'
import Template from '../models/Template.js'
import Analytics from '../models/Analytics.js'
import SystemSettings from '../models/SystemSettings.js'
import { adminAuth, moderatorAuth } from '../middleware/adminAuth.js'

const router = express.Router()

// Dashboard Overview
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    console.log('Admin dashboard accessed by:', req.user.email, 'Role:', req.user.role)
    
    const [
      totalUsers,
      totalPortfolios,
      totalProjects,
      activeUsers,
      bannedUsers,
      recentUsers,
      popularTemplates,
      systemStats
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ $or: [{ profileImgUrl: { $exists: true, $ne: '' } }, { bio: { $exists: true, $ne: '' } }] }),
      Project.countDocuments(),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'banned' }),
      User.find().sort({ createdAt: -1 }).limit(5).select('fullName email createdAt status'),
      User.aggregate([
        { $group: { _id: '$selectedTemplate', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      {
        totalStorage: Math.floor(Math.random() * 1000) + 500, // Mock data
        serverUptime: process.uptime(),
        memoryUsage: process.memoryUsage()
      }
    ])

    const dashboardData = {
      overview: {
        totalUsers,
        totalPortfolios,
        totalProjects,
        activeUsers,
        bannedUsers,
        growthRate: Math.floor(Math.random() * 20) + 5 // Mock growth rate
      },
      recentActivity: {
        newUsers: recentUsers,
        popularTemplates: popularTemplates.map(t => ({
          template: t._id || 'minimal',
          count: t.count,
          percentage: Math.round((t.count / totalUsers) * 100)
        }))
      },
      systemStats: {
        ...systemStats,
        uptime: Math.floor(systemStats.serverUptime / 3600) + ' hours',
        memoryUsage: Math.round(systemStats.memoryUsage.used / 1024 / 1024) + ' MB'
      }
    }

    res.json(dashboardData)
  } catch (error) {
    console.error('Admin dashboard error:', error)
    res.status(500).json({ message: 'Failed to fetch dashboard data' })
  }
})

// User Management
router.get('/users', adminAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().isLength({ max: 100 }).withMessage('Search term too long'),
  query('status').optional().isIn(['active', 'banned', 'suspended', 'pending']).withMessage('Invalid status'),
  query('role').optional().isIn(['user', 'admin', 'moderator']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const search = req.query.search || ''
    const status = req.query.status
    const role = req.query.role
    const skip = (page - 1) * limit

    // Build query
    const query = {}
    
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (status) query.status = status
    if (role) query.role = role

    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select('-password -passwordResetToken')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query)
    ])

    // Add portfolio completion percentage for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const projectCount = await Project.countDocuments({ userId: user._id })
        const completionFields = [
          user.profileImgUrl,
          user.bio,
          user.skills?.length > 0,
          user.socialLinks && Object.values(user.socialLinks).some(Boolean),
          projectCount > 0
        ]
        const completionPercentage = Math.round((completionFields.filter(Boolean).length / completionFields.length) * 100)

        return {
          ...user,
          projectCount,
          completionPercentage,
          lastLoginFormatted: user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'
        }
      })
    )

    res.json({
      users: usersWithStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNext: page < Math.ceil(totalUsers / limit),
        hasPrev: page > 1
      },
      filters: {
        search,
        status,
        role
      }
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Failed to fetch users' })
  }
})

// Update User Status
router.put('/users/:userId/status', adminAuth, [
  body('status').isIn(['active', 'banned', 'suspended', 'pending']).withMessage('Invalid status'),
  body('reason').optional().isLength({ max: 500 }).withMessage('Reason too long')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { userId } = req.params
    const { status, reason } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Prevent admin from changing their own status
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot change your own status' })
    }

    // Prevent non-super-admin from changing admin status
    if (user.role === 'admin' && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Cannot modify admin user status' })
    }

    const oldStatus = user.status
    user.status = status
    
    // Log the status change
    if (!user.statusHistory) user.statusHistory = []
    user.statusHistory.push({
      oldStatus,
      newStatus: status,
      reason: reason || 'No reason provided',
      changedBy: req.user._id,
      changedAt: new Date()
    })

    await user.save()

    res.json({
      message: `User status updated to ${status}`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Update user status error:', error)
    res.status(500).json({ message: 'Failed to update user status' })
  }
})

// Update User Role
router.put('/users/:userId/role', adminAuth, [
  body('role').isIn(['user', 'admin', 'moderator']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { userId } = req.params
    const { role } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Prevent admin from changing their own role
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot change your own role' })
    }

    user.role = role
    await user.save()

    res.json({
      message: `User role updated to ${role}`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Update user role error:', error)
    res.status(500).json({ message: 'Failed to update user role' })
  }
})

// Delete User
router.delete('/users/:userId', adminAuth, async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }

    // Prevent non-super-admin from deleting admin users
    if (user.role === 'admin' && req.user.role !== 'super-admin') {
      return res.status(403).json({ message: 'Cannot delete admin user' })
    }

    // Delete user's projects and analytics
    await Promise.all([
      Project.deleteMany({ userId: user._id }),
      Analytics.deleteMany({ userId: user._id })
    ])

    await User.findByIdAndDelete(userId)

    res.json({
      message: 'User and all associated data deleted successfully',
      deletedUser: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Failed to delete user' })
  }
})

// Template Management
router.get('/templates', moderatorAuth, async (req, res) => {
  try {
    const templates = await Template.find()
      .populate('createdBy', 'fullName email')
      .sort({ createdAt: -1 })

    res.json({ templates })
  } catch (error) {
    console.error('Get templates error:', error)
    res.status(500).json({ message: 'Failed to fetch templates' })
  }
})

router.post('/templates', adminAuth, [
  body('id').notEmpty().withMessage('Template ID is required'),
  body('name').notEmpty().withMessage('Template name is required'),
  body('description').notEmpty().withMessage('Template description is required'),
  body('category').isIn(['minimal', 'modern', 'creative', 'professional', 'developer', 'designer']).withMessage('Invalid category'),
  body('previewImage').isURL().withMessage('Preview image must be a valid URL')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const templateData = {
      ...req.body,
      createdBy: req.user._id
    }

    const template = new Template(templateData)
    await template.save()

    res.status(201).json({
      message: 'Template created successfully',
      template
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Template ID already exists' })
    }
    console.error('Create template error:', error)
    res.status(500).json({ message: 'Failed to create template' })
  }
})

router.put('/templates/:templateId', adminAuth, async (req, res) => {
  try {
    const { templateId } = req.params
    
    const template = await Template.findByIdAndUpdate(
      templateId,
      { ...req.body, lastUpdated: new Date() },
      { new: true, runValidators: true }
    )

    if (!template) {
      return res.status(404).json({ message: 'Template not found' })
    }

    res.json({
      message: 'Template updated successfully',
      template
    })
  } catch (error) {
    console.error('Update template error:', error)
    res.status(500).json({ message: 'Failed to update template' })
  }
})

router.delete('/templates/:templateId', adminAuth, async (req, res) => {
  try {
    const { templateId } = req.params
    
    const template = await Template.findByIdAndDelete(templateId)
    if (!template) {
      return res.status(404).json({ message: 'Template not found' })
    }

    res.json({
      message: 'Template deleted successfully',
      deletedTemplate: template
    })
  } catch (error) {
    console.error('Delete template error:', error)
    res.status(500).json({ message: 'Failed to delete template' })
  }
})

// Analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const timeRange = req.query.range || '30d'
    const now = new Date()
    let startDate

    switch (timeRange) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    const [
      userGrowth,
      portfolioStats,
      templateUsage,
      topPortfolios,
      recentActivity
    ] = await Promise.all([
      User.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }},
        { $sort: { _id: 1 } }
      ]),
      User.aggregate([
        { $group: { _id: '$selectedTemplate', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Template.find().select('id name usageCount').sort({ usageCount: -1 }),
      User.find()
        .select('fullName username profileImgUrl createdAt')
        .sort({ createdAt: -1 })
        .limit(10),
      User.find({ createdAt: { $gte: startDate } })
        .select('fullName email createdAt authProvider')
        .sort({ createdAt: -1 })
        .limit(20)
    ])

    res.json({
      userGrowth,
      portfolioStats,
      templateUsage,
      topPortfolios,
      recentActivity,
      timeRange
    })
  } catch (error) {
    console.error('Admin analytics error:', error)
    res.status(500).json({ message: 'Failed to fetch analytics data' })
  }
})

// System Settings
router.get('/settings', adminAuth, async (req, res) => {
  try {
    const settings = await SystemSettings.find()
      .populate('lastModifiedBy', 'fullName email')
      .sort({ category: 1, settingKey: 1 })

    const settingsByCategory = settings.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = []
      }
      acc[setting.category].push(setting)
      return acc
    }, {})

    res.json({ 
      settings: settingsByCategory,
      totalSettings: settings.length
    })
  } catch (error) {
    console.error('Get system settings error:', error)
    res.status(500).json({ message: 'Failed to fetch system settings' })
  }
})

router.put('/settings/:settingKey', adminAuth, [
  body('settingValue').notEmpty().withMessage('Setting value is required'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description too long')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { settingKey } = req.params
    const { settingValue, description } = req.body

    const setting = await SystemSettings.findOneAndUpdate(
      { settingKey },
      { 
        settingValue,
        description: description || undefined,
        lastModifiedBy: req.user._id
      },
      { new: true, upsert: true }
    ).populate('lastModifiedBy', 'fullName email')

    res.json({
      message: 'System setting updated successfully',
      setting
    })
  } catch (error) {
    console.error('Update system setting error:', error)
    res.status(500).json({ message: 'Failed to update system setting' })
  }
})

// Bulk Operations
router.post('/users/bulk-action', adminAuth, [
  body('userIds').isArray().withMessage('User IDs must be an array'),
  body('action').isIn(['ban', 'unban', 'delete', 'activate']).withMessage('Invalid action'),
  body('reason').optional().isLength({ max: 500 }).withMessage('Reason too long')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { userIds, action, reason } = req.body

    // Prevent admin from affecting themselves
    if (userIds.includes(req.user._id.toString())) {
      return res.status(400).json({ message: 'Cannot perform bulk action on your own account' })
    }

    let updateQuery = {}
    let successMessage = ''

    switch (action) {
      case 'ban':
        updateQuery = { status: 'banned' }
        successMessage = 'Users banned successfully'
        break
      case 'unban':
      case 'activate':
        updateQuery = { status: 'active' }
        successMessage = 'Users activated successfully'
        break
      case 'delete':
        // Delete users and their data
        await Promise.all([
          Project.deleteMany({ userId: { $in: userIds } }),
          Analytics.deleteMany({ userId: { $in: userIds } }),
          User.deleteMany({ _id: { $in: userIds }, role: { $ne: 'admin' } })
        ])
        return res.json({ message: 'Users deleted successfully', affectedCount: userIds.length })
      default:
        return res.status(400).json({ message: 'Invalid action' })
    }

    const result = await User.updateMany(
      { _id: { $in: userIds }, role: { $ne: 'admin' } },
      updateQuery
    )

    res.json({
      message: successMessage,
      affectedCount: result.modifiedCount
    })
  } catch (error) {
    console.error('Bulk user action error:', error)
    res.status(500).json({ message: 'Failed to perform bulk action' })
  }
})

export default router