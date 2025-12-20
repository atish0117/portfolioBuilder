
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();
  const templateControls = useAnimation();
  const featureControls = useAnimation();
  const statsControls = useAnimation();

  const stats = [
    { value: "10K+", label: "Portfolios Created" },
    { value: "50+", label: "Professional Templates" },
    { value: "95%", label: "User Satisfaction" },
    { value: "24/7", label: "Support Available" },
  ];

  const features = [
    {
      title: "AI-Powered Design",
      description:
        "Our AI suggests layouts and color schemes based on your content",
      icon: "🤖",
      color: "from-fuchsia-500 to-purple-600",
      action: "Try AI Assistant",
      image: "https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg",
    },
    {
      title: "3D Portfolio Spaces",
      description:
        "Immersive environments that showcase your work in virtual galleries",
      icon: "🪐",
      color: "from-blue-500 to-cyan-600",
      action: "Explore 3D",
      image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
    },
    {
      title: "Interactive Elements",
      description:
        "Add games, animations and micro-interactions to engage visitors",
      icon: "🎮",
      color: "from-green-500 to-emerald-600",
      action: "See Examples",
      image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
    },
    {
      title: "Real-Time Collaboration",
      description: "Get feedback and co-create with colleagues in real time",
      icon: "👥",
      color: "from-orange-500 to-amber-600",
      action: "Invite Team",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    },
  ];

  const ADV_features = [
    {
      title: "Smart SEO Optimization",
      description:
        "Automatic SEO tuning with real-time suggestions to maximize your visibility",
      icon: "🔍",
      color: "from-amber-500 to-orange-600",
      action: "See SEO Report",
    },
    {
      title: "Drag & Drop Builder",
      description:
        "Intuitive interface to create your perfect portfolio with no coding required",
      icon: "🖱️",
      color: "from-blue-500 to-cyan-600",
      action: "Try Demo",
    },
    {
      title: "Customizable Sections",
      description:
        "Show or hide any section with one click for complete layout control",
      icon: "🧩",
      color: "from-purple-500 to-fuchsia-600",
      action: "Explore Options",
    },
    {
      title: "AI Content Assistant",
      description:
        "Get AI-powered suggestions to improve your portfolio content",
      icon: "🤖",
      color: "from-green-500 to-emerald-600",
      action: "Activate AI",
    },
  ];

  const templates = [
    {
      name: "Neon Futurist",
      category: "Tech",
      bg: "bg-gradient-to-br from-purple-900 to-blue-900",
    },
    {
      name: "Cyber Minimal",
      category: "Design",
      bg: "bg-gradient-to-br from-gray-900 to-gray-700",
    },
    {
      name: "Holographic",
      category: "Creative",
      bg: "bg-gradient-to-br from-teal-900 to-emerald-900",
    },
    {
      name: "Matrix",
      category: "Developer",
      bg: "bg-gradient-to-br from-green-900 to-black",
    },
  ];

  // Auto-rotate ADV_features
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveFeature((prev) => (prev + 1) % ADV_features.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering, ADV_features.length]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering, features.length]);

  // Animate when active feature changes
  useEffect(() => {
    controls.start({
      background: [
        `linear-gradient(to right, ${features[activeFeature].color})`,
      ],
      transition: { duration: 1 },
    });
    featureControls.start("visible");
  }, [activeFeature, controls, featureControls]);

  // Template hover effect
  const handleTemplateHover = async (index) => {
    await templateControls.start({
      x: -index * 100,
      transition: { type: "spring", stiffness: 300 },
    });
  };

  // Animate stats on view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statsControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          });
        }
      });
    });

    observer.observe(document.querySelector("#stats-section"));
    return () => observer.disconnect();
  }, [statsControls]);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 mb-6 border border-gray-700"
          >
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">
              LIVE CREATOR EVENT HAPPENING NOW
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Next-Gen
            </span>{" "}
            Portfolio <br />
            Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Build a portfolio that doesn't just display your work—it brings it
            to life with interactive, immersive experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/create"
              className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:to-blue-700 transition-all group"
            >
              <span className="relative z-10">Start Creating</span>
              <motion.span
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 z-0"
                transition={{ duration: 0.4 }}
              />
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-transparent border-2 border-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-800/50 transition-all flex items-center gap-2"
            >
              <span>Watch Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Interactive floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-10 top-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute right-20 top-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 blur-xl"
        />
      </section>

      {/* Dynamic Feature Showcase */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl font-bold mb-6"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Tomorrow's Portfolio
                </span>{" "}
                Tools Today
              </motion.h2>

              <div className="relative h-96">
                <AnimatePresence mode="wait">
                  {features.map(
                    (feature, index) =>
                      activeFeature === index && (
                        <motion.div
                          key={index}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: -50 },
                          }}
                          transition={{ duration: 0.5 }}
                          className={`absolute inset-0 p-8 rounded-2xl bg-gradient-to-br ${feature.color} relative overflow-hidden`}
                        >
                          {/* Background Image */}
                          <div
                            className="absolute inset-0 z-0"
                            style={{
                              backgroundImage: `url(${feature.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              opacity: 0.25,
                            }}
                          ></div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div className="text-6xl mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-3">
                              {feature.title}
                            </h3>
                            <p className="text-lg mb-6">
                              {feature.description}
                            </p>
                            <button className="px-6 py-3 bg-black/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/10 transition-all">
                              {feature.action}
                            </button>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
  {features.map((feature, index) => (
    <motion.button
      key={index}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => {
        setActiveFeature(index);
        setIsHovering(true);
      }}
      onHoverEnd={() => setIsHovering(false)}
      className={`relative p-6 rounded-xl overflow-hidden ${
        activeFeature === index
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-gray-900/50'
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${feature.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="text-3xl mb-3">{feature.icon}</div>
        <h3 className="font-semibold">{feature.title}</h3>
      </div>
    </motion.button>
  ))}
</div>

          </div>
        </div>
      </section>

      {/* Interactive Template Showcase */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Future-Forward
              </span>{" "}
              Templates
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from cutting-edge designs that anticipate tomorrow's trends
            </p>
          </motion.div>

          <motion.div className="overflow-hidden">
            <motion.div animate={templateControls} className="flex gap-6 w-max">
              {templates.map((template, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => handleTemplateHover(index)}
                  className={`w-80 h-96 ${template.bg} rounded-2xl p-6 flex flex-col justify-between cursor-pointer`}
                >
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-xs mb-4">
                      {template.category}
                    </span>
                    <h3 className="text-2xl font-bold">{template.name}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-70">Preview →</span>
                    <button className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all text-sm">
                      Select
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Advanced Features
              </span>{" "}
              for Professionals
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to create a portfolio that stands out and
              ranks well
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => {
                    setActiveFeature(index);
                    setIsHovering(true);
                  }}
                  onHoverEnd={() => setIsHovering(false)}
                  className={`p-6 rounded-xl ${
                    activeFeature === index
                      ? "bg-gray-800 border border-cyan-500/30"
                      : "bg-gray-800/50 border border-gray-700/50"
                  } transition-all cursor-pointer`}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="relative h-96">
              <AnimatePresence mode="wait">
                {ADV_features.map(
                  (adv_feature, index) =>
                    activeFeature === index && (
                      <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                          hidden: { opacity: 0, x: 50 },
                          visible: { opacity: 1, x: 0 },
                          exit: { opacity: 0, x: -50 },
                        }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 p-8 rounded-2xl bg-gradient-to-br ${adv_feature.color} flex flex-col justify-between`}
                      >
                        <div>
                          <div className="text-5xl mb-6">
                            {adv_feature.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">
                            {adv_feature.title}
                          </h3>
                          <p className="text-gray-100 mb-6">
                            {adv_feature.description}
                          </p>
                        </div>
                        <button className="px-6 py-3 bg-black/30 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/10 transition-all w-max">
                          {adv_feature.action}
                        </button>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        id="stats-section"
        className="py-20 bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsControls}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50"
              >
                <p className="text-4xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300 font-medium">{stat.label}</p>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50 z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-3xl sm:text-4xl font-bold mb-6 text-transparent bg-clip-text text-white"
            >
              Ready to Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 bg-[length:200%]">
                Dream Portfolio
              </span>
              ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Join 10,000+ professionals who launched their perfect portfolio
              with our builder
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/register"
                className="inline-block px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started Free</span>
                <motion.span
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 z-0"
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating animated elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-cyan-400/20 blur-lg"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
          className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-purple-400/20 blur-lg"
        />
      </section>
    </div>
  );
};

export default Home;

// landing page one
// import React, { useState } from 'react';

// const PortfolioWithBackgroundImage = () => {
//   const [activeSection, setActiveSection] = useState('home');

//   return (
//     <div className="min-h-screen font-sans overflow-hidden">
//       {/* Background Image Section */}
//       <div className="fixed inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
//         <img
//           src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Navigation Bar */}
//       <nav className="relative z-20 px-8 py-6 flex justify-between items-center">
//         <div className="text-xl font-bold text-white">PORTFOLIO</div>

//         <div className="hidden md:flex space-x-8">
//           {['Home', 'Work', 'About', 'Contact'].map((item) => (
//             <button
//               key={item}
//               onClick={() => setActiveSection(item.toLowerCase())}
//               className={`font-medium transition-all duration-300 ${
//                 activeSection === item.toLowerCase()
//                   ? 'text-white border-b-2 border-amber-400'
//                   : 'text-gray-300 hover:text-white'
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>

//         <div className="text-right">
//           <div className="text-sm font-medium text-white">Let's Talk</div>
//           <div className="text-xs text-gray-300">hello@portfolio.com</div>
//         </div>
//       </nav>

//       {/* Main Content - Text Overlay */}
//       <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
//           {/* Left Side - Text Content */}
//           <div className="space-y-8 text-white">
//             <div className="relative">
//               <h1 className="text-5xl md:text-7xl font-black text-white leading-none">
//                 DIGITAL
//                 <br />
//                 <span className="text-amber-400">DESIGNER</span>
//               </h1>
//             </div>

//             <p className="text-xl text-gray-100 max-w-md font-light">
//               Specialized in turning ideas into seamless user experiences with a focus on clean, functional design.
//             </p>

//             <div className="pt-8 flex space-x-4">
//               <button className="px-8 py-3 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-400 transition-colors">
//                 View My Work
//               </button>
//               <button className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-colors">
//                 Contact Me
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Empty but maintains layout */}
//           <div className="hidden lg:block"></div>
//         </div>
//       </div>

//       {/* Additional Content Section */}
//       <div className="relative z-10 bg-white py-20 px-6">
//         <div className="container mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Work</h2>
//           <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
//             Here are some of my recent projects that showcase my design and development skills.
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: 'E-Commerce Redesign',
//                 description: 'Complete redesign of online store with improved UX',
//                 image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
//               },
//               {
//                 title: 'Mobile App UI',
//                 description: 'Fitness tracking application with custom illustrations',
//                 image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
//               },
//               {
//                 title: 'Brand Identity',
//                 description: 'Complete visual identity for tech startup',
//                 image: 'https://images.unsplash.com/photo-1563014959-7aaa83350992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80'
//               }
//             ].map((project, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//                   <p className="text-gray-600">{project.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//          {/* Social Links */}
//       <div className="hidden md:flex flex-col fixed left-6 bottom-6 space-y-4">
//         <a href="#" className="text-black hover:text-gray-700">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
//           </svg>
//         </a>
//         <a href="#" className="text-black hover:text-gray-700">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//           </svg>
//         </a>
//         <a href="#" className="text-black hover:text-gray-700">
//           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
//           </svg>
//         </a>
//       </div>

//       </div>

//       {/* Footer */}
//       <footer className="relative z-10 bg-gray-900 text-white py-12 px-6">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-xl font-bold mb-4 md:mb-0">PORTFOLIO</div>

//             <div className="flex space-x-6 mb-4 md:mb-0">
//               {['Home', 'Work', 'About', 'Contact'].map((item) => (
//                 <a
//                   key={item}
//                   href="#"
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   {item}
//                 </a>
//               ))}
//             </div>

//             <div className="flex space-x-4">
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors">
//                 <span className="sr-only">Dribbble</span>
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.436 7.871c.712 1.643 1.028 3.535.953 5.564-1.238-.158-2.578-.242-3.936-.242-1.199 0-2.378.064-3.53.188a25.32 25.32 0 0 0-.345-1.118c1.225-.3 2.554-.54 3.875-.74a28.91 28.91 0 0 0 2.983-3.652zM12 2.744c1.281 0 2.523.17 3.701.486-.412.932-.912 1.855-1.493 2.744-1.387.234-2.716.534-3.96.9-.33-1.1-.724-2.194-1.182-3.266A9.6 9.6 0 0 1 12 2.744zM7.935 3.1c.447 1.043.834 2.114 1.157 3.197-1.55.444-3.057 1.033-4.488 1.764a9.583 9.583 0 0 1 3.331-4.961zM4.236 9.03c1.495-.773 3.073-1.394 4.692-1.86.28.935.5 1.892.654 2.867-1.714.202-3.38.48-4.992.83a13.73 13.73 0 0 1-.354-1.837zm.344 3.915c1.693-.36 3.438-.65 5.222-.87a28.2 28.2 0 0 1-.188 2.324c-1.777.18-3.477.438-5.084.77a9.56 9.56 0 0 1 .05-2.224zm1.126 5.312c1.5-.334 3.05-.61 4.64-.83.116.975.297 1.938.542 2.882a9.59 9.59 0 0 1-5.182-2.052zm4.016 4.158a23.77 23.77 0 0 1-.585-2.814c1.32-.158 2.662-.24 4.018-.24 1.247 0 2.48.07 3.688.208a9.58 9.58 0 0 1-7.12 2.846zm7.925-3.206c-1.238.15-2.455.358-3.646.62a25.68 25.68 0 0 0 .33-2.892c1.323-.2 2.652-.46 3.977-.78a9.55 9.55 0 0 1-.661 3.052z"/>
//                 </svg>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors">
//                 <span className="sr-only">Behance</span>
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.292h3.124zm-7.686-4h5.738c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.261 2.219zm-9.04 0c.091 1.546 1.195 2.219 2.44 2.219 1.348 0 2.306-.771 2.306-2.219 0-1.535-1.007-2.219-2.306-2.219-1.354 0-2.391.774-2.44 2.219zm7.128-3.457c-1.799 0-2.53.772-2.592 2.063h5.069c-.068-1.291-.853-2.063-2.477-2.063zm-9.054.156c-1.671 0-2.49.771-2.49 2.301 0 1.528.819 2.301 2.49 2.301 1.673 0 2.489-.773 2.489-2.301 0-1.53-.816-2.301-2.489-2.301z"/>
//                 </svg>
//               </a>
//               <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 transition-colors">
//                 <span className="sr-only">LinkedIn</span>
//                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                 </svg>
//               </a>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
//             © {new Date().getFullYear()} Digital Designer Portfolio. All rights reserved.
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default PortfolioWithBackgroundImage;

// landing page two

// import React from "react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Sparkles } from "lucide-react"

// export default function PortfolioHero({
//   imageUrl = "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?w=1200&auto=format&fit=crop&q=60",
//   name = "Jessy Walter",
//   title = "Freelance Designer",
//   tagline = "Since beginning my journey as a freelance designer nearly 7 years ago, I’ve done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products.",
//   onHireClick = () => {},
// }) {
//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-gray-900 text-white" aria-label="Hero">
//       {/* Background glow + animated gradient */}
//       <motion.div
//         animate={{ background: [
//           "radial-gradient(ellipse_at_center, rgba(34,197,94,0.3), #111827, #111827)",
//           "radial-gradient(ellipse_at_center, rgba(250,204,21,0.25), #111827, #111827)",
//           "radial-gradient(ellipse_at_center, rgba(59,130,246,0.25), #111827, #111827)"
//         ] }}
//         transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
//         className="pointer-events-none absolute inset-0 -z-10"
//       />

//       <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24">
//         {/* LEFT: Text */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="flex flex-col justify-center"
//         >
//           <div className="mb-3 flex items-center gap-2 text-sm text-green-400">
//             <Sparkles size={16} className="text-yellow-400 animate-pulse" /> — Introducing
//           </div>
//           <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
//             Hello <br />
//             <span className="bg-gradient-to-r from-yellow-300 via-green-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">I'm {name}</span>
//           </h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.7 }}
//             className="mt-6 max-w-xl text-base text-gray-300 sm:text-lg"
//           >
//             {tagline}
//           </motion.p>

//           <div className="mt-8 flex gap-4">
//             <Button
//               onClick={onHireClick}
//               className="h-12 rounded-xl bg-yellow-400 px-6 text-base font-semibold text-gray-900 shadow-lg hover:scale-105 hover:bg-yellow-300 transition-transform"
//             >
//               Contact Me
//             </Button>
//             <Button
//               variant="outline"
//               className="h-12 rounded-xl border-yellow-400 px-6 text-base font-semibold text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 hover:scale-105 transition-transform"
//             >
//               Download CV
//             </Button>
//           </div>
//         </motion.div>

//         {/* RIGHT: Image with separate moving circular ring */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="relative flex items-center justify-center"
//         >
//           {/* Rotating circular ring */}
//           <motion.div
//             animate={{ rotate: [0, 360] }}
//             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//             className="absolute flex h-[65vh] w-[65vh] items-center justify-center rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
//           >
//             {/* Skill tags on the ring */}
//             <motion.div whileHover={{ scale: 1.1 }} className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-green-500/90">Id</motion.div>
//             <motion.div whileHover={{ scale: 1.1 }} className="absolute top-1/2 -left-8 -translate-y-1/2 rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-yellow-400/90 hover:text-gray-900">Ai</motion.div>
//             <motion.div whileHover={{ scale: 1.1 }} className="absolute top-1/2 -right-8 -translate-y-1/2 rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-blue-400/90">Ps</motion.div>
//             <motion.div whileHover={{ scale: 1.1 }} className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-md hover:bg-pink-400/90">Xd</motion.div>
//           </motion.div>

//           {/* User PNG stays static */}
//           <img
//             src={imageUrl}
//             alt="Your portrait"
//             className="relative z-10 h-[60vh] w-auto object-contain drop-shadow-2xl"
//           />

//           {/* Floating glowing orbs */}
//           <motion.div
//             animate={{ y: [0, -20, 0] }}
//             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//             className="absolute -z-10 h-44 w-44 rounded-full bg-green-500/20 blur-3xl"
//           />
//           <motion.div
//             animate={{ y: [0, 25, 0] }}
//             transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
//             className="absolute right-10 top-10 -z-10 h-36 w-36 rounded-full bg-yellow-400/20 blur-3xl"
//           />
//           <motion.div
//             animate={{ y: [0, -30, 0] }}
//             transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
//             className="absolute left-12 bottom-12 -z-10 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl"
//           />
//         </motion.div>
//       </div>
//     </section>
//   )
// }

// landing page three

