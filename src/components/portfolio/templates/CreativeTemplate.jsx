// import React from 'react'
// import { motion } from 'framer-motion'

// const CreativeTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
//   const renderSection = (sectionId) => {
//     if (!visibleSections[sectionId]) return null

//     switch (sectionId) {
//       case 'hero':
//         return (
//           <section className="relative min-h-screen bg-gradient-to-br from-pink-400 via-red-500 to-yellow-500 overflow-hidden">
//             <div className="absolute inset-0">
//               <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//               <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-bounce-slow"></div>
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
//             </div>

//             <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
//               <div className="text-center">
//                 <motion.div
//                   initial={{ scale: 0, rotate: -180 }}
//                   animate={{ scale: 1, rotate: 0 }}
//                   transition={{ duration: 1, type: "spring", bounce: 0.5 }}
//                   className="mb-8"
//                 >
//                   {user.profileImgUrl ? (
//                     <img
//                       src={user.profileImgUrl}
//                       alt={user.fullName}
//                       className="w-48 h-48 rounded-full object-cover mx-auto border-8 border-white/30 shadow-2xl"
//                     />
//                   ) : (
//                     <div className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-bold mx-auto border-8 border-white/30 shadow-2xl">
//                       {user.fullName.charAt(0)}
//                     </div>
//                   )}
//                 </motion.div>

//                 <motion.h1
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                   className="text-6xl md:text-8xl font-black text-white mb-6 transform -rotate-2"
//                 >
//                   {user.fullName}
//                 </motion.h1>

//                 {user.title && (
//                   <motion.p
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: 0.5 }}
//                     className="text-2xl text-white/90 mb-8 font-bold transform rotate-1"
//                   >
//                     {user.title}
//                   </motion.p>
//                 )}

//                 {user.tagLine && (
//                 {user.bio && (

//                   <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.7 }}
//                     className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
//                   >

//                     {user.tagLine}
//                     {user.bio}

//                   </motion.p>
//                 )}
//               </div>
//             </div>
//           </section>
//         )

//       case 'skills':
//         return user.skills && user.skills.length > 0 ? (
//           <section className="py-20 bg-black relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10"></div>
//             <div className="relative max-w-6xl mx-auto px-4">
//               <motion.h2
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-5xl font-black text-center text-white mb-16 transform -rotate-1"
//               >
//                 My Superpowers
//               </motion.h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {user.skills.map((skill, index) => (
//                   <motion.div
//                     key={skill}
//                     initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
//                     whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     whileHover={{ rotate: 5, scale: 1.05 }}
//                     className={`p-6 rounded-3xl text-center font-bold text-white transform transition-all duration-300 ${
//                       index % 4 === 0 ? 'bg-gradient-to-br from-pink-500 to-red-500' :
//                       index % 4 === 1 ? 'bg-gradient-to-br from-purple-500 to-blue-500' :
//                       index % 4 === 2 ? 'bg-gradient-to-br from-green-500 to-teal-500' :
//                       'bg-gradient-to-br from-yellow-500 to-orange-500'
//                     }`}
//                   >
//                     <p className="text-lg">{skill}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         ) : null

//       case 'projects':
//         return projects && projects.length > 0 ? (
//           <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//             <div className="max-w-6xl mx-auto px-4">
//               <motion.h2
//                 initial={{ opacity: 0, y: -50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-5xl font-black text-center text-white mb-16 transform rotate-1"
//               >
//                 Creative Works
//               </motion.h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {projects.map((project, index) => (
//                   <motion.div
//                     key={project._id}
//                     initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.2 }}
//                     whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
//                     className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                     <div className="relative z-10">
//                       <h3 className="text-2xl font-bold text-white mb-4 transform group-hover:rotate-1 transition-transform">
//                         {project.title}
//                       </h3>
//                       {project.description && (
//                         <p className="text-white/80 mb-6 leading-relaxed">
//                           {project.description}
//                         </p>
//                       )}
//                       {project.techStack && project.techStack.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mb-6">
//                           {project.techStack.map((tech, techIndex) => (
//                             <span
//                               key={tech}
//                               className={`px-3 py-1 rounded-full text-sm font-bold text-white ${
//                                 techIndex % 3 === 0 ? 'bg-pink-500/50' :
//                                 techIndex % 3 === 1 ? 'bg-purple-500/50' :
//                                 'bg-cyan-500/50'
//                               }`}
//                             >
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                       <div className="flex space-x-4">
//                         {project.githubLink && (
//                           <a
//                             href={project.githubLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 font-bold transform hover:scale-110"
//                           >
//                             Code
//                           </a>
//                         )}
//                         {project.liveLink && (
//                           <a
//                             href={project.liveLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold transform hover:scale-110"
//                           >
//                             Live
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         ) : null

