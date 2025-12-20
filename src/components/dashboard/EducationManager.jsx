import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const EducationManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [educations, setEducations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    startYear: '',
    endYear: '',
  });

  useEffect(() => {
    if (user?.education) {
      setEducations(user.education);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.institution.trim() || !formData.degree.trim()) {
      toast.error('Please fill in institution and degree');
      return;
    }

    const newEducations = [...educations];

    if (editingIndex !== null) {
      newEducations[editingIndex] = formData;
    } else {
      newEducations.push(formData);
    }

    try {
      await dispatch(updateProfile({ education: newEducations })).unwrap();
      setEducations(newEducations);
      toast.success(editingIndex !== null ? 'Education updated!' : 'Education added!');
      resetForm();
    } catch (error) {
      toast.error('Failed to save education');
    }
  };

  const handleEdit = (index) => {
    setFormData(educations[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;

    const newEducations = educations.filter((_, i) => i !== index);

    try {
      await dispatch(updateProfile({ education: newEducations })).unwrap();
      setEducations(newEducations);
      toast.success('Education deleted!');
    } catch (error) {
      toast.error('Failed to delete education');
    }
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      startYear: '',
      endYear: '',
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Education
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Education
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
              {editingIndex !== null ? 'Edit Education' : 'Add Education'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Institution *
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="University/College name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Degree *
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Bachelor of Computer Science"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Year
                  </label>
                  <input
                    type="text"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="2020"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Year
                  </label>
                  <input
                    type="text"
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="2024 or Present"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingIndex !== null ? 'Update Education' : 'Add Education'}
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
          {educations.map((education, index) => (
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
                    {education.degree}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                    {education.institution}
                  </p>
                  {(education.startYear || education.endYear) && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {education.startYear} {education.startYear && education.endYear && '- '} {education.endYear}
                    </p>
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(index)}
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {educations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Education Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add your educational background to complete your portfolio
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your Education
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default EducationManager;
