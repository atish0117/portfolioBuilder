import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuroraStudioTemplate = () => {
  const [activeSection, setActiveSection] = useState('home');

  const menuItems = ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
     {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-20 lg:w-64 p-6 bg-gray-900 border-r border-gray-800 flex flex-col justify-between z-10">
        <div>
          <div className="text-2xl font-bold mb-12 text-white">Lilon.</div>
          <nav className="space-y-8">
            {menuItems.map((item) => (
              <div key={item} className="relative group">
                <button
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`flex items-center w-full text-left transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="hidden lg:inline-block">{item}</span>
                  <span className="lg:hidden text-xl">
                    {item === 'Home' && '🏠'}
                    {item === 'About' && '👤'}
                    {item === 'Services' && '💼'}
                    {item === 'Projects' && '📂'}
                    {item === 'Skills' && '📝'}
                    {item === 'Contact' && '📞'}
                  </span>
                </button>
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mt-1"
                  />
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex space-x-4 lg:space-x-6 mb-8 justify-center lg:justify-start">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <i className="fab fa-linkedin-in text-lg"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <i className="fab fa-github text-lg"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <i className="fab fa-twitter text-lg"></i>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-12 lg:ml-64 ml-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                MY NAME IS <span className="text-white">Rohit MACWIAN</span>
              </h1>
              <h2 className="text-2xl lg:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Web Designer based in USA
              </h2>
              <p className="text-gray-400 mb-10 max-w-lg">
                Welcome to my portfolio! I'm a passionate web designer with 10+ years of experience creating beautiful, functional websites and applications.
              </p>
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/20">
                Work with me
              </button>
              <div className="mt-12 space-y-4">
                <div className="flex items-center text-gray-400">
                  <i className="fas fa-phone-alt mr-4"></i>
                  <span>+91 23456 77788</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <i className="fas fa-envelope mr-4"></i>
                  <span>Rohit@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">📸</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gray-800 rounded-xl px-4 py-2 shadow-lg">
                <span className="text-sm">5+ Years Experience</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            <div className="lg:w-2/5 mb-12 lg:mb-0">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-800 overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                WELCOME TO MY PORTFOLIO
              </h2>
              <p className="text-gray-400 mb-8">
                Hello there! My name is Rohit Macwan. I am a web designer & developer, and I'm very
                passionate and dedicated to my work with 5+ years of experience
                as a professional designer. I have acquired the skills necessary to make your project a success.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">10+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">50+</div>
                  <div className="text-gray-400">Clients Worldwide</div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-6 border-l-4 border-purple-500">
                <p className="italic text-gray-300">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus sed sit uttinca et sed metus sollicitudin."
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="portfolio" className="min-h-screen py-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">MY SPECIALTIES</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              I offer a wide range of services to help you establish and grow your online presence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Web Design', description: 'Creating visually appealing and user-friendly website designs that convert visitors into customers.', icon: '🎨' },
                { title: 'Web Development', description: 'Building responsive, fast, and secure websites using the latest technologies and frameworks.', icon: '💻' },
                { title: 'UI/UX Design', description: 'Designing intuitive user interfaces and experiences that delight users and meet business goals.', icon: '📱' },
                { title: 'Branding', description: 'Developing unique brand identities that communicate your values and resonate with your audience.', icon: '🪙' },
                { title: 'E-commerce', description: 'Building online stores with seamless shopping experiences and secure payment processing.', icon: '🛒' },
                { title: 'SEO Optimization', description: 'Improving website visibility and ranking on search engines to attract more organic traffic.', icon: '🔍' },
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-3xl p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                >
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

         {/* Experience Section */}
        <section id="services" className="min-h-screen py-20 flex flex-col justify-center bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-16 text-center">MY EXPERIENCE</h2>
            
            <div className="max-w-3xl mx-auto space-y-8 mb-12">
              <div className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <div className="w-1 h-24 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                </div>
                <div>
                  <div className="text-sm text-purple-300">2020 - Present</div>
                  <h3 className="text-xl font-bold mb-2">Lead UI/UX Designer</h3>
                  <p className="text-gray-300">Leading design teams to create innovative user experiences for web and mobile applications.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                  <div className="w-1 h-24 bg-gradient-to-b from-pink-500 to-purple-500"></div>
                </div>
                <div>
                  <div className="text-sm text-pink-300">2017 - 2018</div>
                  <h3 className="text-xl font-bold mb-2">Senior UI/UX Designer</h3>
                  <p className="text-gray-300">Created complex design systems and collaborated with developers to implement designs.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <div className="text-sm text-purple-300">2015 - 2017</div>
                  <h3 className="text-xl font-bold mb-2">Web Design and Developer</h3>
                  <p className="text-gray-300">Designed and developed responsive websites for various clients across different industries.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="px-8 py-3 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-all shadow-lg">
                Download Resume
              </button>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">MY SKILLS</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              I've developed expertise in various technologies and tools over the years.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { name: 'UI/UX Design', percentage: 95 },
                { name: 'Web Development', percentage: 90 },
                { name: 'React.js', percentage: 85 },
                { name: 'JavaScript', percentage: 88 },
                { name: 'HTML/CSS', percentage: 93 },
                { name: 'Node.js', percentage: 80 },
                { name: 'Graphic Design', percentage: 75 },
                { name: 'SEO Optimization', percentage: 70 },
              ].map((skill, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-400">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">PROJECT SHOWCASE</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Here are some of my recent projects that I'm proud of.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div 
                  key={item}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                >
                  <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-4xl">🖥️</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Project Title {item}</h3>
                    <p className="text-gray-400 mb-4">Short description of the project goes here with main features and technologies used.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['React', 'Tailwind', 'Node.js'].map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">{tech}</span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a href="#" className="text-purple-400 hover:text-purple-300">Live Demo</a>
                      <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">EDUCATION</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              My academic background and professional training.
            </p>
            
            <div className="max-w-4xl mx-auto space-y-12">
              {[
                { 
                  degree: 'Master in Computer Science', 
                  institution: 'Stanford University', 
                  period: '2015 - 2017', 
                  description: 'Specialized in Human-Computer Interaction and Web Technologies. Completed thesis on responsive design patterns.' 
                },
                { 
                  degree: 'Bachelor of Fine Arts in Design', 
                  institution: 'Parsons School of Design', 
                  period: '2011 - 2015', 
                  description: 'Focused on digital media design, color theory, and user experience principles. Graduated with honors.' 
                },
                { 
                  degree: 'Web Development Bootcamp', 
                  institution: 'General Assembly', 
                  period: '2014', 
                  description: 'Intensive 12-week program covering full-stack web development with modern technologies.' 
                },
              ].map((edu, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    {index < 2 && <div className="w-1 h-32 bg-gradient-to-b from-purple-500 to-pink-500"></div>}
                  </div>
                  <div className="bg-gray-800 rounded-2xl p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <span className="text-sm text-purple-300 bg-purple-900 bg-opacity-30 px-3 py-1 rounded-full">{edu.period}</span>
                    </div>
                    <div className="text-purple-400 mb-4">{edu.institution}</div>
                    <p className="text-gray-400">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">CERTIFICATIONS</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Professional certifications that validate my expertise.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2020' },
                { title: 'Google UX Design Professional', issuer: 'Google', year: '2019' },
                { title: 'React Developer Certification', issuer: 'Meta', year: '2021' },
                { title: 'Adobe Certified Expert', issuer: 'Adobe', year: '2018' },
                { title: 'Scrum Master Certified', issuer: 'Scrum Alliance', year: '2020' },
                { title: 'Front-End Web Development', issuer: 'FreeCodeCamp', year: '2017' },
              ].map((cert, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                >
                  <div className="text-4xl mb-4">📜</div>
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <div className="text-purple-400 mb-2">{cert.issuer}</div>
                  <div className="text-gray-400 text-sm">{cert.year}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">CLIENT TESTIMONIALS</h2>
            <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto">
              What my clients say about working with me.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-800 bg-opacity-50 rounded-3xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <div className="font-bold">Client Name</div>
                      <div className="text-purple-300 text-sm">CEO, Company</div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">
                    "Lilon delivered exceptional work on our website redesign. His attention to detail and creative solutions exceeded our expectations. The project was completed on time and within budget."
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">GET IN TOUCH</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-purple-900 bg-opacity-30 p-3 rounded-lg mr-4">
                      <i className="fas fa-map-marker-alt text-purple-400"></i>
                    </div>
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-gray-400">Adherink, USA</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-900 bg-opacity-30 p-3 rounded-lg mr-4">
                      <i className="fas fa-envelope text-purple-400"></i>
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-400">shilowne@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-900 bg-opacity-30 p-3 rounded-lg mr-4">
                      <i className="fas fa-phone-alt text-purple-400"></i>
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-400">+123456 4677788</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-6">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <i className="fab fa-dribbble"></i>
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <i className="fab fa-behance"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-400">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-400">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-gray-400">Your Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-400 mb-6 lg:mb-0">
              © {new Date().getFullYear()} Lilon Macwan. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-dribbble text-lg"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AuroraStudioTemplate;