import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { checkAuth } from './store/slices/authSlice'
import { ThemeProvider } from './contexts/ThemeContext'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import LoadingSpinner from './components/ui/LoadingSpinner'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthCallback from './pages/auth/AuthCallback'
import ForgotPassword from './pages/auth/ForgotPassword'  
import ResetPassword from './pages/auth/ResetPassword' 
import AdminDashboard from './pages/admin/AdminDashboard'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Home from './pages/Home' 
import AuroraStudioTemplate from "./components/portfolio/templates/AuroraStudioTemplate"
import { useLocation } from 'react-router-dom'



function App() {
  const dispatch = useDispatch()
   const location = useLocation() // 👈 gets current path
  const { isAuthenticated, loading,user } = useSelector((state) => state.auth)
  console.log('Auth state:', isAuthenticated, loading ,user)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }
  // 👇 Define routes where navbar should not appear

const shouldHideNavbar = /^\/(?!dashboard|login|register$)[^/]+$/.test(location.pathname)


  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
             {/* Conditionally render Navbar */}
          {!shouldHideNavbar && <Navbar />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<AuroraStudioTemplate />} />

              <Route 
                path="/login" 
                element={
                  !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
                } 
              />
              <Route 
                path="/register" 
                element={
                  !isAuthenticated ? <Register /> : <Navigate to="/dashboard" replace />
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  !isAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard" replace />
                } 
              />
              <Route 
                path="/reset-password" 
                element={
                  !isAuthenticated ? <ResetPassword /> : <Navigate to="/dashboard" replace />
                } 
              />

              <Route path="/auth/callback" element={<AuthCallback />} />

              <Route 

                path="/dashboard"

                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                } 
              />

                <Route 
                path="/admin" 
                element={
                  isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />
                } 
              />



                



              <Route path="/:username" element={<Portfolio />} />
            </Routes>
          </AnimatePresence>
        </div>
        {/* <DebugPanel /> */}
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
