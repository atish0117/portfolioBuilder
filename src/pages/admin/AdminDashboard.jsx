import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { adminAPI } from '../../services/api'
import UserManagement from '../../components/admin/UserManagement'
import AnalyticsDashboard from '../../components/admin/AnalyticsDashboard'
import TemplateManagement from '../../components/admin/TemplateManagement'
import SystemSettings from '../../components/admin/SystemSettings'
import StatsCard from '../../components/ui/StatsCard'
import toast from 'react-hot-toast'



const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log('user in admin dashboard:', user)


  useEffect(() => {
    loadDashboardData()
  }, [user])

  const loadDashboardData = async () => {
    if (user?.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.')
      setError('Access denied. Admin privileges required.')
      setLoading(false)
      return
    }

    try {
      const response = await adminAPI.getDashboard()
      setDashboardData(response.data)
    } catch (error) {
      console.error('Dashboard load error:', error)
      toast.error('Failed to load dashboard data')
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊', description: 'System overview and stats' },
    { id: 'users', label: 'User Management', icon: '👥', description: 'Manage users and permissions' },
    { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Platform analytics and insights' },
    { id: 'templates', label: 'Templates', icon: '🎨', description: 'Manage portfolio templates' },
    { id: 'settings', label: 'System Settings', icon: '⚙️', description: 'Configure system settings' }
  ]

  if ( error || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error || "You don't have permission to access the admin dashboard."}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Current role: {user?.role || 'Not authenticated'}
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-dark-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your Portfolio Builder platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                      }
                    `}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs opacity-70">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && dashboardData && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                      title="Total Users"
                      value={dashboardData.overview.totalUsers.toLocaleString()}
                      icon="👥"
                      color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-900 dark:text-blue-100"
                      trend={{ value: dashboardData.overview.growthRate, isPositive: true }}
                    />
                    <StatsCard
                      title="Active Portfolios"
                      value={dashboardData.overview.totalPortfolios.toLocaleString()}
                      icon="📁"
                      color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-900 dark:text-green-100"
                      trend={{ value: 15, isPositive: true }}
                    />
                    <StatsCard
                      title="Total Projects"
                      value={dashboardData.overview.totalProjects.toLocaleString()}
                      icon="💼"
                      color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-900 dark:text-purple-100"
                      trend={{ value: 8, isPositive: true }}
                    />
                    <StatsCard
                      title="Banned Users"
                      value={dashboardData.overview.bannedUsers.toLocaleString()}
                      icon="🚫"
                      color="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-900 dark:text-red-100"
                    />
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Recent Users
                      </h3>
                      <div className="space-y-3">
                        {dashboardData.recentActivity.newUsers.map((user) => (
                          <div key={user._id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {user.fullName}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user.email}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                user.status === 'banned' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                              }`}>
                                {user.status}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Popular Templates
                      </h3>
                      <div className="space-y-3">
                        {dashboardData.recentActivity.popularTemplates.map((template) => (
                          <div key={template.template} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                                <span className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                                  {template.template.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white capitalize">
                                {template.template}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {template.count} users
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {template.percentage}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* System Stats */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      System Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {dashboardData.systemStats.uptime}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {dashboardData.systemStats.memoryUsage}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {dashboardData.systemStats.totalStorage} MB
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Storage Used</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <UserManagement />
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <AnalyticsDashboard />
                </motion.div>
              )}

              {activeTab === 'templates' && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <TemplateManagement />
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <SystemSettings />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard