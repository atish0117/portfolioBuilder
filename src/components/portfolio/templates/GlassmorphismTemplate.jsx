import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Sparkles,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Trophy,
  Star,
  Code,
  Briefcase,
  GraduationCap,
  User,
  Eye,
  Heart,
  Palette,
  Layers,
  Zap,
  Globe,
  MessageCircle,
  Clock,
  Stars,
  Quote,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import TagLineRender from "../../ui/TagLineRender";





const GlassmorphismTemplate = ({ user, projects, sectionOrder, visibleSections }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [colorTheme, setColorTheme] = useState(0);
  const { scrollYProgress } = useScroll();
  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const themes = [
    "from-purple-400 via-pink-500 to-red-500",
    "from-blue-400 via-purple-500 to-pink-500",
    "from-green-400 via-blue-500 to-purple-500",
    "from-yellow-400 via-orange-500 to-red-500",
    "from-indigo-400 via-purple-500 to-pink-500",
  ];

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case "hero":
        return (
          <section className="min-h-screen relative overflow-hidden">
            {/* Animated gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${themes[colorTheme]} opacity-80`}
            >
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-30" />
            </div>

            {/* Floating glass orbs */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>


            <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
              {/* Flex container: left content + right profile */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-7xl gap-12">
                {/* LEFT SIDE - Text Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Theme switcher */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 right-8 flex space-x-2"
                  >
                    {themes.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setColorTheme(index)}
                        className={`w-4 h-4 rounded-full border-2 border-white/30 ${
                          colorTheme === index ? "scale-125" : ""
                        } transition-transform`}
                        style={{
                          background: `linear-gradient(45deg, ${themes[index]
                            .split(" ")[0]
                            .replace("from-", "")}, ${themes[index]
                            .split(" ")[2]
                            .replace("to-", "")})`,
                        }}
                      />
                    ))}
                  </motion.div>



                {user.tagLine && (

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex justify-center lg:justify-start space-x-6"
                  >

                  <TagLineRender tagLine={user.tagLine}/> 

                  </motion.p>
                )}


                {/* RIGHT SIDE - Profile Image */}
                <motion.div
                  className="relative hidden pt-12 lg:flex flex-col items-center "
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Background blobs */}
                  <motion.div
                    className="absolute -top-10 -left-10 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-2xl blur-2xl"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  />

                  {/* Profile + Contact as one glass card */}
                  <div className="relative w-[420px] mx-auto p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
                    {/* Profile Image */}
                    <div className="w-full h-[420px] rounded-2xl overflow-hidden border-4 border-white/30 shadow-lg">
                      {user.profileImgUrl ? (
                        <img
                          src={user.profileImgUrl}
                          alt={user.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center text-8xl font-bold">
                          {user.fullName?.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Contact Section attached below */}
                    <div className="flex flex-col items-center gap-6  overflow-hidden pb-1 ">
                      {/* Social Icons */}
                      <div className="flex gap-6">
                        <a
                          href={user.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-b-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] transition transform hover:scale-110"
                        >
                          <FaLinkedin size={26} />
                        </a>
                        <a
                          href={user.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-b-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-500 hover:text-white hover:shadow-[0_0_20px_rgba(0,0,0,0.8)] transition transform hover:scale-110"
                        >
                          <FaGithub size={26} />
                        </a>
                        <a
                          href={user.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-b-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-300 hover:text-white hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] transition transform hover:scale-110"
                        >
                          <FaInstagram size={26} />
                        </a>
                        <a
                          href={`https://wa.me/${user.phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-b-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 hover:text-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] transition transform hover:scale-110"
                        >
                          <FaWhatsapp size={26} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            /</div>
          </section>
        );

      case "about":
        return (
          <section id="about" className="py-20 relative overflow-hidden">
            {/* Background Gradient + Subtle Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-pink-200/20 to-indigo-300/20" />
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>

            {/* Floating Glass Elements */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              {/* Section Heading */}
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-extrabold text-center mb-12
                     bg-clip-text text-transparent
                     bg-gradient-to-br ${themes[colorTheme]}
                     drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                About Me
              </motion.h2>

              {/* Intro */}
              {user.intro && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-xl border break-words border-white/20 rounded-2xl p-8 text-lg leading-relaxed mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)] transition-all duration-500"
                  dangerouslySetInnerHTML={{ __html: user.intro }}
                />
              )}

              {/* Quick Info Cards */}
              <div className="flex flex-wrap gap-4 mb-16">
                {[
                  {
                    icon: <Zap />,
                    label: "Availability",
                    value: user.availability,
                  },
                  {
                    icon: <Briefcase />,
                    label: "Experience",
                    value: user.workExperience,
                  },
                  {
                    icon: <Globe />,
                    label: "Work Type",
                    value: user.preferredWorkType,
                  },
                  {
                    icon: <MessageCircle />,
                    label: "Languages",
                    value: user.languages?.join(", "),
                  },
                  { icon: <Clock />, label: "Timezone", value: user.timezone },
                  {
                    icon: <Stars />,
                    label: "Hourly Rate",
                    value: user.hourlyRate,
                  },
                ].map(
                  (item, index) =>
                    item.value && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="w-[45%] sm:w-[30%] md:w-[22%] 
                     bg-white/10 backdrop-blur-xl border border-white/20 
                     rounded-xl p-5 flex items-center gap-4 
                     shadow-[0_8px_32px_rgba(0,0,0,0.25)] 
                     hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)] 
                     transition-all duration-500"
                      >
                        <div className="text-purple-400">{item.icon}</div>
                        <div>
                          <p className="text-sm text-white/60">{item.label}</p>
                          <p className="font-semibold capitalize text-white">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    )
                )}
              </div>

              {/* About Sections */}
              {user.aboutSections && user.aboutSections.length > 0 && (
                <div className="flex flex-wrap justify-center gap-6">
                  {user.aboutSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="w-[250px] bg-white/10 backdrop-blur-xl border border-white/20 
                   rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all 
                   duration-500 hover:-translate-y-2 flex flex-col items-center text-center"
                    >
                      {/* Top Image */}
                      <div className="mb-4 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                        <img
                          src="/default.png"
                          alt={section.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm text-white/70 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case "skills":
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 relative overflow-hidden">
            {/* Background with subtle gradient & texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent backdrop-blur-xl">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-20" />
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-extrabold text-center mb-16 
                   bg-clip-text text-transparent 
                   bg-gradient-to-br ${themes[colorTheme]}`}
                style={{ textShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
              >
                Skills & Expertise
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      y: -8,
                      scale: 1.04,
                      rotateY: 3,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    }}
                    className="group relative p-6 
                       rounded-2xl 
                       bg-white/10 backdrop-blur-lg
                       border border-white/20 
                       shadow-md hover:shadow-xl 
                       transition-all duration-300"
                  >
                    {/* Icon with glowing hover effect */}
                    <div className="relative">
                      <Code className="w-12 h-12 text-purple-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Skill name */}
                    <p
                      className="text-xl font-bold tracking-wide 
             bg-clip-text text-transparent 
             bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 
             drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] 
             transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                    >
                      {skill}
                    </p>

                    {/* Progress bar with gradient */}
                    <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.random() * 30 + 70}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-br ${themes[colorTheme]} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section className="py-20 relative overflow-hidden">
            {/* Background Gradient + Subtle Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-pink-200/20 to-indigo-300/20" />
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              {/* Section Heading */}
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-extrabold text-center mb-16 
                   bg-clip-text text-transparent 
                   bg-gradient-to-br ${themes[colorTheme]} 
                   drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                Featured Projects
              </motion.h2>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-transparent">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{
                      y: -15,
                      scale: 1.03,
                      rotateY: index % 2 === 0 ? 6 : -6,
                    }}
                    className="group relative overflow-hidden rounded-3xl
                       bg-white/10 backdrop-blur-xl 
                       border border-white/30 
                       shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                       hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
                       transition-all duration-500"
                  >
                    {/* Project image frosted top */}
                    {/* Project Image */}
                    <div className="h-52 relative overflow-hidden rounded-t-3xl">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`flex items-center justify-center h-full bg-gradient-to-br ${themes[colorTheme]}`}>
                          <Layers className="w-16 h-16 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Card Body */}
                    <div className="p-8">
                      <h3
                        className="text-2xl font-bold text-white mb-4 
                             drop-shadow-[0_1px_5px_rgba(0,0,0,0.3)]
                             group-hover:text-purple-200 transition-colors"
                      >
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className="text-white/80 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-3 mb-6">
                          {project.techStack.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, y: 15, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                delay: i * 0.07,
                                duration: 0.4,
                                ease: "easeOut",
                              }}
                              whileHover={{
                                scale: 1.15,
                                y: -3,
                                boxShadow:
                                  "0 8px 25px rgba(255, 255, 255, 0.25)",
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
                                borderColor: "rgba(255,255,255,0.6)",
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 rounded-xl text-base font-semibold cursor-default
                   bg-white/10 backdrop-blur-lg text-white/90 border border-white/30
                   shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]
                   transition-all duration-300 relative overflow-hidden"
                            >
                              {/* Shine Effect */}
                              <span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                         translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"
                              />

                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center px-6 py-3 rounded-xl 
               bg-white/10 backdrop-blur-md text-white font-medium 
               border border-white/30 
               overflow-hidden group
               transition-all duration-300 ease-out"
                          >
                            {/* Gradient Border Glow (hover pe active hoga) */}
                            <span
                              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${themes[colorTheme]}
                     opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500`}
                            ></span>

                            {/* Shine Effect */}
                            <span
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                     translate-x-[-150%] group-hover:translate-x-[150%] 
                     transition-transform duration-700 ease-in-out"
                            ></span>

                            {/* Content */}
                            <span className="relative flex items-center z-10">
                              <Github className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                              Code
                            </span>
                          </a>
                        )}

                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center px-6 py-3 
                               bg-gradient-to-br ${themes[colorTheme]} 
                               text-white rounded-xl 
                               scale-100 hover:scale-105 
                               transition-all duration-300 shadow-lg`}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        )}
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
          <section id="experience" className="py-20 relative overflow-hidden">
            {/* Background Gradient + Subtle Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-pink-200/20 to-indigo-300/20" />
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>

            {/* Floating Glass Elements */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative max-w-2xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-extrabold text-center mb-16 
                     bg-clip-text text-transparent 
                     bg-gradient-to-br ${themes[colorTheme]}
                     drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                Work Experience
              </motion.h2>

              <div className="relative border-l-2 border-white/20 ml-4">
                {user.experienceDetails.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="mb-10 ml-8"
                  >
                    <span className={`absolute flex items-center justify-center w-10 h-10 bg-gradient-to-br ${themes[colorTheme]} rounded-full -left-5 border-1  backdrop-blur-sm`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </span>

                    <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)] transition-all duration-500">
                      <p className="text-sm text-white/60 mb-1">
                        {exp.duration}
                      </p>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {exp.jobTitle}
                      </h3>
                      <p className="text-md font-semibold text-purple-300 mb-3">
                        {exp.companyName}
                      </p>
                      <p className="text-white/80">{exp.responsibilities}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

        
        {/* 🏆 Certifications Section */}
        case "certifications":
        return (
          user.certifications &&
          user.certifications.length > 0 && (
            <section
              id="certifications"
              className="py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 relative"
            >
              <div className="max-w-6xl mx-auto px-8">
                 <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-extrabold text-center mb-16 
                     bg-clip-text text-transparent 
                     bg-gradient-to-br ${themes[colorTheme]}
                     drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                Certifications
              </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 15px 40px rgba(255,255,255,0.2)",
                      }}
                      className="relative flex flex-col justify-between p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl 
                     shadow-[0_8px_32px_rgba(0,0,0,0.25)] 
                     hover:shadow-[0_12px_48px_rgba(255,255,255,0.2)] 
                     hover:bg-white/20 transition-all duration-500"
                    >
                      {/* Top Icon & Title */}
                      <div className="flex items-center gap-4 mb-3">
                        <Trophy className="w-6 h-6 text-purple-300" />
                        <h3 className="text-lg font-bold text-white">
                          {cert.title}
                        </h3>
                      </div>

                      {/* Issuer */}
                      <p className="text-white/70 mb-4">
                        Issued by:{" "}
                        <span className="font-medium">{cert.platform}</span>
                      </p>

                      {/* Bottom Button */}
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-auto inline-block px-4 py-2 text-sm font-semibold text-white bg-gradient-to-br ${themes[colorTheme]} 
                       rounded-xl hover:scale-105 transition-all duration-300 text-center`}
                      >
                        View Certificate
                      </a>

                      {/* Optional floating shine */}
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )
        );
     
        {/* 🎓 Education Section */}
        case "education":
        return (
          user.education &&
          user.education.length > 0 && (
            <section
              id="education"
              className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative"
            >
              <div className="max-w-5xl mx-auto px-8">
                <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`text-5xl font-extrabold text-center mb-16 
                     bg-clip-text text-transparent 
                     bg-gradient-to-br ${themes[colorTheme]}
                     drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                  Education & Qualifications
              </motion.h2>
                <div className="relative w-full py-10">
                  {/* Vertical glowing line */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 h-full w-[3px] 
                  bg-gradient-to-br ${themes[colorTheme]} animate-pulse`}
                  />

                  {user.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className={`relative w-full flex items-center mb-12 ${
                        index % 2 === 0 ? "justify-start" : "justify-end"
                      }`}
                    >
                      {/* Card */}
                      <div
                        className={`w-[45%] p-4 bg-gradient-to-br from-white/10 via-white/5 to-white/10 
                   backdrop-blur-2xl border border-white/20 rounded-2xl
                   shadow-[0_8px_32px_rgba(0,0,0,0.3)] 
                   hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] 
                   transition-all duration-500
                   ${index % 2 === 0 ? "mr-auto ml-0" : "ml-auto mr-0"}`}
                      >
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-white/70 italic">
                          {edu.startYear} – {edu.endYear || "Present"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )
        );

      case "testimonials":
        return user?.testimonials && user?.testimonials.length > 0 ? (
          <section id="testimonials" className="py-20 relative overflow-hidden">
            {/* Background Gradient + Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-pink-200/20 to-indigo-300/20" />
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>

            {/* Floating Circles */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                  style={{ left: `${i * 15 + 5}%`, top: `${i * 10 + 10}%` }}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative max-w-[70%] mx-auto px-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-br ${themes[colorTheme]} drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                What Clients Say
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {user.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? 2 : -2,
                      y: -10,
                    }}
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
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      >
                        <Quote className="w-12 h-12 text-purple-400 mb-6" />
                        
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
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${themes[colorTheme]} flex items-center justify-center text-white font-bold mr-4 border-2 border-white/30`}>
                              {testimonial.name?.charAt(0) || "User"}
                            </div>
                          )}
                          <motion.div
                            className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                          />
                        </motion.div>
                        <div>
                          <h4 className="text-white font-bold">
                            {testimonial.name}
                          </h4>
                          <p className="text-white/70 text-sm">
                            {testimonial.designation}
                          </p>
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
                              <Star
                                className="text-yellow-400 fill-current"
                                size={16}
                              />
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
          </section>
        ) : null;

      case "contact":
        return (
          <section className="py-20 relative overflow-hidden">
            {/* Background same as projects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-300/20 via-pink-200/20 to-indigo-300/20" />
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-overlay opacity-10" />
            </div>

            {/* Floating glass elements */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="relative max-w-5xl mx-auto px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`text-5xl md:text-6xl font-extrabold mb-12 
                 bg-clip-text text-transparent 
                bg-gradient-to-br ${themes[colorTheme]} 
                 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]`}
              >
                Let's Connect
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Email",
                    value: user.email,
                    icon: <Mail className="w-12 h-12 text-red-400" />,
                    href: `mailto:${user.email}`,
                  },
                  {
                    title: "GitHub",
                    value: "Code Repository",
                    icon: <Github className="w-12 h-12 text-gray-200" />,
                    href: user.socialLinks?.github || "#",
                  },
                  {
                    title: "LinkedIn",
                    value: "Professional Network",
                    icon: <Linkedin className="w-12 h-12 text-blue-500" />,
                    href: user.socialLinks?.linkedin || "#",
                  },
                  {
                    title: "WhatsApp",
                    value: user.phoneNumber,
                    icon: <FaWhatsapp className="w-12 h-12 text-green-400" />,
                    href: `https://wa.me/${user.phoneNumber}`,
                  },
                  {
                    title: "Phone",
                    value: user.phoneNumber,
                    icon: <Phone className="w-12 h-12 text-yellow-400" />,
                    href: user.phoneNumber ? `tel:${user.phoneNumber}` : null,
                  },
                  {
                    title: "Address",
                    value: user.location,
                    icon: <MapPin className="w-12 h-12 text-pink-400" />,
                    href: `https://www.google.com/maps/search/${encodeURIComponent(
                      user.location
                    )}`,
                  },
                ].map(({ title, value, icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href || "#"}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noopener noreferrer" : undefined}
                    whileHover={{
                      y: -8,
                      scale: 1.05,
                      boxShadow: "0 15px 30px rgba(255,255,255,0.25)",
                    }}
                    className="group relative p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)] transition-all duration-300"
                  >
                    <div className="relative mb-6">{icon}</div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {title}
                    </h3>
                    <p className="text-white/80">{value}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-50"
        style={{ scaleX: springScrollProgress, transformOrigin: "0%" }}
      />

      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}
    </div>
  );
};

export default GlassmorphismTemplate;
