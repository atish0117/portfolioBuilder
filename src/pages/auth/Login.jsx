
// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { motion } from 'framer-motion'
// import { login, clearError } from '../../store/slices/authSlice'
// import toast from 'react-hot-toast'
// // first login form design
// const Login = () => {
//   const dispatch = useDispatch()
//   const { loading, error } = useSelector((state) => state.auth)

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!formData.email || !formData.password) {
//       toast.error('Please fill in all fields')
//       return
//     }

//     try {
//       await dispatch(login(formData)).unwrap()
//       toast.success('Login successful!')
//     } catch (err) {
//       toast.error(err || 'Login failed')
//     }
//   }

//   useEffect(() => {
//     dispatch(clearError())
//   }, [dispatch])

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background image with overlay */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70"></div>
//         <img 
//           src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop" 
//           alt="Background" 
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-md w-full space-y-8 relative z-10 px-4"
//       >
//         <div className="text-center">
//           <motion.div
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4 mx-auto border border-white/20"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//             </svg>
//           </motion.div>
//           <h2 className="text-3xl font-bold text-white">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-white/80">
//             Sign in to access your portfolio dashboard
//           </p>
//         </div>

//         <motion.form
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-white/20 shadow-xl"
//           onSubmit={handleSubmit}
//         >
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
//               Email Address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 bg-white/10 border-white/20 rounded focus:ring-white/50 text-white/80"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <Link to="/forgot-password" className="font-medium text-white hover:text-white/80">
//                 Forgot password?
//               </Link>
//             </div>
//           </div>

//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <motion.div
//                   className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//                 />
//                 Signing In...
//               </div>
//             ) : (
//               'Sign In'
//             )}
//           </motion.button>

//           <div className="text-center">
//             <p className="text-sm text-white/80">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="font-medium text-white hover:text-white/80"
//               >
//                 Create one now
//               </Link>
//             </p>
//           </div>
//         </motion.form>

//         {/* Social login options */}
//         <div className="text-center">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white/20"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-transparent text-white/80">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           <div className="mt-6 grid grid-cols-2 gap-3">
//             <motion.button
//               type="button"
//               className="w-full flex justify-center py-2 px-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
//               whileHover={{ y: -2 }}
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
//               </svg>
//             </motion.button>

//             <motion.button
//               type="button"
//               className="w-full flex justify-center py-2 px-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
//               whileHover={{ y: -2 }}
//             >
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
//                 <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
//               </svg>
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Login



import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { login, clearError } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
// second login form design
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [activeSlide, setActiveSlide] = useState(0);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      toast.success('Login successful!');
      navigate('/dashboard')
    } catch (err) {
      toast.error(err || 'Login failed');
    }
  };
  const handleSocialLogin = (provider) => {
    console.log(`Initiating ${provider} OAuth`)
    window.location.href = `/api/auth/${provider}?returnUrl=/dashboard`
  }

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Portfolio-related images for the slider
  const portfolioImages = [
    'https://images.unsplash.com/photo-1528372444006-1bfc81acab02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZ3JhbW1pbmd8ZW58MHwxfDB8fHww',
    'https://images.unsplash.com/photo-1513171920216-2640b288471b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNpdHl8ZW58MHwxfDB8fHww',
    'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaG5vbG9neXxlbnwwfDF8MHx8fDA%3D'
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % portfolioImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [portfolioImages.length]);

  const buttonClassName = "w-full flex flex-col lg:flex-row items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-dark-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 transition-all duration-200";

  return (
    <div className=" flex bg-gray-900 ">
      {/* Left Side - Portfolio Image Slider (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Images */}
        {portfolioImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        ))}
        
        {/* Gradient Overlay */}
       
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/30 to-primary-400/30"></div>
  
        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-3xl font-bold text-white">LOGO</h1>
        </div>
        
        {/* Back to Website Button */}
        <div className="absolute top-8 right-8 z-10">
          <button className="text-white hover:text-indigo-300 transition-colors flex items-center">
            Back to website <span className="ml-2">→</span>
          </button>
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-16 left-8 z-10">
          <p className="text-xl text-white font-light">Build stunning portfolios that get you hired</p>
        </div>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
          {portfolioImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:w-md w-full max-w-full bg-gray-800   shadow-2xl px-6 sm:px-32 py-8  border border-gray-700"
        >
          <div className="text-center mb-8">
            
            <h2 className="text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-400">
              Sign in to access your portfolio dashboard
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-transparent transition"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-transparent transition"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 text-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-gradient">
                  Forgot password?
                </Link>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 gradient-bg4 hover:gradient-bg2 text-white font-medium rounded-lg  transition-all shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>

            <div className="text-center">
              <p className="text-sm text-gray-200">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-gradient"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </motion.form>

              {/* Social Login Buttons */}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

      {/* GitHub Button */}
      <motion.button
        type="button"
        onClick={() => handleSocialLogin('github')}
        className={buttonClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Github
      </motion.button>

      {/* Google Button */}
      <motion.button
        type="button"
        onClick={() => handleSocialLogin('google')}
        className={buttonClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google
      </motion.button>

      {/* LinkedIn Button */}
      <motion.button
        type="button"
        onClick={() => handleSocialLogin('linkedin')}
        className={buttonClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5 mr-3" fill="#0077B5" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </motion.button>

      {/* Apple Button */}
      <motion.button
        type="button"
        onClick={() => handleSocialLogin('apple')}
        className={buttonClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
        </svg>
        Apple
      </motion.button>

    </div>
            
          </div>
        
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
