import React from 'react'
import { motion } from 'framer-motion'

const StatsCard = ({
  title,
  value,
  icon,
  color = 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-900 dark:text-blue-100',
  trend,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`card p-6 ${color} ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <span className="mr-1">
                {trend.isPositive ? '↗️' : '↘️'}
              </span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className="text-4xl opacity-60 ml-4">{icon}</div>
      </div>
    </motion.div>
  )
}

export default StatsCard
