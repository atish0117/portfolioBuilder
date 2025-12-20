
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Leaf,
  TreePine,
  Flower,
  Sun,
  Moon,
  Cloud,
  Mountain,
  Waves,
  Zap,
  Globe,
  MessageCircle,
  Clock,
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
  Sprout,
  Router as Butterfly,
  Bird,
} from "lucide-react";
import TagLineRender from "../../ui/TagLineRender";
import { FaWhatsapp ,FaInstagram,FaLinkedin,FaGithub} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const NatureOrganicTemplate = ({
  user,
  projects,
  sectionOrder,
  visibleSections,
}) => {
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [season, setSeason] = useState("spring");
  const [weatherEffect, setWeatherEffect] = useState("sunny");
  const [birdFlying, setBirdFlying] = useState(false);
  const { scrollYProgress } = useScroll();
  const cloudMovement = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const timeThemes = {
    dawn: "from-pink-300 via-orange-200 to-yellow-200",
    day: "from-blue-200 via-green-100 to-yellow-100",
    dusk: "from-orange-300 via-pink-200 to-purple-200",
    night: "from-indigo-900 via-purple-800 to-blue-900",
  };

  const seasonColors = {
    spring: "from-green-200 to-pink-200",
    summer: "from-yellow-200 to-green-300",
    autumn: "from-orange-200 to-red-300",
    winter: "from-blue-100 to-gray-200",
  };

  useEffect(() => {
    const birdInterval = setInterval(() => {
      setBirdFlying(true);
      setTimeout(() => setBirdFlying(false), 3000);
    }, 8000);

    return () => clearInterval(birdInterval);
  }, []);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    switch (sectionId) {
      case "hero":
        return (
          <section
            className={`min-h-screen bg-gradient-to-br ${timeThemes[timeOfDay]} relative overflow-hidden`}
          >
            {/* Nature background elements */}
            <div className="absolute inset-0">
              {/* Mountains */}
              <div
                className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-green-600 to-green-400 opacity-60"
                style={{
                  clipPath:
                    "polygon(0 100%, 20% 60%, 40% 80%, 60% 40%, 80% 70%, 100% 50%, 100% 100%)",
                }}
              />

              {/* Trees */}
              <div className="absolute bottom-16 left-10">
                <TreePine className="w-16 h-20 text-green-700 animate-sway" />
              </div>
              <div className="absolute bottom-20 right-20">
                <TreePine
                  className="w-12 h-16 text-green-800 animate-sway"
                  style={{ animationDelay: "1s" }}
                />
              </div>
              <div className="absolute bottom-12 left-1/3">
                <TreePine
                  className="w-20 h-24 text-green-600 animate-sway"
                  style={{ animationDelay: "2s" }}
                />
              </div>

              {/* Clouds */}
              <motion.div
                className="absolute top-20 left-10 text-white/80"
                style={{ x: cloudMovement }}
              >
                <Cloud className="w-16 h-12 animate-float" />
              </motion.div>
              <motion.div
                className="absolute top-32 right-20 text-white/60"
                style={{ x: cloudMovement }}
              >
                <Cloud
                  className="w-12 h-8 animate-float"
                  style={{ animationDelay: "1s" }}
                />
              </motion.div>

              {/* Flying bird */}
              {birdFlying && (
                <motion.div
                  initial={{ x: -100, y: 100 }}
                  animate={{ x: window.innerWidth + 100, y: 80 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                  className="absolute z-20"
                >
                  <Bird className="w-8 h-8 text-gray-700" />
                </motion.div>
              )}

              {/* Floating leaves */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Leaf className="w-6 h-6 text-green-500 opacity-70" />
                </motion.div>
              ))}

              {/* Butterflies */}
              <motion.div
                className="absolute top-1/3 left-1/4"
                animate={{
                  x: [0, 50, -30, 20, 0],
                  y: [0, -30, 20, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Butterfly className="w-8 h-8 text-purple-500" />
              </motion.div>
            </div>

            {/* Time/Weather controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 z-30">
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeOfDay("dawn")}
                  className={`p-2 rounded-full ${
                    timeOfDay === "dawn" ? "bg-pink-300" : "bg-white/20"
                  } backdrop-blur-sm`}
                >
                  <Sun className="w-4 h-4 text-pink-600" />
                </button>
                <button
                  onClick={() => setTimeOfDay("day")}
                  className={`p-2 rounded-full ${
                    timeOfDay === "day" ? "bg-yellow-300" : "bg-white/20"
                  } backdrop-blur-sm`}
                >
                  <Sun className="w-4 h-4 text-yellow-600" />
                </button>
                <button
                  onClick={() => setTimeOfDay("dusk")}
                  className={`p-2 rounded-full ${
                    timeOfDay === "dusk" ? "bg-orange-300" : "bg-white/20"
                  } backdrop-blur-sm`}
                >
                  <Sun className="w-4 h-4 text-orange-600" />
                </button>
                <button
                  onClick={() => setTimeOfDay("night")}
                  className={`p-2 rounded-full ${
                    timeOfDay === "night" ? "bg-indigo-300" : "bg-white/20"
                  } backdrop-blur-sm`}
                >
                  <Moon className="w-4 h-4 text-indigo-600" />
                </button>
              </div>

              <div className="flex space-x-2">
                {["spring", "summer", "autumn", "winter"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className={`p-2 rounded-full ${
                      season === s ? "bg-green-300" : "bg-white/20"
                    } backdrop-blur-sm`}
                  >
                    {s === "spring" && (
                      <Sprout className="w-4 h-4 text-green-600" />
                    )}
                    {s === "summer" && (
                      <Sun className="w-4 h-4 text-yellow-600" />
                    )}
                    {s === "autumn" && (
                      <Leaf className="w-4 h-4 text-orange-600" />
                    )}
                    {s === "winter" && (
                      <Mountain className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-evenly min-h-screen px-8">
              {/* LEFT SIDE - Text */}
              <div className="text-center md:text-left md:w-1/2 px-24">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold text-green-800 mb-6"
                  style={{
                    fontFamily: "serif",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {user.fullName}
                </motion.h1>

                {user.title && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center justify-center md:justify-start mb-8"
                  >
                    <Sprout className="w-6 h-6 text-green-600 mr-3 animate-pulse" />
                    <p
                      className="text-2xl text-green-700 font-medium"
                      style={{ fontFamily: "serif" }}
                    >
                      {user.title}
                    </p>
                    <Flower className="w-6 h-6 text-pink-500 ml-3 animate-bounce" />
                  </motion.div>
                )}

                {user.tagLine && (

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg text-green-700 max-w-xl break-words mx-auto md:mx-0 leading-relaxed mb-12 bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/40"
                    style={{ fontFamily: "serif" }}
                  >
                    <TagLineRender tagLine={user.tagLine}/> 


                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex justify-center md:justify-start space-x-6"
                >
                  <button
                    className="group px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold rounded-full hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    style={{ fontFamily: "serif" }}
                  >
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Download Resume</span>
                    </div>
                  </button>
                  <button
                    className="px-8 py-4 border-3 border-green-500 text-green-700 font-bold rounded-full hover:bg-green-100 transition-all duration-300 backdrop-blur-sm bg-white/20"
                    style={{ fontFamily: "serif" }}
                  >
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5" />
                      <span>View Portfolio</span>
                    </div>
                  </button>
                </motion.div>
              </div>

              {/* RIGHT SIDE - Profile */}
              <div className="w-full mt-12 md:mt-0 md:w-1/2 flex justify-center relative ">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                  className="relative w-[650px] h-[670px] py-24" // fixed height/width
                >
                  {/* Background Tree */}
                  <img
                    src="./tree.webp" // transparent PNG link (ibb.co reliable)
                    alt="Tree"
                    className=" w-full absolute inset-0  h-full object-contain opacity-80 -z-10 mt-10"
                  />

                  {/* Profile Image */}
                  {/* <div className="relative flex items-top justify-center h-full">
                    {user.profileImgUrl ? (
                      <img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-64 h-64 rounded-full object-cover border-8 border-white/40 shadow-2xl backdrop-blur-sm relative z-10"
                      />
                    ) : (
                      <div className="w-64 h-64 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center text-green-800 text-6xl font-bold border-8 border-white/40 shadow-2xl backdrop-blur-sm relative z-10">
                        {user.fullName.charAt(0)}
                      </div>
                    )}
                  </div> */}

                  {/* Social Icons at Tree Roots */}
                  {/* <div className="flex flex-col items-center gap-6  overflow-hidden pb-1 bg-slate-700 "> */}
                    {/* Social Icons */}
                    {/* <div className="flex gap-6 bg-slate-400"> */}
                     <a
  href={user.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-72 left-28 p-4 rounded-full 
             bg-white 
             backdrop-blur-xl border border-white/20 
             text-blue-500
            
             transition-transform duration-300 hover:scale-105"
>
  <FaLinkedin size={26} />
</a>

<a
  href={user.github}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-[298px] right-32 p-4 rounded-full 
             bg-white
             backdrop-blur-xl border border-white/20 
             text-gray-600
             transition-transform duration-300 hover:scale-105"
>
  <FaGithub size={26} />
</a>

<a
  href={user.instagram}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute top-60  right-60   p-4 rounded-full 
             bg-white
             backdrop-blur-xl border border-white/20 
             text-pink-500 
            
             transition-transform duration-300 hover:scale-105"
>
  <FaInstagram size={26} />
</a>

                      <a
  href={`https://wa.me/${user.phoneNumber}`}
  target="_blank"
  rel="noopener noreferrer"
  className="p-3 rounded-full absolute top-28 left-72
             bg-white
             text-green-500 shadow-lg
             transition-transform duration-300 hover:scale-105
             border-1 border-white/40 backdrop-blur-sm"
>
  <FaWhatsapp size={30} />
</a>

                      <a
  href={`https://wa.me/${user.twitter}`}
  target="_blank"
  rel="noopener noreferrer"
  className="p-3 rounded-full absolute top-44 left-44
             bg-white
             text-black shadow-lg
             transition-transform duration-300 hover:scale-105
             border-1 border-white/40 backdrop-blur-sm"
>
  <FaSquareXTwitter size={26} />
</a>

                    {/* </div> */}
                  {/* </div> */}
                </motion.div>
              </div>
            </div>
          </section>
        );

      case "about":
        return (
          <section id="about" className=" bg-green-500/30 relative">
            {/* Floating nature elements */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute opacity-40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {i % 3 === 0 && (
                    <Butterfly className="w-6 h-6 text-purple-400" />
                  )}
                  {i % 3 === 1 && <Leaf className="w-6 h-6 text-green-400" />}
                  {i % 3 === 2 && <Flower className="w-6 h-6 text-pink-400" />}
                </motion.div>
              ))}
            </div>

            <div className=" mx-auto px-8 relative z-10 py-12">
              {/* Background */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
              </div>

              {/* Section Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-green-800 mb-12"
                style={{ fontFamily: "serif" }}
              >
                About Me
              </motion.h2>

              {/* Intro */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/50 backdrop-blur-md max-w-4xl break-words border border-white/20 rounded-2xl p-8 text-left text-lg text-gray-700 leading-relaxed mb-16 shadow-lg"
              >
                {user.intro}
              </motion.div>

              {/* Stats */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pl-96">
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
                    icon: <Star />,
                    label: "Hourly Rate",
                    value: user.hourlyRate,
                  },
                ].map(
                  (item, index) =>
                    item.value && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/50 backdrop-blur-md border border-white/20 rounded-xl p-5 flex items-center gap-4 shadow-sm relative overflow-hidden"
                      >
                        {/* Subtle floating leaf on each stat */}
                        <motion.div
                          className="absolute w-5 h-5 opacity-30 top-2 right-2"
                          animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 4 + index,
                            ease: "easeInOut",
                          }}
                        >
                          <Leaf className="w-5 h-5 text-green-400" />
                        </motion.div>

                        <div className="text-green-600">{item.icon}</div>
                        <div>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="font-semibold capitalize text-gray-800">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    )
                )}
              </div>

              {/* About Sections */}
              {user.aboutSections && user.aboutSections.length > 0 && (
                <div className="grid md:grid-cols-2 gap-8">
                  {user.aboutSections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg relative overflow-hidden"
                    >
                      {/* Floating butterfly */}
                      <motion.div
                        className="absolute w-6 h-6 opacity-30 top-2 left-2"
                        animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 5 + index,
                          ease: "easeInOut",
                        }}
                      >
                        <Butterfly className="w-6 h-6 text-purple-400" />
                      </motion.div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          {/* <Layers className="text-green-700" /> */}
                        </div>
                        <h3
                          className="text-2xl font-bold text-green-800"
                          style={{ fontFamily: "serif" }}
                        >
                          {section.title}
                        </h3>
                      </div>
                      <p
                        className="text-gray-600"
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
          <section
            className={`py-20 bg-gradient-to-br ${seasonColors[season]} relative overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Floating nature elements */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {i % 4 === 0 && (
                    <Leaf className="w-8 h-8 text-green-400 opacity-60" />
                  )}
                  {i % 4 === 1 && (
                    <Flower className="w-6 h-6 text-pink-400 opacity-60" />
                  )}
                  {i % 4 === 2 && (
                    <Butterfly className="w-7 h-7 text-purple-400 opacity-60" />
                  )}
                  {i % 4 === 3 && (
                    <Sprout className="w-5 h-5 text-green-500 opacity-60" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-green-800 mb-16"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Growing Skills Garden
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className="group p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 text-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Growing plant animation */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "20px" }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="w-1 bg-green-500 rounded-t"
                      />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-4">
                        {index % 6 === 0 && (
                          <TreePine className="w-12 h-12 text-green-600 mx-auto group-hover:animate-bounce" />
                        )}
                        {index % 6 === 1 && (
                          <Flower className="w-12 h-12 text-pink-500 mx-auto group-hover:animate-bounce" />
                        )}
                        {index % 6 === 2 && (
                          <Leaf className="w-12 h-12 text-green-500 mx-auto group-hover:animate-bounce" />
                        )}
                        {index % 6 === 3 && (
                          <Sprout className="w-12 h-12 text-green-600 mx-auto group-hover:animate-bounce" />
                        )}
                        {index % 6 === 4 && (
                          <Butterfly className="w-12 h-12 text-purple-500 mx-auto group-hover:animate-bounce" />
                        )}
                        {index % 6 === 5 && (
                          <Sun className="w-12 h-12 text-yellow-500 mx-auto group-hover:animate-bounce" />
                        )}
                      </div>
                      <p
                        className="text-green-800 font-bold text-lg mb-4"
                        style={{ fontFamily: "serif" }}
                      >
                        {skill}
                      </p>

                      {/* Growth progress bar */}
                      <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.random() * 30 + 70}%` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
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
        return user.experience && user.experience.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Seasonal elements */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Leaf className="w-10 h-10 text-orange-400 opacity-50" />
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-4xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-amber-800 mb-16"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Professional Journey
              </motion.h2>

              <div className="space-y-12">
                {user.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`flex ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    } items-center`}
                  >
                    {/* Timeline tree */}
                    <div className="flex-shrink-0 mx-8">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <TreePine className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Experience card */}
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      }}
                      className="flex-1 p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg"
                    >
                      <div className="flex items-center mb-4">
                        <Briefcase className="w-6 h-6 text-amber-600 mr-3" />
                        <h3
                          className="text-2xl font-bold text-amber-800"
                          style={{ fontFamily: "serif" }}
                        >
                          {exp.position}
                        </h3>
                      </div>
                      <p
                        className="text-xl text-amber-700 mb-2"
                        style={{ fontFamily: "serif" }}
                      >
                        {exp.company}
                      </p>
                      <div className="flex items-center text-amber-600 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span style={{ fontFamily: "serif" }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p
                        className="text-amber-700 leading-relaxed"
                        style={{ fontFamily: "serif" }}
                      >
                        {exp.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "education":
        return user.education && user.education.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Floating academic elements */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <GraduationCap className="w-8 h-8 text-blue-400 opacity-40" />
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-blue-800 mb-16"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Academic Roots
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotateY: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.03,
                      rotateY: 5,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    }}
                    className="group p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg relative overflow-hidden"
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Sun className="w-8 h-8 text-yellow-400 opacity-60" />
                      </motion.div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
                        <h3
                          className="text-2xl font-bold text-blue-800"
                          style={{ fontFamily: "serif" }}
                        >
                          {edu.degree}
                        </h3>
                      </div>

                      <p
                        className="text-xl text-blue-700 mb-2"
                        style={{ fontFamily: "serif" }}
                      >
                        {edu.institution}
                      </p>

                      <div className="flex items-center text-blue-600 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span style={{ fontFamily: "serif" }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>

                      {edu.gpa && (
                        <div className="flex items-center mb-4">
                          <Star className="w-5 h-5 text-yellow-500 mr-2" />
                          <span
                            className="text-blue-700 font-bold"
                            style={{ fontFamily: "serif" }}
                          >
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      )}

                      {edu.description && (
                        <p
                          className="text-blue-700 leading-relaxed"
                          style={{ fontFamily: "serif" }}
                        >
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
          <section className="py-20 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Achievement sparkles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-emerald-800 mb-16"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Achievement Garden 🏆
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: Math.random() * 10 - 5,
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    }}
                    className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 text-center shadow-lg relative overflow-hidden"
                  >
                    {/* Trophy glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="mb-4"
                      >
                        <Award className="w-16 h-16 text-yellow-500 mx-auto" />
                      </motion.div>

                      <h3
                        className="text-xl font-bold text-emerald-800 mb-2"
                        style={{ fontFamily: "serif" }}
                      >
                        {cert.name}
                      </h3>

                      <p
                        className="text-emerald-700 mb-2"
                        style={{ fontFamily: "serif" }}
                      >
                        {cert.issuer}
                      </p>

                      <div className="flex items-center justify-center text-emerald-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span style={{ fontFamily: "serif" }}>{cert.date}</span>
                      </div>

                      {cert.credentialId && (
                        <p className="text-sm text-emerald-600 font-mono bg-emerald-50 px-3 py-1 rounded-full">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "testimonials":
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Floating hearts and flowers */}
            <div className="absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {i % 2 === 0 ? (
                    <Heart className="w-6 h-6 text-pink-400 opacity-60" />
                  ) : (
                    <Flower className="w-8 h-8 text-rose-400 opacity-60" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-rose-800 mb-16"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Kind Words Bloom 🌸
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {user.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 50,
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.03,
                      rotate: Math.random() * 6 - 3,
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg relative overflow-hidden"
                  >
                    {/* Decorative quote marks */}
                    <div className="absolute top-4 left-4 text-6xl text-rose-200 font-serif">
                      "
                    </div>
                    <div className="absolute bottom-4 right-4 text-6xl text-rose-200 font-serif rotate-180">
                      "
                    </div>

                    <div className="relative z-10 pt-8">
                      <p
                        className="text-rose-700 leading-relaxed mb-6 italic"
                        style={{ fontFamily: "serif" }}
                      >
                        {testimonial.message}
                      </p>

                      <div className="flex items-center">
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-rose-300"
                        />
                        <div>
                          <p
                            className="font-bold text-rose-800"
                            style={{ fontFamily: "serif" }}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            className="text-sm text-rose-600"
                            style={{ fontFamily: "serif" }}
                          >
                            {testimonial.designation}
                          </p>
                        </div>
                      </div>

                      {/* Star rating */}
                      <div className="flex justify-center mt-4 space-x-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <motion.div
                            key={starIndex}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{
                              delay: index * 0.1 + starIndex * 0.1,
                            }}
                          >
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section className="py-20 bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Creative project elements */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Code className="w-8 h-8 text-purple-400 opacity-40" />
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-6xl mx-auto px-8">
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold text-center text-violet-800 mb-16"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Creative Harvest 🎨
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.02,
                      y: -10,
                      rotate: Math.random() * 4 - 2,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    }}
                    className="group relative overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md border border-white/50 shadow-lg"
                  >
                    {/* Project image placeholder with nature theme */}
                    <div className="h-48 bg-gradient-to-br from-green-300 via-blue-300 to-purple-300 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TreePine className="w-16 h-16 text-white/60" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Sun className="w-8 h-8 text-yellow-300" />
                        </motion.div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Flower className="w-6 h-6 text-pink-300" />
                      </div>
                    </div>

                    <div className="p-8">
                      <h3
                        className="text-2xl font-bold text-violet-800 mb-4 group-hover:text-purple-600 transition-colors"
                        style={{ fontFamily: "serif" }}
                      >
                        {project.title}
                      </h3>

                      {project.description && (
                        <p
                          className="text-violet-700 mb-6 leading-relaxed"
                          style={{ fontFamily: "serif" }}
                        >
                          {project.description}
                        </p>
                      )}

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/60 backdrop-blur-sm text-violet-700 rounded-full text-sm font-medium border border-white/40"
                              style={{ fontFamily: "serif" }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm text-violet-700 rounded-2xl hover:bg-white/80 transition-all duration-300 border border-white/40 font-bold"
                            style={{ fontFamily: "serif" }}
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Source
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg font-bold"
                            style={{ fontFamily: "serif" }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
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

      case "contact":
        return (
          <section className="py-20 bg-gradient-to-br from-teal-100 via-green-50 to-blue-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg')] bg-cover bg-center mix-blend-multiply" />
            </div>

            {/* Nature floating elements */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {i % 3 === 0 && (
                    <Butterfly className="w-6 h-6 text-purple-400 opacity-50" />
                  )}
                  {i % 3 === 1 && (
                    <Flower className="w-8 h-8 text-pink-400 opacity-50" />
                  )}
                  {i % 3 === 2 && (
                    <Leaf className="w-7 h-7 text-green-400 opacity-50" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="relative max-w-4xl mx-auto px-8 text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-bold text-teal-800 mb-8"
                style={{
                  fontFamily: "serif",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Let's Grow Together! 🌱
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl text-teal-700 mb-12 font-medium"
                style={{ fontFamily: "serif" }}
              >
                Ready to plant the seeds of collaboration?
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {[
                  {
                    title: "Send a Message",
                    icon: <Mail className="w-12 h-12 text-teal-600" />,
                    value: user.email,
                    href: `mailto:${user.email}`,
                    color: "teal",
                  },
                  {
                    title: "LinkedIn",
                    icon: <Linkedin className="w-12 h-12 text-blue-600" />,
                    value: "Professional Network",
                    href: user.socialLinks?.linkedin,
                    color: "blue",
                  },
                  {
                    title: "GitHub",
                    icon: <Github className="w-12 h-12 text-gray-800" />,
                    value: "Code Garden",
                    href: user.socialLinks?.github,
                    color: "gray",
                  },
                  {
                    title: "WhatsApp",
                    icon: <FaWhatsapp className="w-12 h-12 text-green-500" />,
                    value: user.phoneNumber,
                    href: `https://wa.me/${user.phoneNumber}`,
                    color: "green",
                  },
                  {
                    title: "Call Me",
                    icon: <Phone className="w-12 h-12 text-yellow-500" />,
                    value: user.phoneNumber,
                    href: null,
                    color: "yellow",
                  },
                  {
                    title: "Location",
                    icon: <MapPin className="w-12 h-12 text-pink-500" />,
                    value: user.address,
                    href: null,
                    color: "pink",
                  },
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.05,
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className={`group relative p-8 rounded-3xl border border-white/20 shadow-lg transition-all duration-300 bg-white/10 backdrop-blur-xl overflow-hidden`}
                  >
                    {/* Floating nature elements */}
                    <motion.div
                      className="absolute w-12 h-12 opacity-30"
                      animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: Math.random() * 4 + 3,
                        ease: "easeInOut",
                      }}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                    >
                      {i % 3 === 0 && (
                        <Butterfly
                          className={`w-6 h-6 text-${item.color}-400`}
                        />
                      )}
                      {i % 3 === 1 && (
                        <Leaf className={`w-6 h-6 text-${item.color}-300`} />
                      )}
                      {i % 3 === 2 && (
                        <Flower className={`w-6 h-6 text-${item.color}-200`} />
                      )}
                    </motion.div>

                    {/* Card content */}
                    <div className="relative z-10 text-center">
                      <div className="mb-6">{item.icon}</div>
                      <h3
                        className={`text-xl font-bold text-${item.color}-800 mb-2`}
                        style={{ fontFamily: "serif" }}
                      >
                        {item.title}
                      </h3>
                      <p className={`text-${item.color}-700`}>{item.value}</p>
                    </div>

                    {/* Shine overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl animate-[shine_5s_linear_infinite]" />
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
    <div className="min-h-screen relative" style={{ fontFamily: "serif" }}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}

      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NatureOrganicTemplate;
