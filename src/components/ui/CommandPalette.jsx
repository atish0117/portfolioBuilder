import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CommandPalette = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const commands = [
    {
      id: 'view-portfolio',
      title: 'View Portfolio',
      description: 'Open your live portfolio in a new tab',
      icon: '👁️',
      action: () => window.open(`/${user?.username}`, '_blank'),
      category: 'Portfolio',
      keywords: ['view', 'portfolio', 'live', 'preview']
    },
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Update your basic information',
      icon: '👤',
      action: () => navigate('/dashboard?tab=profile'),
      category: 'Profile',
      keywords: ['edit', 'profile', 'info', 'personal']
    },
    {
      id: 'add-project',
      title: 'Add Project',
      description: 'Create a new project entry',
      icon: '➕',
      action: () => navigate('/dashboard?tab=projects'),
      category: 'Projects',
      keywords: ['add', 'create', 'project', 'new']
    },
    {
      id: 'change-template',
      title: 'Change Template',
      description: 'Switch to a different portfolio template',
      icon: '🎨',
      action: () => navigate('/dashboard?tab=templates'),
      category: 'Design',
      keywords: ['template', 'theme', 'design', 'change']
    },
    {
      id: 'customize-theme',
      title: 'Customize Theme',
      description: 'Personalize colors and styling',
      icon: '🌈',
      action: () => navigate('/dashboard?tab=theme'),
      category: 'Design',
      keywords: ['theme', 'colors', 'customize', 'style']
    },
    {
      id: 'seo-settings',
      title: 'SEO Settings',
      description: 'Optimize for search engines',
      icon: '🔍',
      action: () => navigate('/dashboard?tab=seo'),
      category: 'SEO',
      keywords: ['seo', 'search', 'optimization', 'meta']
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Check portfolio performance',
      icon: '📊',
      action: () => navigate('/dashboard?tab=analytics'),
      category: 'Analytics',
      keywords: ['analytics', 'stats', 'performance', 'views']
    },
    {
      id: 'integrations',
      title: 'Manage Integrations',
      description: 'Connect external services',
      icon: '🔗',
      action: () => navigate('/dashboard?tab=integrations'),
      category: 'Integrations',
      keywords: ['integrations', 'connect', 'services', 'apps']
    },
    {
      id: 'copy-link',
      title: 'Copy Portfolio Link',
      description: 'Copy your portfolio URL to clipboard',
      icon: '📋',
      action: () => {
        navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
        setIsOpen(false)
      },
      category: 'Portfolio',
      keywords: ['copy', 'link', 'url', 'share']
    },
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Manage your account preferences',
      icon: '⚙️',
      action: () => navigate('/dashboard?tab=settings'),
      category: 'Settings',
      keywords: ['settings', 'account', 'preferences', 'config']
    }
  ]

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  )

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action()
        setIsOpen(false)
        setQuery('')
      }
    }
  }

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = []
    }
    acc[command.category].push(command)
    return acc
  }, {})

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search...</span>
        <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-dark-600 rounded">⌘K</kbd>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="w-full max-w-2xl mx-4 bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-gray-200 dark:border-dark-600 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-dark-600">
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search for commands..."
                  className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
                />
                <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 rounded">ESC</kbd>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {Object.keys(groupedCommands).length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No commands found for "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                      <div key={category}>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          {category}
                        </div>
                        {categoryCommands.map((command, index) => {
                          const globalIndex = filteredCommands.indexOf(command)
                          return (
                            <motion.button
                              key={command.id}
                              onClick={() => {
                                command.action()
                                setIsOpen(false)
                                setQuery('')
                              }}
                              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors ${
                                selectedIndex === globalIndex ? 'bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-500' : ''
                              }`}
                              whileHover={{ x: 4 }}
                            >
                              <div className="text-2xl mr-3">{command.icon}</div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {command.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {command.description}
                                </div>
                              </div>
                              {selectedIndex === globalIndex && (
                                <kbd className="px-2 py-1 text-xs bg-gray-200 dark:bg-dark-600 text-gray-500 dark:text-gray-400 rounded">
                                  ↵
                                </kbd>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-4 py-3 border-t border-gray-200 dark:border-dark-600 bg-gray-50 dark:bg-dark-700">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">↑</kbd>
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">↓</kbd>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-dark-600 rounded">↵</kbd>
                      <span>select</span>
                    </div>
                  </div>
                  <div>
                    {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CommandPalette
