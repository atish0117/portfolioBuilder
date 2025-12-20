// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from '../../store/slices/authSlice'
// import { useNavigate } from 'react-router-dom'
// import ConfirmDialog from '../ui/ConfirmDialog'
// import ChangePassword from '../../pages/auth/ChangePassword'
// import toast from 'react-hot-toast'

// const SettingsManager = () => {
//   const { user } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false)
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [activeSection, setActiveSection] = useState('account')

//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/')
//     toast.success('Logged out successfully')
//   }

//   const handleDeleteAccount = () => {
//     toast.error('Account deletion is not implemented in this demo')
//     setShowDeleteDialog(false)
//   }

//   const handleExportData = () => {
//     const userData = {
//       profile: user,
//       exportDate: new Date().toISOString(),
//       version: '1.0',
//     }

//     const dataStr = JSON.stringify(userData, null, 2)
//     const dataBlob = new Blob([dataStr], { type: 'application/json' })
//     const url = URL.createObjectURL(dataBlob)

//     const link = document.createElement('a')
//     link.href = url
//     link.download = `portfolio-data-${user?.username}.json`
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     URL.revokeObjectURL(url)

//     toast.success('Portfolio data exported successfully!')
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//         Account Settings
//       </h2>

//         {/* Section Navigation */}
//       <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
//         {[
//           { id: 'account', label: 'Account Info', icon: '👤' },
//           { id: 'security', label: 'Security', icon: '🔒' },
//           { id: 'privacy', label: 'Privacy', icon: '🛡️' },
//           { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
//         ].map((section) => (
//           <button
//             key={section.id}
//             onClick={() => setActiveSection(section.id)}
//             className={`
//               flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
//               ${activeSection === section.id
//                 ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
//                 : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
//               }
//             `}
//           >
//             <span>{section.icon}</span>
//             <span>{section.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Account Information */}
//       <div className="card p-6">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Account Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//               Full Name
//             </label>
//             <p className="text-gray-900 dark:text-white">{user?.fullName}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//               Email Address
//             </label>
//             <p className="text-gray-900 dark:text-white">{user?.email}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//               Username
//             </label>
//             <p className="text-gray-900 dark:text-white">@{user?.username}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
//               Member Since
//             </label>
//             <p className="text-gray-900 dark:text-white">
//               {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Portfolio Settings */}
//       <div className="card p-6">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Portfolio Settings
//         </h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//             <div>
//               <h4 className="font-medium text-blue-900 dark:text-blue-100">Portfolio URL</h4>
//               <p className="text-sm text-blue-700 dark:text-blue-300">
//                 Your portfolio is live at: <code className="font-mono">{window.location.origin}/{user?.username}</code>
//               </p>
//             </div>
//             <motion.button
//               onClick={() => {
//                 navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
//                 toast.success('URL copied to clipboard!')
//               }}
//               className="btn-secondary text-sm"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Copy URL
//             </motion.button>
//           </div>

//           <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
//             <div>
//               <h4 className="font-medium text-green-900 dark:text-green-100">Portfolio Status</h4>
//               <p className="text-sm text-green-700 dark:text-green-300">
//                 Your portfolio is public and searchable
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-sm font-medium text-green-700 dark:text-green-300">Live</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Data Management */}
//       <div className="card p-6">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Data Management
//         </h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white">Export Portfolio Data</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Download all your portfolio data as a JSON file
//               </p>
//             </div>
//             <motion.button
//               onClick={handleExportData}
//               className="btn-secondary"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Export Data
//             </motion.button>
//           </div>

//           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white">Portfolio Backup</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Your data is automatically backed up daily
//               </p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               <span className="text-sm text-green-600 dark:text-green-400">Active</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Privacy & Security */}
//       <div className="card p-6">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Privacy & Security
//         </h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Add an extra layer of security to your account
//               </p>
//             </div>
//             <motion.button
//               className="btn-secondary"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => toast('2FA setup coming soon!')}
//             >
//               Enable 2FA
//             </motion.button>
//           </div>

//           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Update your account password
//               </p>
//             </div>
//             <motion.button
//               className="btn-secondary"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => toast('Password change coming soon!')}
//             >
//               Change Password
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Danger Zone */}
//       <div className="card p-6 border-red-200 dark:border-red-800">
//         <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">
//           Danger Zone
//         </h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
//             <div>
//               <h4 className="font-medium text-red-900 dark:text-red-100">Sign Out</h4>
//               <p className="text-sm text-red-700 dark:text-red-300">
//                 Sign out of your account on this device
//               </p>
//             </div>
//             <motion.button
//               onClick={() => setShowLogoutDialog(true)}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Sign Out
//             </motion.button>
//           </div>

