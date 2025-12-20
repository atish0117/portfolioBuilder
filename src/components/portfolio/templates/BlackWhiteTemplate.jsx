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
  Clock,
  Users,
  Eye,
  Heart,
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
  ChevronDown,
  Sparkles,
  MousePointer,
  Layers,
  Grid,
  Square,
  Circle,
  Twitter,
  Instagram,
  Dribbble,
  Menu, 
  X 
} from "lucide-react";

import { FaBehance } from "react-icons/fa";

import TagLineRender from "../../ui/TagLineRender";

// Memoized floating geometric shapes
const FloatingShape = memo(({ index, delay }) => {
  const shapes = [Square, Circle, Grid, Layers];
  const Shape = shapes[index % shapes.length];

  return (
    <motion.div
      className="absolute opacity-10"
      style={{
        left: `${10 + (index % 10) * 8}%`,
        top: `${20 + (index % 4) * 20}%`,
      }}
      animate={{
        y: [0, -50, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 8 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Shape className="w-8 h-8 text-white" />
    </motion.div>
  );
});

// Interactive skill card with hover effects
// const InteractiveSkillCard = memo(({ skill, index }) => {
//     const [isHovered, setIsHovered] = useState(false);
//     const proficiency = Math.floor(Math.random() * 25) + 75; // 75-100%
//     const size = 180; // थोड़ा बड़ा साइज़
//     const strokeWidth = 12;
//     const radius = (size - strokeWidth) / 2;
//     const circumference = 2 * Math.PI * radius;

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
//             onHoverStart={() => setIsHovered(true)}
//             onHoverEnd={() => setIsHovered(false)}
//             className="relative flex flex-col items-center justify-center w-[200px] h-[200px] cursor-pointer"
//         >
//             {/* Animated background on hover */}
//             <motion.div
//                 className="absolute inset-0 bg-black rounded-full"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: isHovered ? 1 : 0 }}
//                 transition={{ duration: 0.4, ease: "circOut" }}
//             />

//             {/* SVG for Radial Progress */}
//             <svg width={size} height={size} className="absolute transform -rotate-90">
//                 <circle
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke={isHovered ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
//                     strokeWidth={strokeWidth}
//                     fill="transparent"
//                     className="transition-colors duration-300"
//                 />
//                 <motion.circle
//                     cx={size / 2}
//                     cy={size / 2}
//                     r={radius}
//                     stroke={isHovered ? "#FFFFFF" : "#000000"}
//                     strokeWidth={strokeWidth}
//                     fill="transparent"
//                     strokeDasharray={circumference}
//                     initial={{ strokeDashoffset: circumference }}
//                     animate={{
//                         strokeDashoffset: isHovered ? circumference * (1 - proficiency / 100) : circumference
//                     }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                     strokeLinecap="round"
//                 />
//             </svg>

//             {/* Content in the center */}
//             <motion.div
//                 className="relative z-10 text-center flex flex-col items-center"
//                 layout
//             >
//                 {/* Your provided initial circle */}
//                 <motion.div
//                   className={`w-16 h-16 flex items-center justify-center text-2xl font-bold rounded-full mb-2 transition-all duration-500 ${
//                     isHovered
//                       ? 'bg-white text-black'
//                       : 'bg-gradient-to-r from-black to-gray-700 text-white'
//                   }`}
//                   whileHover={{ rotate: [0, 5, -5, 0], transition: { duration: 0.5 } }}
//                 >
//                   {skill.charAt(0).toUpperCase()}
//                 </motion.div>

//                 {/* Full skill name */}
//                 <motion.h3
//                     layout="position"
//                     className={`font-bold transition-colors duration-300 max-w-[120px] text-center ${
//                         isHovered ? "text-white" : "text-black"
//                     }`}
//                 >
//                     {skill}
//                 </motion.h3>
//             </motion.div>
//         </motion.div>
//     );
// });

const InteractiveSkillCard = memo(({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const proficiency = Math.floor(Math.random() * 25) + 75; // 75-100%

  // Responsive sizes
  const sizeMap = { sm: 120, md: 160, lg: 180 };
  const [size, setSize] = useState(sizeMap.lg);
  const strokeWidth = 10;

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSize(sizeMap.sm);
        setIsMobile(true);
      } else if (width < 1024) {
        setSize(sizeMap.md);
        setIsMobile(false);
      } else {
        setSize(sizeMap.lg);
        setIsMobile(false);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const toggleCard = () => {
    if (isMobile) {
      setIsHovered((prev) => !prev); // click se toggle hoga
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={toggleCard}
      className="relative flex items-center justify-center cursor-pointer select-none "
      style={{ width: size, height: size }}
    >
      {/* Hover background */}
      <motion.div
        className="absolute inset-0 bg-black rounded-full shadow-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "circOut" }}
      />
      {/* White background */}
      <motion.div
        className="absolute inset-0 bg-white rounded-full border-2 border-gray-100"
        animate={{ scale: isHovered ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "circIn" }}
      />

      {/* SVG Progress */}
      <svg width={size} height={size} className="absolute transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isHovered ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)"}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="transition-colors duration-300"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isHovered ? "#FFFFFF" : "#000000"}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: isHovered
              ? circumference * (1 - proficiency / 100)
              : circumference,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="font-black bg-gradient-to-r from-black/90 to-gray-400 bg-clip-text text-transparent
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {skill.charAt(0).toUpperCase()}
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl capitalize">
                {skill}
              </h3>
              <p className="font-black text-white mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                {proficiency}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

// Interactive project card with flip effect
const InteractiveProjectCard = memo(({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 500) + 100);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);

  const handleLike = useCallback(() => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  }, [liked]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.5)",
      }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative h-96 perspective-1000 rounded-2xl"
    >
      <motion.div
        className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d rounded-2xl cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-gray-200 rounded-2xl group-hover:border-black transition-all duration-300 overflow-hidden">
          {/* Project image area */}
          <div className="h-48 bg-gray-900 relative overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <Lightbulb className="w-16 h-16 text-white/80" />
              </div>
            )}

            <motion.div
              className="absolute inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={isFlipped ? { opacity: 0 } : {}}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <button
              onClick={handleLike}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 z-10"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  liked ? "text-red-500 fill-current" : "text-white"
                }`}
              />
            </button>

            <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium z-10">
              Click to flip →
            </div>
          </div>

          <div className="p-6 flex flex-col justify-between h-[calc(24rem-12rem)]">
            <div className="">
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors uppercase">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {project.description}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{views}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{likes}</span>
                </div>
              </div>
              <MousePointer className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-black rounded-2xl border-2 border-white sm:border-black text-white p-6 transform rotateY-180 ">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 uppercase">
                {project.title}
              </h3>
              {project.description && (
                <div className="max-h-28 mb-4 overflow-auto scrollbar-hide bg-gray-900 rounded-md">
                  <p className="text-gray-300 leading-relaxed break-words p-2 ">
                    {project.description}
                  </p>
                </div>
              )}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-900 capitalize text-white rounded-full text-sm font-medium border border-white/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
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
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center px-4 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const BlackWhiteTemplate =({
  user,
  projects,
  sectionOrder,
  visibleSections,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { scrollYProgress } = useScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  console.log("user backand white",user);


  // Mouse tracking for interactive cursor
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const renderSection = useCallback(
    (sectionId) => {
      if (!visibleSections[sectionId]) return null;

      switch (sectionId) {
        case "hero":
          return (
            <section className="relative min-h-screen bg-black overflow-hidden">
              <div className="absolute inset-0 z-0">
                {Array.from({ length: 20 }, (_, i) => (
                  <FloatingShape key={i} index={i} delay={i * 0.2} />
                ))}
              </div>

              {/* Right Panel: Image */}
              <motion.div
                className="absolute top-0 right-0 h-full w-full lg:w-1/2 z-0"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
              >
                <motion.div
                  className="h-full w-full bg-contain bg-no-repeat bg-center  grayscale"
                  style={{
                    backgroundImage: `url(${
                      user.profileImgUrl || "https://via.placeholder.com/800"
                    })`,
                    clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
                    y: y, // Apply parallax effect
                  }}
                />
              </motion.div>

              {/* Left Panel: Content */}
              <motion.div
                className="absolute top-0 left-0 h-full w-full lg:w-1/2 bg-black/70 sm:bg-transparent flex items-center"
                style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 0% 100%)" }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
              >
                <div className="relative w-full max-w-xl mx-auto px-8 py-10 pb-32 lg:py-20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className=" sm:mb-8"
                  >
                    <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-light sm:font-medium  border border-white/20">
                      <Zap className="w-4 h-4 mr-2" />
                      Available for Creative Projects
                    </span>
                  </motion.div>

                  <h1 className="text-5xl sm:text-6xl lg:text-7xl  font-black text-white mb-3 sm:mb-6 leading-tight">
                    <motion.span
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="block"
                    >
                      {user.fullName}
                    </motion.span>
                  </h1>

                  {user.title && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="flex items-center mb-0 sm:mb-8"
                    >
                      <div className="w-12 h-0.5 bg-white mr-4"></div>
                      <p className="text-2xl text-gray-300 font-normal sm:font-medium ">
                        {user.title}
                      </p>
                    </motion.div>
                  )}

                  {user.tagLine && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="text-lg text-gray-400 mb-6 sm:mb-12 leading-relaxed max-w-lg prose prose-invert"
                    >
                      <TagLineRender tagLine={user.tagLine} />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                    className="flex flex-col w-3/4 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
                  >
                    {user.resumeUrl && (
                      <motion.a
                        href={user.resumeUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center justify-center px-8 sm:px-4 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-bold"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Resume
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    )}
                    <a
                      href="#projects"
                      className="flex items-center justify-center px-8 sm:px-4 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Explore Work
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex flex-col items-center text-white/70"
                >
                  <span className="text-xl mb-1">Scroll</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </section>
          );

        case "about":

          const keyDetails = [
            {
              icon: <Briefcase />,
              label: "Experience",
              value: user.workExperience,
            },
            { icon: <Globe />, label: "Location", value: user.location },
            {
              icon: <CheckCircle />,
              label: "Availability",
              value: user.availability,
            },
            {
              icon: <Users />,
              label: "Work Type",
              value: user.preferredWorkType,
            },
            { icon: <Clock />, label: "Timezone", value: user.timezone },
            { icon: <Star />, label: "Hourly Rate", value: user.hourlyRate },
            {
              icon: <MessageCircle />,
              label: "Languages",
              value: user.languages?.join(", "),
            },
          ];

          return (
            <section id="about" className="py-20 bg-white  overflow-hidden sm:overflow-visible">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl font-black text-black mb-4">
                    About Me
                  </h2>
                  <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                  <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    My professional background, core values, and what drives me
                    to create exceptional digital experiences.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Left Column: All Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-12"
                  >
                    {/* Professional Summary */}
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-6">
                        Professional Summary
                      </h3>
                      <div className="text-gray-700 leading-relaxed prose prose-lg">
                        <TagLineRender tagLine={user.intro} />
                      </div>
                    </div>

                    {/* Key Details - Smaller Boxes */}
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-6">
                        Key Details
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {keyDetails.map(
                          (item, index) =>
                            item.value && (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: index * 0.1,
                                }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                // Conditional class for Languages box width
                                className={`group p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-black transition-all duration-300 cursor-pointer text-center ${
                                  item.label === "Languages"
                                    ? "col-span-2 sm:col-span-2"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-center mb-2">
                                  {React.cloneElement(item.icon, {
                                    className: `w-6 h-6 text-gray-500 group-hover:text-black transition-colors`,
                                  })}
                                </div>
                                <p
                                  className={`text-sm font-bold transition-colors text-black capitalize`}
                                >
                                  {item.value}
                                </p>
                                <p
                                  className={`text-xs transition-colors text-gray-500`}
                                >
                                  {item.label}
                                </p>
                              </motion.div>
                            )
                        )}
                      </div>
                    </div>

                    {/* 'What I Offer' Accordion */}
                    {user.aboutSections && user.aboutSections.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-6">
                          What I Offer
                        </h3>
                        <div className="space-y-4">
                          {user.aboutSections.map((section, index) => {
                            const isOpen = expandedIndex === index;
                            return (
                              <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.5,
                                  delay: index * 0.15,
                                }}
                                className={`bg-gray-50 rounded-lg border transition-all duration-300 ${
                                  isOpen ? "border-black" : "border-gray-100"
                                }`}
                              >
                                <button
                                  onClick={() =>
                                    setExpandedIndex(isOpen ? null : index)
                                  }
                                  className="w-full flex items-center justify-between p-6 text-left"
                                >
                                  <div className="flex items-center gap-4">
                                    <div
                                      className={`p-3 rounded-full transition-colors duration-300 ${
                                        isOpen
                                          ? "bg-black text-white"
                                          : "bg-gray-200 text-black"
                                      }`}
                                    >
                                      <Target className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-black text-lg">
                                      {section.title}
                                    </h4>
                                  </div>
                                  <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                  </motion.div>
                                </button>

                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                      }}
                                      className="overflow-hidden"
                                    >
                                      <p className="px-6 pb-6 text-gray-600 leading-relaxed ml-16 break-words">
                                        <TagLineRender
                                          tagLine={section.description}
                                        />
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Right Column: Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className=" mt-8 md:mt-0  md:flex md:justify-center  lg:sticky lg:top-24  "
                  >
                    <motion.img
                      whileHover={{ scale: 1.03, rotateY: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      src={
                        user.profileImgUrl ||
                        "https://via.placeholder.com/600x700"
                      }
                      alt={user.fullName}
                      className="
      w-full max-w-sm md:max-w-md lg:max-w-lg
      h-auto rounded-2xl object-cover
      shadow-2xl border-4 border-gray-100
    "
                    />
                  </motion.div>
                </div>
              </div>
            </section>
          );

        case "skills":
          return user.skills && user.skills.length > 0 ? (
            <section className="py-20 bg-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              <div className="relative max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl font-black text-black mb-4">
                    Skills & Expertise
                  </h2>
                  <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                  <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Interactive showcase of technical skills and professional
                    competencies
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {user.skills.map((skill, index) => (
                    <InteractiveSkillCard
                      key={skill}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null;

        case "experience":
    return user.experienceDetails && user.experienceDetails.length > 0 ? (
        <section id="experience" className="py-20 bg-black relative">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black text-white mb-4">
                        Professional Journey
                    </h2>
                    <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A timeline of my career progression and key achievements.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* The timeline line - now responsive */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20 lg:left-1/2 lg:-translate-x-1/2"></div>

                    <div className="space-y-16">
                        {user.experienceDetails.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                // On mobile, everything is on one side. On desktop (lg), it alternates.
                                className={`relative flex items-center lg:justify-start ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Timeline Dot and Connector - now responsive */}
                                <div className={`absolute top-5 z-10 left-4 lg:left-1/2 transform lg:-translate-x-1/2 flex items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                    <motion.div
                                        className="w-5 h-5 bg-black rounded-full border-4 border-white shadow-lg"
                                        whileHover={{ scale: 1.5 }}
                                    />
                                    {/* Connector line is hidden on mobile, shown on desktop */}
                                    <div className="hidden lg:block w-8 h-0.5 bg-white/30"></div>
                                </div>

                                {/* Card Container - full width on mobile, half on desktop */}
                                <div className={`w-full pl-12 lg:pl-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-left`}
                                    >
                                        <div className={`flex items-center mb-3`}>
                                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mr-4 group-hover:bg-white group-hover:border-2 group-hover:border-black transition-colors duration-300">
                                                <Briefcase className="w-6 h-6 text-white group-hover:text-black transition-colors duration-300" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-black">{exp.jobTitle}</h3>
                                                <p className="text-gray-600 font-semibold">{exp.companyName}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-4">{exp.duration}</p>
                                        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4 overflow-auto scrollbar-hide border-b-2">{exp.responsibilities}</p>
                                        
                                        {exp.skills && exp.skills.length > 0 && (
                                            <div className={`flex flex-wrap gap-2`}>
                                                {exp.skills.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    ) : null;

        case "education":
    return user.education && user.education.length > 0 ? (
        <section className="py-20 bg-white relative">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black text-black mb-4">
                        Education
                    </h2>
                    <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Academic foundation and continuous learning
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {user.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group bg-black rounded-2xl p-8 text-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ borderRadius: "16px" }}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center"
                                    >
                                        <GraduationCap className="w-8 h-8 text-black" />
                                    </motion.div>
                                    {/* FIX: Conditional rendering for GPA */}
                                    {edu.gpa && (
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-white">
                                                {edu.gpa}
                                            </div>
                                            <div className="text-sm text-gray-400">GPA</div>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold mb-1">
                                    {edu.degree}
                                </h3>
                                {/* NEW: Animated underline on hover */}
                                <div className="w-1/4 h-0.5 bg-white/50 mb-3 transition-all duration-500 group-hover:w-full"></div>

                                <div className="flex items-center text-gray-300 mb-4">
                                    <BookOpen className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="font-semibold">
                                        {edu.institution}
                                    </span>
                                </div>

                                <div className="flex items-center text-gray-400 mb-4">
                                    <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
                                    <span className="text-sm">
                                        {/* FIX: Using startYear and endYear from schema */}
                                        {edu.startYear} - {edu.endYear || 'Present'}
                                    </span>
                                </div>

                                {/* FIX: Conditional rendering for description */}
                                {edu.description && (
                                    <p className="text-gray-300 leading-relaxed">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    ) : null;

        case "certifications":
          return user.certifications && user.certifications.length > 0 ? (
            <section className="py-20 bg-black relative">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl font-black text-white mb-4">
                    Certifications
                  </h2>
                  <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                  <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Professional credentials and achievements that validate my
                    skills and expertise.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.certifications.map((cert, index) => (
                    <motion.a
                      key={index}
                      href={cert.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="group block bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ borderRadius: "16px" }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-500 ${"bg-black group-hover:bg-white"}`}
                          >
                            <Trophy
                              className={`w-6 h-6 transition-colors duration-500 ${"text-white group-hover:text-black"}`}
                            />
                          </motion.div>
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>

                        <h3
                          className={`text-lg font-bold mb-2 transition-colors duration-500 ${"text-black group-hover:text-white"}`}
                        >
                          {cert.title}{" "}
                          {/* Corrected: cert.name -> cert.title */}
                        </h3>

                        <p
                          className={`font-medium mb-3 transition-colors duration-500 ${"text-gray-600 group-hover:text-gray-300"}`}
                        >
                          {cert.platform}{" "}
                          {/* Corrected: cert.issuer -> cert.platform */}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          ) : null;

        case "testimonials":
    return user.testimonials && user.testimonials.length > 0 ? (
        <section className="py-20 bg-white relative">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-black text-black mb-4">
                        Client Testimonials
                    </h2>
                    <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        What clients and colleagues say about working with me
                    </p>
                </motion.div>

                <div className="relative h-96 flex items-center justify-center">
                    <AnimatePresence>
                        {user.testimonials.map((testimonial, index) => {
                            // Determine the position of the card in the stack
                            const offset = index - currentTestimonial;
                            const isVisible = Math.abs(offset) < 3; // Show only 3 cards at a time

                            if (!isVisible) return null;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                                    animate={{
                                        scale: 1 - Math.abs(offset) * 0.05,
                                        y: offset * 40,
                                        zIndex: user.testimonials.length - Math.abs(offset),
                                        opacity: 1,
                                    }}
                                    exit={{ scale: 0.8, y: -50, opacity: 0 }}
                                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                    className="absolute w-full max-w-2xl bg-black rounded-3xl p-8 sm:p-12 text-white shadow-2xl border-2"
                                >
                                    <div className="relative z-10">
                                        <Quote className="w-16 h-16 text-white/20 mb-6" />
                                        <p className="text-xl sm:text-2xl leading-relaxed mb-8 italic min-h-[100px]">
                                            "{testimonial.message}" {/* FIX: .content -> .message */}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    src={testimonial.imageUrl || "https://via.placeholder.com/150"}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white/20"
                                                />
                                                <div>
                                                    <div className="font-bold text-white text-lg">
                                                        {testimonial.name}
                                                    </div>
                                                    <div className="text-gray-400">
                                                        {testimonial.designation} {/* FIX: .position -> .designation */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons and Dots */}
                <div className="flex items-center justify-center mt-12 space-x-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentTestimonial(prev => (prev > 0 ? prev - 1 : user.testimonials.length - 1))}
                        className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    >
                        <ChevronDown className="w-6 h-6 rotate-90" />
                    </motion.button>

                    <div className="flex justify-center space-x-3">
                        {user.testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    currentTestimonial === index ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-500"
                                }`}
                            />
                        ))}
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentTestimonial(prev => (prev + 1) % user.testimonials.length)}
                        className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                    >
                        <ChevronDown className="w-6 h-6 -rotate-90" />
                    </motion.button>
                </div>
            </div>
        </section>
    ) : null;

        case "projects":
          return projects && projects.length > 0 ? (
            <section className="py-20 bg-black relative">
              <div className="max-w-6xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl font-black text-white mb-4">
                    Featured Projects
                  </h2>
                  <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                  <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Interactive showcase of creative work and solutions
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <InteractiveProjectCard
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
    // This array maps schema keys to icons and labels for dynamic rendering
    const socialPlatforms = [
        { key: 'github', icon: Github, label: 'GitHub' },
        { key: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
        { key: 'twitter', icon: Twitter, label: 'Twitter' },
        { key: 'instagram', icon: Instagram, label: 'Instagram' },
        { key: 'dribbble', icon: Dribbble, label: 'Dribbble' },
        { key: 'behance', icon: FaBehance, label: 'Behance' }, 
        { key: 'website', icon: Globe, label: 'Website' },
    ];

    return (
        <section
            id="contact"
            className="py-20 bg-black relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl font-black text-white mb-6">
                            Let's Create Together
                        </h2>
                        <div className="w-24 h-1 bg-white mb-8"></div>
                        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                            Have a project in mind, or just want to say hello? I'd
                            love to hear from you. Fill out the form or reach out via
                            one of the methods below.
                        </p>

                        <div className="space-y-6 mb-12">
                            <a href={`mailto:${user.email}`} className="flex items-center group">
                                <div className="p-3 bg-white/10 rounded-lg border border-white/20 mr-4 group-hover:bg-white transition-colors">
                                    <Mail className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Email</h4>
                                    <p className="text-gray-400 group-hover:text-white transition-colors">{user.email}</p>
                                </div>
                            </a>
                            {user.phoneNumber && (
                                <a href={`tel:${user.phoneNumber}`} className="flex items-center group">
                                    <div className="p-3 bg-white/10 rounded-lg border border-white/20 mr-4 group-hover:bg-white transition-colors">
                                        <Phone className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Phone</h4>
                                        <p className="text-gray-400 group-hover:text-white transition-colors">{user.phoneNumber}</p>
                                    </div>
                                </a>
                            )}
                            {user.location && (
                                <div className="flex items-center group">
                                    <div className="p-3 bg-white/10 rounded-lg border border-white/20 mr-4">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Location</h4>
                                        <p className="text-gray-400">{user.location}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- DYNAMIC SOCIAL LINKS RENDERED HERE --- */}
                        <div className="flex flex-wrap gap-4">
                            {socialPlatforms.map((platform) => {
                                const url = user.socialLinks?.[platform.key];
                                if (!url) return null; // If link doesn't exist, don't render the icon

                                const Icon = platform.icon;
                                return (
                                    <motion.a
                                        key={platform.key}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -5 }}
                                        className="p-3 bg-white/10 text-white rounded-full border border-white/20 hover:bg-white hover:text-black transition-all"
                                    >
                                        <Icon className="w-6 h-6" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                    >
                        <form className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl">
                            <h3 className="text-3xl font-bold text-black mb-8">
                                Send a Message
                            </h3>
                            <div className="space-y-8">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows="5"
                                    className="w-full p-4 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors resize-none"
                                ></textarea>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full group flex items-center justify-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-bold text-lg"
                                >
                                    Send Message
                                    <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
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
    <div className="min-h-screen bg-white relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />
<motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}
>
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
            <span className="font-black text-2xl text-white source-code-pro-logo">
                {user.fullName ? user.fullName.charAt(0) : 'LOGO'}
            </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <button
                    key={item}
                    onClick={() =>
                        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                        isScrolled ? "text-black hover:text-gray-600" : "text-white hover:text-gray-300"
                    }`}
                >
                    {item}
                </button>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 z-50 relative">
                {isMenuOpen ? (
                    <X className="text-black" />
                ) : (
                    <Menu className={isScrolled ? "text-black" : "text-white"}/>
                )}
            </button>
        </div>
    </div>
</motion.nav>

{/* Mobile Menu Overlay */}
<AnimatePresence>
    {isMenuOpen && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-30 flex flex-col items-center justify-center space-y-8"
        >
            {["About", "Skills", "Experience", "Projects", "Contact"].map((item, index) => (
                <motion.button
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    onClick={() => {
                        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                        setIsMenuOpen(false);
                    }}
                    className="text-4xl font-black text-white hover:text-gray-400"
                >
                    {item}
                </motion.button>
            ))}
        </motion.div>
    )}
</AnimatePresence>

      {sectionOrder.map((sectionId) => (
        <div key={sectionId} id={sectionId}>
          {renderSection(sectionId)}
        </div>
      ))}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlackWhiteTemplate;
