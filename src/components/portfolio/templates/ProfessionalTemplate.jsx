import React, { useState, useEffect, useCallback, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
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
  User,
  Eye,
  Heart,
  Building,
  Globe,
  Target,
  BookOpen,
  CheckCircle,
  Trophy,
  Quote,
  Send,
  ArrowRight,
  ChevronDown,
  Users,
  TrendingUp,
  Shield,
  Italic,

  ChevronRight,
  Share2,
  Twitter,
  Instagram,
  Dribbble,
} from "lucide-react"; 
import { FaDribbble,FaBehance } from "react-icons/fa";

import TagLineRender from "../../ui/TagLineRender";

// Better Animation Variant: Slide-up + fade + scale
const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Memoized skill card component
const SkillCard = memo(({ skill, index }) => {
  return (
    <motion.div
      className="w-28 h-32 flex flex-col items-center justify-center gap-2 group rounded-xl bg-white hover:shadow-lg hover:shadow-blue-400/80 transition-shadow duration-500"
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* First Letter as Icon */}
      <motion.div
        className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-bold rounded-full mb-2 transition-transform duration-500 group-hover:scale-110"
        whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
      >
        {skill.charAt(0).toUpperCase()}
      </motion.div>

      {/* Skill Name */}
      <p className="text-gray-800 text-sm font-medium text-center tracking-wide opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        {skill.toUpperCase()}
      </p>
    </motion.div>
  );
});

