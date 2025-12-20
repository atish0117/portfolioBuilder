import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../store/slices/authSlice'
import FileUpload from '../ui/FileUpload'
import toast from 'react-hot-toast'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import DOMPurify from 'dompurify'

const ProfileManager = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState('basic')

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    title: user?.title || '',

    tagLine: user?.tagLine || '',
    
    skills: user?.skills?.join(', ') || '',
    workExperience: user?.workExperience || 'Fresher',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '', 
    intro: user?.intro || '',
    email: user?.email || '',
    availability: user?.availability || 'available',
    hourlyRate: user?.hourlyRate || '',
    preferredWorkType: user?.preferredWorkType || 'remote',
    languages: user?.languages?.join(', ') || '',
    timezone: user?.timezone || '',

    socialLinks: {
      github: user?.socialLinks?.github || '',
      linkedin: user?.socialLinks?.linkedin || '',
      twitter: user?.socialLinks?.twitter || '',

      instagram: user?.socialLinks?.instagram || '',
      dribbble: user?.socialLinks?.dribbble || '',
      behance: user?.socialLinks?.behance || '',
      website: user?.socialLinks?.website || '',
    },
    aboutSections: user?.aboutSections || [{ id: Date.now(), title: '', description: '' }],

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('socialLinks.')) {
      const socialField = name.split('.')[1]
      setProfileData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }))
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

        // Handler for the about sections array
  const handleAboutSectionChange = (index, field, value) => {
    const updatedSections = [...profileData.aboutSections]
    updatedSections[index][field] = value
    setProfileData(prev => ({ ...prev, aboutSections: updatedSections }))
  }

  // Function to add a new empty section
  const addAboutSection = () => {
    setProfileData(prev => ({
      ...prev,
      aboutSections: [...prev.aboutSections, { id: Date.now(), title: '', description: '' }]
    }))
  }

      // Function to remove a section by its index
  const removeAboutSection = (index) => {
    if (profileData.aboutSections.length <= 1) {
      toast.error("You must have at least one section.")
      return
    }
    const updatedSections = profileData.aboutSections.filter((_, i) => i !== index)
    setProfileData(prev => ({ ...prev, aboutSections: updatedSections }))
  }


    const getCleanTextLength = (html) => {
    const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] })
    return clean.trim().length
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const updateData = {
        ...profileData,
        skills: profileData.skills.split(',').map(skill => skill.trim()).filter(Boolean),

        languages: profileData.languages.split(',').map(lang => lang.trim()).filter(Boolean),
        aboutSections: profileData.aboutSections.filter(section => section.title.trim() !== '' || getCleanTextLength(section.description) > 0),

      }

      await dispatch(updateProfile(updateData)).unwrap()
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error(error || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (fileUrl, type) => {
    try {
      const updateData = type === 'image'
        ? { profileImgUrl: fileUrl }
        : { resumeUrl: fileUrl }

      await dispatch(updateProfile(updateData)).unwrap()
      toast.success(`${type === 'image' ? 'Profile image' : 'Resume'} updated successfully!`)
    } catch (error) {
      toast.error(error || 'Failed to update file')
    }
  }

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: '👤' },
    { id: 'about', label: 'About Me', icon: '📝' },
    { id: 'social', label: 'Social Links', icon: '🔗' },
     { id: 'contact', label: 'Contact', icon: '📞' },

    { id: 'files', label: 'Files', icon: '📁' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Profile Management
        </h2>
        <motion.button
          onClick={handleSaveProfile}
          disabled={saving}
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>

   {/* Section Navigation */}
<div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
  {sections.map((section) => (
    <button
      key={section.id}
      onClick={() => setActiveSection(section.id)}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${activeSection === section.id
          ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }
      `}
    >
      {/* Icon always visible */}
      <span>{section.icon}</span>

      {/* Label hidden on small, visible on md+ */}
      <span className="hidden md:inline">{section.label}</span>
    </button>
  ))}
</div>



      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'basic' && (
          <motion.div
            key="basic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={profileData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Full Stack Developer"
                  className="input-field"
                />
              </div>
            </div>

            <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          tagLine
        </label>
        <SunEditor
          defaultValue={profileData.tagLine}
          onChange={(content) =>
            setProfileData(prev => ({ ...prev, tagLine: content }))

          }
          setOptions={{
            height: 200,
            buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock' ,'lineHeight'  ],
              [  'paragraphStyle','textStyle'],
              [  'outdent','indent'],
              [  'removeFormat'],
              ['bold', 'italic', 'underline', 'strike'],
              ['fontColor', 'hiliteColor'],
              ['align', 'list','horizontalRule'],
              ['link',],
              ['fullScreen', 'codeView'],
            ],
          }}
          placeholder="e.g., Passionate developer who loves creating amazing user experiences"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {getCleanTextLength(profileData.tagLine)}/500 characters

        </p>
      </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={profileData.skills}
                onChange={handleInputChange}
                placeholder="React, Node.js, Python, etc."
                className="input-field"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate skills with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Level
              </label>
              <select
                name="workExperience"
                value={profileData.workExperience}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="Fresher">Fresher (0 years)</option>
                <option value="1-2 years">Junior (1-2 years)</option>
                <option value="3-5 years">Mid-level (3-5 years)</option>
                <option value="5+ years">Senior (5+ years)</option>
                <option value="10+ years">Expert (10+ years)</option>
              </select>
            </div>
          </motion.div>
        )}

        {activeSection === 'about' && (
            <motion.div
            key="about"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Introduction
  </label>

  <textarea
    name="intro"
    value={profileData.intro}
    onChange={handleInputChange}
    placeholder="Tell us about yourself..."
    maxLength={500}
    className="
      w-full
      p-2
      text-sm
      border
      rounded-md
      resize
      overflow-auto
      focus:ring-2 focus:ring-blue-500
      dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
    "
    rows={5}   // default height
  />

  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
    {profileData.intro.length}/500 characters
  </p>
</div>


              {profileData.aboutSections.map((section, index) => (
              <div key={section.id} className="card p-6 relative">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Section Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={section.title}
                      onChange={(e) => handleAboutSectionChange(index, 'title', e.target.value)}
                      className="input-field"
                      placeholder="e.g., My Journey,What I Can Do"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content
                    </label>
                    <SunEditor
                      defaultValue={section.description}
                      onChange={(description) => handleAboutSectionChange(index, 'description', description)}
                      setOptions={{
                        height: 200,
buttonList: [
              ['undo', 'redo'],
              ['font', 'fontSize', 'formatBlock' ,'lineHeight'  ],
              [  'paragraphStyle','textStyle'],
              [  'outdent','indent'],
              [  'removeFormat'],
              ['bold', 'italic', 'underline', 'strike'],
              ['fontColor', 'hiliteColor'],
              ['align', 'list','horizontalRule'],
              ['link',],
              ['fullScreen', 'codeView'],
            ],                      }}
                      placeholder="Tell a story about this section..."
                    />
                  </div>
                </div>
                {profileData.aboutSections.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAboutSection(index)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                    title="Remove Section"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={addAboutSection}
                className="btn-secondary"
              >
                + What I Can Do
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Availability
                </label>
                <select
                  name="availability"
                  value={profileData.availability}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="available">Available for work</option>
                  <option value="busy">Busy</option>
                  <option value="not-available">Not available</option>
                  <option value="currently-working">currently Working</option>
                </select>
              </div>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hourly Rate (Optional)
                </label>
                <input
                  type="text"
                  name="hourlyRate"
                  value={profileData.hourlyRate}
                  onChange={handleInputChange}
                  placeholder="e.g., $50/hour"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Work Type
                </label>
                <select
                  name="preferredWorkType"
                  value={profileData.preferredWorkType}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
                </div>

                  <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Languages (comma-separated)
              </label>
              <input
                type="text"
                name="languages"
                value={profileData.languages}
                onChange={handleInputChange}
                placeholder="English, Spanish, French"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone
              </label>
              <input
                type="text"
                name="timezone"
                value={profileData.timezone}
                onChange={handleInputChange}
                placeholder="e.g., UTC+5:30, EST, PST"
                className="input-field"
              />
            </div>


          </motion.div>
        )}

          {activeSection === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>Phone Number</span>
                  </span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91 9999999999"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>Location</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  placeholder="Bangalore"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span> @ </span>
                    <span>Email</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="input-field"
                  readOnly
                />
              </div>
            </div>
          </motion.div>
        )}


        {activeSection === 'social' && (
          <motion.div
            key="social"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>🐙</span>
                    <span>GitHub</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.github"
                  value={profileData.socialLinks.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={profileData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>🐦</span>
                    <span>Twitter</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={profileData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/username"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>📷</span>
                    <span>Instagram</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={profileData.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/username"
                  className="input-field"
                />
              </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>🏀</span>
                    <span>Dribbble</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.dribbble"
                  value={profileData.socialLinks.dribbble}
                  onChange={handleInputChange}
                  placeholder="https://dribbble.com/username"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>🎨</span>
                    <span>Behance</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.behance"
                  value={profileData.socialLinks.behance}
                  onChange={handleInputChange}
                  placeholder="https://behance.net/username"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>🌐</span>
                    <span>Personal Website</span>
                  </span>
                </label>
                <input
                  type="url"
                  name="socialLinks.website"
                  value={profileData.socialLinks.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  className="input-field"
                />
              </div>


            </div>

            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Pro Tips for Social Links
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• GitHub: Showcase your code and contributions</li>
                <li>• LinkedIn: Professional networking and credibility</li>
                <li>• Instagram: Personal brand and behind-the-scenes content</li>
                <li>• Dribbble/Behance: Design portfolio and creative work</li>
                <li>• Twitter can show your industry engagement and thought leadership</li>
                <li>• Personal Website: Your main online presence</li>

                <li>• Make sure your profiles are public and professional</li>
              </ul>
            </div>
          </motion.div>
        )}

        {activeSection === 'files' && (
          <motion.div
            key="files"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Profile Image
                </h3>
                <FileUpload
                  type="image"
                  onUpload={(url) => handleFileUpload(url, 'image')}
                  currentFile={user?.profileImgUrl}
                />
                {user?.profileImgUrl && (
                  <div className="mt-4">
                    <img
                      src={user.profileImgUrl}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Resume/CV
                </h3>
                <FileUpload
                  type="resume"
                  onUpload={(url) => handleFileUpload(url, 'resume')}
                  currentFile={user?.resumeUrl}
                />
                {user?.resumeUrl && (
                  <div className="mt-4">
                    <a
                      href={user.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>View Resume</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="card p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                📋 File Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200">
                <div>
                  <h4 className="font-medium mb-1">Profile Image:</h4>
                  <ul className="space-y-1">
                    <li>• Use a professional headshot</li>
                    <li>• Square aspect ratio works best</li>
                    <li>• High resolution (at least 400x400px)</li>
                    <li>• Formats: JPG, PNG, WebP</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Resume:</h4>
                  <ul className="space-y-1">
                    <li>• PDF format only</li>
                    <li>• Keep file size under 5MB</li>
                    <li>• Use a clear, readable font</li>
                    <li>• Include contact information</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileManager
