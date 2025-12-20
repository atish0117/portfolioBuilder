// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { authAPI } from '../../services/api'

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [emailSent, setEmailSent] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       toast.error('Please enter your email address');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       await authAPI.forgotPassword(email)
//       setEmailSent(true)
//       toast.success('Password reset link sent to your email!')
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to send reset email')
//     } finally {
//       setLoading(false)
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background image with overlay */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 gradient-bg"></div>
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
//             className="inline-flex items-center text-te justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4 mx-auto border border-white/20"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//           </motion.div>
//           <h2 className="text-3xl font-bold text-white">
//             Forgot Password?
//           </h2>
//           <p className="mt-2 text-white/80">
//             {emailSent 
//               ? 'Check your email for reset instructions' 
//               : 'Enter your email to reset your password'
//             }
//           </p>
//         </div>

//         {!emailSent ? (
//           <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="bg-white/10 backdrop-blur-xs p-8 space-y-6 rounded-2xl border border-white/20 shadow-xl"
//             onSubmit={handleSubmit}
//           >
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   className="  w-full px-4 py-3 bg-white/20 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={loading}
//               className="w-full px-4 py-3 gradient-bg4 hover:gradient-bg2 text-white/90 font-medium rounded-lg  transition-all shadow-lg"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <motion.div
//                     className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//                   />
//                   Sending...
//                 </div>
//               ) : (
//                 'Send Reset Link'
//               )}
//             </motion.button>
//           </motion.form>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-white/20 shadow-xl text-center"
//           >
//             <div className="text-green-400 mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-white">Check Your Email</h3>
//             <p className="text-white/80">
//               We've sent a password reset link to <strong>{email}</strong>
//             </p>
//             <div className="pt-4">
//               <button
//                 onClick={() => setEmailSent(false)}
//                 className="text-blue-300 hover:text-blue-200 text-sm font-medium"
//               >
//                 Resend email
//               </button>
//             </div>
//           </motion.div>
//         )}

//         <div className="text-center">
//           <p className="text-sm text-white/80">
//             Remember your password?{' '}
//             <Link
//               to="/login"
//               className="font-medium text-gradient hover:text-white/80"
//             >
//               Back to login
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ForgotPassword;





import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      await authAPI.forgotPassword(email)
      setEmailSent(true)
      toast.success('Password reset link sent to your email!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="card p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              The link will expire in 1 hour for security reasons.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  setEmailSent(false)
                  setEmail('')
                }}
                className="w-full btn-secondary"
              >
                Try Different Email
              </button>
              <Link to="/login" className="block w-full btn-primary text-center">
                Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold gradient-bg bg-clip-text text-transparent mb-4"
          >
            PortfolioBuilder
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Forgot Password?
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter your email address"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending Reset Link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </motion.button>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default ForgotPassword