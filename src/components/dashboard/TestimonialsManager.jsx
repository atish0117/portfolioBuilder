import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../store/slices/authSlice'
import toast from 'react-hot-toast'

const TestimonialsManager = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [testimonials, setTestimonials] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    message: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (user?.testimonials) {
      setTestimonials(user.testimonials)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error('Please fill in name and message')
      return
    }

    let newTestimonials = [...testimonials]

    if (editingIndex !== null) {
      newTestimonials[editingIndex] = formData
    } else {
      newTestimonials.push(formData)
    }

    try {
      await dispatch(updateProfile({ testimonials: newTestimonials })).unwrap()
      setTestimonials(newTestimonials)
      toast.success(editingIndex !== null ? 'Testimonial updated!' : 'Testimonial added!')
      resetForm()
    } catch (error) {
      toast.error('Failed to save testimonial')
    }
  }

  const handleEdit = (index) => {
    setFormData(testimonials[index])
    setEditingIndex(index)
    setShowForm(true)
  }

  const handleDelete = async (index) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    const newTestimonials = testimonials.filter((_, i) => i !== index)

    try {
      await dispatch(updateProfile({ testimonials: newTestimonials })).unwrap()
      setTestimonials(newTestimonials)
      toast.success('Testimonial deleted!')
    } catch (error) {
      toast.error('Failed to delete testimonial')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      message: '',
      imageUrl: ''
    })
    setEditingIndex(null)
    setShowForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Testimonials
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Testimonial
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
              {editingIndex !== null ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., CEO at Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Testimonial Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Write the testimonial message..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingIndex !== null ? 'Update Testimonial' : 'Add Testimonial'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    {testimonial.designation && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.designation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <blockquote className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.message}"
              </blockquote>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {testimonials.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Testimonials Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add testimonials from clients and colleagues to build credibility
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your First Testimonial
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default TestimonialsManager
