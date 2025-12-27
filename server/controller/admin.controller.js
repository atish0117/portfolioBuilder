import { validationResult } from "express-validator";
import User from "../models/User.js";
import Project from "../models/Project.js";
import Template from "../models/Template.js";
import Analytics from "../models/Analytics.js";
import SystemSettings from "../models/SystemSettings.js";


//  DASHBOARD
export const getDashboard = async (req, res) => {
  try {
    console.log(
      "Admin dashboard accessed by:",
      req.user.email,
      "Role:",
      req.user.role
    );

    const [
      totalUsers,
      totalPortfolios,
      totalProjects,
      activeUsers,
      bannedUsers,
      recentUsers,
      popularTemplates,
    ] = await Promise.all([
      User.countDocuments(),

      // portfolios count
      User.countDocuments({
        $or: [
          { profileImgUrl: { $exists: true, $ne: "" } },
          { bio: { $exists: true, $ne: "" } },
        ],
      }),

      Project.countDocuments(),
      User.countDocuments({ status: "active" }),
      User.countDocuments({ status: "banned" }),

      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("fullName email createdAt status")
        .lean(),

      User.aggregate([
        { $group: { _id: "$selectedTemplate", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const systemStats = {
      serverUptime: Math.floor(process.uptime() / 3600) + " hours",
      memoryUsage:
        Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
      totalStorage: Math.floor(Math.random() * 1000) + 500, // mock
    };

    res.json({
      overview: {
        totalUsers,
        totalPortfolios,
        totalProjects,
        activeUsers,
        bannedUsers,
        growthRate: Math.floor(Math.random() * 20) + 5, // mock
      },
      recentActivity: {
        newUsers: recentUsers,
        popularTemplates: popularTemplates.map((t) => ({
          template: t._id || "minimal",
          count: t.count,
          percentage: totalUsers ? Math.round((t.count / totalUsers) * 100) : 0,
        })),
      },
      systemStats,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};


//  USERS LIST
export const getUsers = async (req, res) => {
  try {
    // another one option
    // const { page = 1, limit = 20, search = '', status, role } = req.query
    //  const skip = (page - 1) * limit

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = req.query.search || "";
    const status = req.query.status;
    const role = req.query.role;
    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (role) query.role = role;

    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select("-password -passwordResetToken")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const projectCount = await Project.countDocuments({ userId: user._id });

        const completionFields = [
          user.profileImgUrl,
          user.bio,
          user.skills?.length > 0,
          user.socialLinks && Object.values(user.socialLinks).some(Boolean),
          projectCount > 0,
        ];

        const completionPercentage =
          Math.round(
            (completionFields.filter(Boolean).length /
              completionFields.length) *
              100
          ) || 0;

        return {
          ...user,
          projectCount,
          completionPercentage,
          lastLoginFormatted: user.lastLoginAt
            ? new Date(user.lastLoginAt).toLocaleDateString()
            : "Never",
        };
      })
    );

    res.json({
      users: usersWithStats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNext: page < Math.ceil(totalUsers / limit),
        hasPrev: page > 1,
      },
      filters: { search, status, role },
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


//  UPDATE USER STATUS
export const updateUserStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { userId } = req.params;
    const { status, reason } = req.body;

    // Prevent admin from changing their own status
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot update your own status" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Protect admin accounts
    if (user.role === "admin" && req.user.role !== "super-admin") {
      return res
        .status(403)
        .json({ message: "Cannot modify admin user status" });
    }

    // Save old status BEFORE update
    const oldStatus = user.status;
    user.status = status;

    // Maintain status history
    user.statusHistory = user.statusHistory || [];
    user.statusHistory.push({
      oldStatus,
      newStatus: status,
      reason: reason || "No reason provided",
      changedBy: req.user._id,
      changedAt: new Date(),
    });

    await user.save();

    res.json({
      message: `User status updated to ${status}`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        status: user.status,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};


//  UPDATE USER ROLE
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({
      message: `Role updated to ${role}`,
      user,
    });
  } catch (error) {
    console.error("Update role error:", error);
    res.status(500).json({ message: "Failed to update role" });
  }
};


//  DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Promise.all([
      Project.deleteMany({ userId }),
      Analytics.deleteMany({ userId }),
      User.findByIdAndDelete(userId),
    ]);

    res.json({
      message: "User and related data deleted",
      userId,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};


//  TEMPLATES
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json({ templates });
  } catch (error) {
    console.error("Get templates error:", error);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

export const createTemplate = async (req, res) => {
  try {
    const template = new Template({
      ...req.body,
      createdBy: req.user._id,
    });

    await template.save();

    res.status(201).json({
      message: "Template created successfully",
      template,
    });
  } catch (error) {
    console.error("Create template error:", error);
    res.status(500).json({ message: "Failed to create template" });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findByIdAndUpdate(
      templateId,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({
      message: "Template updated successfully",
      template,
    });
  } catch (error) {
    console.error("Update template error:", error);
    res.status(500).json({ message: "Failed to update template" });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findByIdAndDelete(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json({
      message: "Template deleted successfully",
      deletedTemplate: template,
    });
  } catch (error) {
    console.error("Delete template error:", error);
    res.status(500).json({ message: "Failed to delete template" });
  }
};


//  ADMIN DASHBOARD ANALYTICS
export const getAnalytics = async (req, res) => {
  try {
    const range = req.query.range || "30d";
    const now = new Date();
    let startDate;

    switch (range) {
      case "24h":
        startDate = new Date(now - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case "90d":
        startDate = new Date(now - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
    }

    const [
      userGrowth,
      portfolioStats,
      templateUsage,
      topPortfolios,
      recentActivity,
    ] = await Promise.all([
      User.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      User.aggregate([
        { $group: { _id: "$selectedTemplate", count: { $sum: 1 } } },
      ]),
      Template.find().select("id name usageCount").sort({ usageCount: -1 }),
      User.find()
        .select("fullName username profileImgUrl createdAt")
        .sort({ createdAt: -1 })
        .limit(10),
      User.find({ createdAt: { $gte: startDate } })
        .select("fullName email createdAt authProvider")
        .limit(20),
    ]);

    res.json({
      range,
      userGrowth,
      portfolioStats,
      templateUsage,
      topPortfolios,
      recentActivity,
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};


//  RAW ANALYTICS LOGS
export const getAnalyticsLogs = async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ createdAt: -1 }).limit(100);

    res.json({ analytics });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics logs" });
  }
};

export const getSettings = async (req, res) => {
  try {
    const settings = await SystemSettings.find()
      .populate("lastModifiedBy", "fullName email")
      .sort({ category: 1, settingKey: 1 })
      .lean();

    const groupedSettings = settings.reduce((acc, setting) => {
      if (!acc[setting.category]) acc[setting.category] = [];
      acc[setting.category].push(setting);
      return acc;
    }, {});

    res.json({
      settings: groupedSettings,
      totalSettings: settings.length,
    });
  } catch (error) {
    console.error("Get system settings error:", error);
    res.status(500).json({ message: "Failed to fetch system settings" });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const { settingKey } = req.params;
    const { settingValue, description } = req.body;

    const setting = await SystemSettings.findOneAndUpdate(
      { settingKey },
      {
        settingValue,
        description,
        lastModifiedBy: req.user._id,
      },
      { new: true, upsert: true }
    ).populate("lastModifiedBy", "fullName email");

    res.json({
      message: "System setting updated successfully",
      setting,
    });
  } catch (error) {
    console.error("Update setting error:", error);
    res.status(500).json({ message: "Failed to update setting" });
  }
};


//  BULK USER ACTIONS
export const bulkUserAction = async (req, res) => {
  try {
    const { userIds, action, reason } = req.body;

    // Admin cannot affect himself
    if (userIds.includes(req.user._id.toString())) {
      return res
        .status(400)
        .json({ message: "Cannot perform bulk action on your own account" });
    }

    // DELETE USERS
    if (action === "delete") {
      await Promise.all([
        Project.deleteMany({ userId: { $in: userIds } }),
        Analytics.deleteMany({ userId: { $in: userIds } }),
        User.deleteMany({ _id: { $in: userIds }, role: { $ne: "admin" } }),
      ]);

      return res.json({
        message: "Users deleted successfully",
        affectedCount: userIds.length,
      });
    }

    // STATUS ACTIONS
    const statusMap = {
      ban: "banned",
      activate: "active",
      unban: "active",
    };

    const newStatus = statusMap[action];
    if (!newStatus) {
      return res.status(400).json({ message: "Invalid bulk action" });
    }

    // Update users
    const users = await User.find({
      _id: { $in: userIds },
      role: { $ne: "admin" },
    });

    for (const user of users) {
      user.statusHistory = user.statusHistory || [];
      user.statusHistory.push({
        oldStatus: user.status,
        newStatus,
        reason: reason || "Bulk action",
        changedBy: req.user._id,
        changedAt: new Date(),
      });
      user.status = newStatus;
      await user.save();
    }

    res.json({
      message: "Bulk action completed successfully",
      affectedCount: users.length,
    });
  } catch (error) {
    console.error("Bulk user action error:", error);
    res.status(500).json({ message: "Failed to perform bulk action" });
  }
};
