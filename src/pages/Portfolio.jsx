

// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { motion } from 'framer-motion'
// import { fetchPortfolio } from '../store/slices/portfolioSlice'
// import SkeletonLoader from '../components/ui/SkeletonLoader'

// const Portfolio = () => {
//   // useParams no longer needs generic typing
//   const { username } = useParams()
//   const dispatch = useDispatch()
//   const { data, loading, error } = useSelector((state) => state.portfolio)

//   useEffect(() => {
//     if (username) {
//       dispatch(fetchPortfolio(username))
//     }
//   }, [dispatch, username])

//   /* ---------- Loading state ---------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-dark-900">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <SkeletonLoader className="h-64 w-full mb-8" />
//           <SkeletonLoader className="h-32 w-full mb-4" />
//           <SkeletonLoader className="h-32 w-full mb-4" />
//           <SkeletonLoader className="h-32 w-full" />
//         </div>
//       </div>
//     )
//   }

//   /* ---------- Error / not‑found ---------- */
//   if (error || !data) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Portfolio Not Found
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             The portfolio you're looking for doesn't exist or has been removed.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   /* ---------- Main render ---------- */
//   const { user, projects } = data
//   const sectionOrder =
//     user.sectionOrder ||
//     ['hero', 'skills', 'projects', 'education', 'experience', 'certifications', 'testimonials', 'contact']
//   // const visibleSections = user.visibleSections ? Object.fromEntries(user.visibleSections) : {}
//     const visibleSections = user.visibleSections 
//     ? (user.visibleSections instanceof Map 
//         ? Object.fromEntries(user.visibleSections) 
//         : typeof user.visibleSections === 'object' 
//           ? user.visibleSections 
//           : {})
//     : {
//         hero: true,
//         skills: true,
//         projects: true,
//         education: true,
//         experience: true,
//         certifications: true,
//         testimonials: true,
//         contact: true
//       }

//   // ——— Section renderer (unchanged logic) ———
//   const renderSection = (sectionId) => {
//     if (!visibleSections[sectionId]) return null

//     switch (sectionId) {
//       /* ------------------ HERO ------------------ */
//       case 'hero':
//         return (
//           <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20 py-20">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                 {/* Text */}
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
//                     {user.fullName}
//                   </h1>
//                   {user.title && (
//                     <p className="text-2xl text-primary-600 dark:text-primary-400 mb-6">
//                       {user.title}
//                     </p>
//                   )}

//                   {user.tagLine && (
//                     <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
//                       {user.tagLine}

//                     </p>
//                   )}

//                   {/* Social Links */}
//                   <div className="flex space-x-4">
//                     {user.socialLinks?.github && (
//                       <motion.a
//                         href={user.socialLinks.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {/* GitHub icon */}
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                         </svg>
//                       </motion.a>
//                     )}
//                     {user.socialLinks?.linkedin && (
//                       <motion.a
//                         href={user.socialLinks.linkedin}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {/* LinkedIn icon */}
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                         </svg>
//                       </motion.a>
//                     )}
//                     {user.socialLinks?.twitter && (
//                       <motion.a
//                         href={user.socialLinks.twitter}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {/* Twitter icon */}
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                         </svg>
//                       </motion.a>
//                     )}
//                     {user.resumeUrl && (
//                       <motion.a
//                         href={user.resumeUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors font-medium"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         Download Resume
//                       </motion.a>
//                     )}
//                   </div>
//                 </motion.div>

//                 {/* Profile image */}
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: 0.2 }}
//                   className="flex justify-center"
//                 >
//                   {user.profileImgUrl ? (
//                     <img
//                       src={user.profileImgUrl}
//                       alt={user.fullName}
//                       className="w-80 h-80 rounded-full object-cover border-8 border-white shadow-2xl"
//                     />
//                   ) : (
//                     <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-400 to-purple-600 flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
//                       {user.fullName.charAt(0)}
//                     </div>
//                   )}
//                 </motion.div>
//               </div>
//             </div>
//           </section>
//         )

