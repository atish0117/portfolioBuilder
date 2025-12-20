import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminAPI } from '../../services/api'
import ConfirmDialog from '../ui/ConfirmDialog'
import toast from 'react-hot-toast'



const TemplateManagement = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    category: 'minimal',
    previewImage: '',
    features: '',
    isActive: true,
    isPremium: false
  })

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      const response = await adminAPI.getTemplates()
      setTemplates(response.data.templates)
    } catch (error) {
      toast.error('Failed to load templates')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.id || !formData.name || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const templateData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
      }

      if (editingTemplate) {
        await adminAPI.updateTemplate(editingTemplate._id, templateData)
        toast.success('Template updated successfully!')
      } else {
        await adminAPI.createTemplate(templateData)
        toast.success('Template created successfully!')
      }

      loadTemplates()
      resetForm()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save template')
    }
  }

  const handleEdit = (template) => {
    setEditingTemplate(template)
    setFormData({
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category,
      previewImage: template.previewImage,
      features: template.features.join(', '),
      isActive: template.isActive,
      isPremium: template.isPremium
    })
    setShowForm(true)
  }

  const handleDelete = async (templateId) => {
    try {
      await adminAPI.deleteTemplate(templateId)
      toast.success('Template deleted successfully!')
      loadTemplates()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete template')
    }
  }

  const handleToggleStatus = async (templateId, isActive) => {
    try {
      await adminAPI.updateTemplate(templateId, { isActive })
      toast.success(`Template ${isActive ? 'enabled' : 'disabled'} successfully!`)
      loadTemplates()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update template status')
    }
  }

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      category: 'minimal',
      previewImage: '',
      features: '',
      isActive: true,
      isPremium: false
    })
    setEditingTemplate(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }))
  }

  const openConfirmDialog = (action) => {
    setConfirmAction(action)
    setShowConfirmDialog(true)
  }

  const handleConfirmAction = async () => {
    if (!confirmAction) return

    try {
      if (confirmAction.type === 'delete') {
        await handleDelete(confirmAction.templateId)
      }
    } catch (error) {
      // Error handling is done in individual functions
    } finally {
      setShowConfirmDialog(false)
      setConfirmAction(null)
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'minimal': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'
      case 'modern': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
      case 'creative': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300'
      case 'professional': return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
      case 'developer': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      case 'designer': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Template Management
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Template
        </motion.button>
      </div>

      {/* Template Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingTemplate ? 'Edit Template' : 'Add New Template'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template ID *
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., modern-pro"
                    required
                    disabled={!!editingTemplate}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Modern Professional"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Describe the template style and features..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="minimal">Minimal</option>
                    <option value="modern">Modern</option>
                    <option value="creative">Creative</option>
                    <option value="professional">Professional</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preview Image URL *
                  </label>
                  <input
                    type="url"
                    name="previewImage"
                    value={formData.previewImage}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://example.com/preview.jpg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Responsive Design, Dark Mode, Animations"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={formData.isPremium}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Premium</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {templates.map((template, index) => (
            <motion.div
              key={template._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`card overflow-hidden ${
                template.isActive ? 'border-green-200 dark:border-green-800' : 'border-gray-300 dark:border-gray-600 opacity-75'
              }`}
            >
              {/* Preview Image */}
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                {template.previewImage ? (
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex space-x-2">
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                  {template.isPremium && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-xs font-medium">
                      Premium
                    </span>
                  )}
                </div>
                
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleToggleStatus(template._id, !template.isActive)}
                    className={`w-6 h-6 rounded-full ${
                      template.isActive ? 'bg-green-500' : 'bg-gray-400'
                    } flex items-center justify-center`}
                    title={template.isActive ? 'Disable Template' : 'Enable Template'}
                  >
                    {template.isActive ? '✓' : '✕'}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {template.rating.toFixed(1)} ({template.ratingCount})
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {template.description}
                </p>
                
                {/* Features */}
                {template.features.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {template.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{template.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>{template.usageCount} users</span>
                  <span>Created {new Date(template.createdAt).toLocaleDateString()}</span>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => handleEdit(template)}
                    className="flex-1 btn-secondary text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => openConfirmDialog({
                      type: 'delete',
                      templateId: template._id,
                      templateName: template.name
                    })}
                    className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {templates.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Templates Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first template to get started
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create First Template
          </motion.button>
        </motion.div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={
          confirmAction?.type === 'delete' ? 'Delete Template' : 'Confirm Action'
        }
        message={
          confirmAction?.type === 'delete' 
            ? `Are you sure you want to delete the template "${confirmAction.templateName}"? This action cannot be undone.`
            : 'Are you sure you want to perform this action?'
        }
        confirmText={confirmAction?.type === 'delete' ? 'Delete' : 'Confirm'}
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setShowConfirmDialog(false)
          setConfirmAction(null)
        }}
        type={confirmAction?.type === 'delete' ? 'danger' : 'warning'}
      />
    </div>
  )
}

export default TemplateManagement