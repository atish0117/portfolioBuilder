import React, { useState, useEffect, useCallback, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  ExternalLink,
  Mail,
  Download,
  Terminal,
  Code,
  Coffee,
  Zap,
  Eye,
  Heart,
  Star,
  Award,
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Trophy,
  Quote,
  Send,
  Phone,
  Linkedin,
  Globe,
  MessageCircle,
  User,
  Briefcase,
  BookOpen,
} from "lucide-react";
import TagLineRender from "../../ui/TagLineRender";

const TypeWriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span>{displayedText}</span>;
};

// Matrix rain effect component
const MatrixRain = memo(() => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 2 + 1,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute text-green-400 google-sans-code-atish2 text-xs opacity-30"
          style={{ left: `${drop.x}%` }}
          animate={{
            y: ["0vh", "100vh"],
          }}
          transition={{
            duration: 10 / drop.speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.div>
      ))}
    </div>
  );
});

// Code block component with syntax highlighting
const CodeBlock = memo(({ children, className = "" }) => (
  <div
    className={`bg-gray-900 border border-gray-700 rounded-lg p-4 google-sans-code-atish2 text-sm ${className}`}
  >
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
      <span className="text-gray-400 text-xs ml-4">code.js</span>
    </div>
    {children}
  </div>
));

const DeveloperTemplate = ({
  user,
  projects,
  sectionOrder,
  visibleSections,
}) => {
  const [ok, setOk] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [activeSkill, setActiveSkill] = useState(null);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Terminal typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length);
    }, 3000); // Har 3s pe change
    return () => clearInterval(interval);
  }, []);
  const commands = user.skills?.map(
    (skill) => `npm install ${skill.toLowerCase().replace(/\s+/g, "-")}`
  ) || [
    "npm install awesome-developer",
    "git clone https://github.com/talent",
    "npm run build-amazing-things",
    "docker run --name innovation",
    "kubectl apply -f success.yaml",
  ];

  // // Terminal typing effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentCommand((prev) => (prev + 1) % commands.length);
  //   }, 3000); // Har 3s pe change
  //   return () => clearInterval(interval);
  // }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (user.testimonials && user.testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % user.testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [user.testimonials]);

  const renderSection = (sectionId) => {
    if (!visibleSections[sectionId]) return null;

    // for about sections, use a set of repeating images
    const getRepeatingImage = (index) => {
      const staticImages = [
        "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Code on screen
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Person working on laptop
        "https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Abstract blue circuit
        "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Server room
        "https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Glowing keyboard
        "https://images.pexels.com/photos/5775854/pexels-photo-5775854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Developers collaborating
      ];
      // This calculates which image to use based on the index,
      // ensuring it repeats after the 6th image.
      return staticImages[index % staticImages.length];
    };

    const mainDeveloperImage =
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Main developer-themed image

    switch (sectionId) {
      case "hero":
        return (
          <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center">
            {/* Matrix rain background */}
            <MatrixRain />

            {/* Interactive background elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute w-96 h-96 bg-green-400/5 rounded-full blur-3xl"
                transition={{ type: "spring", stiffness: 50 }}
              />
              <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* control */}
            <div className="absolute top-8 right-8 z-20">
              <motion.button
                onClick={() => setOk(!ok)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-800/80 backdrop-blur-sm border border-green-400 rounded-full text-green-400 hover:bg-green-400 hover:text-gray-900 transition-all"
              >
                {ok ? (
                  <Coffee className="w-5 h-5" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 z-10">
              <motion.div
                className="my-6 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-green-400 google-sans-code-atish text-sm">
                  <TypeWriter
                    text="// Welcome to my interactive portfolio"
                    delay={500}
                  />
                </span>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-6 lg:px-12">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-6"
                >
                  {/* Profile Section */}
                  <div className="relative">
                    {user.profileImgUrl ? (
                      <motion.img
                        src={user.profileImgUrl}
                        alt={user.fullName}
                        className="w-72 sm:w-80 h-80 sm:h-96 rounded-lg object-cover border-2 border-green-400 shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    ) : (
                      <motion.div
                        className="w-80 h-80 rounded-lg bg-gray-800 border-2 border-green-400 flex items-center justify-center text-green-400 text-6xl google-sans-code-atish2 shadow-2xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {user.fullName.charAt(0)}
                      </motion.div>
                    )}

                    {/* Floating Badges */}
                    <motion.div
                      className="absolute -top-4 -right-4 bg-gray-800 border border-green-400 rounded-lg p-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {user.phoneNumber && (
                        <a
                          href={`https://wa.me/${user.phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 google-sans-code-atish2 text-sm flex items-center hover:underline"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          WhatsApp
                        </a>
                      )}
                    </motion.div>

                    {user.socialLinks?.linkedin && (
                      <motion.a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute -left-8 top-1/4 bg-gray-800 border border-blue-400 rounded p-2 google-sans-code-atish2 text-xs text-blue-400"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {"<LinkedIn />"}
                      </motion.a>
                    )}

                    <motion.div
                      className="absolute -right-8 bottom-1/4 bg-gray-800 border border-yellow-400 rounded p-2 google-sans-code-atish2 text-xs text-yellow-400 cursor-pointer"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      onClick={() => {
                        const projectSection =
                          document.getElementById("projects");
                        projectSection?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {"{Projects}"}
                    </motion.div>
                  </div>

                  {/* Social Links Buttons */}
                  <motion.div
                    className="flex flex-wrap justify-center lg:justify-end gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                  >
                    {user.socialLinks?.github && (
                      <motion.a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-800 border border-green-400 text-green-400 text-sm sm:text-sm rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all google-sans-code-atish2 flex items-center space-x-2"
                      >
                        <Github className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          git clone portfolio
                        </span>
                      </motion.a>
                    )}

                    {user.resumeUrl && (
                      <motion.a
                        href={user.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 sm:px-4 sm:py-2.5 sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors google-sans-code-atish2 flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">./resume.pdf</span>
                      </motion.a>
                    )}

                    <motion.a
                      href={`mailto:${user.email}`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 sm:px-4 sm:py-2.5 bg-purple-600 text-white text-sm sm:text-sm rounded-lg hover:bg-purple-700 transition-colors google-sans-code-atish2 flex items-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">send --message</span>
                    </motion.a>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="order-2 lg:order-1 lg:pl-6"
                >
                  <CodeBlock className="mb-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-white">
                        <span className="text-green-400">const</span> developer
                        = {"{"}
                      </p>
                      <div className="ml-4 space-y-1">
                        <p className="text-white">
                          <span className="text-blue-400">name:</span>{" "}
                          <span className="text-yellow-300">
                            "{user.fullName}"
                          </span>
                          ,
                        </p>
                        {user.title && (
                          <p className="text-white">
                            <span className="text-blue-400">role:</span>{" "}
                            <span className="text-yellow-300">
                              "{user.title}"
                            </span>
                            ,
                          </p>
                        )}
                        <p className="text-white">
                          <span className="text-blue-400">passion:</span>{" "}
                          <span className="text-yellow-300">
                            "Building amazing things"
                          </span>
                          ,
                        </p>
                        <p className="text-white">
                          <span className="text-blue-400">status:</span>{" "}
                          <span className="text-green-300">
                            "Available for hire"
                          </span>
                        </p>
                      </div>
                      <p className="text-white">{"}"}</p>
                    </motion.div>
                  </CodeBlock>

                  {user.tagLine && (
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <span className="text-green-400 google-sans-code-atish2 text-sm">
                        /* About me */
                      </span>
                      <p className="text-gray-300 mt-2 leading-relaxed break-words google-sans-code-atish2 ">
                        {" "}
                        <TagLineRender tagLine={user.tagLine} />{" "}
                      </p>
                    </motion.div>
                  )}

                  {/* Terminal simulation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="bg-black/90 border border-green-400 rounded-lg p-4 mb-6 shadow-lg shadow-green-500/20"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 google-sans-code-atish2 text-sm">
                        terminal.skills
                      </span>
                    </div>
                    <div className="google-sans-code-atish text-sm">
                      <span className="text-green-400 ">$ </span>
                      <TypeWriter
                        text={commands[currentCommand]}
                        key={currentCommand}
                        speed={100}
                      />
                      <span className="animate-pulse text-green-400">█</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        );

      case "about":
        return user.intro ? (
          <section
            id="about"
            className="py-20 bg-gray-900 relative google-sans-code-atish2"
          >
            {/* <span className="text-gray-400 google-sans-code-atish">projects.filter(p => p.featured) </span> */}

            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* Left Side - Developer Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center lg:justify-start"
                >
                  <div className="relative w-72 h-72 lg:w-96 lg:h-96">
                    <img
                      src={mainDeveloperImage}
                      alt="Dev Bg"
                      className="absolute left-0 top-0  h-full object-fill opacity-80 mix-blend-luminosity rounded-2xl"
                    />

                    <div className="absolute inset-0 rounded-2xl bg-green-400/20 blur-3xl -z-10"></div>
                  </div>
                </motion.div>

                {/* Right Side - About + Stats */}
                <div className="relative z-20">
                  {/* Section Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <span className="text-green-400 google-sans-code-atish2 text-sm">
                      // README.md
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white google-sans-code-atish mt-2">
                      <TypeWriter
                        text={`cat ./about/${user.fullName
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        speed={50}
                      />
                    </h2>
                  </motion.div>

                  {/* Intro */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <CodeBlock className="mb-12">
                      <div className="text-gray-300 leading-relaxed space-y-4 prose prose-invert prose-p:text-gray-300 break-words">
                        <TagLineRender tagLine={user.intro} />
                      </div>
                    </CodeBlock>
                  </motion.div>

                  {/* Stats Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <span className="text-green-400 google-sans-code-atish2 text-sm">
                      // System Specs
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-white google-sans-code-atish mt-2 font">
                      <TypeWriter text="developer.getStats()" speed={50} />
                    </h3>
                  </motion.div>

                  {/* Stats Grid */}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {[
                      {
                        icon: <Zap className="text-green-400" />,
                        label: "Availability",
                        value: user.availability,
                      },
                      {
                        icon: <Briefcase className="text-blue-400" />,
                        label: "Experience",
                        value: user.workExperience,
                      },
                      {
                        icon: <Globe className="text-yellow-400" />,
                        label: "Work Type",
                        value: user.preferredWorkType,
                      },
                      {
                        icon: <Star className="text-yellow-400" />,
                        label: "Hourly Rate",
                        value: user.hourlyRate,
                      },
                      {
                        icon: <MessageCircle className="text-purple-400" />,
                        label: "Languages",
                        value: user.languages, // array of languages
                      },
                    ].map(
                      (item, index) =>
                        item.value && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                              y: -4,
                              boxShadow: "0 6px 15px rgba(34, 197, 94, 0.25)",
                            }}
                            className={`bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-400 transition-all flex flex-col justify-between ${
                              item.label === "Languages"
                                ? "col-span-2 md:col-span-2"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <p className="google-sans-code-atish2 text-xs text-gray-400">
                                {item.label}
                              </p>
                            </div>

                            {item.label === "Languages" &&
                            Array.isArray(item.value) ? (
                              <div className="flex flex-wrap gap-2 mt-2  max-h-20 google-sans-code-atish2">
                                {item.value.map((lang, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-700 text-xs rounded text-white"
                                  >
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="google-sans-code-atish2 font-bold text-white capitalize mt-2">
                                {item.value}
                              </p>
                            )}
                          </motion.div>
                        )
                    )}
                  </div>
                </div>
              </div>

              {/* 'What I Do' Dynamic Sections */}
              {user.aboutSections && user.aboutSections.length > 0 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="my-12 w-full max-w-3xl px-4 overflow-hidden"
                  >
                    <span className="text-green-400 google-sans-code-atish2 text-sm block">
                      // Core Functions
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white google-sans-code-atish mt-2 break-words">
                      <TypeWriter
                        text="developer.getCapabilities()"
                        speed={50}
                      />
                    </h3>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8">
                    {user.aboutSections.map((section, index) => {
                      // Use the repeating image logic here
                      const imageUrl = getRepeatingImage(index);

                      return (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                          className="bg-gray-800/50 border border-gray-700 rounded-lg p-2 hover:border-green-400 transition-all duration-300 group"
                        >
                          <CodeBlock>
                            <div className="flex items-center gap-3 mb-4">
                              <Code className="w-5 h-5 text-green-400" />
                              <p className="text-white google-sans-code-atish2">
                                <span className="text-purple-400">
                                  function
                                </span>
                                <span className="text-yellow-300">
                                  {" "}
                                  {section.title.replace(/\s+/g, "_")}
                                </span>
                                <span className="text-white google-sans-code-atish">
                                  () {"{"}
                                </span>
                              </p>
                            </div>
                            <div className="ml-6 border-l-2 border-gray-700 pl-6">
                              <p className="google-sans-code-atish mt-4">
                                <span className="text-purple-400">return</span>
                                <span className="text-blue-400">
                                  {" "}
                                  &lt;ImageComponent src=
                                </span>
                                <span className="text-yellow-300">"..."</span>
                                <span className="text-blue-400"> /&gt;</span>;
                              </p>
                            </div>
                            <p className="text-white google-sans-code-atish mt-2">
                              {"}"}
                            </p>
                          </CodeBlock>

                          {/* Image Output Section */}
                          <div className=" google-sans-code-atish mt-4 border-2 border-gray-700 rounded-lg p-2 group-hover:border-green-400/50 transition-colors">
                            <p className="text-xs  text-green-400 mb-2 pl-2">
                              // Render Output:
                            </p>
                            <img
                              src={imageUrl}
                              alt={section.title}
                              className="w-full h-48 object-cover rounded-md opacity-75 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>
        ) : null;

      case "skills":
        return user.skills && user.skills.length > 0 ? (
          <section className="py-20 bg-gray-800 relative overflow-hidden google-sans-code-atish2">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-blue-900/10"></div>
            <div className="max-w-6xl mx-auto px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 google-sans-code-atish2 text-sm">
                  // My technical arsenal
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white google-sans-code-atish mt-2 ">
                  <TypeWriter
                    text="skills.map(skill => expertise)"
                    delay={200}
                  />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20, rotateX: -30 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
                    }}
                    onHoverStart={() => setActiveSkill(skill)}
                    onHoverEnd={() => setActiveSkill(null)}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-3 h-3 bg-green-400 rounded-full"
                            animate={
                              activeSkill === skill
                                ? { scale: [1, 1.5, 1] }
                                : {}
                            }
                            transition={{ duration: 0.5 }}
                          />
                          <span className="text-white google-sans-code-atish2 font-bold">
                            {skill}
                          </span>
                        </div>
                        <Code className="w-5 h-5 text-green-400 group-hover:animate-spin" />
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span>{Math.floor(Math.random() * 30) + 70}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${Math.floor(Math.random() * 30) + 70}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 google-sans-code-atish2">
                        {Math.floor(Math.random() * 5) + 2} years experience
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills summary */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <CodeBlock className="max-w-md mx-auto">
                  <p className="text-green-400 google-sans-code-atish text-sm">
                    <TypeWriter
                      text="console.log('Always learning new technologies!');"
                      delay={1000}
                    />
                  </p>
                </CodeBlock>
              </motion.div>
            </div>
          </section>
        ) : null;

      case "experience":
        return user.experienceDetails && user.experienceDetails.length > 0 ? (
          <section className="py-20 bg-gray-900 relative">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 google-sans-code-atish2 text-sm">
                  // Work Journey
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white google-sans-code-atish mt-2 break-words">
                  <TypeWriter
                    text="experience.map(exp => growth)"
                    delay={200}
                  />
                </h2>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 to-blue-400"></div>

                <div className="space-y-8">
                  {user.experienceDetails.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="relative pl-16"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-6 top-6 w-4 h-4 bg-green-400 rounded-full border-4 border-gray-900 shadow-lg"
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />

                      <div className="bg-gray-800 border border-gray-700 max-w-3xl rounded-lg p-6 hover:border-green-400 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors flex items-center">
                              <Briefcase className="w-5 h-5 mr-2" />

                              {exp.jobTitle}
                            </h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <Building className="w-4 h-4 mr-2" />

                              <span className="font-mono">
                                {exp.companyName}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-green-400 google-sans-code-atish2 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />

                            {exp.duration}
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-4">
                          {exp.responsibilities}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((s, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + i * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm google-sans-code-atish2 border border-green-400/30"
                            >
                              {s}
                            </motion.span>
                          ))}

                          {[
                            "Leadership",
                            "Innovation",
                            "Growth",
                            "Team Building",
                          ].map((achievement, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + i * 0.1 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm google-sans-code-atish2 border border-green-400/30"
                            >
                              {achievement}
                            </motion.span>
                          ))}
                        </div>
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
          <section className="py-20 bg-gray-800 relative google-sans-code-atish2">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 google-sans-code-atish2 text-sm">
                  // Academic Credentials
                </span>
                <h2 className="sm:text-4xl text-3xl font-bold text-white google-sans-code-atish mt-2 break-words">
                  <TypeWriter
                    text="education.map(degree => knowledge)"
                    delay={200}
                  />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {user.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)",
                    }}
                    className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-green-400 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center"
                      >
                        <GraduationCap className="w-6 h-6 text-white" />
                      </motion.div>
                      {edu.gpa && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            {edu.gpa}
                          </div>
                          <div className="text-sm text-gray-400">GPA</div>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {edu.degree}
                    </h3>

                    <div className="flex items-center text-gray-400 mb-2">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span className="google-sans-code-atish2">
                        {edu.institution}
                      </span>
                    </div>

                    <div className="flex items-center text-green-400 google-sans-code-atish2 text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {edu.startYear} - {edu.endYear}
                    </div>

                    {edu.description && (
                      <p className="text-gray-300 leading-relaxed">
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
          <section className="py-20 bg-gray-900 relative google-sans-code-atish2">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 google-sans-code-atish2 text-sm">
                  // Certifications
                </span>
                <h2 className=" text-3xl sm:text-4xl font-bold text-white google-sans-code-atish mt-2 break-words">
                  <TypeWriter
                    text="certificates.map(cert => verified)"
                    delay={200}
                  />
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                      y: -10,
                      boxShadow: "0 15px 30px rgba(251, 191, 36, 0.3)",
                    }}
                    className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg p-6 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Sparkle animation */}
                    <motion.div
                      className="absolute top-2 right-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </motion.div>

                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4"
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 google-sans-code-atish2 text-sm">
                          {cert.issuer}
                        </p>
                        {cert.platform && (
                          <p className="text-xs text-gray-500 mt-1 google-sans-code-atish2">
                            Platform: {cert.platform}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="google-sans-code-atish2">
                        {cert.date}
                      </span>
                    </div>

                    {cert.credentialId && (
                      <div className="text-xs text-gray-500 google-sans-code-atish2 bg-gray-100 px-2 py-1 rounded mb-3 border">
                        ID: {cert.credentialId}
                      </div>
                    )}

                    {cert.certificateLink && (
                      <a
                        href={cert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs text-blue-600 hover:underline mb-3"
                      >
                        View Certificate
                      </a>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-bold flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✓
                        </motion.div>
                        <span className="ml-1">Verified</span>
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
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

      case "testimonials":
        return user.testimonials && user.testimonials.length > 0 ? (
          <section className="py-20 bg-gray-800 relative google-sans-code-atish2">
            <div className="max-w-3xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <span className="text-green-400 google-sans-code-atish2 text-sm">
                  // Client Feedback
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white google-sans-code-atish mt-2 break-words">
                  <TypeWriter
                    text="testimonials.map(feedback => trust)"
                    delay={200}
                  />
                </h2>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-8 py-4 hover:border-green-400 transition-all duration-300 mb-8 relative overflow-hidden"
                >
                  {/* Quote decoration */}
                  <Quote className="w-10 h-10 text-green-400/20  " />

                  <div className="relative z-10">
                    <p className="text-xl text-gray-300 italic leading-relaxed mb-6 pl-12 break-words">
                      "{user.testimonials[currentTestimonial].message}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <motion.img
                          src={user.testimonials[currentTestimonial].imageUrl}
                          alt={user.testimonials[currentTestimonial].name}
                          className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-400"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div>
                          <div className="font-bold text-white text-lg">
                            {user.testimonials[currentTestimonial].name}
                          </div>

                          <div className="text-gray-400 font-mono text-sm">
                            {user.testimonials[currentTestimonial].designation}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2">
                {user.testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index
                        ? "bg-green-400 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case "projects":
        return projects && projects.length > 0 ? (
          <section id="projects" className="py-20 bg-gray-900 relative">
            <div className="max-w-5xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <span className="text-green-400 font-mono text-sm">
                  // Featured repositories
                </span>
                <h2 className="text-4xl font-bold text-white font-mono mt-2">
                  <TypeWriter
                    text="projects.filter(p => p.featured)"
                    delay={200}
                  />
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    className="relative w-[350px] h-[450px] rounded-2xl overflow-hidden transition-all duration-500 group cursor-pointer shadow-lg"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 rounded-2xl">
                      <img
                        src={project.imageUrl}
                        className="w-full h-full rounded-2xl object-cover transition-transform duration-700 ease-in-out"
                        alt=""
                      />
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute top-96  inset-0 m-2  group-hover:top-0 rounded-2xl bg-gray-900 backdrop-blur-md px-5 pt-3  pb-5 flex flex-col justify-between transition-all duration-700 ease-in-out">
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Github className="w-6 h-6 text-green-400" />
                            </motion.div>
                            <h3 className="text-xl font-semibold tracking-wide text-gray-100 google-sans-code-atish2 group-hover:text-green-400 transition-colors">
                              {project.title.toUpperCase()}
                            </h3>
                          </div>
                          <span className="text-xs google-sans-code-atish2 text-green-400 px-2 py-1 rounded bg-green-400/10 border border-green-500/30">
                            {project.status}
                          </span>
                        </div>

                        {/* Description */}
                        {project.description && (
                          <div className="mb-3 flex-1 overflow-hidden">
                            <p
                              className={`text-gray-600 text-sm leading-relaxed break-words 
                      ${
                        isExpanded
                          ? "line-clamp-none max-h-[200px] overflow-y-auto pr-1"
                          : "line-clamp-3"
                      }`}
                            >
                              {project.description}
                            </p>
                            {project.description.length > 100 && (
                              <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                              >
                                {isExpanded ? "Show less" : "Read more"}
                              </button>
                            )}
                          </div>
                        )}

                        {/* Tech Stack */}
                        {project.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-12 ">
                            {project.techStack.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: techIndex * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                className="px-3 py-1 bg-gray-800/60 text-gray-200 rounded-full text-xs google-sans-code-atish2 border border-gray-600 hover:border-green-400 transition-colors cursor-pointer backdrop-blur-sm shadow-sm"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center space-x-6 text-sm text-gray-300 google-sans-code-atish2 mt-4">
                        {project.githubLink && (
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="flex items-center space-x-2 hover:text-green-400 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            <span>Source</span>
                          </motion.a>
                        )}
                        {project.liveLink && (
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Demo</span>
                          </motion.a>
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
          <section className="py-20 bg-gray-800 relative overflow-hidden google-sans-code-atish2">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="text-green-400 google-sans-code-atish2 text-sm">
                  // Let's connect
                </span>
                <h2 className="text-4xl font-bold text-white google-sans-code-atish mt-2 mb-8">
                  <TypeWriter text="contact.init()" delay={200} />
                </h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-900 border border-gray-700 rounded-lg p-8 google-sans-code-atish2 text-left max-w-2xl mx-auto hover:border-green-400 transition-all duration-300"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">terminal</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">$ whoami</p>
                    <motion.p
                      className="text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <TypeWriter text={user.fullName} delay={1000} />
                    </motion.p>

                    <p className="text-gray-400 mt-4">$ cat contact.json</p>
                    <div className="text-white ml-4">
                      <p>{"{"}</p>

                      {/* Email */}
                      {user.email && (
                        <motion.p
                          className="ml-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <span className="text-blue-400">"email":</span>
                          <a
                            href={`mailto:${user.email}`}
                            className="text-yellow-300 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            "{user.email}"
                          </a>
                          ,
                        </motion.p>
                      )}

                      {/* Iterate over socialLinks */}
                      {user.socialLinks &&
                        Object.entries(user.socialLinks).map(
                          ([key, value], index) =>
                            value ? (
                              <motion.p
                                key={key}
                                className="ml-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 + index * 0.3 }}
                              >
                                <span className="text-blue-400">"{key}":</span>
                                <a
                                  href={value}
                                  className="text-yellow-300 hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  "{value}"
                                </a>
                                {index !==
                                Object.entries(user.socialLinks).filter(
                                  ([_, v]) => v
                                ).length -
                                  1
                                  ? ","
                                  : ""}
                              </motion.p>
                            ) : null
                        )}

                      <p>{"}"}</p>
                    </div>

                    <p className="text-gray-400 mt-4">
                      $ echo "Ready to collaborate!"
                    </p>
                    <motion.p
                      className="text-green-400 google-sans-code-atish"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                    >
                      <TypeWriter text="Ready to collaborate!" delay={3000} />
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-wrap justify-center gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                >
                  {user.socialLinks?.github && (
                    <motion.a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gray-900 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all google-sans-code-atish2 flex items-center space-x-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>git remote add origin</span>
                    </motion.a>
                  )}
                  <motion.a
                    href={`mailto:${user.email}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors google-sans-code-atish2 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>send --message</span>
                  </motion.a>
                  {user.socialLinks?.linkedin && (
                    <motion.a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors google-sans-code-atish2 flex items-center space-x-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>connect --professional</span>
                    </motion.a>
                  )}
                </motion.div>

                {/* Contact stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto"
                >
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-green-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      24/7
                    </motion.div>
                    <div className="text-sm text-gray-400 google-sans-code-atish2">
                      Available
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-blue-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      &lt;24h
                    </motion.div>
                    <div className="text-sm text-gray-400 google-sans-code-atish2">
                      Response
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-purple-400"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      100%
                    </motion.div>
                    <div className="text-sm text-gray-400 google-sans-code-atish2">
                      Committed
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {sectionOrder.map((sectionId) => (
        <div key={sectionId}>{renderSection(sectionId)}</div>
      ))}
    </div>
  );
};

export default DeveloperTemplate;
