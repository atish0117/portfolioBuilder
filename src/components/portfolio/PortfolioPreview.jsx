import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const PortfolioPreview = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) return null

  const sectionOrder = user.sectionOrder || [
    'hero',
    'skills',
    'projects',
    'education',
    'experience',
    'certifications',
    'testimonials',
    'contact'
  ]
  const visibleSections = user.visibleSections
    ? Object.fromEntries(user.visibleSections)
    : {}

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null

    switch (sectionId) {
      case 'hero':
        return (
          <section className="py-20 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-dark-900 dark:to-purple-900/20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              {user.profileImgUrl ? (
                <img
                  src={user.profileImgUrl}
                  alt={user.fullName}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-lg">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {user.fullName}
              </h1>
              {user.title && (
                <p className="text-xl text-primary-600 dark:text-primary-400 mb-4">
                  {user.title}
                </p>
              )}

              {user.tagLine && (
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {user.tagLine}

                </p>
              )}
            </div>
          </section>
        )

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-16 bg-white dark:bg-dark-800">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Skills & Technologies
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'experience':
        return user.experienceDetails && user.experienceDetails.length > 0 ? (
          <section className="py-16 bg-gray-50 dark:bg-dark-900">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Work Experience
              </h2>
              <div className="space-y-8">
                {user.experienceDetails.map((exp, index) => (
                  <div key={index} className="card p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                      {exp.companyName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {exp.duration}
                    </p>
                    {exp.responsibilities && (
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {exp.responsibilities}
                      </p>
                    )}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'education':
        return user.education && user.education.length > 0 ? (
          <section className="py-16 bg-white dark:bg-dark-800">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Education
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.education.map((edu, index) => (
                  <div key={index} className="card p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
                      {edu.institution}
                    </p>
                    {(edu.startYear || edu.endYear) && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {edu.startYear} {edu.startYear && edu.endYear && '- '} {edu.endYear}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'contact':
        return (
          <section className="py-16 bg-gray-50 dark:bg-dark-900">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Let's Work Together
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Interested in collaborating? Feel free to reach out!
              </p>
              <div className="flex justify-center space-x-4">
                {user.socialLinks?.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {user.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                <a
                  href={`mailto:${user.email}`}
                  className="btn-primary"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-dark-900"
    >
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}
    </motion.div>
  )
}

export default PortfolioPreview
