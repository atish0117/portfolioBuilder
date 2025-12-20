import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'

const ThemeCustomizer = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [activeTab, setActiveTab] = useState('presets')

  const [customTheme, setCustomTheme] = useState({
    id: 'custom',
    name: 'Custom Theme',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#F59E0B'
  })

  const presetThemes = [
    {
      id: 'ocean',
      name: 'Ocean Blue',
      primaryColor: '#0EA5E9',
      secondaryColor: '#06B6D4',
      backgroundColor: '#F0F9FF',
      textColor: '#0C4A6E',
      accentColor: '#0284C7'
    },
    {
      id: 'sunset',
      name: 'Sunset Orange',
      primaryColor: '#F97316',
      secondaryColor: '#EF4444',
      backgroundColor: '#FFF7ED',
      textColor: '#9A3412',
      accentColor: '#DC2626'
    },
    {
      id: 'forest',
      name: 'Forest Green',
      primaryColor: '#059669',
      secondaryColor: '#10B981',
      backgroundColor: '#F0FDF4',
      textColor: '#064E3B',
      accentColor: '#16A34A'
    },
    {
      id: 'royal',
      name: 'Royal Purple',
      primaryColor: '#7C3AED',
      secondaryColor: '#A855F7',
      backgroundColor: '#FAF5FF',
      textColor: '#581C87',
      accentColor: '#9333EA'
    },
    {
      id: 'midnight',
      name: 'Midnight Dark',
      primaryColor: '#1E293B',
      secondaryColor: '#334155',
      backgroundColor: '#0F172A',
      textColor: '#F1F5F9',
      accentColor: '#64748B'
    },
    {
      id: 'rose',
      name: 'Rose Gold',
      primaryColor: '#E11D48',
      secondaryColor: '#F43F5E',
      backgroundColor: '#FFF1F2',
      textColor: '#881337',
      accentColor: '#BE185D'
    }
  ]

  const handleThemeSelect = async (theme) => {
    try {
      await dispatch(updateProfile({ 
        customTheme: theme,
        selectedTemplate: user?.selectedTemplate || 'minimal'
      })).unwrap()
      toast.success(`${theme.name} theme applied!`)
    } catch (error) {
      toast.error('Failed to apply theme')
    }
  }

  const handleCustomColorChange = (key, value) => {
    setCustomTheme((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const applyCustomTheme = async () => {
    try {
      await dispatch(updateProfile({ 
        customTheme: customTheme,
        selectedTemplate: user?.selectedTemplate || 'minimal'
      })).unwrap()
      toast.success('Custom theme applied!')
    } catch (error) {
      toast.error('Failed to apply custom theme')
    }
  }

  const ThemePreview = ({ theme }) => (
    <div 
      className="w-full h-32 rounded-lg border-2 border-gray-200 dark:border-dark-600 overflow-hidden cursor-pointer hover:border-primary-400 transition-colors"
      style={{ backgroundColor: theme.backgroundColor }}
      onClick={() => handleThemeSelect(theme)}
    >
      <div 
        className="h-8 w-full"
        style={{ backgroundColor: theme.primaryColor }}
      />
      <div className="p-3">
        <div 
          className="h-2 w-3/4 rounded mb-2"
          style={{ backgroundColor: theme.textColor, opacity: 0.8 }}
        />
        <div 
          className="h-2 w-1/2 rounded mb-2"
          style={{ backgroundColor: theme.secondaryColor }}
        />
        <div 
          className="h-2 w-1/4 rounded"
          style={{ backgroundColor: theme.accentColor }}
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Customizer</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Customize your portfolio's appearance
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {[
          { id: 'presets', label: 'Preset Themes', icon: '🎨' },
          { id: 'custom', label: 'Custom Colors', icon: '🎯' },
          { id: 'typography', label: 'Typography', icon: '📝' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'presets' && (
          <motion.div
            key="presets"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presetThemes.map((theme) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="space-y-3"
                >
                  <ThemePreview theme={theme} />
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900 dark:text-white">{theme.name}</h3>
                    <div className="flex justify-center space-x-1 mt-2">
                      {[theme.primaryColor, theme.secondaryColor, theme.accentColor].map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300 dark:border-dark-600"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'custom' && (
          <motion.div
            key="custom"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Color Palette
                </h3>

                {[
                  { key: 'primaryColor', label: 'Primary Color', description: 'Main brand color' },
                  { key: 'secondaryColor', label: 'Secondary Color', description: 'Supporting color' },
                  { key: 'accentColor', label: 'Accent Color', description: 'Highlight color' },
                  { key: 'backgroundColor', label: 'Background Color', description: 'Page background' },
                  { key: 'textColor', label: 'Text Color', description: 'Main text color' }
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.label}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={customTheme[item.key]}
                        onChange={(e) => handleCustomColorChange(item.key, e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300 dark:border-dark-600 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={customTheme[item.key]}
                        onChange={(e) => handleCustomColorChange(item.key, e.target.value)}
                        className="input-field font-mono text-sm"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                ))}

                <motion.button
                  onClick={applyCustomTheme}
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Custom Theme
                </motion.button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Live Preview
                </h3>
                <ThemePreview theme={customTheme} />
                <div className="card p-4" style={{ backgroundColor: customTheme.backgroundColor }}>
                  <div className="text-2xl font-bold mb-2" style={{ color: customTheme.textColor }}>
                    Sample Portfolio
                  </div>
                  <div className="text-lg mb-3" style={{ color: customTheme.primaryColor }}>
                    Full Stack Developer
                  </div>
                  <div className="text-sm mb-4" style={{ color: customTheme.textColor, opacity: 0.8 }}>
                    This is how your portfolio will look with the custom theme applied.
                  </div>
                  <div className="flex space-x-2">
                    {['React', 'Node.js', 'TypeScript'].map((tech, i) => {
                      const bg =
                        i === 0 ? customTheme.primaryColor :
                        i === 1 ? customTheme.secondaryColor :
                        customTheme.accentColor

                      return (
                        <div
                          key={tech}
                          className="px-3 py-1 rounded-full text-sm"
                          style={{
                            backgroundColor: bg,
                            color: customTheme.backgroundColor
                          }}
                        >
                          {tech}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'typography' && (
          <motion.div
            key="typography"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                🚧 Typography Customization Coming Soon!
              </h3>
              <p className="text-yellow-800 dark:text-yellow-200">
                Font family, size, and weight customization will be available in the next update.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeCustomizer
