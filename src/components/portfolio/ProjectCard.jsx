import React from 'react'
import { motion } from 'framer-motion'
// import ImageGallery from '../ui/ImageGallery'


const ProjectCard = ({ project, template = 'minimal', index = 0 }) => {
  // // Get primary image or first image or fallback to imageUrl
  // const primaryImage = project.images?.find(img => img.isPrimary)?.url || 
  //                     project.images?.[0]?.url || 
  //                     project.imageUrl

  // // Get all project images for gallery
  // const allImages = project.images || (project.imageUrl ? [{
  //   id: 'main',
  //   url: project.imageUrl,
  //   isPrimary: true
  // }] : [])

  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          card: 'bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden',
          title: 'text-xl font-bold text-gray-900',
          description: 'text-gray-600',
          tech: 'px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium',
          links: 'text-blue-600 hover:text-purple-600 font-medium'
        }
      case 'creative':
        return {
          card: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden',
          title: 'text-2xl font-bold text-white',
          description: 'text-white/80',
          tech: 'px-3 py-1 rounded-full text-sm font-bold text-white bg-pink-500/50',
          links: 'px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 font-bold'
        }
      case 'professional':
        return {
          card: 'bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden',
          title: 'text-2xl font-bold text-slate-900',
          description: 'text-slate-600',
          tech: 'px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium border border-slate-200',
          links: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
        }
      case 'developer':
        return {
          card: 'bg-gray-800 border border-gray-700 rounded-lg hover:border-green-400 overflow-hidden',
          title: 'text-xl font-bold text-white font-mono',
          description: 'text-gray-300',
          tech: 'px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-mono border border-gray-600',
          links: 'text-green-400 hover:text-green-300 font-mono'
        }
      case 'designer':
        return {
          card: 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden',
          title: 'text-2xl font-bold text-white',
          description: 'text-gray-300',
          tech: 'px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium',
          links: 'px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium'
        }
      default: // minimal
        return {
          card: 'border-b border-gray-200 dark:border-gray-700 pb-8 mb-8',
          title: 'text-xl font-light text-gray-900 dark:text-white',
          description: 'text-gray-600 dark:text-gray-400 font-light',
          tech: 'text-xs text-gray-500 dark:text-gray-400 font-light',
          links: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-light'
        }
    }
  }

  const styles = getTemplateStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${styles.card} transition-all duration-300`}
    >
      {/* Project Image */}
      {primaryImage && (
        <div className="relative">
          <img
            src={primaryImage}
            alt={project.title}
            className={`w-full object-cover ${
              template === 'minimal' ? 'h-64 rounded-lg mb-6' :
              template === 'modern' ? 'h-48 group-hover:scale-110 transition-transform duration-300' :
              template === 'creative' ? 'h-48 rounded-2xl' :
              template === 'professional' ? 'h-64 lg:h-full' :
              template === 'developer' ? 'h-48' :
              'h-64' // designer
            }`}
          />
          
          {/* Image Count Indicator */}
          {allImages.length > 1 && (
            <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
              template === 'creative' || template === 'designer' ? 'bg-black/50 text-white' :
              template === 'developer' ? 'bg-gray-900/80 border border-green-400 text-green-400' :
              'bg-black/70 text-white'
            }`}>
              📸 {allImages.length}
            </div>
          )}
        </div>
      )}

      {/* Project Content */}
      <div className={template === 'professional' && primaryImage ? 'p-8' : template !== 'minimal' ? 'p-6' : ''}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={styles.title}>
            {project.title}
          </h3>
          {project.category && template !== 'minimal' && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              template === 'modern' ? 'bg-blue-100 text-blue-700' :
              template === 'creative' ? 'bg-white/20 text-white' :
              template === 'professional' ? 'bg-blue-100 text-blue-800' :
              template === 'developer' ? 'bg-gray-700 text-green-400' :
              'bg-purple-500/20 text-purple-300' // designer
            }`}>
              {project.category}
            </span>
          )}
        </div>

        {project.description && (
          <p className={`${styles.description} mb-4 ${template === 'minimal' ? '' : 'line-clamp-3'}`}>
            {project.description}
          </p>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className={`flex flex-wrap gap-2 mb-4 ${template === 'minimal' ? 'mb-3' : ''}`}>
            {project.techStack.map((tech) => (
              <span key={tech} className={styles.tech}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Project Timeline */}
        {(project.startDate || project.endDate) && template !== 'minimal' && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            📅 {project.startDate} {project.startDate && project.endDate && '→'} {project.endDate || 'Present'}
          </div>
        )}

        {/* Image Gallery Preview for Minimal Template */}
        {allImages.length > 1 && template === 'minimal' && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {allImages.slice(1, 4).map((image, imgIndex) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.caption || `${project.title} image ${imgIndex + 2}`}
                className="w-full h-20 object-cover rounded"
              />
            ))}
            {allImages.length > 4 && (
              <div className="w-full h-20 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                +{allImages.length - 4} more
              </div>
            )}
          </div>
        )}

        {/* Project Links */}
        <div className={`flex space-x-4 ${template === 'professional' ? 'mt-6' : ''}`}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.links} transition-colors ${
                template === 'minimal' ? 'text-sm' :
                template === 'developer' ? 'flex items-center space-x-2' :
                ''
              }`}
            >
              {template === 'developer' ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Source</span>
                </>
              ) : (
                template === 'minimal' ? 'GitHub' : 
                template === 'modern' ? 'GitHub →' :
                template === 'creative' ? 'Code' :
                template === 'professional' ? 'View Code' :
                'View Code'
              )}
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.links} transition-colors ${
                template === 'minimal' ? 'text-sm' :
                template === 'developer' ? 'flex items-center space-x-2' :
                ''
              }`}
            >
              {template === 'developer' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Demo</span>
                </>
              ) : (
                template === 'minimal' ? 'Live Demo' :
                template === 'modern' ? 'Live Demo →' :
                template === 'creative' ? 'Live' :
                template === 'professional' ? 'Live Demo' :
                'Live Demo'
              )}
            </a>
          )}
        </div>
      </div>

      {/* Full Image Gallery for detailed view */}
      {/* {allImages.length > 1 && template !== 'minimal' && (
        <div className="p-6 pt-0">
          <ImageGallery            images={allImages} 
            title="Project Gallery"
          />
        </div>
      )} */}
    </motion.div>
  )
}

export default ProjectCard