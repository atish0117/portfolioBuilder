import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

const CertificationsManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [certifications, setCertifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    certificateLink: ''
  });

  // Load certifications from user profile
  useEffect(() => {
    if (user?.certifications) {
      setCertifications(user.certifications);
    }
  }, [user]);

  // ===== Handlers =====
  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter certification title');
      return;
    }

    const newCertifications = [...certifications];
    if (editingIndex !== null) {
      newCertifications[editingIndex] = formData;
    } else {
      newCertifications.push(formData);
    }

    try {
      await dispatch(updateProfile({ certifications: newCertifications })).unwrap();
      setCertifications(newCertifications);
      toast.success(editingIndex !== null ? 'Certification updated!' : 'Certification added!');
      resetForm();
    } catch (err) {
      toast.error('Failed to save certification');
    }
  };

  const handleEdit = index => {
    setFormData(certifications[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = async index => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;

    const newCertifications = certifications.filter((_, i) => i !== index);

    try {
      await dispatch(updateProfile({ certifications: newCertifications })).unwrap();
      setCertifications(newCertifications);
      toast.success('Certification deleted!');
    } catch (err) {
      toast.error('Failed to delete certification');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', platform: '', certificateLink: '' });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ===== Render =====
  return (
    <div className="space-y-6">
      {/* Header + Add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Certifications
        </h2>
        <motion.button
          onClick={() => setShowForm(true)}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Certification
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingIndex !== null ? 'Edit Certification' : 'Add Certification'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certification Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Platform/Organization
                </label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., Amazon Web Services, Coursera, Udemy"
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Certificate Link
                </label>
                <input
                  type="url"
                  name="certificateLink"
                  value={formData.certificateLink}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://certificate-url.com"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingIndex !== null ? 'Update Certification' : 'Add Certification'}
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

      {/* Certification cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">🏆</div>
                <div className="flex space-x-2">
                  {/* Edit */}
                  <motion.button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </motion.button>
                  {/* Delete */}
                  <motion.button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {cert.title}
              </h3>

              {cert.platform && (
                <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                  {cert.platform}
                </p>
              )}

              {cert.certificateLink && (
                <a
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>View Certificate</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {certifications.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Certifications Added
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Showcase your professional certifications and achievements
          </p>
          <motion.button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Your First Certification
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default CertificationsManager;