//           <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
//             <div>
//               <h4 className="font-medium text-red-900 dark:text-red-100">Delete Account</h4>
//               <p className="text-sm text-red-700 dark:text-red-300">
//                 Permanently delete your account and all data
//               </p>
//             </div>
//             <motion.button
//               onClick={() => setShowDeleteDialog(true)}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               Delete Account
//             </motion.button>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Dialogs */}
//       <ConfirmDialog
//         isOpen={showLogoutDialog}
//         title="Sign Out"
//         message="Are you sure you want to sign out? You'll need to log in again to access your dashboard."
//         confirmText="Sign Out"
//         cancelText="Cancel"
//         onConfirm={handleLogout}
//         onCancel={() => setShowLogoutDialog(false)}
//         type="warning"
//       />

//       <ConfirmDialog
//         isOpen={showDeleteDialog}
//         title="Delete Account"
//         message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
//         confirmText="Delete Account"
//         cancelText="Cancel"
//         onConfirm={handleDeleteAccount}
//         onCancel={() => setShowDeleteDialog(false)}
//         type="danger"
//       />
//     </div>
//   )
// }

// export default SettingsManager





import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '../ui/ConfirmDialog'
import ChangePassword from '../../pages/auth/ChangePassword'
import toast from 'react-hot-toast'

const SettingsManager = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [activeSection, setActiveSection] = useState('account')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    toast.success('Logged out successfully')
  }

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    toast.error('Account deletion is not implemented in this demo')
    setShowDeleteDialog(false)
  }

  const handleExportData = () => {
    const userData = {
      profile: user,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    
    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `portfolio-data-${user?.username}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    toast.success('Portfolio data exported successfully!')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Account Settings
      </h2>

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {[
          { id: 'account', label: 'Account Info', icon: '👤' },
          { id: 'security', label: 'Security', icon: '🔒' },
          { id: 'privacy', label: 'Privacy', icon: '🛡️' },
          { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${activeSection === section.id
                ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {activeSection === 'account' && (
        <div className="space-y-6">
          {/* Account Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-white">{user?.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900 dark:text-white">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Username
                </label>
                <p className="text-gray-900 dark:text-white">@{user?.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Member Since
                </label>
                <p className="text-gray-900 dark:text-white">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Portfolio Settings */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Portfolio Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Portfolio URL</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your portfolio is live at: <code className="font-mono">{window.location.origin}/{user?.username}</code>
                  </p>
                </div>
                <motion.button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
                    toast.success('URL copied to clipboard!')
                  }}
                  className="btn-secondary text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Copy URL
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">Portfolio Status</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your portfolio is public and searchable
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'security' && (
        <div className="space-y-6">
          <ChangePassword />
        </div>
      )}

      {activeSection === 'privacy' && (
        <div className="space-y-6">
          {/* Data Management */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Data Management
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Export Portfolio Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Download all your portfolio data as a JSON file
                  </p>
                </div>
                <motion.button
                  onClick={handleExportData}
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Export Data
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Portfolio Backup</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your data is automatically backed up daily
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Privacy Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Portfolio Visibility</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Control who can view your portfolio
                  </p>
                </div>
                <select className="input-field w-32">
                  <option value="public">Public</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Analytics Tracking</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Allow anonymous usage analytics
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'danger' && (
        <div className="space-y-6">
          {/* Danger Zone */}
          <div className="card p-6 border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">
              Danger Zone
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100">Sign Out</h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Sign out of your account on this device
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowLogoutDialog(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Out
                </motion.button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <h4 className="font-medium text-red-900 dark:text-red-100">Delete Account</h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Permanently delete your account and all data
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowDeleteDialog(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Delete Account
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {[
          { id: 'account', label: 'Account Info', icon: '👤' },
          { id: 'security', label: 'Security', icon: '🔒' },
          { id: 'privacy', label: 'Privacy', icon: '🛡️' },
          { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${activeSection === section.id
                ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {activeSection === 'account' && (
        <div className="space-y-6">
          {/* Account Information */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Full Name
                </label>
                <p className="text-gray-900 dark:text-white">{user?.fullName}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        title="Sign Out"
        message="Are you sure you want to sign out? You'll need to log in again to access your dashboard."
        confirmText="Sign Out"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutDialog(false)}
        type="warning"
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
        confirmText="Delete Account"
        cancelText="Cancel"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
        type="danger"
      />
    </div>
  )
}

export default SettingsManager