import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
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
  Eye,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Palette,
  Zap,
  Trophy,
  Quote,
  CheckCircle,
  Send,
  Coffee,
  Lightbulb,
  Target,
  BookOpen,
  Building,
  Globe,
  MessageCircle,
  ArrowRight,
  Sparkles,
  User,
  ChevronDown
} from 'lucide-react';
import TagLineRender from '../../ui/TagLineRender';



// Memoized floating particle component
const FloatingParticle = memo(({ index, delay }) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-white/30 rounded-full"
      style={{
        left: `${10 + (index % 10) * 8}%`,
        top: `${20 + (index % 4) * 20}%`,
      }}
      animate={{
        y: [0, -40, 0],
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3 + index * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
});

// Memoized skill card component
const SkillCard = memo(({ skill, index })=> {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Skill icon */}
      <div className="relative z-10 flex items-center justify-center mb-3">
        <Code className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
      </div>
      
      <p className="relative z-10 text-white font-medium text-center group-hover:text-blue-100 transition-colors">
        {skill}
      </p>
      
      {/* Proficiency bar */}
      <div className="relative z-10 mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.random() * 30 + 70}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
        />
      </div>
      
      {/* Sparkle effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-2 right-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Memoized project card component
const ProjectCard = memo(({ project, index }) => {
  const [liked, setLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  }, [liked]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        rotateY: index % 2 === 0 ? 5 : -5,
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
      }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative"
    >
      {/* Project image with overlay */}
      <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Lightbulb className="w-16 h-16 text-white/80" />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Like button */}
        <button
          onClick={handleLike}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              liked ? 'text-red-500 fill-current' : 'text-white'
            }`} 
          />
        </button>
        
        {/* Project stats overlay */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{views}</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            <span>{likes}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        
        {project.description && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        )}
        
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`px-3 py-1 rounded-full text-sm font-medium cursor-default ${
                  techIndex % 3 === 0 ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700' :
                  techIndex % 3 === 1 ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700' :
                  'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700'
                }`}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium group/link"
              >
                <Github className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                GitHub
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-purple-600 transition-colors font-medium group/link"
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                Live Demo
              </a>
            )}
          </div>
          
          {/* Project completion status */}
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Complete</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ModernTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const springScrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  // Theme configurations
  const themes = [
    {
      hero: 'from-blue-600 via-purple-600 to-pink-600',
      skills: 'from-gray-900 via-blue-900 to-purple-900',
      projects: 'from-white to-gray-50',
      contact: 'from-gray-900 to-black'
    },
    {
      hero: 'from-emerald-500 via-teal-600 to-cyan-600',
      skills: 'from-gray-900 via-emerald-900 to-teal-900',
      projects: 'from-white to-emerald-50',
      contact: 'from-gray-900 to-emerald-900'
    },
    {
      hero: 'from-orange-500 via-red-600 to-pink-600',
      skills: 'from-gray-900 via-orange-900 to-red-900',
      projects: 'from-white to-orange-50',
      contact: 'from-gray-900 to-red-900'
    }
  ];

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (user.testimonials && user.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => 
          (prev + 1) % user.testimonials.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user.testimonials]);

  const renderSection = useCallback((sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case 'hero':
        return (
          <section className={`relative overflow-hidden bg-gradient-to-br ${themes[currentTheme].hero} py-20 min-h-screen flex items-center`}>
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 15 }, (_, i) => (
                <FloatingParticle key={i} index={i} delay={i * 0.2} />
              ))}
            </div>

            {/* Theme switcher */}
            <div className="absolute top-12 right-10 flex space-x-2 z-40">
              {themes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTheme(index)}
                  className={`w-4 h-4 rounded-full border-2 border-white/50 transition-all duration-300 ${
                    currentTheme === index ? 'scale-125 border-white' : 'hover:scale-110'
                  }`}
                  style={{ 
                    background: `linear-gradient(45deg, ${themes[index].hero.split(' ')[0].replace('from-', '')}, ${themes[index].hero.split(' ')[2].replace('to-', '')})`
                  }}
                />
              ))}
            </div>
            
            <div className="relative max-w-6xl mx-auto px-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6"
                  >
                    <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                      <User className="w-4 h-4 mr-2" />
                      Available for work
                    </span>
                  </motion.div>

                  <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="block"
                    >
                      {user.fullName}
                    </motion.span>
                  </h1>
                  
                  {user.title && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex items-center mb-6"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300 mr-3" />
                      <p className="text-2xl text-blue-100 font-medium">
                        {user.title}
                      </p>
                    </motion.div>
                  )}
                  
                  {user.tagLine && (

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg"
                    >
                      <TagLineRender tagLine={user.tagLine}/> 

                    </motion.p>
                  )}

                  {/* Quick stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="grid grid-cols-3 gap-6 mb-8"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{projects?.length || 0}</div>
                      <div className="text-sm text-white/70">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.workExperience}</div>

                      <div className="text-sm text-white/70">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.skills?.length || 0}</div>
                      <div className="text-sm text-white/70">Skills</div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  >
                    <a href={`${user.resumeUrl}`} target='_blank' className="group flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 font-medium transform hover:scale-105">
                      <Eye className="w-5 h-5 mr-2" />
                      View Resume
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <button className="px-8 py-4 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium transform hover:scale-105">
                      <a  href={`mailto:${user.email}`} className="flex items-center justify-center">
                      
                        <User className="w-5 h-5 mr-2" />
                        Hire Me
                      </a>

                    </button>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    {user.profileImgUrl ? (
                      <motion.img
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-80 h-80 rounded-3xl object-cover shadow-2xl border-4 border-white/20"
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        className="w-80 h-80 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-bold shadow-2xl"
                      >
                        {user.fullName.charAt(0)}
                      </motion.div>
                    )}
                    
                    {/* Online status indicator */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center text-white/70"
                >
                  <span className="text-sm mb-2">Scroll to explore</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </section>
        );

      case 'skills':
        return user.skills && user.skills.length > 0 ? (
          <section className={`py-20 bg-gradient-to-br ${themes[currentTheme].skills} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Skills & Technologies
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  A comprehensive overview of my technical expertise and professional skills
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user.skills.map((skill, index) => (
                  <SkillCard key={skill} skill={skill} index={index} />
                ))}
              </div>

              {/* Skills summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Target className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-white">Always learning and growing</span>
                </div>
              </motion.div>
            </div>
          </section>
        ) : null;

      case 'experience':

  return user.experienceDetails?.length > 0 ? (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My journey through various roles and the impact I've made
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>

          <div className="space-y-12">
            {user.experienceDetails.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute left-6 top-3 w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-4 border-white shadow-lg"
                ></motion.div>
                
                {/* Card */}
                <motion.div
  whileHover={{ scale: 1.02, y: -5 }}
  className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 relative"
