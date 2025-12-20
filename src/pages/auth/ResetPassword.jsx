// import React, { useState, useEffect } from 'react'
// import { useSearchParams, useNavigate, Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { authAPI } from '../../services/api'
// import toast from 'react-hot-toast';

// const ResetPassword = () => {
//    const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false)
//   const [verifying, setVerifying] = useState(true)
//   const [tokenValid, setTokenValid] = useState(false)
//   const [userInfo, setUserInfo] = useState(null)

//   const token = searchParams.get('token')

//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
      
//     });

//       // Calculate password strength when password changes
//     if (name === 'password') {
//       let strength = 0;
//       if (value.length > 0) strength += 1;
//       if (value.length >= 6) strength += 1;
//       if (/[A-Z]/.test(value)) strength += 1;
//       if (/[0-9]/.test(value)) strength += 1;
//       if (/[^A-Za-z0-9]/.test(value)) strength += 1;
//       setPasswordStrength(strength);
//     }
//   }

//     useEffect(() => {
//     if (!token) {
//       toast.error('Invalid reset link')
//       navigate('/login')
//       return
//     }

//     verifyToken()
//   }, [token, navigate])

//     const verifyToken = async () => {
//     try {
//       const response = await authAPI.verifyResetToken(token)
//       setTokenValid(true)
//       setUserInfo({ email: response.data.email, fullName: response.data.fullName })
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Invalid or expired reset link')
//       setTokenValid(false)
//     } finally {
//       setVerifying(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.password || !formData.confirmPassword) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       await authAPI.resetPassword(token, formData.password, formData.confirmPassword)
//       toast.success('Password reset successfully!')
//       navigate('/login', { 
//         state: { message: 'Password reset successfully. Please log in with your new password.' }
//       })
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to reset password')
//     } finally {
//       setLoading(false)
//     }
    
//   };



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
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//             </svg>
//           </motion.div>
//           <h2 className="text-3xl font-bold text-white">
//             {passwordReset ? 'Password Reset' : 'Reset Password'}
//           </h2>
//           <p className="mt-2 text-white/80">
//             {passwordReset 
//               ? 'Your password has been successfully reset' 
//               : 'Create a new password for your account'
//             }
//           </p>
//         </div>

//         {!passwordReset ? (
//           <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="bg-white/10 backdrop-blur-md p-8 space-y-6 rounded-2xl border border-white/20 shadow-xl"
//             onSubmit={handleSubmit}
//           >
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
//                 New Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                   placeholder="Enter new password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <div className="flex gap-1 h-1.5">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div 
//                       key={i}
//                       className={`flex-1 rounded-full ${i <= passwordStrength ? 
//                         passwordStrength <= 2 ? 'bg-red-400' : 
//                         passwordStrength <= 3 ? 'bg-yellow-400' : 'bg-green-400' 
//                         : 'bg-white/20'}`}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs mt-1 text-white/70">
//                   {passwordStrength === 0 ? '' : 
//                    passwordStrength <= 2 ? 'Weak password' : 
//                    passwordStrength <= 3 ? 'Moderate password' : 'Strong password'}
//                 </p>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-2">
//                 Confirm New Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                   placeholder="Confirm new password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={loading}
//               className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
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
//                   Resetting...
//                 </div>
//               ) : (
//                 'Reset Password'
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
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-white">Success!</h3>
//             <p className="text-white/80">
//               Your password has been reset successfully. You can now login with your new password.
//             </p>
//             <Link
//               to="/login"
//               className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
//             >
//               Go to Login
//             </Link>
//           </motion.div>
//         )}

//         {!passwordReset && (
//           <div className="text-center">
//             <p className="text-sm text-white/80">
//               Back to{' '}
//               <Link
//                 to="/login"
//                 className="font-medium text-white hover:text-white/80"
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default ResetPassword;



import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link')
      navigate('/login')
      return
    }

    verifyToken()
  }, [token, navigate])

  const verifyToken = async () => {
    try {
      const response = await authAPI.verifyResetToken(token)
      setTokenValid(true)
      setUserInfo({ email: response.data.email, fullName: response.data.fullName })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid or expired reset link')
      setTokenValid(false)
    } finally {
      setVerifying(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await authAPI.resetPassword(token, formData.password, formData.confirmPassword)
      toast.success('Password reset successfully!')
      navigate('/login', { 
        state: { message: 'Password reset successfully. Please log in with your new password.' }
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400">Verifying reset token...</p>
        </motion.div>
      </div>
    )
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-dark-900 dark:via-dark-800 dark:to-red-900/20 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="card p-8 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Invalid Reset Link
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            
            <div className="space-y-4">
              <Link to="/forgot-password" className="block w-full btn-primary text-center">
                Request New Reset Link
              </Link>
              <Link to="/login" className="block w-full btn-secondary text-center">
                Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-dark-900 dark:via-dark-800 dark:to-green-900/20 py-12 px-4">
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
            Reset Password
          </h2>
          {userInfo && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Hi {userInfo.fullName}, enter your new password below
            </p>
          )}
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="card p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your new password"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Confirm your new password"
              required
              minLength={6}
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
                Resetting Password...
              </div>
            ) : (
              'Reset Password'
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

export default ResetPassword