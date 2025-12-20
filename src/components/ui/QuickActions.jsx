import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const QuickActions = () => {
  const { user } = useSelector((state) => state.auth)

  const actions = [
    {
      id: 'view-portfolio',
      label: 'View Portfolio',
      icon: '👁️',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => window.open(`/${user?.username}`, '_blank')
    },
    {
      id: 'copy-link',
      label: 'Copy Link',
      icon: '🔗',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
        toast.success('Portfolio link copied!')
      }
    },
    {
      id: 'share',
      label: 'Share',
      icon: '📤',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: `${user?.fullName}'s Portfolio`,
            text: `Check out ${user?.fullName}'s professional portfolio`,
            url: `${window.location.origin}/${user?.username}`
          })
        } else {
          toast.info('Share feature not supported on this device')
        }
      }
    },
    {
      id: 'download-resume',
      label: 'Resume',
      icon: '📄',
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => {
        if (user?.resumeUrl) {
          window.open(user.resumeUrl, '_blank')
        } else {
          toast.error('No resume uploaded')
        }
      }
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={action.action}
            className={`
              w-12 h-12 rounded-full text-white shadow-lg transition-all duration-200
              ${action.color}
              flex items-center justify-center text-lg
              hover:shadow-xl
            `}
            title={action.label}
          >
            {action.icon}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
