import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
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
  ChevronDown,
  Quote,
  CheckCircle,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Building,
  Globe,
  Send,
  MessageCircle,
  Coffee,
  Lightbulb,
  Sparkles,
  Menu,
  X,
  Home,
  Server,
  Smartphone,
  Database,
  Layers,
  Monitor,
  Cloud,
  Cpu,
  Code2,
  Terminal,
} from "lucide-react";
import TagLineRender from "../../ui/TagLineRender";

const MinimalistTemplate = ({
  user,
  projects,
  sectionOrder,
  visibleSections,
}) => {
  const [activeSection, setActiveSection] = useState("hero");

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [skillsInView, setSkillsInView] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState("fullstack");
  console.log(user);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const navigationItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Lightbulb },
    { id: "contact", label: "Contact", icon: Mail },

  ];

  const specializations = [
    {
      id: "fullstack",
      title: "Full Stack Developer",
      icon: Layers,
      description:
        "Building complete web applications from frontend to backend with modern technologies.",
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "TypeScript",
        "PostgreSQL",
      ],
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "frontend",
      title: "Frontend Developer",
      icon: Monitor,
      description:
        "Creating beautiful, responsive user interfaces with modern frameworks and libraries.",
      skills: [
        "React",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "SASS",
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "backend",
      title: "Backend Developer",
      icon: Server,
      description:
        "Developing robust server-side applications, APIs, and database architectures.",
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "Docker"],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "mobile",
      title: "Mobile Developer",
      icon: Smartphone,
      description:
        "Building native and cross-platform mobile applications for iOS and Android.",
      skills: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Firebase",
        "Expo",
      ],
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "mern",
      title: "MERN Stack Developer",
      icon: Database,
      description:
        "Specializing in MongoDB, Express.js, React, and Node.js for full-stack development.",
      skills: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "JWT"],
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: "devops",
      title: "DevOps Engineer",
      icon: Cloud,
      description:
        "Streamlining development workflows with CI/CD, cloud infrastructure, and automation.",
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Linux"],
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "ai",
      title: "AI/ML Developer",
      icon: Cpu,
      description:
        "Developing intelligent applications using machine learning and artificial intelligence.",
      skills: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "OpenAI",
        "Pandas",
      ],
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "blockchain",
      title: "Blockchain Developer",
      icon: Code2,
      description:
        "Building decentralized applications and smart contracts on various blockchain platforms.",
      skills: [
        "Solidity",
        "Web3.js",
        "Ethereum",
        "Smart Contracts",
        "DeFi",
        "NFTs",
      ],
      color: "from-yellow-500 to-orange-500",
    },

  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map((item) => item.id);
      const currentSection = sections.find((section) => {

        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

  const toggleProjectLike = (projectId) => {
    setLikedProjects((prev) => {

      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      setMobileMenuOpen(false);
    }
  };

  const renderSection = (sectionId) => {
    const isVisible = visibleSections[sectionId];
    if (!isVisible) return null;

    switch (sectionId) {
      case "hero":
        return (
          <section
            id="hero"
            className="min-h-screen bg-white relative overflow-hidden"
          >
            {/* Interactive background elements */}
            <div className="absolute inset-0">

              {/* Floating geometric shapes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gray-300 rounded-full"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",

                  }}
                />
              ))}
            </div>

            {/* Navigation dots */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
              {["hero", "skills", "experience", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() =>
                      document
                        .getElementById(section)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSection === section
                        ? "bg-gray-900 scale-125"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                  />
                )
              )}
            </div>

            <div className="relative z-10 pb-12 flex items-center justify-center min-h-screen px-8">

              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  {user.profileImgUrl ? (
                    <div className="relative group">
                      <img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-40 h-40 rounded-full object-cover mx-auto mb-8 border-4 border-gray-100 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 text-5xl font-light mx-auto mb-8 shadow-xl">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight"
                >
                  {user.fullName}
                </motion.h1>

                {user.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center justify-center mb-8"
                  >
                    <Sparkles className="w-5 h-5 text-blue-500 mr-3" />
                    <p className="text-xl text-gray-600 font-light">
                      {user.title}
                    </p>
                    <Sparkles className="w-5 h-5 text-purple-500 ml-3" />
                  </motion.div>
                )}

                {user.tagLine && (

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
                  >
                    <TagLineRender tagLine={user.tagLine} />

                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
                >
                  <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">View Resume</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a href={`mailto:${user.email}`} rel="noopener noreferrer" className="flex items-center space-x-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Hire Me</span>
                  </a>

                </motion.div>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="grid grid-cols-3 gap-8 max-w-md mx-auto"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {projects?.length || 0}
                    </div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.workExperience || 0}
                    </div>
                    <div className="text-sm text-gray-500">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {user.skills?.length || 0}
                    </div>

                    <div className="text-sm text-gray-500">Skills</div>
                  </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 "
                >
                  <motion.div
                    onClick={() => scrollToSection("about")}

                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-gray-400"
                  >
                    <span className="text-sm mb-2">Scroll to explore</span>
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case "about":
        return (
          <section
            id="about"
            className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />

            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  About Me
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover my expertise and specialization in modern development
                </p>
              </motion.div>

              {/* Specialization Selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {specializations.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedSpecialization(spec.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedSpecialization === spec.id
                          ? "bg-gray-900 text-white shadow-lg scale-105"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"

                      }`}
                    >
                      {spec.title}
                    </button>
                  ))}
                </div>

                {/* Selected Specialization Display */}
                <motion.div
                  key={selectedSpecialization}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        specializations.find(
                          (s) => s.id === selectedSpecialization
                        )?.color
                      } flex items-center justify-center shadow-lg`}
                    >
                      {React.createElement(
                        specializations.find(
                          (s) => s.id === selectedSpecialization
                        )?.icon || Code,
                        {
                          className: "w-8 h-8 text-white",
                        }
                      )}

                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">
                    {
                      specializations.find(
                        (s) => s.id === selectedSpecialization
                      )?.title
                    }
                  </h3>

                  <p className="text-gray-600 text-center mb-8 leading-relaxed max-w-2xl mx-auto">
                    {
                      specializations.find(
                        (s) => s.id === selectedSpecialization
                      )?.description
                    }

                  </p>

                  {/* Core Technologies */}
                  <div className="text-center">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Core Technologies
                    </h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      {specializations
                        .find((s) => s.id === selectedSpecialization)
                        ?.skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                          >
                            {skill}
                          </motion.span>
                        ))}

                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Mission
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Creating innovative solutions that solve real-world problems
                    and deliver exceptional user experiences.

                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Approach
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Combining cutting-edge technology with clean, maintainable
                    code and agile development practices.

                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Passion
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Passionate about continuous learning, mentoring others, and
                    contributing to the developer community.

                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case "skills":
        return user.skills && user.skills.length > 0 ? (
          <section
            id="skills"
            className="py-20 bg-white relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />

            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  Skills & Expertise
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A comprehensive overview of my technical skills and
                  professional competencies

                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onViewportEnter={() => setSkillsInView(true)}
                    className="group p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Skill icon */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Code className="w-6 h-6 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {skill}
                      </h3>

                    </div>

                    {/* Skill level indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Proficiency</span>
                        <span>{Math.floor(Math.random() * 20) + 80}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${Math.floor(Math.random() * 20) + 80}%`,
                          }}

                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </motion.div>
                ))}
              </div>

              {/* Skills summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100">
                  <Target className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Always learning and growing
                  </span>

                </div>
              </motion.div>
            </div>
          </section>
        ) : null;

      case "experience":

        return user.experienceDetails && user.experienceDetails.length > 0 ? (
          <section id="experience" className="py-20 bg-gray-50 relative">
            <div className="max-w-4xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  Professional Experience
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                  My journey through various roles and the impact I've made
                </p>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="space-y-12">
                  {user.experienceDetails.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="relative pl-16"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg"></div>

                      <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {exp.jobTitle}
                            </h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <Building className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                {exp.companyName}
                              </span>

                            </div>
                          </div>
                          <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                            <Calendar className="w-4 h-4 mr-2" />
                            {/* <span className="text-sm">{exp.startDate} - {exp.endDate}</span> */}
                            <p className="text-slate-600 font-medium">
                              {exp.duration}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Key achievements */}
                        {exp.responsibilities && (
                          <p className="text-slate-700 mb-4 leading-relaxed">
                            {exp.responsibilities}
                          </p>
                        )}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

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
          <section id="education" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  Education
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                  Academic foundation and continuous learning journey
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education?.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-6 h-6 text-purple-600" />
                      </div>
                      {/* {edu.gpa && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{edu.gpa}</div>
                          <div className="text-sm text-gray-500">GPA</div>
                        </div>
                      )} */}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {edu.degree}
                    </h3>


                    <div className="flex items-center text-gray-600 mb-4">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span className="font-medium">{edu.institution}</span>
                    </div>

                    <div className="flex items-center text-gray-500 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {edu.startYear} {edu.startYear && edu.endYear && "-"}{" "}
                        {edu.endYear}
                      </span>

                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "certifications":

        return user.certifications && user.certifications.length > 0 ? (
          <section id="certifications" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  Certifications
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                  Professional certifications and achievements
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Achievement badge */}
                    <div className="absolute top-4 right-4">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>

                    <div className="mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6 text-yellow-700" />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                        {cert.title}
                      </h3>

                      <p className="text-gray-600 font-medium mb-2">
                        {cert.issuer}
                      </p>


                      {/* <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{cert.date}</span>
                      </div> */}
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
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-700 font-medium">
                        Verified
                      </span>

                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "testimonials":

        return user.testimonials && user.testimonials.length > 0 ? (
          <section id="testimonials" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  What People Say
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                  Testimonials from colleagues, clients, and collaborators
                </p>
              </motion.div>

              {/* Main testimonial display */}
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-2xl p-8 pb-10 shadow-lg border border-gray-100 mb-8 relative"
              >
                <Quote className="w-12 h-12 text-gray-300 mb-6" />

                <p className="text-lg text-gray-700 leading-relaxed mb-8 italic break-words">
                  "{user.testimonials[currentTestimonial].message}"

                </p>

                <div className="flex items-center">
                  <img
                    src={user.testimonials[currentTestimonial].imageUrl}

                    alt={user.testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {user.testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {user.testimonials[currentTestimonial].designation}

                    </div>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center mt-4 space-x-1 float-end">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />

                  ))}
                </div>
              </motion.div>

              {/* Testimonial navigation */}
              <div className="flex justify-center space-x-2">
                {user.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index
                        ? "bg-gray-900 scale-125"
                        : "bg-gray-300 hover:bg-gray-500"

                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "projects":

        return projects && projects.length > 0 ? (
          <section id="projects" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  Featured Projects
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                  A showcase of my recent work and creative solutions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => {
                  const imageUrl = project.images?.length
                    ? project.images.find((img) => img.isPrimary)?.url ||
                      project.images[0]?.url
                    : project.imageUrl;
                  return (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500"
                    >
                      {/* Project image placeholder */}
                      <div className="h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lightbulb className="w-16 h-16 text-gray-400 group-hover:text-gray-500 transition-colors" />
                        </div>

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

                        {/* Like button */}
                        <button
                          onClick={() => toggleProjectLike(project._id)}
                          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 group-hover:scale-110"
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              likedProjects.has(project._id)
                                ? "text-red-500 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {project.title.toUpperCase()}
                        </h3>

                        {project.description && (
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {project.description}
                          </p>
                        )}

                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                              >
                                {tech}
                              </span>
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
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group/link"
                              >
                                <Github className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                                <span className="text-sm font-medium">
                                  Code
                                </span>
                              </a>
                            )}
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group/link"
                              >
                                <ExternalLink className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                                <span className="text-sm font-medium">
                                  Live Demo
                                </span>
                              </a>
                            )}
                          </div>

                         
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

              </div>
            </div>
          </section>
        ) : null;

      case "contact":

        return (
          <section id="contact" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-light text-gray-900 mb-4">
                  Let's Work Together
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Ready to bring your ideas to life? Let's start a conversation
                  about your next project.

                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact info */}
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <a
                        href={`mailto:${user.email}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >

                        {user.email}
                      </a>
                    </div>
                  </motion.div>

                  {user.phone && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="flex items-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Phone
                        </h3>
                        <a
                          href={`tel:${user.phone}`}
                          className="text-gray-600 hover:text-green-600 transition-colors"
                        >

                          {user.phone}
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {user.location && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex items-center p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          Location
                        </h3>

                        <p className="text-gray-600">{user.location}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Social links */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex space-x-4"
                  >
                    {user.socialLinks?.github && (
                      <a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                      >
                        <Github className="w-6 h-6 text-gray-600 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
                      </a>
                    )}
                    {user.socialLinks?.linkedin && (
                      <a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                      >
                        <Linkedin className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Contact form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Send a Message
                  </h3>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>

                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>

                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>

                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>


                    <button
                      type="submit"
                      className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-center mt-16"
              >
                <div className="inline-flex items-center px-6 py-3 bg-gray-50 rounded-full shadow-sm border border-gray-100">
                  <Coffee className="w-5 h-5 text-amber-500 mr-2" />
                  <span className="text-gray-700">
                    Available for freelance projects
                  </span>

                </div>
              </motion.div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div style={{ opacity }} className="min-h-screen bg-white relative">
      {/* Fixed navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">

          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-semibold text-gray-900 text-lg cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              {user.fullName.split(" ")[0]}
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">

              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"

                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}

            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}

            className="lg:hidden overflow-hidden"
          >
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"

                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Custom cursor */}
      {/* <div 

        className="fixed w-4 h-4 bg-gray-900 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      /> */}

      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>

      ))}
    </motion.div>
  );
};

export default MinimalistTemplate;

