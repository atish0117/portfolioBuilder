import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'


const SystemSettings = () => {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('general')
  const [editingSetting, setEditingSetting] = useState(null)
  const [formData, setFormData] = useState({
    settingValue: '',
    description: ''
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await adminAPI.getSystemSettings()
      setSettings(response.data.settings)
      
      // Set first available category as active
      const categories = Object.keys(response.data.settings)
      if (categories.length > 0 && !categories.includes(activeCategory)) {
        setActiveCategory(categories[0])
      }
    } catch (error) {
      toast.error('Failed to load system settings')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSetting = async (settingKey, settingValue, description) => {
    try {
      await adminAPI.updateSystemSetting(settingKey, settingValue, description)
      toast.success('Setting updated successfully!')
      loadSettings()
      setEditingSetting(null)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update setting')
    }
  }

  const handleEditSetting = (setting) => {
    setEditingSetting(setting)
    setFormData({
      settingValue: typeof setting.settingValue === 'object' 
        ? JSON.stringify(setting.settingValue, null, 2)
        : setting.settingValue.toString(),
      description: setting.description || ''
    })
  }

  const handleSaveSetting = async () => {
    if (!editingSetting) return

    try {
      let parsedValue = formData.settingValue
      
      // Try to parse as JSON if it looks like an object
      if (formData.settingValue.startsWith('{') || formData.settingValue.startsWith('[')) {
        try {
          parsedValue = JSON.parse(formData.settingValue)
        } catch {
          // Keep as string if JSON parsing fails
        }
      }

      await handleUpdateSetting(editingSetting.settingKey, parsedValue, formData.description)
    } catch (error) {
      toast.error('Failed to save setting')
    }
  }

  const categories = Object.keys(settings)

  const renderSettingValue = (setting) => {
    if (typeof setting.settingValue === 'object') {
      return (
        <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto">
          {JSON.stringify(setting.settingValue, null, 2)}
        </pre>
      )
    }
    return (
      <span className="text-sm text-gray-900 dark:text-white">
        {setting.settingValue.toString()}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-200 dark:bg-dark-700 h-8 w-64 rounded"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-dark-700 h-64 w-full rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Settings
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {Object.values(settings).flat().length} total settings
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize
              ${activeCategory === category
                ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Settings List */}
      <AnimatePresence mode="wait">
        {settings[activeCategory] && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {settings[activeCategory].map((setting) => (
              <div key={setting._id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {setting.settingKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      {setting.isPublic && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          Public
                        </span>
                      )}
                    </div>
                    
                    {setting.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                        {setting.description}
                      </p>
                    )}
                    
                    <div className="mb-3">
                      {renderSettingValue(setting)}
                    </div>
                    
                    {setting.lastModifiedBy && (
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Last modified by {setting.lastModifiedBy.fullName} on {new Date(setting.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <motion.button
                    onClick={() => handleEditSetting(setting)}
                    className="btn-secondary text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Setting Modal */}
      <AnimatePresence>
        {editingSetting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setEditingSetting(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Setting: {editingSetting.settingKey}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Setting Value
                  </label>
                  <textarea
                    value={formData.settingValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, settingValue: e.target.value }))}
                    rows={6}
                    className="input-field font-mono text-sm resize-none"
                    placeholder="Enter setting value (JSON for objects)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field"
                    placeholder="Describe what this setting controls"
                  />
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 dark:border-dark-600 flex justify-end space-x-3">
                <button
                  onClick={() => setEditingSetting(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleSaveSetting}
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SystemSettings