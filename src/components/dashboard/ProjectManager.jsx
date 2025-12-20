import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { projectsAPI } from '../../services/api'
import FileUpload from '../ui/FileUpload'
import toast from 'react-hot-toast'

const ProjectManager = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    githubLink: '',
    liveLink: '',
    imageUrl: '',
    images: [],
    category: '',
    status: 'published',
    startDate: '',
    endDate: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getProjects()
      setProjects(response.data)
    } catch (error) {
      toast.error('Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error('Project title is required')
      return
    }

    try {
      const projectData = {
        ...formData,
        techStack: typeof formData.techStack === 'string' 
          ? formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean)
          : formData.techStack,
        imageUrl: formData.images?.find(img => img.isPrimary)?.url || formData.images?.[0]?.url || formData.imageUrl
      }

      if (editingProject?._id) {
        await projectsAPI.updateProject(editingProject._id, projectData)
        toast.success('Project updated successfully!')
      } else {
        await projectsAPI.createProject(projectData)
        toast.success('Project created successfully!')
      }

      fetchProjects()
      resetForm()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save project')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      techStack: project.techStack || []
    })
    setShowForm(true)
  }

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return

    try {
      await projectsAPI.deleteProject(projectId)
      toast.success('Project deleted successfully!')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      techStack: [],
      githubLink: '',
      liveLink: '',
      imageUrl: '',
      images: [],
      category: '',
      status: 'published',
      startDate: '',
      endDate: ''
    })
    setEditingProject(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (imageUrl) => {
    const newImage = {
      id: Date.now().toString(),
      url: imageUrl,
      isPrimary: !formData.images || formData.images.length === 0
    }

    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), newImage],
      imageUrl: newImage.isPrimary ? imageUrl : prev.imageUrl
    }))

    toast.success('Project image added!')
  }

  const handleRemoveImage = (imageId) => {
    setFormData(prev => {
      const newImages = prev.images?.filter(img => img.id !== imageId) || []

      if (newImages.length > 0 && !newImages.some(img => img.isPrimary)) {
        newImages[0].isPrimary = true
      }

      return {
        ...prev,
        images: newImages,
        imageUrl: newImages.find(img => img.isPrimary)?.url || newImages[0]?.url || ''
      }
    })

    toast.success('Image removed!')
  }

  const handleSetPrimaryImage = (imageId) => {
    setFormData(prev => {
      const newImages = prev.images?.map(img => ({
        ...img,
        isPrimary: img.id === imageId
      })) || []

      const primaryImage = newImages.find(img => img.isPrimary)

      return {
        ...prev,
        images: newImages,
        imageUrl: primaryImage?.url || ''
      }
    })

    toast.success('Primary image updated!')
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-dark-700 h-32 rounded-lg" />
        ))}
      </div>
    )
  }
   return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Project
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select Category</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="design">Design</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  name="techStack"
                  value={Array.isArray(formData.techStack) ? formData.techStack.join(', ') : formData.techStack}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub Link
                  </label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>

              {/* Project Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Images
                </label>
                <FileUpload
                  type="project"
                  onUpload={handleImageUpload}
                  multiple={true}
                />
                
                {/* Display uploaded images */}
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.caption || 'Project image'}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        
                        {image.isPrimary && (
                          <div className="absolute top-1 left-1 bg-primary-500 text-white px-1 py-0.5 rounded text-xs">
                            Primary
                          </div>
                        )}
                        
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          {!image.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(image.id)}
                              className="p-1 bg-blue-500 text-white rounded text-xs"
                              title="Set as primary"
                            >
                              ⭐
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image.id)}
                            className="p-1 bg-red-500 text-white rounded text-xs"
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Display primary image or first image */}
              {((project.images && project.images.length > 0) ? 
                (project.images.find(img => img.isPrimary)?.url || project.images[0]?.url) : 
                project.imageUrl) && (
                <img
                  src={(project.images && project.images.length > 0) ? 
                    (project.images.find(img => img.isPrimary)?.url || project.images[0]?.url) : 
                    project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {project.category && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                        {project.category}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'featured' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                      project.status === 'published' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                {project.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                )}
                
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    📅 {project.startDate} {project.startDate && project.endDate && '→'} {project.endDate || 'Present'}
                  </div>
                )}
                
                {/* Show image count if multiple images */}
                {project.images && project.images.length > 1 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    🖼️ {project.images.length} images
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={() => project._id && handleDelete(project._id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Projects Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start building your portfolio by adding your first project
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your First Project
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default ProjectManager
