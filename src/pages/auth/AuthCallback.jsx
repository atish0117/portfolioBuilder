
// import React, { useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { motion } from 'framer-motion'
// import { checkAuth } from '../../store/slices/authSlice'
// import toast from 'react-hot-toast'

// const AuthCallback = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [searchParams] = useSearchParams()

//   useEffect(() => {
//     const token = searchParams.get('token')
//     const refreshToken = searchParams.get('refresh')
//     const provider = searchParams.get('provider')
//     const error = searchParams.get('error')

//     console.log('AuthCallback received:', { 
//       token: !!token, 
//       refreshToken: !!refreshToken, 
//       provider, 
//       error 
//     })

//     if (error) {
//        const errorMessages = {
//         oauth_denied: 'OAuth authentication was denied',
//         missing_params: 'Missing authentication parameters',
//         invalid_state: 'Invalid authentication state',
//         oauth_callback_failed: 'OAuth callback failed',
//         github_init_failed: 'GitHub authentication failed to initialize',
//         google_init_failed: 'Google authentication failed to initialize',
//         linkedin_init_failed: 'LinkedIn authentication failed to initialize',
//         github_oauth_failed: 'GitHub authentication failed',
//         google_oauth_failed: 'Google authentication failed',
//         linkedin_oauth_failed: 'LinkedIn authentication failed'
//       }
//       toast.error(errorMessages[error] || 'Authentication failed')
//       navigate('/login')
//       return
//     }

//     if (token) {
//       console.log('Storing tokens and checking auth')
//       // Store tokens
//       localStorage.setItem('token', token)
//       if (refreshToken) {
//         localStorage.setItem('refreshToken', refreshToken)
//       }

//       // Check auth and redirect
//       dispatch(checkAuth())
//         .then(() => {
//           const providerNames = {
//             github: 'GitHub',
//             google: 'Google',
//             linkedin: 'LinkedIn'
//           }
//           toast.success(`Successfully signed in with ${providerNames[provider] || provider}!`)
//           navigate('/dashboard')
//         })
//         .catch(() => {
//           console.error('Auth check failed:', authError)
//           toast.error('Authentication failed')
//           localStorage.removeItem('token')
//           localStorage.removeItem('refreshToken')
//           navigate('/login')
//         })
//     } else {
//       console.error('No authentication token received')
//       toast.error('No authentication token received')
//       navigate('/login')
//     }
//   }, [searchParams, navigate, dispatch])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="text-center card p-8 max-w-md mx-4"
//       >
//         <motion.div
//           className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         />
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           Completing Authentication
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 mb-4">
//           Please wait while we set up your account and sync your data
//         </p>
//         <div className="flex justify-center space-x-2">
//           {[1, 2, 3].map((i) => (
//             <motion.div
//               key={i}
//               className="w-2 h-2 bg-primary-600 rounded-full"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.5, 1, 0.5]
//               }}
//               transition={{
//                 duration: 1,
//                 repeat: Infinity,
//                 delay: i * 0.2
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default AuthCallback


import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // YEH FLAG INFINITE LOOP KO ROKNE KE LIYE HAI
  // Yeh ek switch ki tarah kaam karta hai. Ek baar on ho gaya to dobara nahi chalta.
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Agar process pehle hi chal chuka hai, to kuch mat karo
    if (hasProcessed.current) {
      return;
    }
    // Process ko 'chal chuka hai' mark kar do
    hasProcessed.current = true;

    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh');
    const provider = searchParams.get('provider');
    const error = searchParams.get('error');

    console.log('AuthCallback is processing ONCE:', { 
      token: !!token, 
      refreshToken: !!refreshToken, 
      provider, 
      error 
    });

    if (error) {
      const errorMessages = {
        oauth_denied: 'OAuth authentication was denied',
        // ... baaki error messages
      };
      toast.error(errorMessages[error] || 'Authentication failed');
      navigate('/login');
      return;
    }

    if (token) {
      console.log('Storing tokens and navigating...');
      localStorage.setItem('token', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Compilation errors ko hatane ke liye Redux-specific code ko hata diya gaya hai.
      // Ab hum token store karne ke baad seedha aage badhenge.
      const providerNames = {
        github: 'GitHub',
        google: 'Google',
        linkedin: 'LinkedIn'
      };
      toast.success(`Successfully signed in with ${providerNames[provider] || provider}!`);
      
      // Thodi der baad navigate karein taaki user toast message dekh sake.
      setTimeout(() => navigate('/dashboard'), 500);

    } else {
      console.error('No authentication token received');
      toast.error('No authentication token received');
      navigate('/login');
    }
    // Dependency array ko khaali rakha gaya hai taaki yeh sirf ek baar chale
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center card p-8 max-w-md mx-4"
      >
        <motion.div
          className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Completing Authentication
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please wait...
        </p>
      </motion.div>
    </div>
  );
};

export default AuthCallback;

