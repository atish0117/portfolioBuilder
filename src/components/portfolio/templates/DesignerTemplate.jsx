import React from 'react'
import { motion } from 'framer-motion'
import TagLineRender from '../../ui/TagLineRender'


const DesignerTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null

    switch (sectionId) {
      case 'hero':
        return (
          <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20"></div>
              <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-rose-400/20 to-purple-400/20 rounded-full blur-3xl animate-bounce-slow"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                  className="mb-12"
                >
                  {user.profileImgUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-64 h-64 rounded-full object-cover mx-auto border-8 border-white/20 shadow-2xl"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 flex items-center justify-center text-white text-6xl font-bold mx-auto border-8 border-white/20 shadow-2xl">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 mb-6"
                  style={{ fontFamily: 'serif' }}
                >
                  {user.fullName}
                </motion.h1>
                
                {user.title && (
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-3xl text-white/90 mb-8 font-light italic"
                  >
                    {user.title}
                  </motion.p>
                )}
                
                {user.tagLine && (

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
                  >
                  <TagLineRender tagLine={user.tagLine}/> 

                  </motion.p>
                )}
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="mt-12"
                >
                  <div className="inline-block p-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-8 py-4">
                      <span className="text-white font-light text-lg">Scroll to explore my work</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-16"
                style={{ fontFamily: 'serif' }}
              >
                Creative Arsenal
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center group-hover:border-white/20 transition-all duration-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{skill}</h3>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-16"
                style={{ fontFamily: 'serif' }}
              >
                Portfolio Gallery
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
                      {project.imageUrl ? (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      ) : (
                        <div className="h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <span className="text-6xl">🎨</span>
                        </div>
                      )}
                      
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                          {project.title}
                        </h3>
                        
                        {project.description && (
                          <p className="text-gray-300 mb-6 leading-relaxed">
                            {project.description}
                          </p>
                        )}
                        
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech, techIndex) => (
                              <span
                                key={tech}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  techIndex % 3 === 0 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                  techIndex % 3 === 1 ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex space-x-4">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-medium"
                            >
                              View Code
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
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
          <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>
            
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-8"
                style={{ fontFamily: 'serif' }}
              >
                Let's Create Together
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-white/90 mb-12 font-light italic"
              >
                Ready to bring your vision to life?
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center space-x-6"
              >
                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                  </motion.a>
                )}
                
                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </motion.a>
                )}
                
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    Start a Project
                  </div>
                </motion.a>
              </motion.div>
            </div>
          </section>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}
    </div>
  )
}

export default DesignerTemplate