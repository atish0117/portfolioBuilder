import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const ExperienceManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    duration: '',
    responsibilities: '',
    skills: []
  });

  useEffect(() => {
    if (user?.experienceDetails) {
      setExperiences(user.experienceDetails);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim() || !formData.jobTitle.trim() || !formData.duration.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const experienceData = {
      ...formData,
      skills: typeof formData.skills === 'string'
        ? formData.skills.split(',').map(skill => skill.trim()).filter(Boolean)
        : formData.skills || []
    };

    const newExperiences = [...experiences];

    if (editingIndex !== null) {
      newExperiences[editingIndex] = experienceData;
    } else {
      newExperiences.push(experienceData);
    }

    try {
      await dispatch(updateProfile({ experienceDetails: newExperiences })).unwrap();
      setExperiences(newExperiences);
      toast.success(editingIndex !== null ? 'Experience updated!' : 'Experience added!');
      resetForm();
    } catch (error) {
      toast.error('Failed to save experience');
    }
  };

  const handleEdit = (index) => {
    const experience = experiences[index];
    setFormData({
      ...experience,
      skills: experience.skills || []
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    const newExperiences = experiences.filter((_, i) => i !== index);

    try {
      await dispatch(updateProfile({ experienceDetails: newExperiences })).unwrap();
      setExperiences(newExperiences);
      toast.success('Experience deleted!');
    } catch (error) {
      toast.error('Failed to delete experience');
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      jobTitle: '',
      duration: '',
      responsibilities: '',
      skills: []
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Work Experience
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Experience
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
              {editingIndex !== null ? 'Edit Experience' : 'Add Work Experience'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Jan 2020 - Present"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Responsibilities & Achievements
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills Used (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="React, Node.js, Project Management"
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
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

      <div className="space-y-4">
        <AnimatePresence>
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {experience.jobTitle}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                    {experience.companyName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {experience.duration}
                  </p>

                  {experience.responsibilities && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {experience.responsibilities}
                    </p>
                  )}

                  {experience.skills && experience.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <motion.button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 
                          2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 
                          7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 
                          1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {experiences.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Work Experience Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add your work experience to showcase your professional journey
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your First Experience
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ExperienceManager;