// Memoized project card component
const ProjectCard = memo(({ project, index = 0 }) => {
  const [liked, setLiked] = useState(false);
  const [views] = useState(
    project.views || Math.floor(Math.random() * 500) + 100
  );
  const [likes, setLikes] = useState(
    project.likes || Math.floor(Math.random() * 50) + 10
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  }, [liked]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: project.liveLink || window.location.href,
      });
    }
  }, [project]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-2xl transition-all duration-500 overflow-hidden group relative w-full h-[520px] flex flex-col"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
          <Award className="w-3 h-3 mr-1" />
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="h-56 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {project.imageUrl ? (
            <>
              <img
                src={
                  project.imageUrl ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={project.title}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse" />
              )}
            </>
          ) : (
            <div className="text-6xl font-bold  text-blue-200 opacity-50">
              {project.title.charAt(0)}
            </div>
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className="p-2.5 bg-white/95 backdrop-blur-md rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                liked ? "text-red-500 fill-current scale-110" : "text-gray-700"
              }`}
            />
          </motion.button>
        </div>

        {/* Quick Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center justify-between text-white text-sm backdrop-blur-md bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="font-semibold">{likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="font-semibold">{views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title & Category */}
        <div className="mb-3">
          {project.category && (
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold mb-2">
              {project.category}
            </span>
          )}
          <h3 className="text-xl font-bold uppercase text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        {project.description && (
          <div className="mb-4 flex-1 overflow-hidden ">
            <p
              className={`text-gray-600 leading-relaxed break-words text-sm ${
                isExpanded
                  ? "line-clamp-none max-h-[100px] overflow-y-auto pr-1 scrollbar-hide"
                  : "line-clamp-2"
              }`}
            >
              {project.description}
            </p>
            {project.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1 flex items-center gap-1"
              >
                {isExpanded ? "Show less" : "Read more"}
                <ChevronRight
                  className={`w-3 h-3 transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            )}
          </div>
        )}

        {/* Meta Information */}
        {(project.startDate || project.status) && (
          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
            {project.startDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.startDate}</span>
              </div>
            )}

            {project.status && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span
                  className={`font-medium ${
                    project.status === "published"
                      ? "text-green-600"
                      : project.status === "featured"
                      ? "text-blue-600"
                      : project.status === "draft"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-5  overflow-hidden">
            <div className="flex flex-wrap gap-2  max-h-[50px] overflow-y-auto scrollbar-hide">
              {project.techStack.slice(0, 5).map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg text-xs font-semibold border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 5 && (
                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-lg text-xs font-bold">
                  +{project.techStack.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-3">
            {project.githubLink && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
              >
                <Github className="w-4 h-4" />
                Code
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

const ProfessionalTemplate = ({
  user,
  projects,
  sectionOrder,
  visibleSections,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  console.log("professional template",user)

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (user.testimonials && user.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % user.testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user.testimonials]);

  // Navigation items
  const navItems = [

    { name: "About", icon: <User size={20} />, id: "about" },
    { name: "Skills", icon: <Code size={20} />, id: "skills" },
    { name: "Experience", icon: <Briefcase size={20} />, id: "experience" },
    { name: "Projects", icon: <Eye size={20} />, id: "projects" },
    { name: "Contact", icon: <Mail size={20} />, id: "contact" },
  ];

  const renderSection = useCallback(
    (sectionId) => {
      if (!visibleSections[sectionId]) return null;

      switch (sectionId) {
        case "hero":
          return (
            <section className="relative bg-blue-900 py-10 min-h-screen flex items-center overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:`
                  linear-gradient(30deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b),
                  linear-gradient(150deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b),
                  linear-gradient(30deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b),
                  linear-gradient(150deg, #1e293b 12%, transparent 12.5%, transparent 87%, #1e293b 87.5%, #1e293b)
                `,
                    backgroundSize: "80px 140px",
                    backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px",
                  }}
                />
              </div>


              <div className="relative max-w-7xl mx-auto px-4 pl-16 w-full">
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
                      <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
                        <User className="w-4 h-4 mr-2" />
                        {user.availability || "Available for opportunities"}
                      </span>
                    </motion.div>


                    <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"

                      >
                        {user.fullName}
                      </motion.span>
                    </h1>

                    {user.title && (
                      <motion.p
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-2xl text-blue-200 mb-6 font-medium"
                      >
                        {user.title}
                      </motion.p>
                    )}

                    {user.tagLine && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg"
                      >
                        <TagLineRender tagLine={user.tagLine} />
                      </motion.div>
                    )}

                    {/* Professional stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      className="flex gap-20 mb-8"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {projects?.length || 0}
                        </div>
                        <div className="text-sm text-white/70">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {user.workExperience}
                        </div>
                        <div className="text-sm text-white/70">Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {user.skills?.length || 0}
                        </div>
                        <div className="text-sm text-white/70">Skills</div>
                      </div>
                    </motion.div>


                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                      {/* Download Resume Button */}
                      {user.resumeUrl && (
                        <motion.a
                          href={user.resumeUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          whileTap={{ scale: 0.95 }}
                          className="group flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Resume
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                      )}

                      {/* Get In Touch Button */}
                      {user.email && (
                        <motion.a
                          href={`mailto:${user.email}`}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium flex items-center justify-center"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Get In Touch
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex justify-center "
                  >
                    <div className="relative overflow-visible ">
                      {user.profileImgUrl ? (
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={user.profileImgUrl}
                          alt={user.fullName}
                          className="w-80 h-96 rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                        />
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-80 h-96 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-6xl font-bold shadow-2xl border-4 border-white/20"
                        >
                          {user.fullName.charAt(0)}
                        </motion.div>
                      )}

                      {/* Professional status indicator */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-2 -right-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg border-2 border-white"
                      >
                        Whatsapp
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Scroll indicator */}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
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


        case "about":
          return (
            <section id="about" className="py-10 bg-white overflow-x-hidden">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Professional Profile
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    A brief introduction to my professional background, core
                    values, and what drives me.
                  </p>
                </motion.div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Left Column: Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    {user.profileImgUrl ? (
                      <img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-full h-auto rounded-xl object-cover shadow-lg border border-gray-100"
                      />
                    ) : (
                      <div className="w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                        <User className="w-24 h-24 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-xl">
                      <Briefcase className="w-8 h-8" />
                    </div>
                  </motion.div>

                  {/* Right Column: Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col gap-10"
                  >
                    {/* Main Intro */}
                    <div className="text-gray-700 leading-relaxed prose prose-lg">
                      <TagLineRender tagLine={user.intro} />
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
                      {[
                        {
                          icon: <Briefcase className="text-blue-600" />,
                          label: "Experience",
                          value: user.workExperience,
                        },
                        {
                          icon: <Globe className="text-blue-600" />,
                          label: "Location",
                          value: user.location,
                        },
                        {
                          icon: <CheckCircle className="text-blue-600" />,
                          label: "Availability",
                          value: user.availability,
                        },
                        {
                          icon: <Users className="text-blue-600" />,
                          label: "Work Type",
                          value: user.preferredWorkType,
                        },
                        {
                          icon: <Italic className="text-blue-600" />,
                          label: "Languages",
                          value: user.languages?.join(", "),
                        },
                      ].map(
                        (item, index) =>
                          item.value && (
                            <div
                              key={index}
                              className="flex items-center gap-3"
                            >
                              {item.icon}
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {item.value}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item.label}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                    </div>

                    {/* 'What I Do' Sections */}
                    {user.aboutSections && user.aboutSections.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800">
                          What I Offer
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {user.aboutSections.map((section, index) => (
                            <motion.div
                              key={section.id}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                            >
                              <div className="p-2 bg-blue-50 rounded-full">
                                <Target className="w-5 h-5 text-blue-600" />
                              </div>
                              <h4 className="font-semibold text-gray-900">
                                {section.title}
                              </h4>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>
          );

        case "skills":
          return user.skills && user.skills.length > 0 ? (
            <section className="py-10 bg-gray-50 overflow-hidden">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Core Competencies
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Professional skills and technical expertise developed
                    through years of experience
                  </p>
                </motion.div>

                <div className="flex flex-wrap justify-between ">
                  {user.skills.map((skill, index) => (
                    <SkillCard key={skill} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </section>
          ) : null;

        case "experience":
          return user.experienceDetails && user.experienceDetails.length > 0 ? (
            <section className="py-10 bg-white overflow-hidden">
              <div className="max-w-3xl mx-auto px-4">
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
                    Career progression and key achievements in various roles
                  </p>
                </motion.div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500"></div>

                  <div className="space-y-12 max-w-2xl">
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
                        <div className="absolute left-6 top-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-4 border-white shadow-lg"></div>

                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {exp.jobTitle}
                              </h3>
                              <div className="flex items-center text-blue-600 mb-2">
                                <Building className="w-4 h-4 mr-2" />
                                <span className="font-semibold">
                                  {exp.companyName}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{exp.duration}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 leading-relaxed mb-4">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {["Leadership", "Strategy", "Innovation"].map(
                              (achievement, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                >
                                  {achievement}
                                </span>
                              )
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((s, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                              >
                                {s}
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

        case "education":
          return user.education && user.education.length > 0 ? (
            <section className="py-10 bg-gray-50 overflow-hidden">
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
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        {edu.gpa && (
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">
                              {edu.gpa}
                            </div>
                            <div className="text-sm text-gray-500">GPA</div>
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {edu.degree}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-4">
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span className="font-semibold">{edu.institution}</span>
                      </div>

                      <div className="flex items-center text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>

                      {edu.description && (
                        <p className="text-gray-700 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ) : null;


        case "certifications":
          return user.certifications && user.certifications.length > 0 ? (
            <section className="py-10 bg-white overflow-hidden">
              <div className="max-w-6xl mx-auto px-4">

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Professional Certifications
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Industry-recognized credentials and achievements
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {cert.title}
                      </h3>

                      <p className="text-gray-600 font-medium mb-3">
                        {cert.platform}
                      </p>

                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{cert.date}</span>
                      </div>

                      {cert.certificateLink && (
                        <a
                          href={cert.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <span>View Certificate</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ) : null;

        case "testimonials":
          return user.testimonials && user.testimonials.length > 0 ? (
            <section className="py-10 bg-gray-50 overflow-hidden">
              <div className="max-w-4xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Client Testimonials
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    What colleagues and clients say about working with me
                  </p>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8"
                  >
                    <Quote className="w-12 h-12 text-blue-300 mb-6" />

                    <p className="text-xl text-gray-700 leading-relaxed mb-8 italic break-words">
                      "{user.testimonials[currentTestimonial].message}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={
                            user.testimonials[currentTestimonial].imageUrl ||
                            "https://via.placeholder.com/150"
                          }
                          alt={user.testimonials[currentTestimonial].name}
                          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
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
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
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
                        currentTestimonial === index
                          ? "bg-blue-600 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null;

        case "projects":
          return projects && projects.length > 0 ? (
            <section className="py-10 bg-white overflow-hidden">
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
                    A selection of recent work and professional achievements
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null;

        case "contact":
          return (
            <section className="pt-10 bg-gray-50 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Side: Contact Info */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-gray-900">
                    Get in touch
                  </h2>

                  <div className="space-y-3 text-gray-700">
                    <p>
                      <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {user.phoneNumber}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {user.location}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3 sm:space-x-4 mt-4 break-words">
                    {Object.entries(user.socialLinks || {}).map(
                      ([key, value]) => {
                        if (!value) return null;

                        let Icon;
                        let label;

                        switch (key) {
                          case "github":
                            Icon = Github;
                            label = "GitHub";
                            break;
                          case "linkedin":
                            Icon = Linkedin;
                            label = "LinkedIn";
                            break;
                          case "twitter":
                            Icon = Twitter;
                            label = "Twitter";
                            break;
                          case "instagram":
                            Icon = Instagram;
                            label = "Instagram";
                            break;
                          case "dribbble":
                            Icon = FaDribbble;
                            label = "Dribbble";
                            break;
                          case "behance":
                            Icon = FaBehance;
                            label = "Behance";
                            break;
                          case "website":
                            Icon = Globe;
                            label = "Website";
                            break;
                          default:
                            return null;
                        }

                        return (
                          <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-10 h-10 flex items-center justify-center bg-blue-600/80 text-white rounded-full hover:bg-blue-600 transition-colors relative"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white/90 text-slate-900 text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap transition-all duration-300">
                              {label}
                            </span>
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Right Side: Contact Form */}
                <div>
                  <form className="space-y-4 bg-white p-8 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Write something..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                    />
                    {/* <button
          type="submit"
          className="w-full bg-gray-900/50 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Send Message
        </button> */}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      type="submit"
                      className="mx-auto  lg:mx-0 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg  transition-all duration-300 font-bold flex items-center justify-center space-x-2 w-max"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </motion.button>
                  </form>
                </div>
              </div>
            </section>
          );

        default:
          return null;
      }
    },
    [visibleSections, user, projects, currentTestimonial]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />
      {/* NEW Professional Sidebar Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-1/4 -translate-y-1/2 z-50"
      >
        <div
          className={`flex flex-col items-center justify-between bg-slate-800/60 backdrop-blur-lg border border-white/20 p-3 rounded-2xl shadow-lg transition-all duration-300
    ${
      isMobile
        ? isOpen
          ? "h-[400px] w-[180px]"
          : "h-[60px] w-[60px]"
        : "h-[400px] w-[60px] group hover:w-[180px]"
    }
    `}
        >
          {/* Header with User Initial (Avatar Toggle on Mobile) */}
          <div
            className="w-10 h-10 cursor-pointer bg-gradient-to-br from-blue-500 source-code-pro-logo to-indigo-600 flex items-center justify-center rounded-full font-bold text-white text-lg"
            onClick={() => isMobile && setIsOpen(!isOpen)}
          >
            {user.fullName.charAt(0)}
          </div>

          {/* Navigation Links */}
          {(!isMobile || isOpen) && (
            <div className="flex flex-col items-start space-y-3 mt-6 w-full">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                    if (isMobile) setIsOpen(false); // auto-close mobile after click
                  }}
                  className="flex items-center w-full p-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  {/* Icon always visible */}
                  <div className="flex-shrink-0">{item.icon}</div>

                  {/* Text toggle */}
                  <span
                    className={`whitespace-nowrap ml-4 font-medium transition-all duration-300
                ${
                  isMobile
                    ? isOpen
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0"
                    : "opacity-0 group-hover:opacity-100 group-hover:w-auto"
                }
              `}
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}

    {/* Footer with Social Links */}
    {(!isMobile || isOpen) && (
      <div className="flex flex-col md:group-hover:flex-row group-hover:justify-evenly w-full items-center gap-4 mt-4">
        {user.socialLinks?.github && (
          <a
            href={user.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        )}
        {user.socialLinks?.linkedin && (
          <a
            href={user.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
        )}
      </div>
    )}
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

export default ProfessionalTemplate;