//       /* ---------- SKILLS (etc.) ---------- */
//                   case 'skills':
//         return user.skills && user.skills.length > 0 ? (
//           <section className="py-20 bg-gray-50 dark:bg-dark-800">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                   Skills & Technologies
//                 </h2>
//               </motion.div>
              
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="flex flex-wrap justify-center gap-4"
//               >
//                 {user.skills.map((skill, index) => (
//                   <motion.span
//                     key={skill}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     whileHover={{ scale: 1.05 }}
//                     className="px-6 py-3 bg-white dark:bg-dark-700 text-gray-900 dark:text-white rounded-full shadow-md border border-gray-200 dark:border-dark-600 font-medium"
//                   >
//                     {skill}
//                   </motion.span>
//                 ))}
//               </motion.div>
//             </div>
//           </section>
//         ) : null

//       case 'projects':
//         return projects && projects.length > 0 ? (
//           <section className="py-20 bg-white dark:bg-dark-900">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                   Featured Projects
//                 </h2>
//               </motion.div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {projects.map((project, index) => (
//                   <motion.div
//                     key={project._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                     whileHover={{ y: -5 }}
//                     className="card overflow-hidden hover:shadow-xl transition-all duration-300"
//                   >
//                     {project.imageUrl && (
//                       <img
//                         src={project.imageUrl}
//                         alt={project.title}
//                         className="w-full h-48 object-cover"
//                       />
//                     )}
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                         {project.title}
//                       </h3>
//                       {project.description && (
//                         <p className="text-gray-600 dark:text-gray-300 mb-4">
//                           {project.description}
//                         </p>
//                       )}
//                       {project.techStack && project.techStack.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mb-4">
//                           {project.techStack.map((tech) => (
//                             <span
//                               key={tech}
//                               className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
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
//                             className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//                           >
//                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                             </svg>
//                           </a>
//                         )}
//                         {project.liveLink && (
//                           <a
//                             href={project.liveLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-primary-600 hover:text-primary-700 transition-colors"
//                           >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                             </svg>
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

//       case 'experience':
//         return user.experienceDetails && user.experienceDetails.length > 0 ? (
//           <section className="py-20 bg-gray-50 dark:bg-dark-800">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                   Work Experience
//                 </h2>
//               </motion.div>
              
//               <div className="space-y-8">
//                 {user.experienceDetails.map((exp, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                     className="card p-8"
//                   >
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//                       <div>
//                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
//                           {exp.jobTitle}
//                         </h3>
//                         <p className="text-xl text-primary-600 dark:text-primary-400 mb-2">
//                           {exp.companyName}
//                         </p>
//                       </div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 md:text-right">
//                         {exp.duration}
//                       </p>
//                     </div>
                    
//                     {exp.responsibilities && (
//                       <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
//                         {exp.responsibilities}
//                       </p>
//                     )}
                    
//                     {exp.skills && exp.skills.length > 0 && (
//                       <div className="flex flex-wrap gap-2">
//                         {exp.skills.map((skill) => (
//                           <span
//                             key={skill}
//                             className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         ) : null

//       case 'education':
//         return user.education && user.education.length > 0 ? (
//           <section className="py-20 bg-white dark:bg-dark-900">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                   Education
//                 </h2>
//               </motion.div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {user.education.map((edu, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                     className="card p-6"
//                   >
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                       {edu.degree}
//                     </h3>
//                     <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">
//                       {edu.institution}
//                     </p>
//                     {(edu.startYear || edu.endYear) && (
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         {edu.startYear} {edu.startYear && edu.endYear && '- '} {edu.endYear}
//                       </p>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         ) : null

//       case 'certifications':
//         return user.certifications && user.certifications.length > 0 ? (
//           <section className="py-20 bg-gray-50 dark:bg-dark-800">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                   Certifications
//                 </h2>
//               </motion.div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {user.certifications.map((cert, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                     className="card p-6 text-center"
//                   >
//                     <div className="text-4xl mb-4">🏆</div>
//                     <h3 className="font-bold text-gray-900 dark:text-white mb-2">
//                       {cert.title}
//                     </h3>
//                     {cert.platform && (
//                       <p className="text-primary-600 dark:text-primary-400 mb-3">
//                         {cert.platform}
//                       </p>
//                     )}
//                     {cert.certificateLink && (
//                       <a
//                         href={cert.certificateLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-700 text-sm"
//                       >
//                         View Certificate →
//                       </a>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         ) : null

