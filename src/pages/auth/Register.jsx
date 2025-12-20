
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { register, clearError } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';

// //first register form design

// const Register = () => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Calculate password strength when password changes
//     if (name === 'password') {
//       let strength = 0;
//       if (value.length > 0) strength += 1;
//       if (value.length >= 6) strength += 1;
//       if (/[A-Z]/.test(value)) strength += 1;
//       if (/[0-9]/.test(value)) strength += 1;
//       if (/[^A-Za-z0-9]/.test(value)) strength += 1;
//       setPasswordStrength(strength);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
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

//     try {
//       await dispatch(register({
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//       })).unwrap();
//       toast.success('Registration successful!');
//     } catch (err) {
//       toast.error(err || 'Registration failed');
//     }
//   };

//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background image with overlay */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/70"></div>
//         <img
//           src="https://plus.unsplash.com/premium_photo-1685148902854-9b9bb49fff08?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
//             className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mt-1 mx-auto border border-white/20"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//             </svg>
//           </motion.div>
//           <h2 className="text-3xl font-bold text-white">
//             Create Your Account
//           </h2>
//           <p className="mt-2 text-white/80">
//             Join our community of creative professionals
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
//             <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 required
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                 placeholder="Create a password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//             </div>
//             <div className="mt-2">
//               <div className="flex gap-1 h-1.5">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className={`flex-1 rounded-full ${i <= passwordStrength ?
//                       passwordStrength <= 2 ? 'bg-red-400' :
//                       passwordStrength <= 3 ? 'bg-yellow-400' : 'bg-green-400'
//                       : 'bg-white/20'}`}
//                   />
//                 ))}
//               </div>
//               <p className="text-xs mt-1 text-white/70">
//                 {passwordStrength === 0 ? '' :
//                  passwordStrength <= 2 ? 'Weak password' :
//                  passwordStrength <= 3 ? 'Moderate password' : 'Strong password'}
//               </p>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 required
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-start">
//             <div className="flex items-center h-5">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-blue-400 focus:ring-blue-500 border-white/30 rounded bg-white/10"
//               />
//             </div>
//             <div className="ml-3 text-sm">
//               <label htmlFor="terms" className="font-medium text-white/90">
//                 I agree to the <Link to="/terms" className="text-blue-300 hover:underline">Terms</Link> and <Link to="/privacy" className="text-blue-300 hover:underline">Privacy Policy</Link>
//               </label>
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
//                 Creating Account...
//               </div>
//             ) : (
//               'Register Now'
//             )}
//           </motion.button>
//         </motion.form>

//         {/* Social login options */}
//         <div className="text-center">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white/20"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-transparent text-white/80">
//                 Or sign up with
//               </span>
//             </div>
//           </div>

//           <div className="mt-2 grid grid-cols-2 gap-3">
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

