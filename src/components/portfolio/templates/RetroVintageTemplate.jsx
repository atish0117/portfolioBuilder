import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Camera, 
  Coffee, 
  Music, 
  Tv, 
  Radio, 
  Film, 
  Headphones,
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Award,
  Star,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Eye,
  Heart,
  Zap,
  Gamepad2
} from 'lucide-react';

import TagLineRender from '../../ui/TagLineRender'; 



const RetroVintageTemplate= ({ user, projects, sectionOrder, visibleSections }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [vinylRotation, setVinylRotation] = useState(0);
  const [tvStatic, setTvStatic] = useState(false);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setVinylRotation(prev => prev + 1);
    }, 1000);

    const staticInterval = setInterval(() => {
      setTvStatic(true);
      setTimeout(() => setTvStatic(false), 100);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(staticInterval);
    };
  }, []);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 relative overflow-hidden">
            {/* Vintage paper texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Retro geometric shapes */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300/30 rounded-full animate-bounce" />
              <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-400/40 transform rotate-45 animate-pulse" />
              <div className="absolute bottom-32 left-40 w-40 h-40 bg-red-300/30 rounded-full animate-ping" />
              <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-400/40 transform rotate-12 animate-bounce" />
            </div>

            {/* Vintage TV frame */}
            <div className="absolute top-8 right-8 w-32 h-24 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg border-4 border-amber-700 shadow-2xl">
              <div className={`w-full h-full bg-black rounded border-2 border-gray-600 flex items-center justify-center ${tvStatic ? 'animate-pulse' : ''}`}>
                <div className="text-green-400 font-mono text-xs">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-amber-800 rounded-b"></div>
            </div>

            {/* Vinyl record */}
            <div className="absolute bottom-8 left-8 w-24 h-24">
              <div 
                className="w-full h-full bg-black rounded-full border-4 border-gray-800 relative shadow-2xl"
                style={{ transform: `rotate(${vinylRotation}deg)` }}
              >
                <div className="absolute inset-4 bg-red-800 rounded-full"></div>
                <div className="absolute inset-8 bg-black rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
              <div className="text-center max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.6 }}
                  className="mb-8"
                >
                  {user.profileImgUrl ? (
                    <div className="relative">
                      <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg p-4 transform rotate-3 shadow-2xl">
                        <img
                          src={user.profileImgUrl}
                          alt={user.fullName}
                          className="w-full h-full rounded object-cover sepia contrast-125 saturate-150"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg flex items-center justify-center text-amber-800 text-6xl font-bold transform rotate-3 shadow-2xl">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-6xl md:text-8xl font-black text-amber-900 mb-6 transform -rotate-1"
                  style={{ 
                    fontFamily: 'serif',
                    textShadow: '4px 4px 0px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  {user.fullName}
                </motion.h1>

                {user.title && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-full mb-8 transform rotate-1 shadow-lg"
                  >
                    <Music className="w-6 h-6 mr-3" />
                    <p className="text-xl font-bold" style={{ fontFamily: 'serif' }}>
                      {user.title}
                    </p>
                  </motion.div>
                )}

                {user.tagLine && (

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="bg-amber-50 border-4 border-amber-200 rounded-lg p-8 mb-12 transform -rotate-1 shadow-lg"
                  >
                    <p className="text-lg text-amber-900 leading-relaxed" style={{ fontFamily: 'serif' }}>
                      <TagLineRender tagLine={user.tagLine}/> 

                    </p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex justify-center space-x-6"
                >
                  <button className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                          style={{ fontFamily: 'serif' }}>
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Get My Resume</span>
                    </div>
                  </button>
                  <button className="px-8 py-4 border-4 border-amber-600 text-amber-800 font-bold rounded-lg hover:bg-amber-100 transition-all duration-300"
                          style={{ fontFamily: 'serif' }}>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>View Gallery</span>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>
            
            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-black text-center text-amber-900 mb-16 transform rotate-1"
                style={{ 
                  fontFamily: 'serif',
                  textShadow: '3px 3px 0px rgba(251, 191, 36, 0.3)'
                }}
              >
                My Groovy Skills
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                    whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      rotate: Math.random() * 10 - 5, 
                      scale: 1.05,
                      y: -10
                    }}
                    className={`p-6 rounded-lg text-center font-bold text-white transform transition-all duration-300 shadow-lg ${
                      index % 4 === 0 ? 'bg-gradient-to-br from-red-400 to-red-600' :
                      index % 4 === 1 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                      index % 4 === 2 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-br from-amber-400 to-amber-600'
                    }`}
                    style={{ 
                      fontFamily: 'serif',
                      transform: `rotate(${Math.random() * 6 - 3}deg)`
                    }}
                  >
                    <div className="mb-4">
                      {index % 6 === 0 && <Tv className="w-8 h-8 mx-auto" />}
                      {index % 6 === 1 && <Radio className="w-8 h-8 mx-auto" />}
                      {index % 6 === 2 && <Film className="w-8 h-8 mx-auto" />}
                      {index % 6 === 3 && <Headphones className="w-8 h-8 mx-auto" />}
                      {index % 6 === 4 && <Camera className="w-8 h-8 mx-auto" />}
                      {index % 6 === 5 && <Gamepad2 className="w-8 h-8 mx-auto" />}
                    </div>
                    <p className="text-lg">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>
            
            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-black text-center text-amber-900 mb-16 transform -rotate-1"
                style={{ 
                  fontFamily: 'serif',
                  textShadow: '3px 3px 0px rgba(251, 191, 36, 0.3)'
                }}
              >
                Far Out Projects
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ 
                      scale: 1.02,
                      rotate: index % 2 === 0 ? 2 : -2,
                      y: -10
                    }}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-300 shadow-2xl"
                    style={{ transform: `rotate(${Math.random() * 4 - 2}deg)` }}
                  >
                    {/* Polaroid-style frame */}
                    <div className="p-6 pb-16">
                      {/* Project "photo" */}
                      <div className="h-48 bg-gradient-to-br from-red-300 via-orange-300 to-yellow-300 rounded mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Film className="w-16 h-16 text-white/60" />
                        </div>
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'serif' }}>
                          {project.title}
                        </h3>
                        
                        {project.description && (
                          <p className="text-amber-800 mb-4 leading-relaxed text-sm" style={{ fontFamily: 'serif' }}>
                            {project.description}
                          </p>
                        )}
                        
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4 justify-center">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-amber-200 text-amber-800 rounded text-xs font-bold"
                                style={{ fontFamily: 'serif' }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex justify-center space-x-4">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-all duration-300 font-bold text-sm"
                              style={{ fontFamily: 'serif' }}
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded hover:from-red-600 hover:to-orange-600 transition-all duration-300 font-bold text-sm"
                              style={{ fontFamily: 'serif' }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Polaroid caption area */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-white flex items-center justify-center">
                      <p className="text-gray-600 font-handwriting text-sm" style={{ fontFamily: 'cursive' }}>
                        Project #{index + 1}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'contact':
        return (
          <section className="py-20 bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>
            
            {/* Retro elements */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-16 h-16 bg-red-400/30 rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 right-20 w-20 h-20 bg-yellow-400/40 transform rotate-45 animate-pulse"></div>
              <div className="absolute top-1/2 left-10 w-12 h-12 bg-orange-400/50 rounded-full animate-ping"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black text-amber-900 mb-8 transform"
                style={{ 
                  fontFamily: 'serif',
                  textShadow: '4px 4px 0px rgba(251, 191, 36, 0.3)'
                }}
              >
                Let's Jam Together!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-amber-800 mb-12 font-bold"
                style={{ fontFamily: 'serif' }}
              >
                Ready to create some groovy magic?
              </motion.p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    y: -10
                  }}
                  className="group p-8 bg-gradient-to-br from-red-200 to-red-300 rounded-lg border-4 border-red-400 shadow-lg hover:shadow-xl transition-all duration-300 transform"
                  style={{ transform: 'rotate(-2deg)' }}
                >
                  <Mail className="w-12 h-12 text-red-700 mx-auto mb-4 group-hover:animate-bounce" />
                  <p className="text-red-800 font-bold text-lg" style={{ fontFamily: 'serif' }}>Send a Letter</p>
                  <p className="text-red-700 text-sm mt-2" style={{ fontFamily: 'serif' }}>{user.email}</p>
                </motion.a>

                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: -5,
                      y: -10
                    }}
                    className="group p-8 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg border-4 border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 transform"
                    style={{ transform: 'rotate(2deg)' }}
                  >
                    <Linkedin className="w-12 h-12 text-orange-700 mx-auto mb-4 group-hover:animate-bounce" />
                    <p className="text-orange-800 font-bold text-lg" style={{ fontFamily: 'serif' }}>Professional Vibes</p>
                    <p className="text-orange-700 text-sm mt-2" style={{ fontFamily: 'serif' }}>LinkedIn Network</p>
                  </motion.a>
                )}

                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      y: -10
                    }}
                    className="group p-8 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg border-4 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 transform"
                    style={{ transform: 'rotate(-1deg)' }}
                  >
                    <Github className="w-12 h-12 text-yellow-700 mx-auto mb-4 group-hover:animate-bounce" />
                    <p className="text-yellow-800 font-bold text-lg" style={{ fontFamily: 'serif' }}>Code Gallery</p>
                    <p className="text-yellow-700 text-sm mt-2" style={{ fontFamily: 'serif' }}>GitHub Repository</p>
                  </motion.a>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ fontFamily: 'serif' }}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}
    </div>
  );
};

export default RetroVintageTemplate;