//       case 'testimonials':
//         return user.testimonials && user.testimonials.length > 0 ? (
//           <section className="py-20 bg-white dark:bg-dark-900">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="text-center mb-12"
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//                   What People Say
//                 </h2>
//               </motion.div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {user.testimonials.map((testimonial, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.1 }}
//                     className="card p-6"
//                   >
//                     <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
//                       "{testimonial.message}"
//                     </blockquote>
//                     <div className="flex items-center space-x-3">
//                       {testimonial.imageUrl ? (
//                         <img
//                           src={testimonial.imageUrl}
//                           alt={testimonial.name}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
//                           {testimonial.name.charAt(0)}
//                         </div>
//                       )}
//                       <div>
//                         <p className="font-semibold text-gray-900 dark:text-white">
//                           {testimonial.name}
//                         </p>
//                         {testimonial.designation && (
//                           <p className="text-sm text-gray-600 dark:text-gray-400">
//                             {testimonial.designation}
//                           </p>
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
//           <section className="py-20 bg-gray-50 dark:bg-dark-800">
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
//                   Let's Work Together
//                 </h2>
//                 <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
//                   Interested in collaborating? Feel free to reach out!
//                 </p>
//                 <div className="flex justify-center space-x-4">
//                   {user.socialLinks?.github && (
//                     <a
//                       href={user.socialLinks.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
//                     >
//                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                       </svg>
//                     </a>
//                   )}
//                   {user.socialLinks?.linkedin && (
//                     <a
//                       href={user.socialLinks.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                     >
//                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                       </svg>
//                     </a>
//                   )}
//                   <a
//                     href={`mailto:${user.email}`}
//                     className="btn-primary text-lg px-8 py-4"
//                   >
//                     Get In Touch
//                   </a>
//                 </div>
//               </motion.div>
//             </div>
//           </section>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-dark-900">
//       {sectionOrder.map((sectionId) => (
//         <div key={sectionId}>{renderSection(sectionId)}</div>
//       ))}
//     </div>
//   )
// }

// export default Portfolio


import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPortfolio } from '../store/slices/portfolioSlice'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import TemplateRenderer from '../components/portfolio/TemplateRenderer'

const Portfolio = () => {
  const { username } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.portfolio)

  useEffect(() => {
    if (username) {
      dispatch(fetchPortfolio(username))
    }
  }, [dispatch, username])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <SkeletonLoader className="h-64 w-full mb-8" />
          <SkeletonLoader className="h-32 w-full mb-4" />
          <SkeletonLoader className="h-32 w-full mb-4" />
          <SkeletonLoader className="h-32 w-full" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The portfolio you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  const { user, projects } = data

  const sectionOrder = user.sectionOrder || ['hero', 'about', 'skills', 'projects', 'education', 'experience', 'certifications', 'testimonials', 'contact']


  // Handle visibleSections properly
  let visibleSections = {}
  if (user.visibleSections) {
    if (user.visibleSections instanceof Map) {
      visibleSections = Object.fromEntries(user.visibleSections)
    } else if (typeof user.visibleSections === 'object') {
      visibleSections = user.visibleSections
    }
  } else{
       // Default all sections to visible
       visibleSections = {
        hero: true,

        about: true,

        skills: true,
        projects: true,
        education: true,
        experience: true,
        certifications: true,
        testimonials: true,
        contact: true
      }
    }
      console.log('Portfolio visible sections:', visibleSections)

  const selectedTemplate = user.selectedTemplate || 'minimal'

  return (
    <TemplateRenderer
      template={selectedTemplate}
      user={user}
      projects={projects}
      sectionOrder={sectionOrder}
      visibleSections={visibleSections}
    />
  )
}

export default Portfolio
