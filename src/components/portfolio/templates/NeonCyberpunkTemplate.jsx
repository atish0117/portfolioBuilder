import React, { useState, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Terminal,
  Cpu,
  Code2,
  Rocket,
  Globe,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Star,
  Phone,
  Briefcase,
  MessageCircle,
  Trophy,
  Quote,
  ArrowRight,
  CheckCircle,
  Users,
  Clock,
  Twitter,
  Instagram,
} from "lucide-react";
import { FaDribbble, FaBehance } from "react-icons/fa";

import { FaWhatsapp } from "react-icons/fa";
import TagLineRender from "../../ui/TagLineRender"; // Assuming tagLineRender is a component that renders the tagLine content

const SectionWrapper = ({ children, className }) => (
  <section className={`py-20 bg-black relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-cyan-900/10"></div>
    <div className="relative max-w-6xl mx-auto px-8">{children}</div>
  </section>
);

const SectionTitle = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-16 font-mono"
  >
    {children}
  </motion.h2>
);

const NeonCyberpunkTemplate = ({
  user,
  projects,
  sectionOrder,
  visibleSections,
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  //for skills
  const proficiency = useMemo(() => Math.floor(Math.random() * 40) + 60, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setGlitchActive(true);
  //     setTimeout(() => setGlitchActive(false), 200);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (user.testimonials && user.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % user.testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [user.testimonials]);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case "hero":
        const ref = React.useRef(null);
        const { scrollYProgress } = useScroll();
        const backgroundY = useTransform(
          scrollYProgress,
          [0, 1],
          ["0%", "20%"]
        );

        // State for 3D tilt effect
        const [rotate, setRotate] = useState({ x: 0, y: 0 });

        const handleMouseMove = (e) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const xRotate = (mouseY / height - 0.5) * -20; // Invert for natural feel
          const yRotate = (mouseX / width - 0.5) * 20;

          setRotate({ x: xRotate, y: yRotate });
        };

        const handleMouseLeave = () => {
          setRotate({ x: 0, y: 0 });
        };

        return (
          <section
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4"
          >
            {/* Animated grid background with parallax */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{ y: backgroundY }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                  animation: "grid-move 20s linear infinite",
                }}
              />
            </motion.div>

            {/* Main 3D Card */}
            <motion.div
              className="relative w-full max-w-4xl bg-black/50 backdrop-blur-md border border-cyan-400/30 rounded-2xl px-6 pb-6 sm:px-8 sm:pb-8 text-center shadow-2xl"
              style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                boxShadow: `0 0 40px rgba(0, 255, 255, 0.3)`,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              {/* Hexagonal Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto mb-2"
              >
                <div
                  className="w-full h-full relative overflow-hidden" // Added relative and overflow-hidden here
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  {user.profileImgUrl ? (
                    <img
                      src={user.profileImgUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover object-top" // object-top makes it focus on the top of the image
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-black text-6xl font-bold">
                      {user.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    boxShadow: "0 0 20px 5px cyan",
                    animationDuration: "2s",
                  }}
                />
              </motion.div>

              {/* Glitchy Name */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 mb-4 glitch-text `}
                data-text={user.fullName}
                // style={{
                //   textShadow: glitchActive ? '2px 2px 0px #ff00ff, -2px -2px 0px #00ffff' : 'none',
                //   filter: glitchActive ? 'hue-rotate(90deg)' : 'none'
                // }}
              >
                {user.fullName}
              </motion.h1>

              {/* Title */}
              {user.title && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex items-center justify-center mb-2"
                >
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 mr-3" />
                  <p className="text-xl sm:text-2xl text-cyan-300 font-mono">
                    {user.title}
                  </p>
                </motion.div>
              )}

              {/* Tagline */}
              {user.tagLine && (
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-base sm:text-lg text-gray-300 max-w-2xl text-left mx-auto leading-relaxed mb-6  font-mono"
                >
                  <TagLineRender tagLine={user.tagLine} />
                </motion.p>
              )}

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <motion.a
                  href={user.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 0, 255, 0.8)",
                  }}
                  className="px-6 py-3 bg-black border-2 border-pink-500 text-pink-400 font-bold rounded-lg transition-all duration-300 font-mono"
                >
                  DOWNLOAD_CV.exe
                </motion.a>
                <motion.a
                  href="#projects"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
                  }}
                  className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg transition-all duration-300 font-mono"
                >
                  VIEW_PROJECTS
                </motion.a>
              </motion.div>
            </motion.div>
          </section>
        );

      case "about":
        const contactItems = [
          {
            icon: <Mail />,
            label: "Email",
            value: user.email,
            href: `mailto:${user.email}`,
            color: "text-cyan-400",
            borderColor: "border-cyan-400/50",
          },
          {
            icon: <Github />,
            label: "GitHub",
            value: "Repository",
            href: user.socialLinks?.github,
            color: "text-white",
            borderColor: "border-white/50",
          },
          {
            icon: <Linkedin />,
            label: "LinkedIn",
            value: "Profile",
            href: user.socialLinks?.linkedin,
            color: "text-blue-400",
            borderColor: "border-blue-400/50",
          },
          {
            icon: <Phone />,
            label: "Phone",
            value: user.phoneNumber,
            href: `tel:${user.phoneNumber}`,
            color: "text-pink-400",
            borderColor: "border-pink-400/50",
          },
        ].filter((item) => item.value);

        const keyDetails = [
          {
            icon: <Briefcase className="text-cyan-400" />,
            label: "Experience",
            value: user.workExperience,
          },
          {
            icon: <Globe className="text-purple-400" />,
            label: "Location",
            value: user.location,
          },
          {
            icon: <CheckCircle className="text-green-400" />,
            label: "Availability",
            value: user.availability,
          },
          {
            icon: <Users className="text-pink-400" />,
            label: "Work Type",
            value: user.preferredWorkType,
          },
          {
            icon: <Clock className="text-yellow-400" />,
            label: "Timezone",
            value: user.timezone,
          },
          {
            icon: <Star className="text-yellow-400" />,
            label: "Hourly Rate",
            value: user.hourlyRate,
          },
          {
            icon: <MessageCircle className="text-blue-400" />,
            label: "Languages",
            value: user.languages?.join(", "),
          },
        ].filter((item) => item.value);

        return (
          <SectionWrapper className="relative">
            {/* Scanline Animation */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 animate-scanline" />
            </div>

            <SectionTitle>&lt;USER_DATA/&gt;</SectionTitle>

            <div className="flex flex-col gap-16">
              {/* Top Section: Bio Terminal */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-black/70 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <p className="ml-auto text-xs text-cyan-300 font-mono">
                    /usr/bin/bio
                  </p>
                </div>
                {/* <div className="bg-black/50 p-4 rounded-md text-gray-300 font-mono text-left prose prose-invert prose-p:text-gray-300">
                        <TagLineRender tagLine={user.intro} />
                    </div> */}
                //...
                <div className="bg-black/50 p-4 rounded-md text-gray-300 font-mono text-left prose prose-invert prose-p:text-gray-300 h-52 md:h-60 lg:h-auto overflow-y-auto scrollbar-hide">
                  <TagLineRender tagLine={user.intro} />
                </div>
                ...//
              </motion.div>

              {/* Bottom Section: Key Details and Access Points */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Key Details Grid (Takes more space) */}
                <div className="lg:col-span-3">
                  <h3 className="text-2xl font-bold text-pink-400 font-mono mb-6">
                    // SYSTEM_SPECS
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {keyDetails.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                        }}
                        // *** YOUR CONDITIONAL CLASS IS APPLIED HERE ***
                        className={`group p-4 bg-gray-900/80 border border-white/20 rounded-lg text-center ${
                          item.label === "Languages"
                            ? "col-span-2 sm:col-span-2"
                            : ""
                        }`}
                      >
                        <div className="flex justify-center mb-2">
                          {item.icon}
                        </div>
                        <p className="text-sm font-bold text-white capitalize">
                          {item.value}
                        </p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Access Points List */}
                <div className=" lg:col-span-2">
                  <h3 className="text-2xl font-bold text-pink-400 font-mono mb-6">
                    // ACCESS_POINTS
                  </h3>
                  <div className="flex flex-col gap-4 w-full sm:w-1/2 md:w-full">
                    {contactItems.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ x: 10, scale: 1.05 }}
                        className={`group flex items-center justify-between p-4 bg-gray-900/80 border ${item.borderColor} rounded-lg transition-all duration-300`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={item.color}>{item.icon}</div>
                          <div>
                            <p className="font-bold text-white font-mono">
                              {item.label}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              @keyframes scanline {
                0% {
                  transform: translateY(-10%);
                  opacity: 0;
                }
                10% {
                  opacity: 0.5;
                }
                90% {
                  opacity: 0.5;
                }
                100% {
                  transform: translateY(100vh);
                  opacity: 0;
                }
              }
              .animate-scanline {
                animation: scanline 5s linear infinite;
              }
            `}</style>
          </SectionWrapper>
        );

      case "skills":
        return user?.skills && user?.skills.length > 0 ? (
          <section className="py-20 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-cyan-900/20"></div>
            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-16 font-mono"
              >
                &lt;SKILLS_MATRIX/&gt;
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, rotateY: -90 }}
                    whileInView={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
                      rotateY: 10,
                    }}
                    className="group p-6 bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-lg text-center font-mono relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <Cpu className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:animate-spin" />
                      <p className="text-cyan-300 font-bold text-lg">{skill}</p>
                      <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: proficiency }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "experience":
        return user.experienceDetails && user.experienceDetails.length > 0 ? (
          <SectionWrapper>
            <SectionTitle>[WORK_LOG]</SectionTitle>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-pink-500 animate-pulse"></div>

              <div className="space-y-12">
                {user.experienceDetails.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="relative pl-12 lg:pl-0 mb-12 lg:flex lg:items-center"
                    style={
                      index % 2 !== 0 ? { flexDirection: "row-reverse" } : {}
                    }
                  >
                    <div className="absolute top-0 left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full border-2 border-cyan-400"></div>

                    <div
                      className="lg:w-1/2"
                      style={
                        index % 2 === 0
                          ? { paddingRight: "2rem" }
                          : { paddingLeft: "2rem" }
                      }
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)",
                        }}
                        className="p-6 bg-black/70 backdrop-blur-md border border-pink-500/30 rounded-lg h-full flex flex-col"
                      >
                        <h3 className="text-xl font-bold text-pink-400 font-mono">
                          {exp.jobTitle}
                        </h3>
                        <p className="text-md text-cyan-300">
                          {exp.companyName}
                        </p>
                        <p className="text-xs text-gray-500 my-2">
                          {exp.duration}
                        </p>

                        {/* Responsibilities with line clamp */}
                        {exp.responsibilities && (
                          <p className="text-sm text-gray-300 font-mono mb-4 h-32 md:h-36 overflow-y-auto scrollbar-hide pr-2">
                            {exp.responsibilities}
                          </p>
                        )}

                        {/* Skills section */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-pink-500/20">
                            {exp.skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                                  i % 3 === 0
                                    ? "border-cyan-400 text-cyan-400"
                                    : i % 3 === 1
                                    ? "border-pink-400 text-pink-400"
                                    : "border-purple-400 text-purple-400"
                                }`}
                              >
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
          </SectionWrapper>
        ) : null;

      case "projects":
        return (
          <SectionWrapper>
            <SectionTitle>// PROJECT_ARCHIVE</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.02,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0, 255, 255, 0.3)",
                  }}
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 p-8"
                >
                  {/* Project Image as Background */}
                  {project.imageUrl && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${project.imageUrl})`,
                        filter: "brightness(0.5)", // Dim the image for text readability
                      }}
                    ></div>
                  )}
                  {/* Overlay to dim the background image further and remove on hover */}
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300"></div>

                  {/* Animated border - remains on top of image/overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                  {/* Glitch effect overlay - remains on top of image/overlay */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-pink-500 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative z-10 h-full flex flex-col justify-between overflow-auto scrollbar-hide">
                    {" "}
                    {/* Added overflow-auto scrollbar-hide */}
                    <div>
                      <div className="flex items-center mb-4">
                        <Rocket className="w-6 h-6 text-cyan-400 mr-3" />
                        <h3 className="text-2xl font-bold text-cyan-300 font-mono">
                          {project.title}
                        </h3>
                      </div>

                      {project.description && (
                        <p className="text-gray-300 mb-6 leading-relaxed font-mono text-sm">
                          {project.description}
                        </p>
                      )}

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                                techIndex % 3 === 0
                                  ? "border-cyan-400 text-cyan-400"
                                  : techIndex % 3 === 1
                                  ? "border-pink-400 text-pink-400"
                                  : "border-purple-400 text-purple-400"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-4 mt-auto">
                      {" "}
                      {/* mt-auto pushes buttons to bottom */}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-gray-800 text-cyan-400 rounded border border-cyan-400/50 hover:bg-cyan-400 hover:text-black transition-all duration-300 font-mono text-sm"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          SOURCE
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-mono text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          DEPLOY
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        );

      case "certifications":
        return (
          <SectionWrapper>
            <SectionTitle>[VERIFIED_CREDENTIALS]</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {user.certifications?.map((cert, index) => (
                <motion.a
                  key={index}
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="block p-6 bg-gray-900 border border-purple-500/30 rounded-lg text-center"
                >
                  <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                  <h4 className="font-bold text-purple-300 font-mono">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-500">{cert.platform}</p>
                </motion.a>
              ))}
            </div>
          </SectionWrapper>
        );

      case "testimonials":
        return (
          <SectionWrapper>
            <SectionTitle>// INCOMING_TRANSMISSIONS</SectionTitle>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-3xl mx-auto p-8 bg-black/70 backdrop-blur-md border-2 border-pink-500/50 rounded-lg"
                style={{ boxShadow: "0 0 40px rgba(255, 0, 255, 0.3)" }}
              >
                <Quote className="absolute top-4 left-4 w-12 h-12 text-pink-500/20" />
                <p className="text-center text-xl italic text-gray-300 my-8 font-mono">
                  "{user.testimonials[currentTestimonial].message}"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={
                      user.testimonials[currentTestimonial].imageUrl ||
                      undefined
                    }
                    alt={user.testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-400"
                  />
                  <div>
                    <p className="font-bold text-pink-300">
                      {user.testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-cyan-400">
                      {user.testimonials[currentTestimonial].designation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </SectionWrapper>
        );

      case "contact":
        const socialPlatforms = [
          {
            key: "linkedin",
            icon: (
              <Linkedin className="w-12 h-12 text-pink-400 mx-auto mb-4 group-hover:animate-bounce" />
            ),
            title: "LINKEDIN_NET",
            subtitle: "Professional Network",
            color: "pink",
            boxShadow: "0 0 30px rgba(255, 0, 255, 0.8)",
            rotate: -10,
            colSpan: "col-span-2", // This will be used by the grid inside the left column
          },
          {
            key: "github",
            icon: (
              <Github className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:animate-bounce" />
            ),
            title: "GITHUB_REPO",
            subtitle: "Code Repository",
            color: "purple",
            boxShadow: "0 0 30px rgba(128, 0, 255, 0.8)",
            rotate: 10,
            colSpan: "col-span-2", // This will be used by the grid inside the left column
          },
          {
            key: "twitter",
            icon: (
              <Twitter className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:animate-bounce" />
            ),
            title: "TWITTER",
            subtitle: "Live Updates",
            color: "blue",
            boxShadow: "0 0 30px rgba(0, 191, 255, 0.8)",
            rotate: -5,
            colSpan: "col-span-1", // This will be used by the grid inside the left column
          },
          {
            key: "instagram",
            icon: (
              <Instagram className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:animate-bounce" />
            ),
            title: "INSTAGRAM",
            subtitle: "Visuals & Stories",
            color: "purple",
            boxShadow: "0 0 30px rgba(217, 70, 239, 0.8)",
            rotate: 5,
            colSpan: "col-span-1", // This will be used by the grid inside the left column
          },
          {
            key: "dribbble",
            icon: (
              <FaDribbble className="w-8 h-8 text-pink-500 mx-auto mb-2 group-hover:animate-bounce" />
            ),
            title: "DRIBBBLE",
            subtitle: "Design Portfolio",
            color: "pink",
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.8)",
            rotate: -8,
            colSpan: "col-span-1", // This will be used by the grid inside the left column
          },
          {
            key: "behance",
            icon: (
              <FaBehance className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:animate-bounce" />
            ),
            title: "BEHANCE",
            subtitle: "Case Studies",
            color: "blue",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
            rotate: 3,
            colSpan: "col-span-1", // This will be used by the grid inside the left column
          },
          {
            key: "website",
            icon: (
              <Globe className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:animate-bounce" />
            ),
            title: "WEBSITE",
            subtitle: "Main Hub",
            color: "green",
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.8)",
            rotate: -3,
            colSpan: "col-span-1", // This will be used by the grid inside the left column
          },
        ];

        return (
          <section className="pt-10 bg-black relative overflow-hidden">
            {/* Matrix rain effect */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-cyan-400 font-mono text-sm animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  {Math.random() > 0.5 ? "1" : "0"}
                </div>
              ))}
            </div>

            <div className="relative max-w-7xl mx-auto px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-8 font-mono"
              >
                ESTABLISH_CONNECTION()
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-cyan-300 mb-12 font-mono"
              >
                Ready to hack the future together?
              </motion.p>

              {/* --- NEW TWO-COLUMN LAYOUT (using Flexbox) --- */}
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                {/* --- Left Column: Social Links --- */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h3 className="text-3xl font-bold text-pink-400 font-mono mb-6 text-left">
                    // DIRECT_LINKS
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    {/* Email Card (Always shows - 2 cols wide) */}
                    <motion.a
                      href={`mailto:${user.email}`}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)",
                        rotateY: 10,
                      }}
                      className="group p-8 bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-lg hover:border-cyan-400 transition-all duration-300 col-span-2"
                    >
                      <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:animate-bounce" />
                      <p className="text-cyan-300 font-mono font-bold">
                        EMAIL_PROTOCOL
                      </p>
                      <p className="text-gray-400 font-mono text-sm mt-2 break-words">
                        {user.email}
                      </p>
                    </motion.a>

                    {/* Dynamically rendered social link cards */}
                    {socialPlatforms.map((platform) => {
                      const url = user.socialLinks?.[platform.key];
                      if (!url) return null; // If link doesn't exist, don't render

                      // big card (col-span-2)
                      if (
                        platform.key === "linkedin" ||
                        platform.key === "github"
                      ) {
                        return (
                          <motion.a
                            key={platform.key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                              scale: 1.1,
                              boxShadow: platform.boxShadow,
                              rotateY: platform.rotate,
                            }}
                            className={`group p-8 bg-gradient-to-br from-gray-900 to-black border border-${platform.color}-400/30 rounded-lg hover:border-${platform.color}-400 transition-all duration-300 ${platform.colSpan}`}
                          >
                            {platform.icon}
                            <p
                              className={`text-${platform.color}-300 font-mono font-bold`}
                            >
                              {platform.title}
                            </p>
                            <p className="text-gray-400 font-mono text-xs mt-2">
                              {platform.subtitle}
                            </p>
                          </motion.a>
                        );
                      }

                      // small card (col-span-1)
                      return (
                        <motion.a
                          key={platform.key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            scale: 1.1,
                            boxShadow: platform.boxShadow,
                            rotateY: platform.rotate,
                          }}
                          className={`group p-6 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black border border-${platform.color}-400/30 rounded-lg hover:border-${platform.color}-400 transition-all duration-300 w-40 h-36`}
                        >
                          {platform.icon}
                          <p
                            className={`text-${platform.color}-300 font-mono font-bold mt-3 text-sm`}
                          >
                            {platform.title}
                          </p>
                          <p
                            className={`text-gray-400 font-mono font-bold mt-3 text-sm`}
                          >
                            {platform.subtitle}
                          </p>
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>

                {/* --- Right Form --- */}
                <motion.div
                  className="lg:w-1/2 mb-2"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="text-3xl font-bold text-pink-400 font-mono mb-6 text-left">
                    // SEND_SIGNAL
                  </h3>

                  <form className="bg-gray-900/40 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-md text-left space-y-6">
                    <div>
                      <label className="block text-cyan-400 mb-2">
                        > YOUR_NAME:
                      </label>
                      <input
                        type="text"
                        className="w-full bg-black/50 border border-cyan-500/30 text-cyan-300 px-4 py-3 rounded-md focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-cyan-400 mb-2">
                        > YOUR_EMAIL:
                      </label>
                      <input
                        type="email"
                        className="w-full bg-black/50 border border-cyan-500/30 text-cyan-300 px-4 py-3 rounded-md focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-cyan-400 mb-2">
                        > YOUR_MESSAGE:
                      </label>
                      <textarea
                        rows="4"
                        className="w-full bg-black/50 border border-cyan-500/30 text-cyan-300 px-4 py-3 rounded-md focus:outline-none focus:border-cyan-400"
                      ></textarea>
                    </div>

                    <button className="w-full py-3 text-lg font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all duration-200">
                      SEND_SIGNAL()
                    </button>
                  </form>
                </motion.div>
              </div>
              <div className="w-full text-center text-sm text-gray-400 py-2 bg-black border-t border-gray-800">
                © {new Date().getFullYear()} {user?.fullName || "Your Name"}. All
                rights reserved.
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black font-mono">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Custom cursor */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div
          className="absolute w-4 h-4 bg-cyan-400 rounded-full mix-blend-difference animate-pulse"
          style={{
            left: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
            top: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
          }}
        />
      </div>

      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}

      <style>{`
                @keyframes grid-move {
                    0% { background-position: 0 0; }
                    100% { background-position: 50px 50px; }
                }
                .glitch-text { position: relative; }
                .glitch-text:hover::before, .glitch-text:hover::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: black;
                    overflow: hidden;
                }
                .glitch-text:hover::before {
                    left: 2px;
                    text-shadow: -2px 0 #ff00ff;
                    animation: glitch-anim-1 2s infinite linear alternate-reverse;
                }
                .glitch-text:hover::after {
                    left: -2px;
                    text-shadow: -2px 0 #00ffff;
                    animation: glitch-anim-2 2s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim-1 { 0% { clip-path: inset(10% 0 80% 0); } 100% { clip-path: inset(40% 0 20% 0); } }
                @keyframes glitch-anim-2 { 0% { clip-path: inset(70% 0 10% 0); } 100% { clip-path: inset(20% 0 50% 0); } }
            `}</style>
    </div>
  );
};

export default NeonCyberpunkTemplate;
