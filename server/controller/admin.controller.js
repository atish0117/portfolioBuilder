import { validationResult } from 'express-validator'
import User from '../models/User.js'
import Project from '../models/Project.js'
import Template from '../models/Template.js'
import Analytics from '../models/Analytics.js'
import SystemSettings from '../models/SystemSettings.js'

/* =========================
    DASHBOARD
========================= */
export const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProjects,
      activeUsers,
      bannedUsers,
      recentUsers,
      popularTemplates
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'banned' }),
      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('fullName email createdAt status'),
      User.aggregate([
        { $group: { _id: '$selectedTemplate', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ])

    res.json({
      overview: {
        totalUsers,
        totalProjects,
        activeUsers,
        bannedUsers
      },
      recentUsers,
      popularTemplates
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ message: 'Failed to load dashboard' })
  }
}

/* =========================
   USERS LIST
========================= */
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', status, role } = req.query
    const skip = (page - 1) * limit

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
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 })
        .lean(),
      User.countDocuments(query)
    ])

    res.json({
      users,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers
      }
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}

/* =========================
   UPDATE USER STATUS
========================= */
export const updateUserStatus = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { userId } = req.params
    const { status, reason } = req.body

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot update your own status' })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.status = status

    user.statusHistory = user.statusHistory || []
    user.statusHistory.push({
      oldStatus: user.status,
      newStatus: status,
      reason: reason || 'No reason provided',
      changedBy: req.user._id,
      changedAt: new Date()
    })

    await user.save()

    res.json({
      message: `User status updated to ${status}`,
      user
    })
  } catch (error) {
    console.error('Update status error:', error)
    res.status(500).json({ message: 'Failed to update status' })
  }
}

/* =========================
   UPDATE USER ROLE
========================= */
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params
    const { role } = req.body

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot change your own role' })
    }

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.role = role
    await user.save()

    res.json({
      message: `Role updated to ${role}`,
      user
    })
  } catch (error) {
    console.error('Update role error:', error)
    res.status(500).json({ message: 'Failed to update role' })
  }
}

/* =========================
   DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' })
    }

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    await Promise.all([
      Project.deleteMany({ userId }),
      Analytics.deleteMany({ userId }),
      User.findByIdAndDelete(userId)
    ])

    res.json({
      message: 'User and related data deleted',
      userId
    })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Failed to delete user' })
  }
}

/* =========================
   TEMPLATES
========================= */
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate('createdBy', 'fullName email')
      .sort({ createdAt: -1 })

    res.json({ templates })
  } catch (error) {
    console.error('Get templates error:', error)
    res.status(500).json({ message: 'Failed to fetch templates' })
  }
}

export const createTemplate = async (req, res) => {
  try {
    const template = new Template({
      ...req.body,
      createdBy: req.user._id
    })

    await template.save()

    res.status(201).json({
      message: 'Template created',
      template
    })
  } catch (error) {
    console.error('Create template error:', error)
    res.status(500).json({ message: 'Failed to create template' })
  }
}

export const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.templateId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )

    if (!template) {
      return res.status(404).json({ message: 'Template not found' })
    }

    res.json({
      message: 'Template updated',
      template
    })
  } catch (error) {
    console.error('Update template error:', error)
    res.status(500).json({ message: 'Failed to update template' })
  }
}

export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.templateId)
    if (!template) {
      return res.status(404).json({ message: 'Template not found' })
    }

    res.json({
      message: 'Template deleted',
      template
    })
  } catch (error) {
    console.error('Delete template error:', error)
    res.status(500).json({ message: 'Failed to delete template' })
  }
}

/* =========================
   ANALYTICS
========================= */
export const getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find()
      .sort({ createdAt: -1 })
      .limit(100)

    res.json({ analytics })
  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ message: 'Failed to fetch analytics' })
  }
}

/* =========================
   SYSTEM SETTINGS
========================= */
export const getSettings = async (req, res) => {
  try {
    const settings = await SystemSettings.find().sort({ category: 1 })
    res.json({ settings })
  } catch (error) {
    console.error('Get settings error:', error)
    res.status(500).json({ message: 'Failed to fetch settings' })
  }
}

export const updateSetting = async (req, res) => {
  try {
    const { settingKey } = req.params
    const { settingValue, description } = req.body

    const setting = await SystemSettings.findOneAndUpdate(
      { settingKey },
      {
        settingValue,
        description,
        lastModifiedBy: req.user._id
      },
      { new: true, upsert: true }
    )

    res.json({
      message: 'Setting updated',
      setting
    })
  } catch (error) {
    console.error('Update setting error:', error)
    res.status(500).json({ message: 'Failed to update setting' })
  }
}

/* =========================
   BULK USER ACTIONS
========================= */
export const bulkUserAction = async (req, res) => {
  try {
    const { userIds, action } = req.body

    if (userIds.includes(req.user._id.toString())) {
      return res.status(400).json({ message: 'Cannot affect your own account' })
    }

    if (action === 'delete') {
      await Promise.all([
        Project.deleteMany({ userId: { $in: userIds } }),
        Analytics.deleteMany({ userId: { $in: userIds } }),
        User.deleteMany({ _id: { $in: userIds }, role: { $ne: 'admin' } })
      ])

      return res.json({ message: 'Users deleted successfully' })
    }

    const statusMap = {
      ban: 'banned',
      activate: 'active',
      unban: 'active'
    }

    const status = statusMap[action]
    if (!status) {
      return res.status(400).json({ message: 'Invalid bulk action' })
    }

    const result = await User.updateMany(
      { _id: { $in: userIds }, role: { $ne: 'admin' } },
      { status }
    )

    res.json({
      message: 'Bulk action completed',
      affectedCount: result.modifiedCount
    })
  } catch (error) {
    console.error('Bulk action error:', error)
    res.status(500).json({ message: 'Bulk action failed' })
  }
}