//         <div className="text-center">
//           <p className="text-sm text-white/80">
//             Already have an account?{' '}
//             <Link
//               to="/login"
//               className="font-medium text-white hover:text-white/80"
//             >
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// second register form design
import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { register, clearError } from "../../store/slices/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth);
  const [activeSlide, setActiveSlide] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  // Sample images for the slider
  const sliderImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate password strength when password changes
    if (name === "password") {
      let strength = 0;
      if (value.length > 0) strength += 1;
      if (value.length >= 6) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle registration logic
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await dispatch(
        register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      toast.success("Registration successful!");
      navigate('/dashboard')
    } catch (err) {
      toast.error(err || "Registration failed");
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Initiating ${provider} OAuth registration`)
    window.location.href = `/api/auth/${provider}?returnUrl=/dashboard`
  }

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <div className="flex bg-gray-900 flex-wrap ">
      {/* Left Side - Image Slider (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden ">
        {/* Background Images */}
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0  bg-gradient-to-b from-primary-600/30 to-primary-400/30"></div>

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <h1 className="text-3xl font-bold text-white">LOGO</h1>
        </div>

        {/* Back to Website Button */}
        <div className="absolute top-8 right-8 z-10">
          <button className="text-white hover:text-purple-300 transition-colors flex items-center">
            Back to website <span className="ml-2">→</span>
          </button>
        </div>

        {/* Caption */}
        <div className="absolute bottom-16 left-8 z-10">
          <p className="text-xl text-white italic">
            "Capturing Moments, Creating Memories"
          </p>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeSlide ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=" w-full sm:w-md max-w-full bg-gray-800 shadow-2xl px-8 sm:px-32 py-8"
        >
          <div className="text-center mb-7">
           

            <h2 className="text-3xl font-bold text-white">
              Create Your Account
            </h2>
            <p className="mt-2 text-gray-400">
              Join our community of creative professionals
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/80 focus:border-transparent transition"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/80 focus:border-transparent transition"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">

            <div className="w-1/2">
              {/* <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label> */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/80 focus:border-transparent transition pr-12"
                  placeholder="password ••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.88l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mt-2">
                <div className="flex gap-1 h-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${
                        i <= passwordStrength
                          ? passwordStrength <= 2
                            ? "bg-red-400"
                            : passwordStrength <= 3
                            ? "bg-yellow-400"
                            : "bg-green-400"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs mt-1 text-gray-400">
                  {passwordStrength === 0
                    ? ""
                    : passwordStrength <= 2
                    ? "Weak password"
                    : passwordStrength <= 3
                    ? "Moderate password"
                    : "Strong password"}
                </p>
              </div>
            </div>

            <div className="w-1/2">
              
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/80 focus:border-transparent transition pr-12"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  aria-label={
                    confirmPasswordVisible ? "Hide password" : "Show password"
                  }
                >
                  {confirmPasswordVisible ? (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.88l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-gradient focus:ring-text-gradient border-gray-600 rounded bg-gray-700"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-extralight text-gray-300"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className=" font-medium text-sm hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-sm hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="  w-full flex justify-center py-3 px-4 gradient-bg4 hover:gradient-bg2 text-white font-medium rounded-lg  transition-all duration-700 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Creating Account...
                </div>
              ) : (
                "Register Now"
              )}
            </motion.button>
          </form>

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

            <div className="mt-6 grid grid-cols-2 gap-3">

              <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-dark-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.button>

              <motion.button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm  bg-transparent text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
                whileHover={{ y: -2 }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </motion.button>
              <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('linkedin')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-dark-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-3" fill="#0077B5" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </motion.button>
              <motion.button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="maineApple group w-full inline-flex justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-transparent text-sm font-medium text-gray-300 hover:bg-white/80 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
                whileHover={{ y: -2 }}
              >
                <svg
                  className="w-5 h-5 mr-2 fill-white group-hover:fill-black transition"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
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

export default Register;

// third register form design

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { register, clearError } from '../../store/slices/authSlice';
// import toast from 'react-hot-toast';

// const Register = () => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [passwordStrength, setPasswordStrength] = useState(0);

//   // Sample images for the slider
//   const sliderImages = [
//     'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
//     'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
//     'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
//   ]

//   // Auto-advance slider
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % sliderImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [sliderImages.length]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Calculate password strength when password changes
//     if (name === 'password') {
//       let strength = 0;
//       if (value.length > 0) strength += 1;
//       if (value.length >= 6) strength += 1;
//       if (/[A-Z]/.test(value)) strength += 1;
//       if (/[0-9]/.test(value)) strength += 1;
//       if (/[^A-Za-z0-9]/.test(value)) strength += 1;
//       setPasswordStrength(strength);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
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

//     try {
//       await dispatch(register({
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//       })).unwrap();
//       toast.success('Registration successful!');
//     } catch (err) {
//       toast.error(err || 'Registration failed');
//     }
//   };

//   useEffect(() => {
//     dispatch(clearError());
//   }, [dispatch]);

//   return (
//     <div className="flex min-h-screen bg-gray-900">
//       {/* Left Side - Portfolio Image Slider (Hidden on mobile) */}
//       <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
//         {/* Background Images */}
//         {sliderImages.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
//             style={{
//               backgroundImage: `url(${image})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//           />
//         ))}

//         {/* Gradient Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900/80"></div>

//         {/* Logo */}
//         <div className="absolute top-8 left-8 z-10">
//           <h1 className="text-3xl font-bold text-white">PortfolioPro</h1>
//         </div>

//         {/* Back to Website Button */}
//         <div className="absolute top-8 right-8 z-10">
//           <button className="text-white hover:text-indigo-300 transition-colors flex items-center">
//             Back to website <span className="ml-2">→</span>
//           </button>
//         </div>

//         {/* Caption */}
//         <div className="absolute bottom-16 left-8 z-10">
//           <p className="text-xl text-white font-light">Build stunning portfolios that get you hired</p>
//         </div>

//         {/* Slider Indicators */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
//           {sliderImages.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-white' : 'bg-gray-400'}`}
//               onClick={() => setActiveSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right Side - Registration Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700"
//         >
//           <div className="text-center mb-8">
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center justify-center w-16 h-16 bg-indigo-900/20 rounded-xl mb-4 mx-auto"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//               </svg>
//             </motion.div>
//             <h2 className="text-3xl font-bold text-white">
//               Create Your Account
//             </h2>
//             <p className="mt-2 text-gray-400">
//               Join our community of creative professionals
//             </p>
//           </div>

//           <motion.form
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-6"
//             onSubmit={handleSubmit}
//           >
//             <div>
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
//                 Full Name
//               </label>
//               <input
//                 id="fullName"
//                 name="fullName"
//                 type="text"
//                 autoComplete="name"
//                 required
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={passwordVisible ? "text" : "password"}
//                   autoComplete="new-password"
//                   required
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-12"
//                   placeholder="Create a password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   aria-label={passwordVisible ? "Hide password" : "Show password"}
//                 >
//                   {passwordVisible ? (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   ) : (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.88l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               <div className="mt-2">
//                 <div className="flex gap-1 h-1.5">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className={`flex-1 rounded-full ${i <= passwordStrength ?
//                         passwordStrength <= 2 ? 'bg-red-400' :
//                         passwordStrength <= 3 ? 'bg-yellow-400' : 'bg-green-400'
//                         : 'bg-gray-600'}`}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs mt-1 text-gray-400">
//                   {passwordStrength === 0 ? '' :
//                    passwordStrength <= 2 ? 'Weak password' :
//                    passwordStrength <= 3 ? 'Moderate password' : 'Strong password'}
//                 </p>
//               </div>
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={confirmPasswordVisible ? "text" : "password"}
//                   autoComplete="new-password"
//                   required
//                   className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-12"
//                   placeholder="Confirm your password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//                   aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
//                 >
//                   {confirmPasswordVisible ? (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   ) : (
//                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.88l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-start">
//               <div className="flex items-center h-5">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   required
//                   className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
//                 />
//               </div>
//               <div className="ml-3 text-sm">
//                 <label htmlFor="terms" className="font-medium text-gray-300">
//                   I agree to the <Link to="/terms" className="text-indigo-400 hover:underline">Terms</Link> and <Link to="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>
//                 </label>
//               </div>
//             </div>

//             <motion.button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
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
//                   Creating Account...
//                 </div>
//               ) : (
//                 'Register Now'
//               )}
//             </motion.button>
//           </motion.form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-600"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-gray-800 text-gray-400">
//                   Or sign up with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3">
//               <motion.button
//                 type="button"
//                 className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
//                 whileHover={{ y: -2 }}
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
//                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                 </svg>
//                 Google
//               </motion.button>
//               <motion.button
//                 type="button"
//                 className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
//                 whileHover={{ y: -2 }}
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24" fill="#000000">
//                   <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
//                 </svg>
//                 Apple
//               </motion.button>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-400">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="font-medium text-indigo-400 hover:text-indigo-300"
//               >
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;