//       case 'contact':
//         return (
//           <section className="py-20 bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 relative overflow-hidden">
//             <div className="absolute inset-0">
//               <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full animate-bounce"></div>
//               <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300/30 rounded-full animate-pulse"></div>
//               <div className="absolute top-1/2 left-20 w-16 h-16 bg-pink-300/40 rounded-full animate-ping"></div>
//             </div>

//             <div className="relative max-w-4xl mx-auto px-4 text-center">
//               <motion.h2
//                 initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
//                 whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-6xl font-black text-white mb-8 transform"
//               >
//                 Let's Create Magic!
//               </motion.h2>
//               <motion.p
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="text-2xl text-white/90 mb-12 font-bold"
//               >
//                 Ready to turn ideas into reality?
//               </motion.p>

//               <div className="flex justify-center space-x-6">
//                 {user.socialLinks?.github && (
//                   <motion.a
//                     href={user.socialLinks.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.2, rotate: 10 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-6 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 border-4 border-white/30"
//                   >
//                     {/* GitHub Icon */}
//                     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 0c-6.626 0-12 5.373-12 12 ... (icon truncated)" />
//                     </svg>
//                   </motion.a>
//                 )}
//                 {user.socialLinks?.linkedin && (
//                   <motion.a
//                     href={user.socialLinks.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.2, rotate: -10 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="p-6 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 border-4 border-white/30"
//                   >
//                     {/* LinkedIn Icon */}
//                     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328... (icon truncated)" />
//                     </svg>
//                   </motion.a>
//                 )}
//                 <motion.a
//                   href={`mailto:${user.email}`}
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 bg-white text-red-500 rounded-full hover:bg-gray-100 transition-all duration-300 font-black text-lg transform border-4 border-white"
//                 >
//                   Let's Talk!
//                 </motion.a>
//               </div>
//             </div>
//           </section>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen">
//       {sectionOrder.map((sectionId) => (
//         <div key={sectionId}>{renderSection(sectionId)}</div>
//       ))}
//     </div>
//   )
// }

// export default CreativeTemplate



import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,  
  Star, 
  Award, 
  Calendar,
  MapPin,
  Phone,
  Download,
  Heart,
  Eye,
  MessageCircle,
  Share2,
  ChevronDown,
  Sparkles,
  Zap,
  Rocket,
  Trophy,
  Target,
  Coffee,
  Palette,
  Code2,
  Briefcase,
  GraduationCap,
  Users,
  Globe
} from 'lucide-react'

import TagLineRender from '../../ui/TagLineRender'


const CreativeTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [currentTheme, setCurrentTheme] = useState(0)

  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  
  console.log(user)
  console.log("Projects:", projects)


  const themes = [
    'from-pink-400 via-red-500 to-yellow-500',
    'from-purple-400 via-pink-500 to-red-500',
    'from-blue-400 via-purple-500 to-pink-500',
    'from-green-400 via-blue-500 to-purple-500',
    'from-yellow-400 via-orange-500 to-red-500'
  ]
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  )

  const InteractiveBackground = ({ children, className }) => (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 opacity-30"
      />
      {children}
    </div>
  )

  const renderSection = (sectionId) => {
   const isVisible = visibleSections[sectionId]
    if (!isVisible) return null

    switch (sectionId) {
      case 'hero':
        return (
          <InteractiveBackground className={`relative min-h-screen bg-gradient-to-br ${themes[currentTheme]} overflow-hidden`}>
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            />
            
            <FloatingElements />
            
            {/* Animated geometric shapes */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </div>

            {/* Theme switcher */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-8 left-8 z-20 flex space-x-2"
            >
              {themes.map((theme, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTheme(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme} border-2 ${
                    currentTheme === index ? 'border-white' : 'border-white/30'
                  }`}
                />
              ))}
            </motion.div>
            
            
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                  className="mb-8 relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {user.profileImgUrl ? (
                    <motion.img
                      src={user.profileImgUrl}
                      alt={user.fullName}
                      className="w-48 h-48 rounded-full object-cover mx-auto border-8 border-white/30 shadow-2xl relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                  ) : (
                    <motion.div
                      className="w-48 h-48 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-bold mx-auto border-8 border-white/30 shadow-2xl relative z-10"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      {user.fullName?.charAt(0) || 'U'}
                    </motion.div>
                  )}

                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-6xl md:text-8xl font-black text-white mb-6 transform -rotate-2 relative"
                  style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                >
                  <motion.span>

                    {user.fullName || 'Creative Developer'}
                  </motion.span>
                </motion.h1>
                
                {user.title && (
                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-2xl text-white/90 mb-8 font-bold transform rotate-1 flex items-center justify-center space-x-2"
                  >
                    <Rocket className="text-yellow-300" />
                    <span>{user.title}</span>
                    <Zap className="text-pink-300" />
                  </motion.p>
                )}
                

                {user.tagLine && (

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg text-left text-white/80 max-w-2xl mx-auto leading-relaxed mb-8 break-words"
                  >

                    <TagLineRender tagLine={user.tagLine}/> 

                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex justify-center space-x-4"
                >

                  <motion.a
                  href={user.resumeUrl} // Appwrite resume link
                  target="_blank" // opens in new tab
                  rel="noopener noreferrer"

                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                  >
                    <Download size={20} />

                    <span>View CV</span>
                  </motion.a>
                  <motion.a
                  href={user?.socialLinks?.github}
                    target="_blank"
                    rel="noopener noreferrer"

                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold border-2 border-white/30 hover:bg-white/30 transition-all flex items-center space-x-2"
                  >
                    <Eye size={20} />
                    <span>View Work</span>

                  </motion.a>

                </motion.div>
              </div>
            </div>

            <motion.div

              className="absolute bottom-8 left-1/2 -m-8 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="text-white/70" size={40} />

            </motion.div>
          </InteractiveBackground>
        )

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <InteractiveBackground className={` bg-gradient-to-br ${themes[currentTheme]} py-20 bg-black relative overflow-hidden`}>
            {/* <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            /> */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10"></div>
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4 transform -rotate-1 flex items-center justify-center space-x-4">
                  <Code2 className="text-pink-400" />
                  <span>My Superpowers</span>
                  <Palette className="text-cyan-400" />
                </h2>
                <p className="text-xl text-white/70">Technologies that fuel my creativity</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      rotate: 5, 
                      scale: 1.05,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    className={`group relative p-6 rounded-3xl text-center font-bold text-white transform transition-all duration-300 cursor-pointer ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-pink-500 to-red-500' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-purple-500 to-blue-500' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-green-500 to-teal-500' :
                      'bg-gradient-to-br from-yellow-500 to-orange-500'
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                    <div className="relative z-10">
                      <motion.div
                        className="text-3xl mb-3"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {index % 8 === 0 ? '⚡' : 
                         index % 8 === 1 ? '🚀' :
                         index % 8 === 2 ? '💎' :
                         index % 8 === 3 ? '🔥' :
                         index % 8 === 4 ? '⭐' :
                         index % 8 === 5 ? '🎯' :
                         index % 8 === 6 ? '💫' : '🌟'}
                      </motion.div>

                      <p className="text-lg">{skill.toUpperCase()}</p>

                      <motion.div
                        className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </InteractiveBackground>
        ) : null

      case 'experience':
        return user.experienceDetails && user.experienceDetails.length > 0 ? (

          <InteractiveBackground className="py-20 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            /> 
            
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4 transform rotate-1 flex items-center justify-center space-x-4">
                  <Briefcase className="text-yellow-300" />
                  <span>My Journey</span>
                  <Target className="text-pink-300" />
                </h2>
                <p className="text-xl text-white/80">Professional milestones and achievements</p>
              </motion.div>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/30 rounded-full"></div>
                
                <div className="space-y-12">
                  {user.experienceDetails.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-cyan-300 z-10"
                        whileHover={{ scale: 1.5 }}
                        style={{ top: '2rem' }}
                      />
                      
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                        className={`max-w-lg p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 transform ${
                          index % 2 === 0 ? 'rotate-1 mr-8' : '-rotate-1 ml-8'
                        } group hover:bg-white/20 transition-all duration-300`}
                      >
                        <div className="flex items-center mb-4">
                          <motion.div
                            className={`w-4 h-4 rounded-full mr-4 ${
                              index % 3 === 0 ? 'bg-pink-400' :
                              index % 3 === 1 ? 'bg-yellow-400' : 'bg-purple-400'
                            }`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                          <span className="text-white/80 font-bold flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{exp.duration}</span>
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                          {exp.jobTitle}
                        </h3>
                        <h4 className="text-xl font-bold text-cyan-200 mb-4 flex items-center space-x-2">
                          <MapPin size={16} />
                          <span>{exp.companyName}</span>
                        </h4>
                       {exp.responsibilities && (
  <p className="text-white/90 leading-relaxed mb-4">{exp.responsibilities}</p>
)}


                        <div className="flex space-x-2">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
                          >
                            <Coffee size={14} className="inline mr-1" />
                            Full-time
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-gradient-to-r from-pink-500/50 to-purple-500/50 rounded-full text-sm text-white"
                          >
                            <Star size={14} className="inline mr-1" />
                            Featured
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </InteractiveBackground>
        ) : null

      case 'education':
        return user.education && user.education.length > 0 ? (
          <InteractiveBackground className={`bg-gradient-to-br ${themes[currentTheme]} py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden`}>
            {/* <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            /> */}
            
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4 transform -rotate-2 flex items-center justify-center space-x-4">
                  <GraduationCap className="text-yellow-300" />
                  <span>Learning Adventures</span>
                  <Trophy className="text-pink-300" />
                </h2>
                <p className="text-xl text-white/80">Academic achievements and knowledge gained</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotate: -5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 transform hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <motion.div
                          className={`w-6 h-6 rounded-full mr-4 ${
                            index % 4 === 0 ? 'bg-gradient-to-br from-pink-400 to-red-400' :
                            index % 4 === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-400' :
                            index % 4 === 2 ? 'bg-gradient-to-br from-green-400 to-emerald-400' :
                            'bg-gradient-to-br from-blue-400 to-purple-400'
                          }`}
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                        />
                        <span className="text-white/80 font-bold flex items-center space-x-2">
                          <Calendar size={16} />

                          <span>{edu.startYear} - {edu.endYear || 'Present'}</span>

                        </span>
                      </div>
                      
                      <motion.div
                        className="text-4xl mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
                      >
                        🎓
                      </motion.div>
                      
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">
                        {edu.degree}
                      </h3>
                      <h4 className="text-xl font-bold text-purple-200 mb-4 flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{edu.institution}</span>
                      </h4>
                      {edu.description && (
                        <p className="text-white/90 leading-relaxed mb-4">{edu.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {edu.gpa && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-full"
                          >
                            <Star className="inline mr-1" size={16} />
                            GPA: {edu.gpa}
                          </motion.div>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm text-white flex items-center space-x-1"
                        >
                          <Award size={14} />
                          <span>Certified</span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </InteractiveBackground>
        ) : null

      case 'certifications':
        return user.certifications && user.certifications.length > 0 ? (
          <InteractiveBackground className={`bg-gradient-to-br ${themes[currentTheme]} py-20 bg-gradient-to-br from-orange-400 via-pink-500 to-red-600 relative overflow-hidden`}>
            {/* <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            /> */}
            
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4 flex items-center justify-center space-x-4">
                  <Trophy className="text-yellow-300" />
                  <span>Achievement Unlocked!</span>
                  <Award className="text-pink-300" />
                </h2>
                <p className="text-xl text-white/80">Professional certifications and credentials</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5, y: -10 }}
                    className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border-2 border-white/30 text-center transform transition-all duration-300 hover:shadow-2xl cursor-pointer overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    
                    <div className="relative z-10">
                      <motion.div
                        className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl ${
                          index % 5 === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                          index % 5 === 1 ? 'bg-gradient-to-br from-pink-400 to-red-500' :
                          index % 5 === 2 ? 'bg-gradient-to-br from-purple-400 to-blue-500' :
                          index % 5 === 3 ? 'bg-gradient-to-br from-green-400 to-emerald-500' :
                          'bg-gradient-to-br from-cyan-400 to-blue-500'
                        } shadow-lg`}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 8, repeat: Infinity },
                          scale: { duration: 2, repeat: Infinity, delay: index * 0.3 }
                        }}
                      >
                        🏆
                      </motion.div>
                      
                      <h3 className="text-lg font-black text-white mb-2 group-hover:text-yellow-300 transition-colors">

                       {cert.title}
                      </h3>
                      <p className="text-white/80 font-bold mb-2 flex items-center justify-center space-x-1">
                        <Award size={16} />
                         <span>{cert.platform}</span>
                      </p>
                      <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer">
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="p-2  bg-white/20 rounded-full text-white hover:bg-white/30 transition-all"
  >
    certificate Link
  </motion.button>
</a>

                      
                      <motion.div
                        className="mt-4 flex justify-center space-x-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <motion.a href={cert.certificateLink} target="_blank" rel="noopener noreferrer"

                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all"
                          >
                          <ExternalLink size={16} />
                        </motion.a>
                       <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all"
  onClick={() => {
    if (navigator.share) {
      navigator
        .share({
          title: cert.title,
          text: `Check out this certificate on ${cert.platform}`,
          url: cert.certificateLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  }}
>
  <Share2 size={16} />
</motion.button>

                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </InteractiveBackground>
        ) : null

      case 'testimonials':
        return user.testimonials && user.testimonials.length > 0 ? (
          <InteractiveBackground className={`bg-gradient-to-br ${themes[currentTheme]} py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden`}>
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4 transform rotate-1 flex items-center justify-center space-x-4">
                  <Users className="text-pink-300" />
                  <span>What People Say</span>
                  <Heart className="text-red-300" />
                </h2>
                <p className="text-xl text-white/80">Client testimonials and feedback</p>
              </motion.div>
              

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                {user.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, y: -10 }}
                    className="group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl transform rotate-2 group-hover:rotate-6 transition-transform duration-300"
                      initial={false}
                    />
                    <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-300">
                      <motion.div
                        className="text-6xl text-white/30 mb-4 transform -rotate-12"
                        animate={{ rotate: [-12, -8, -12] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      >
                        "
                      </motion.div>
                      

                      <p className="text-white/90 mb-6 leading-relaxed italic relative break-words z-10">
                        {testimonial.message}

                      </p>
                      
                      <div className="flex items-center relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative"
                        >

                          {testimonial.imageUrl ? (
                            <img
                              src={testimonial.imageUrl}

                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white/30"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold mr-4 border-2 border-white/30">
                              {testimonial.name?.charAt(0) || 'U'}
                            </div>
                          )}
                          <motion.div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          />
                        </motion.div>
                        <div>
                          <h4 className="text-white font-bold">{testimonial.name}</h4>

                          <p className="text-white/70 text-sm">{testimonial.designation}</p>

                        </div>
                      </div>
                      
                      <motion.div
                        className="flex justify-between items-center mt-4 pt-4 border-t border-white/20"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                      >
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + i * 0.1 }}
                            >
                              <Star className="text-yellow-400 fill-current" size={16} />
                            </motion.div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-white/60 hover:text-red-400 transition-colors"
                          >
                            <Heart size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-white/60 hover:text-blue-400 transition-colors"
                          >
                            <MessageCircle size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </InteractiveBackground>
        ) : null

      case 'projects':
        return projects && projects.length > 0 ? (

          <InteractiveBackground id="project" className=" py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">

            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            /> 
            

            <div className="relative max-w-5xl mx-auto px-4">

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-black text-white mb-4 transform rotate-1 flex items-center justify-center space-x-4">
                  <Rocket className="text-pink-400" />
                  <span>Creative Works</span>
                  <Sparkles className="text-yellow-400" />
                </h2>
                <p className="text-xl text-white/80">Projects that showcase my skills and creativity</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
  <motion.div
    key={project._id}
    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, y: -10 }}
    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-8 hover:border-white/40 transition-all duration-300"
  >
    {/* Optional colored overlay */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={false}
    />

    <div className="relative z-10">
      
      {/* 🖼️ Project Image */}
      {project.imageUrl && (
        <div className="mb-4 rounded-2xl overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Emoji and Title */}
      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
        >
          {index % 6 === 0 ? '🚀' :
           index % 6 === 1 ? '💎' :
           index % 6 === 2 ? '⚡' :
           index % 6 === 3 ? '🔥' :
           index % 6 === 4 ? '🌟' : '💫'}
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4 transform group-hover:rotate-1 transition-transform group-hover:text-yellow-300">
        {project.title.toUpperCase()}
      </h3>

      {project.description && (
        <p className="text-white/80 mb-6 leading-relaxed h-16 overflow-hidden resize-y break-words">
          {project.description}
        </p>
      )}

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`px-3 py-1 rounded-full text-sm font-bold text-white cursor-pointer ${
                techIndex % 3 === 0
                  ? 'bg-pink-500/50 hover:bg-pink-500/70'
                  : techIndex % 3 === 1
                  ? 'bg-purple-500/50 hover:bg-purple-500/70'
                  : 'bg-cyan-500/50 hover:bg-cyan-500/70'
              } transition-all duration-200`}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex space-x-4">
        {project.githubLink && (
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 font-bold transform flex items-center space-x-2 group/btn"
          >
            <Github size={18} className="group-hover/btn:rotate-12 transition-transform" />
            <span>Code</span>
          </motion.a>
        )}
        {project.liveLink && (
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-bold transform flex items-center space-x-2 group/btn"
          >
            <ExternalLink size={18} className="group-hover/btn:rotate-12 transition-transform" />
            <span>Live</span>
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
  
))}


              </div>
            </div>
          </InteractiveBackground>
        ) : null

   case 'contact':
        return (
          <InteractiveBackground className={`bg-gradient-to-br ${themes[currentTheme]} py-20 relative overflow-hidden`}>
            {/* <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
              }}
            /> */}

            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-6xl font-black text-white mb-8 transform flex items-center justify-center space-x-4">
                  <Sparkles className="text-yellow-300" />
                  <span>Let's Create Magic!</span>
                  <Rocket className="text-pink-300" />
                </h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-2xl text-white/90 mb-8 font-bold"
                >
                  Ready to turn ideas into reality?
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Mail className="text-yellow-300 mx-auto mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">Email Me</h3>
                  <p className="text-white/80 text-sm">{user.email || 'hello@example.com'}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="text-pink-300 mx-auto mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">Call Me</h3>
                  <p className="text-white/80 text-sm">{user.phone || '+1 (555) 123-4567'}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Globe className="text-cyan-300 mx-auto mb-4" size={32} />
                  <h3 className="text-white font-bold mb-2">Location</h3>
                  <p className="text-white/80 text-sm">{user.location || 'San Francisco, CA'}</p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center space-x-6 mb-12"
              >
                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-6 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 border-4 border-white/30 group"
                  >
                    <Github className="group-hover:rotate-12 transition-transform" size={32} />
                  </motion.a>
                )}
                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -10, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-6 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 border-4 border-white/30 group"
                  >
                    <Linkedin className="group-hover:rotate-12 transition-transform" size={32} />
                  </motion.a>
                )}
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-red-500 rounded-full hover:bg-gray-100 transition-all duration-300 font-black text-lg transform border-4 border-white flex items-center space-x-2 group"
                >
                  <Mail className="group-hover:rotate-12 transition-transform" size={24} />
                  <span>Let's Talk!</span>
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-white/60 text-sm"
              >

                <p>©  {user.fullName || 'Creative Developer'}. Made with ❤️ and lots of ☕</p>

              </motion.div>
            </div>
          </InteractiveBackground>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative"
      >
        
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        
        {sectionOrder.map((sectionId) => (
          <motion.div
            key={sectionId}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {renderSection(sectionId)}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )


  
}

export default CreativeTemplate