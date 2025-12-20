import React from 'react'
import { motion } from 'framer-motion'

const ProgressBar = ({
  value,
  max = 100,
  color = 'bg-primary-500',
  backgroundColor = 'bg-gray-200 dark:bg-dark-600',
  height = 'h-2',
  showValue = false,
  animated = true,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={`w-full ${className}`}>
      {showValue && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full ${backgroundColor} rounded-full overflow-hidden ${height}`}>
        <motion.div
          className={`${height} ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: animated ? `${percentage}%` : `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