>
  {/* Job Title + Duration */}
  <div className="relative flex items-center mb-4">
    <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
    <h3 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
      {exp.jobTitle}
    </h3>
    {/* Duration top right */}
    <span className="absolute top-0 right-0 text-sm text-gray-500 flex items-center">
      <Calendar className="w-4 h-4 mr-1" />
      {exp.duration}
    </span>
  </div>
  
  {/* Company Name */}
  <div className="flex items-center text-gray-600 mb-4">
    <Building className="w-4 h-4 mr-2" />
    <span className="font-semibold">{exp.companyName}</span>
  </div>
  
  {/* Description */}
  <p className="text-gray-700 leading-relaxed mb-4">{exp.responsibilities}</p>
  
  {/* Skills */}
  <div className="flex flex-wrap gap-2 mb-4">
    {exp.skills.map((s, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 + i * 0.1 }}
        whileHover={{ scale: 1.1 }}
        className="px-3 py-1 bg-blue-100/40 text-blue-700 rounded-full text-sm font-mono border border-blue-400/30"
      >
        {s}
      </motion.span>
    ))}
    {['Leadership', 'Innovation', 'Growth'].map((achievement, i) => (
      <span
        key={i}
        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
      >
        {achievement}
      </span>
    ))}
  </div>
</motion.div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : null;



      case 'education':
        return user.education && user.education.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Education
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Academic foundation and continuous learning journey
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      {edu.gpa && (
                        <div className="text-right">
                          <div className="text-3xl font-black text-purple-600">{edu.gpa}</div>
                          <div className="text-sm text-gray-500">GPA</div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {edu.degree}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{edu.institution}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{edu.startYear} - {edu.endYear}</span>

                    </div>
                    
                    {edu.description && (
                      <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'certifications':
        return user.certifications && user.certifications.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50 relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  🏆 Certifications
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Professional certifications and achievements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
                    className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-6 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Sparkle effects */}
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 font-medium">{cert.platform}</p>

                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{cert.date}</span>
                    </div>
                    
                    {cert.certificateLink && (
                      <a href={cert.certificateLink} target='_blank' className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded mb-3">
                          View Certificate
                      </a>

                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-bold flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </span>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'testimonials':
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 relative">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  💬 What People Say
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Testimonials from colleagues, clients, and collaborators
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8 relative"
                >
                  <Quote className="w-16 h-16 text-purple-300 mb-6" />
                  
                  <p className="text-xl text-gray-700 leading-relaxed mb-8 italic break-words">
                    "{user.testimonials[currentTestimonial].message}"

                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={user.testimonials[currentTestimonial].imageUrl}

                        alt={user.testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-purple-200"
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          {user.testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-600">
                          {user.testimonials[currentTestimonial].designation}

                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation dots */}
              <div className="flex justify-center space-x-2">
                {user.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-purple-600 scale-125' : 'bg-purple-300 hover:bg-purple-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'projects':
        return projects && projects.length > 0 ? (
          <section className={`py-20 bg-gradient-to-br ${themes[currentTheme].projects} relative`}>
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Featured Projects
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A showcase of my recent work and creative solutions
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'contact':
        return (
          <section className={`py-20 bg-gradient-to-br ${themes[currentTheme].contact} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-300/20 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-300/30 rounded-full animate-ping"></div>
            </div>
            
            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-4xl font-bold text-white mb-4">
                  Let's Create Something Amazing
                </h2>
                <p className="text-xl text-gray-300 mb-12">
                  Ready to bring your ideas to life? Let's connect!
                </p>
              </motion.div>

              {/* Contact cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <Mail className="w-12 h-12 text-white mx-auto mb-4 group-hover:animate-bounce" />
                  <h3 className="text-xl font-bold text-white mb-2">Email Me</h3>
                  <p className="text-white/80">{user.email}</p>
                </motion.a>

                {user.phone && (
                  <motion.a
                    href={`tel:${user.phone}`}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Phone className="w-12 h-12 text-white mx-auto mb-4 group-hover:animate-bounce" />
                    <h3 className="text-xl font-bold text-white mb-2">Call Me</h3>
                    <p className="text-white/80">{user.phone}</p>
                  </motion.a>
                )}

                {user.location && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="group p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <MapPin className="w-12 h-12 text-white mx-auto mb-4 group-hover:animate-bounce" />
                    <h3 className="text-xl font-bold text-white mb-2">Visit Me</h3>
                    <p className="text-white/80">{user.location}</p>
                  </motion.div>
                )}
              </div>
              
              {/* Social links and CTA */}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                {user.socialLinks?.github && (
                  <motion.a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                )}
                
                {user.socialLinks?.linkedin && (
                  <motion.a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                )}
                
                <motion.a
                  href={`mailto:${user.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold transform flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Get In Touch</span>
                </motion.a>
              </div>

              {/* Availability indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12"
              >
                <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Coffee className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-white">Available for new projects</span>
                </div>
              </motion.div>
            </div>
          </section>
        );

      default:
        return null;
    }
  }, [visibleSections, themes, currentTheme, user, projects, currentTestimonial]);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[currentTheme].hero} relative`}>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />

      {/* sticky navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0  left-0 right-0 z-40 transition-all duration-300  ${

          isScrolled ? 'bg-white/60 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center ">
          <div className='flex items-center'> 
            <div className="font-bold  text-3xl text-gray-800">
            {user.fullName.split(' ')[0]}
          </div>
          <span className='text-black text-2xl px-2 font-extrabold '>|</span>
          <div className="font-bold  text-2xl text-gray-700">
             {user.title}
          </div>
          </div>



          <div className="hidden md:flex space-x-8 ">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
      
      {sectionOrder.map((sectionId) => (
        <div key={sectionId} id={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}
    </div>
  );
};

export default ModernTemplate;