import React from 'react'
import { motion } from 'framer-motion'
import TagLineRender from '../../ui/TagLineRender' 


const MinimalTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const renderSection = (sectionId) => {
    const isVisible = visibleSections[sectionId]
    if (!isVisible) return null

    console.log(`Rendering section: ${sectionId}`)

    switch (sectionId) {
      case 'hero':
        return (
          <section className="py-20 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 text-center">
              {user.profileImgUrl ? (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={user.profileImgUrl}
                  alt={user.fullName}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-8 grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-4xl font-light mx-auto mb-8"
                >
                  {user.fullName.charAt(0)}
                </motion.div>
              )}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-light text-gray-900 dark:text-white mb-4 tracking-wide"
              >
                {user.fullName}
              </motion.h1>
              {user.title && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-light"
                >
                  {user.title}
                </motion.p>
              )}
              {user.tagLine && (
         
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
                >
                  <TagLineRender tagLine={user.tagLine}/> 

                </motion.p>
              )}
            </div>
          </section>
        )

      case 'skills':
        return user.skills?.length > 0 ? (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide"
              >
                Skills
              </motion.h2>
              <div className="flex flex-wrap justify-center gap-3">
                {user.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-light tracking-wide hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'projects':
        return projects?.length > 0 ? (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide"
              >
                Projects
              </motion.h2>
              <div className="space-y-12">
                {projects.map((project, index) => {
                  const imageUrl = project.images?.length
                    ? project.images.find((img) => img.isPrimary)?.url || project.images[0]?.url
                    : project.imageUrl

                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
                    >
                      {imageUrl && (
                        <motion.img
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          src={imageUrl}
                          alt={project.title}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      )}
                      <h3 className="text-xl font-light text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4 font-light">
                          {project.description}
                        </p>
                      )}
                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs text-gray-500 dark:text-gray-400 font-light tracking-wide"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.images?.length > 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                          {project.images.slice(1, 4).map((image, imgIndex) => (
                            <motion.img
                              key={image.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: imgIndex * 0.1 }}
                              src={image.url}
                              alt={image.caption || `${project.title} image ${imgIndex + 2}`}
                              className="w-full h-20 object-cover rounded"
                            />
                          ))}
                          {project.images.length > 4 && (
                            <div className="w-full h-20 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                              +{project.images.length - 4} more
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex space-x-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-light"
                          >
                            GitHub
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-light"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null

      case 'education':
        return user.education?.length > 0 ? (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide"
              >
                Education
              </motion.h2>
              <div className="space-y-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                  >
                    <h3 className="text-lg font-light text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.institution}</p>
                    {(edu.startYear || edu.endYear) && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {edu.startYear} {edu.startYear && edu.endYear && '-'} {edu.endYear}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'experience':
        return user.experienceDetails && user.experienceDetails.length > 0 ? (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide"
              >
                Experience
              </motion.h2>
              <div className="space-y-8">
                {user.experienceDetails.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                  >
                    <h3 className="text-lg font-light text-gray-900 dark:text-white mb-1">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {exp.companyName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                      {exp.duration}
                    </p>
                    {exp.responsibilities && (
                      <p className="text-gray-700 dark:text-gray-300 mb-3 font-light">
                        {exp.responsibilities}
                      </p>
                    )}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs text-gray-500 dark:text-gray-400 font-light tracking-wide"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'certifications':
        return user.certifications && user.certifications.length > 0 ? (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide"
              >
                Certifications
              </motion.h2>
              <div className="space-y-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                  >
                    <h3 className="text-lg font-light text-gray-900 dark:text-white mb-1">
                      {cert.title}
                    </h3>
                    {cert.platform && (
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {cert.platform}
                      </p>
                    )}
                    {cert.certificateLink && (
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-light"
                      >
                        View Certificate
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'testimonials':
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-center text-gray-900 dark:text-white mb-12 tracking-wide"
              >
                Testimonials
              </motion.h2>
              <div className="space-y-8">
                {user.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                  >
                    <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4 font-light">
                      "{testimonial.message}"
                    </blockquote>
                    <div className="flex items-center space-x-3">
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-light">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-light text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        {testimonial.designation && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'contact':
        return (
          <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-light text-gray-900 dark:text-white mb-8 tracking-wide"
              >
                Contact
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center space-x-6"
              >
                {user.socialLinks?.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-light"
                  >
                    GitHub
                  </a>
                )}
                {user.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-light"
                  >
                    LinkedIn
                  </a>
                )}
                <a
                  href={`mailto:${user.email}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-light"
                >
                  Email
                </a>
                {user.resumeUrl && (
                  <a
                    href={user.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-light"
                  >
                    Resume
                  </a>
                )}
              </motion.div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-light">
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}
    </div>
  )
}

export default MinimalTemplate
