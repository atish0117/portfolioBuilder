import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../store/slices/authSlice'
import FileUpload from '../components/ui/FileUpload'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import ProjectManager from '../components/dashboard/ProjectManager'
import SectionManager from '../components/dashboard/SectionManager'
import ExperienceManager from '../components/dashboard/ExperienceManager'
import EducationManager from '../components/dashboard/EducationManager'
import TestimonialsManager from '../components/dashboard/TestimonialsManager'
import CertificationsManager from '../components/dashboard/CertificationsManager'
import TemplateSelector from '../components/dashboard/TemplateSelector'
import ProfileManager from '../components/dashboard/ProfileManager'
import AnalyticsManager from '../components/dashboard/AnalyticsManager'
import SettingsManager from '../components/dashboard/SettingsManager'
import ThemeCustomizer from '../components/dashboard/ThemeCustomizer'
import SEOManager from '../components/dashboard/SEOManager'
import IntegrationsManager from '../components/dashboard/IntegrationsManager'
import QuickActions from '../components/ui/QuickActions'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth)
  const params = new URLSearchParams(location.search);
  const initialTab = params.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab)
  const [saving, setSaving] = useState(false)

  console.log(`user in dashboard:`, user)

  // const [profileData, setProfileData] = useState({
  //   fullName: user?.fullName || '',
  //   title: user?.title || '',
  //   tagLine: user?.tagLine || '',
  //   skills: user?.skills?.join(', ') || '',
  //   workExperience: user?.workExperience || 'Fresher',
  //   socialLinks: {
  //     github: user?.socialLinks?.github || '',
  //     linkedin: user?.socialLinks?.linkedin || '',
  //     twitter: user?.socialLinks?.twitter || '',
  //   },
  // })

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   if (name.startsWith('socialLinks.')) {
  //     const socialField = name.split('.')[1]
  //     setProfileData(prev => ({
  //       ...prev,
  //       socialLinks: {
  //         ...prev.socialLinks,
  //         [socialField]: value,
  //       },
  //     }))
  //   } else {
  //     setProfileData(prev => ({
  //       ...prev,
  //       [name]: value,
  //     }))
  //   }
  // }

  // const handleSaveProfile = async () => {
  //   setSaving(true)
  //   try {
  //     const updateData = {
  //       ...profileData,
  //       skills: profileData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
  //     }
  //     await dispatch(updateProfile(updateData)).unwrap()
  //     toast.success('Profile updated successfully!')
  //   } catch (error) {
  //     toast.error(error || 'Failed to update profile')
  //   } finally {
  //     setSaving(false)
  //   }
  // }

  // const handleFileUpload = async (fileUrl, type) => {
  //   try {
  //     const updateData = type === 'image'
  //       ? { profileImgUrl: fileUrl }
  //       : { resumeUrl: fileUrl }

  //     await dispatch(updateProfile(updateData)).unwrap()
  //     toast.success(`${type === 'image' ? 'Profile image' : 'Resume'} updated successfully!`)
  //   } catch (error) {
  //     toast.error(error || 'Failed to update file')
  //   }
  // }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤', description: 'Manage your basic information' },
    { id: 'projects', label: 'Projects', icon: '💼', description: 'Showcase your work' },
    { id: 'experience', label: 'Experience', icon: '💻', description: 'Add work experience' },
    { id: 'education', label: 'Education', icon: '🎓', description: 'Educational background' },
    { id: 'certifications', label: 'Certifications', icon: '🏆', description: 'Professional certifications' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Client reviews' },
    { id: 'sections', label: 'Sections', icon: '📋', description: 'Organize portfolio layout' },
    { id: 'templates', label: 'Templates', icon: '🎨', description: 'Choose design theme' },
    { id: 'theme', label: 'Theme', icon: '🌈', description: 'Customize colors & style' },
    { id: 'seo', label: 'SEO', icon: '🔍', description: 'Search engine optimization' },
    { id: 'integrations', label: 'Integrations', icon: '🔗', description: 'Connect external services' },
    { id: 'analytics', label: 'Analytics', icon: '📊', description: 'View portfolio stats' },
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'Account settings' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <SkeletonLoader className="h-96 col-span-1" />
            <SkeletonLoader className="h-96 col-span-3" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your portfolio and profile settings
          </p>
          {user?.username && (
            <div className="mt-3 flex items-center space-x-4">
              <p className="text-sm text-primary-600 dark:text-primary-400">
                Your portfolio: <span className="font-mono">/{user.username}</span>
              </p>
              <a
                href={`/${user.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                View Live →
              </a>
            </div>
          )}
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-4  gap-8">

          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeTab === tab.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                      }
                    `}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs opacity-70">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="lg:col-span-3"
          >

            <div className="card p-8 px-16">

              {activeTab === 'profile' && <ProfileManager />}
              {activeTab === 'projects' && <ProjectManager />}
              {activeTab === 'experience' && <ExperienceManager />}
              {activeTab === 'education' && <EducationManager />}
              {activeTab === 'certifications' && <CertificationsManager />}
              {activeTab === 'testimonials' && <TestimonialsManager />}
              {activeTab === 'sections' && <SectionManager />}
              {activeTab === 'templates' && <TemplateSelector />}
              {activeTab === 'theme' && <ThemeCustomizer />}
              {activeTab === 'seo' && <SEOManager />}
              {activeTab === 'integrations' && <IntegrationsManager />}
              {activeTab === 'analytics' && <AnalyticsManager />}
              {activeTab === 'settings' && <SettingsManager />}
            </div>
          </motion.div>
        </div>
      </div>

      <QuickActions />
    </motion.div>
  )
}

export default Dashboard
