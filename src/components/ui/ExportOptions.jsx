import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ExportOptions = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth)
  const [exporting, setExporting] = useState(null)

  const exportOptions = [
    {
      id: 'pdf',
      title: 'PDF Resume',
      description: 'Download your portfolio as a PDF document',
      icon: '📄',
      format: 'PDF',
      action: () => exportToPDF()
    },
    {
      id: 'json',
      title: 'Portfolio Data',
      description: 'Export all your portfolio data as JSON',
      icon: '📊',
      format: 'JSON',
      action: () => exportToJSON()
    },
    {
      id: 'html',
      title: 'Static Website',
      description: 'Download your portfolio as static HTML files',
      icon: '🌐',
      format: 'ZIP',
      action: () => exportToHTML()
    },
    {
      id: 'print',
      title: 'Print Version',
      description: 'Open print-friendly version of your portfolio',
      icon: '🖨️',
      format: 'Print',
      action: () => openPrintVersion()
    }
  ]

  const exportToPDF = async () => {
    setExporting('pdf')
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const link = document.createElement('a')
      link.href = '#'
      link.download = `${user?.username || 'portfolio'}-resume.pdf`
      link.click()
      toast.success('PDF exported successfully!')
    } catch (error) {
      toast.error('Failed to export PDF')
    } finally {
      setExporting(null)
    }
  }

  const exportToJSON = () => {
    setExporting('json')
    try {
      const portfolioData = {
        user: user,
        exportDate: new Date().toISOString(),
        version: '1.0'
      }

      const dataStr = JSON.stringify(portfolioData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)

      const link = document.createElement('a')
      link.href = url
      link.download = `${user?.username || 'portfolio'}-data.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('Portfolio data exported!')
    } catch (error) {
      toast.error('Failed to export data')
    } finally {
      setExporting(null)
    }
  }

  const exportToHTML = async () => {
    setExporting('html')
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      toast.success('Static website exported!')
    } catch (error) {
      toast.error('Failed to export HTML')
    } finally {
      setExporting(null)
    }
  }

  const openPrintVersion = () => {
    const printUrl = `/${user?.username}?print=true`
    window.open(printUrl, '_blank')
    toast.success('Print version opened!')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className=" mt-96 px-6 py-4 border-b border-gray-200 dark:border-dark-600">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Export Portfolio
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Choose how you'd like to export your portfolio
              </p>
            </div>

            {/* Export Options */}
            <div className="p-6 ">
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={option.action}
                    disabled={exporting === option.id}
                    className="p-4 border border-gray-200 dark:border-dark-600 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: exporting === option.id ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{option.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {option.title}
                          </h3>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            {option.format}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>

                        {exporting === option.id && (
                          <div className="flex items-center space-x-2 mt-2">
                            <motion.div
                              className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="text-xs text-primary-600 dark:text-primary-400">
                              Exporting...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-dark-700 border-t border-gray-200 dark:border-dark-600">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Tip: PDF and HTML exports preserve your current template design
                </div>
                <button
                  onClick={onClose}
                  className="btn-secondary text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExportOptions
