




// import React, { useState } from 'react'

// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { motion } from 'framer-motion'
// import { logout } from '../../store/slices/authSlice'
// import { toggleTheme } from '../../store/slices/themeSlice'
// import ThemeToggle from '../ui/ThemeToggle'
// import NotificationCenter from '../ui/NotificationCenter'
// // import SearchBar from '../ui/SearchBar'
// import CommandPalette from '../ui/CommandPalette'
// import ExportOptions from '../ui/ExportOptions'


// const Navbar = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { isAuthenticated, user } = useSelector((state) => state.auth)
//   const [showExportOptions, setShowExportOptions] = useState(false)


//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/')
//   }

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="sticky top-0 z-50 glassmorphism border-b dark:border-dark-700"

//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="text-2xl font-bold text-gradient"
//             >
//               Craftolio
//             </motion.div>
//           </Link>

//           {/* <div className="flex-1 max-w-md mx-8">
//             <SearchBar />
//           </div> */}

//           <div className="flex-1 max-w-md mx-8">
//             <CommandPalette />
//           </div>

//           <div className="flex items-center space-x-4">
//             <ThemeToggle />

//             {isAuthenticated && <NotificationCenter />}

//             {isAuthenticated && (
//               <motion.button
//                 onClick={() => setShowExportOptions(true)}
//                 className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 title="Export Portfolio"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </motion.button>
//             )}


//             {isAuthenticated ? (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/dashboard"
//                   className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//                 {user?.username && (
//                   <Link
//                     to={`/${user.username}`}
//                     className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                   >
//                     My Portfolio
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="btn-secondary"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className=" btn-secondary"

//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn-primary gradient-bg4 hover:ultra-themeColor "

//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <ExportOptions 
//         isOpen={showExportOptions} 
//         onClose={() => setShowExportOptions(false)} 
//       />

//     </motion.nav>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { logout } from '../../store/slices/authSlice'
import { toggleTheme } from '../../store/slices/themeSlice'
import ThemeToggle from '../ui/ThemeToggle'
import NotificationCenter from '../ui/NotificationCenter'
import CommandPalette from '../ui/CommandPalette'
import ExportOptions from '../ui/ExportOptions'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])


  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const navItemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 glassmorphism border-b dark:border-dark-700 ${scrolled ? 'shadow-lg' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold text-gradient"
              >
                Craftolio
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <CommandPalette />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />

              {isAuthenticated && <NotificationCenter />}

              {isAuthenticated && (
                <motion.button
                  onClick={() => setShowExportOptions(true)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  title="Export Portfolio"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.button>
              )}

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      to="/dashboard"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>

                    {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Admin
                  </Link>
                )}

                  </motion.div>
                  {user?.username && (
                    <motion.div whileHover={{ y: -2 }}>
                      <Link
                        to={`/${user.username}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                      >
                        My Portfolio
                      </Link>
                    </motion.div>
                  )}
                  <motion.button
                    onClick={handleLogout}
                    className="btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ y: -2 }}>
                    <Link
                      to="/login"
                      className="btn-secondary"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="btn-primary gradient-bg4 hover:ultra-themeColor"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              {isAuthenticated && <NotificationCenter />}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden glassmorphism border-t dark:border-dark-700"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <motion.div variants={navItemVariants} className="my-2">
                  <CommandPalette />
                </motion.div>
                
                {isAuthenticated && (
                  <motion.div variants={navItemVariants}>
                    <button
                      onClick={() => {
                        setShowExportOptions(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800"
                    >
                      Export Portfolio
                    </button>
                  </motion.div>
                )}
                
                {isAuthenticated ? (
                  <>
                    <motion.div variants={navItemVariants}>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                    {user?.username && (
                      <motion.div variants={navItemVariants}>
                        <Link
                          to={`/${user.username}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800"
                        >
                          My Portfolio
                        </Link>
                      </motion.div>
                    )}
                    <motion.div variants={navItemVariants}>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div variants={navItemVariants}>
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-dark-800"
                      >
                        Login
                      </Link>
                    </motion.div>
                    <motion.div variants={navItemVariants}>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block btn-primary gradient-bg4 hover:ultra-themeColor"
                      >
                        Sign Up
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      <ExportOptions 
        isOpen={showExportOptions} 
        onClose={() => setShowExportOptions(false)} 
      />
    </>
  )
}

export default Navbar

