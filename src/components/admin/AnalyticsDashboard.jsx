import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { adminAPI } from '../../services/api'
import StatsCard from '../ui/StatsCard'
import toast from 'react-hot-toast'


const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const response = await adminAPI.getAnalytics(timeRange)
      setAnalyticsData(response.data)
    } catch (error) {
      toast.error('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 dark:bg-dark-700 h-32 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (!analyticsData) return null

  const totalUserGrowth = analyticsData.userGrowth.reduce((sum, day) => sum + day.count, 0)
  const totalTemplateUsage = analyticsData.templateUsage.reduce((sum, template) => sum + template.usageCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Platform Analytics
        </h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-500'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="User Growth"
          value={totalUserGrowth.toLocaleString()}
          icon="📈"
          color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-900 dark:text-green-100"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Templates"
          value={analyticsData.templateUsage.length.toString()}
          icon="🎨"
          color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-900 dark:text-purple-100"
        />
        <StatsCard
          title="Template Usage"
          value={totalTemplateUsage.toLocaleString()}
          icon="📊"
          color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-900 dark:text-blue-100"
        />
        <StatsCard
          title="Top Portfolios"
          value={analyticsData.topPortfolios.length.toString()}
          icon="🏆"
          color="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 text-yellow-900 dark:text-yellow-100"
        />
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Growth ({timeRange})
          </h3>
          <div className="space-y-3">
            {analyticsData.userGrowth.map((day, index) => (
              <div key={day._id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(day._id).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.count / Math.max(...analyticsData.userGrowth.map(d => d.count))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                    {day.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Template Usage */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Template Popularity
          </h3>
          <div className="space-y-3">
            {analyticsData.templateUsage.map((template, index) => (
              <div key={template.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' :
                    'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-900 dark:text-white capitalize">
                    {template.name || template.id}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(template.usageCount / Math.max(...analyticsData.templateUsage.map(t => t.usageCount))) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                    {template.usageCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Portfolios */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Portfolios
          </h3>
          <div className="space-y-3">
            {analyticsData.topPortfolios.map((portfolio) => (
              <div key={portfolio.username} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  {portfolio.profileImgUrl ? (
                    <img
                      src={portfolio.profileImgUrl}
                      alt={portfolio.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {portfolio.fullName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {portfolio.fullName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    /{portfolio.username}
                  </p>
                </div>
                <a
                  href={`/${portfolio.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.fullName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Joined via {activity.authProvider}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard