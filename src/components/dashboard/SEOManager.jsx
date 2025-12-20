import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { seoAPI } from '../../services/api'
import toast from 'react-hot-toast'

const SEOManager = () => {
  const { user } = useSelector((state) => state.auth)
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    canonicalUrl: '',
    robotsDirective: 'index,follow',
    structuredData: {
      type: 'Person',
      jobTitle: '',
      worksFor: '',
      url: '',
      sameAs: [],
      knowsAbout: [],
      alumniOf: [],
      award: []
    },
    customMetaTags: [],
    seoScore: 0
  })
  
  const [seoChecks, setSeoChecks] = useState([])
  const [suggestions, setSuggestions] = useState({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('basic')
  const [previewData, setPreviewData] = useState(null)

  useEffect(() => {
    fetchSeoData()
  }, [])

  const fetchSeoData = async () => {
    try {
      const response = await seoAPI.getSeoData()
      setSeoData(response.data.seoData || seoData)
      setSeoChecks(response.data.seoChecks || [])
      setSuggestions(response.data.suggestions || {})
    } catch (error) {
      console.error('Failed to fetch SEO data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await seoAPI.updateSeoData(seoData)
      setSeoData(response.data.seoData)
      setSeoChecks(response.data.seoChecks)
      toast.success('SEO settings updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update SEO settings')
    } finally {
      setSaving(false)
    }
  }

  const applySuggestions = async () => {
    try {
      const response = await seoAPI.generateSuggestions()
      const newSuggestions = response.data.suggestions
      setSeoData(prev => ({
        ...prev,
        ...newSuggestions
      }))
      toast.success('SEO suggestions applied!')
    } catch (error) {
      toast.error('Failed to generate suggestions')
    }
  }

  const generatePreview = async () => {
    if (!user?.username) return
    
    try {
      const response = await seoAPI.getSeoPreview(user.username)
      setPreviewData(response.data)
    } catch (error) {
      toast.error('Failed to generate preview')
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getCheckIcon = (status) => {
    switch (status) {
      case 'good': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      default: return '❓'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-200 dark:bg-dark-700 h-8 w-64 rounded"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-dark-700 h-32 w-full rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          SEO Optimization
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            SEO Score: <span className={`font-bold text-lg ${getScoreColor(seoData.seoScore)}`}>
              {seoData.seoScore}/100
            </span>
          </div>
          <motion.button
            onClick={applySuggestions}
            className="btn-secondary text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🤖 Auto-Generate
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {saving ? 'Saving...' : 'Save SEO Settings'}
          </motion.button>
        </div>
      </div>

      {/* SEO Score Dashboard */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            📊 SEO Health Dashboard
          </h3>
          <div className="text-4xl">
            {seoData.seoScore >= 80 ? '🎉' : seoData.seoScore >= 60 ? '👍' : seoData.seoScore >= 40 ? '⚠️' : '🚨'}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-blue-800 dark:text-blue-200">Overall SEO Score</span>
            <span className={`text-sm font-bold ${getScoreColor(seoData.seoScore)}`}>
              {seoData.seoScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${seoData.seoScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-3 rounded-full ${
                seoData.seoScore >= 80 ? 'bg-green-500' :
                seoData.seoScore >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
            />
          </div>
        </div>

        {/* SEO Checks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seoChecks.map((check, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <span>{getCheckIcon(check.status)}</span>
              <span className="text-blue-800 dark:text-blue-200">{check.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {[
          { id: 'basic', label: 'Basic SEO', icon: '🔍' },
          { id: 'social', label: 'Social Media', icon: '📱' },
          { id: 'advanced', label: 'Advanced', icon: '⚙️' },
          { id: 'preview', label: 'Preview', icon: '👁️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'basic' && (
          <motion.div
            key="basic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Basic SEO Fields */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Basic SEO Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Title *
                  </label>
                  <input
                    type="text"
                    value={seoData.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    className="input-field"
                    placeholder="Your Name - Professional Title"
                    maxLength={60}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Optimal: 30-60 characters
                    </span>
                    <span className={`${
  seoData?.metaTitle?.length >= 30 && seoData?.metaTitle?.length <= 60 
    ? 'text-green-600' 
    : 'text-red-600'
}`}>
  {seoData?.metaTitle?.length || 0}/60
</span>

                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description *
                  </label>
                  <textarea
                    value={seoData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Brief description of your portfolio and expertise..."
                    maxLength={160}
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Optimal: 120-160 characters
                    </span>
                    <span className={`${
                      seoData?.metaDescription?.length >= 120 && seoData?.metaDescription?.length <= 160 
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {seoData?.metaDescription?.length}/160
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={seoData.keywords.join(', ')}
                    onChange={(e) => handleInputChange('keywords', e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
                    className="input-field"
                    placeholder="React, JavaScript, Web Developer, Portfolio"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Recommended: 5-10 keywords
                    </span>
                    <span className={`${seoData.keywords.length >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                      {seoData.keywords.length} keywords
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    value={seoData.canonicalUrl}
                    onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
                    className="input-field"
                    placeholder={`${window.location.origin}/${user?.username}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Robots Directive
                  </label>
                  <select
                    value={seoData.robotsDirective}
                    onChange={(e) => handleInputChange('robotsDirective', e.target.value)}
                    className="input-field"
                  >
                    <option value="index,follow">Index, Follow (Recommended)</option>
                    <option value="noindex,follow">No Index, Follow</option>
                    <option value="index,nofollow">Index, No Follow</option>
                    <option value="noindex,nofollow">No Index, No Follow</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'social' && (
          <motion.div
            key="social"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Open Graph Settings */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Open Graph (Facebook, LinkedIn)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    value={seoData.ogTitle}
                    onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                    className="input-field"
                    placeholder="Title for social media shares"
                    maxLength={60}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OG Description
                  </label>
                  <textarea
                    value={seoData.ogDescription}
                    onChange={(e) => handleInputChange('ogDescription', e.target.value)}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Description for social media shares..."
                    maxLength={160}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OG Image URL
                  </label>
                  <input
                    type="url"
                    value={seoData.ogImage}
                    onChange={(e) => handleInputChange('ogImage', e.target.value)}
                    className="input-field"
                    placeholder={user?.profileImgUrl || "https://example.com/image.jpg"}
                  />
                </div>
              </div>
            </div>

            {/* Twitter Settings */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Twitter Card Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter Card Type
                  </label>
                  <select
                    value={seoData.twitterCard}
                    onChange={(e) => handleInputChange('twitterCard', e.target.value)}
                    className="input-field"
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter Title
                  </label>
                  <input
                    type="text"
                    value={seoData.twitterTitle}
                    onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
                    className="input-field"
                    placeholder="Title for Twitter shares"
                    maxLength={70}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter Description
                  </label>
                  <textarea
                    value={seoData.twitterDescription}
                    onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Description for Twitter shares..."
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter Image URL
                  </label>
                  <input
                    type="url"
                    value={seoData.twitterImage}
                    onChange={(e) => handleInputChange('twitterImage', e.target.value)}
                    className="input-field"
                    placeholder={user?.profileImgUrl || "https://example.com/image.jpg"}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'advanced' && (
          <motion.div
            key="advanced1"

            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Structured Data */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Structured Data (Schema.org)
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={seoData.structuredData.jobTitle}
                      onChange={(e) => handleInputChange('structuredData', {
                        ...seoData.structuredData,
                        jobTitle: e.target.value
                      })}
                      className="input-field"
                      placeholder={user?.title || "Full Stack Developer"}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Works For
                    </label>
                    <input
                      type="text"
                      value={seoData.structuredData.worksFor}
                      onChange={(e) => handleInputChange('structuredData', {
                        ...seoData.structuredData,
                        worksFor: e.target.value
                      })}
                      className="input-field"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Same As (Social Media URLs)
                  </label>
                  <input
                    type="text"
                    value={seoData.structuredData.sameAs.join(', ')}
                    onChange={(e) => handleInputChange('structuredData', {
                      ...seoData.structuredData,
                      sameAs: e.target.value.split(',').map(url => url.trim()).filter(Boolean)
                    })}
                    className="input-field"
                    placeholder="https://github.com/username, https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Knows About (Skills/Expertise)
                  </label>
                  <input
                    type="text"
                    value={seoData.structuredData.knowsAbout.join(', ')}
                    onChange={(e) => handleInputChange('structuredData', {
                      ...seoData.structuredData,
                      knowsAbout: e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
                    })}
                    className="input-field"
                    placeholder={user?.skills?.join(', ') || "React, Node.js, JavaScript"}
                  />
                </div>
              </div>
            </div>

            {/* Custom Meta Tags */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Custom Meta Tags
              </h3>
              
              <div className="space-y-4">
                {seoData.customMetaTags.map((tag, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={tag.name}
                      onChange={(e) => {
                        const newTags = [...seoData.customMetaTags]
                        newTags[index] = { ...tag, name: e.target.value }
                        handleInputChange('customMetaTags', newTags)
                      }}
                      className="input-field"
                      placeholder="name/property"
                    />
                    <input
                      type="text"
                      value={tag.content}
                      onChange={(e) => {
                        const newTags = [...seoData.customMetaTags]
                        newTags[index] = { ...tag, content: e.target.value }
                        handleInputChange('customMetaTags', newTags)
                      }}
                      className="input-field"
                      placeholder="content"
                    />
                    <button
                      onClick={() => {
                        const newTags = seoData.customMetaTags.filter((_, i) => i !== index)
                        handleInputChange('customMetaTags', newTags)
                      }}
                      className="btn-secondary text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newTags = [...seoData.customMetaTags, { name: '', content: '', property: '' }]
                    handleInputChange('customMetaTags', newTags)
                  }}
                  className="btn-secondary text-sm"
                >
                  Add Custom Meta Tag
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                SEO Preview
              </h3>
              <button
                onClick={generatePreview}
                className="btn-secondary text-sm"
              >
                Generate Preview
              </button>
            </div>

            {/* Google Search Preview */}
            <div className="card p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Google Search Result</h4>
              <div className="border border-gray-300 dark:border-dark-600 rounded-lg p-4 bg-white dark:bg-dark-800">
                <h5 className="text-blue-600 text-lg hover:underline cursor-pointer">
                  {seoData.metaTitle || `${user?.fullName} - Portfolio`}
                </h5>
                <p className="text-green-700 text-sm">
                  {window.location.origin}/{user?.username}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {seoData.metaDescription || user?.tagLine || `Professional portfolio of ${user?.fullName}`}

                </p>
              </div>
            </div>

            {/* Social Media Previews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook Preview */}
              <div className="card p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Facebook/LinkedIn</h4>
                <div className="border border-gray-300 dark:border-dark-600 rounded-lg overflow-hidden">
                  {(seoData.ogImage || user?.profileImgUrl) && (
                    <img
                      src={seoData.ogImage || user?.profileImgUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-3 bg-gray-50 dark:bg-dark-700">
                    <h5 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {seoData.ogTitle || seoData.metaTitle || `${user?.fullName} - Portfolio`}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {seoData.ogDescription || seoData.metaDescription || user?.tagLine || 'Portfolio description...'}

                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {window.location.origin}/{user?.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Twitter Preview */}
              <div className="card p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Twitter</h4>
                <div className="border border-gray-300 dark:border-dark-600 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.fullName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Check out my portfolio!
                  </p>
                  <div className="border border-gray-200 dark:border-dark-600 rounded">
                    {(seoData.twitterImage || seoData.ogImage || user?.profileImgUrl) && seoData.twitterCard === 'summary_large_image' && (
                      <img
                        src={seoData.twitterImage || seoData.ogImage || user?.profileImgUrl}
                        alt="Preview"
                        className="w-full h-24 object-cover"
                      />
                    )}
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-900 dark:text-white">
                        {seoData.twitterTitle || seoData.ogTitle || seoData.metaTitle || `${user?.fullName} - Portfolio`}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {window.location.origin}/{user?.username}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'advanced' && (
          <motion.div
            key="advanced"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🚀 Advanced SEO Features
              </h3>
              <p className="text-purple-800 dark:text-purple-200">
                Advanced SEO features like structured data, custom meta tags, and detailed analytics will be available in the next update.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800"
      >
        <div className="flex items-center space-x-3 mb-3">
          <div className="text-2xl">💡</div>
          <h3 className="font-semibold text-green-900 dark:text-green-100">
            SEO Best Practices
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200">
          <ul className="space-y-1">
            <li>• Use your name and profession in the title</li>
            <li>• Write compelling meta descriptions</li>
            <li>• Include relevant keywords naturally</li>
            <li>• Add high-quality images with alt text</li>
          </ul>
          <ul className="space-y-1">
            <li>• Keep URLs clean and descriptive</li>
            <li>• Optimize for mobile devices</li>
            <li>• Use social media meta tags</li>
            <li>• Update content regularly</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default SEOManager