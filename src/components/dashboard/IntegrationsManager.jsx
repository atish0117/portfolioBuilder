



// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';

// const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// export default function IntegrationsManager() {
//   const [integrations, setIntegrations] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const categories = [
//     { id:'all', label:'All', icon:'🔗' },
//     { id:'analytics', label:'Analytics', icon:'📊' },
//     { id:'social', label:'Social', icon:'👥' },
//     { id:'productivity', label:'Productivity', icon:'⚡' },
//     { id:'design', label:'Design', icon:'🎨' }
//   ];

//   const token = localStorage.getItem('token');

//   async function load() {
//     const res = await fetch(`${API}/integrations`, { headers: { Authorization: `Bearer ${token}` }});
//     const data = await res.json();
//     setIntegrations(data.integrations);
//   }

//   useEffect(() => { load(); }, []);

//   const filteredIntegrations =
//     activeCategory === 'all' ? integrations : integrations.filter(i => i.category === activeCategory);

//   async function connect(providerId) {
//     const res = await fetch(`${API}/integrations/${providerId}/connect-url`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     const data = await res.json();
//     const win = window.open(data.authUrl, '_blank', 'width=520,height=620');

//     // crude poll to refresh after OAuth completes (token set by /oauth/callback page)
//     const poll = setInterval(() => {
//       const newToken = localStorage.getItem('token');
//       if (newToken) {
//         clearInterval(poll);
//         load();
//         toast.success(`${providerId} connected`);
//         if (win) win.close();
//       }
//     }, 1500);
//   }

//   async function disconnect(providerId) {
//     await fetch(`${API}/integrations/${providerId}/disconnect`, {
//       method:'POST',
//       headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` }
//     });
//     toast.success(`${providerId} disconnected`);
//     load();
//   }

//   async function sync(providerId) {
//     const res = await fetch(`${API}/integrations/${providerId}/sync`, {
//       method:'POST',
//       headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}` }
//     });
//     if (res.ok) {
//       const data = await res.json();
//       toast.success(`Synced (${new Date(data.lastSyncedAt).toLocaleString()})`);
//       load();
//     } else {
//       toast.error('Sync failed');
//     }
//   }

//   const handleToggleIntegration = (id, isConnected) => {
//     if (isConnected) disconnect(id); else connect(id);
//   };

//   const connectedCount = integrations.filter(i => i.connected).length;

//   return (
//     <div className="space-y-6">
//       {/* header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h2>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">Connect your favorite tools and services</p>
//         </div>
//         <div className="text-sm text-gray-500 dark:text-gray-400">
//           {connectedCount} of {integrations.length} connected
//         </div>
//       </div>

//       {/* stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {categories.slice(1).map(category => {
//           const cats = integrations.filter(i => i.category === category.id);
//           const conn = cats.filter(i => i.connected).length;
//           return (
//             <motion.div key={category.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="card p-4 text-center">
//               <div className="text-2xl mb-2">{category.icon}</div>
//               <h3 className="font-medium text-gray-900 dark:text-white">{category.label}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">{conn}/{cats.length} connected</p>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* filter */}
//       <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
//         {categories.map(category => (
//           <button key={category.id} onClick={()=>setActiveCategory(category.id)}
//             className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
//             ${activeCategory===category.id ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm' :
//             'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
//             <span>{category.icon}</span><span>{category.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredIntegrations.map((integration, index) => (
//           <motion.div key={integration.id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:index*0.05 }}
//             className={`card p-6 transition-all duration-300 hover:shadow-lg
//               ${integration.connected ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
//               : 'hover:border-primary-200 dark:hover:border-primary-800'}`}>
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="text-3xl">{integration.icon}</div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
//                   <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
//                         ${integration.connected ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
//                         : 'bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400'}`}>
//                     {integration.connected ? 'Connected' : 'Not Connected'}
//                   </div>
//                 </div>
//               </div>

//               <motion.button whileTap={{ scale:0.95 }}
//                 onClick={() => handleToggleIntegration(integration.id, integration.connected)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
//                   ${integration.connected ? 'bg-green-600' : 'bg-gray-300 dark:bg-dark-600'}`}>
//                 <motion.span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
//                   animate={{ x: integration.connected ? 24 : 4 }} transition={{ type:'spring', stiffness:500, damping:30 }}/>
//               </motion.button>
//             </div>

//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{integration.description}</p>

//             {integration.connected && (
//               <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
//                 className="border-t border-green-200 dark:border-green-800 pt-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-green-700 dark:text-green-300">
//                     Last synced: {integration.lastSyncedAt ? new Date(integration.lastSyncedAt).toLocaleString() : '—'}
//                   </span>
//                   <button onClick={()=>sync(integration.id)}
//                     className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
//                     Configure / Sync
//                   </button>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>

//       {/* Coming soon as-is */}
//       {/* ... keep your existing Coming Soon section ... */}
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { socialAuthAPI, githubAPI, linkedinAPI, integrationSettingsAPI } from '../../services/integration'
import ProgressBar from '../ui/ProgressBar'
import toast from 'react-hot-toast'





const IntegrationsManager = () => {
  const { user } = useSelector((state) => state.auth)
  const [integrations, setIntegrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [githubRepos, setGithubRepos] = useState([])
  const [selectedRepos, setSelectedRepos] = useState([])
  const [importing, setImporting] = useState(false)
  const [githubStats, setGithubStats] = useState(null)

  useEffect(() => {
    loadIntegrations()
  }, [])

  const loadIntegrations = async () => {
    try {
      const response = await integrationSettingsAPI.getStatus()
      const { integrations: integrationData, connectedCount } = response.data

      const integrationsList = [
        {
          id: 'github',
          name: 'GitHub',
          description: 'Import repositories, sync profile data, and showcase your code',
          icon: '🐙',
          color: 'from-gray-700 to-gray-900',
          status: integrationData.github.connected ? 'connected' : 'disconnected',
          features: ['Repository Import', 'Profile Sync', 'Contribution Stats', 'Auto Project Creation'],
          lastSync: integrationData.github.lastSync ? new Date(integrationData.github.lastSync) : undefined,
          username: integrationData.github.username,
          profileUrl: integrationData.github.profileUrl
        },
        {
          id: 'linkedin',
          name: 'LinkedIn',
          description: 'Sync professional experience and build credibility',
          icon: '💼',
          color: 'from-blue-600 to-blue-800',
          status: integrationData.linkedin.connected ? 'connected' : 'disconnected',
          features: ['Experience Sync', 'Skills Import', 'Professional Network', 'Headline Import'],
          lastSync: integrationData.linkedin.lastSync ? new Date(integrationData.linkedin.lastSync) : undefined,
          username: integrationData.linkedin.username,
          profileUrl: integrationData.linkedin.profileUrl
        },
        {
          id: 'google',
          name: 'Google',
          description: 'Access Google services and profile synchronization',
          icon: '🔍',
          color: 'from-red-500 to-yellow-500',
          status: integrationData.google.connected ? 'connected' : 'disconnected',
          features: ['Profile Sync', 'Google Analytics', 'Drive Integration', 'Gmail Access'],
          lastSync: integrationData.google.lastSync ? new Date(integrationData.google.lastSync) : undefined
        },
        {
          id: 'instagram',
          name: 'Instagram',
          description: 'Showcase your visual content and personal brand',
          icon: '📷',
          color: 'from-pink-500 to-purple-600',
          status: integrationData.instagram.connected ? 'connected' : 'disconnected',
          features: ['Profile Link', 'Visual Portfolio', 'Brand Showcase', 'Social Proof'],
          profileUrl: integrationData.instagram.profileUrl
        },
        {
          id: 'dribbble',
          name: 'Dribbble',
          description: 'Display your design shots and creative work',
          icon: '🏀',
          color: 'from-pink-400 to-rose-500',
          status: integrationData.dribbble.connected ? 'connected' : 'disconnected',
          features: ['Shot Display', 'Like Tracking', 'Follow Stats', 'Design Portfolio'],
          profileUrl: integrationData.dribbble.profileUrl
        },
        {
          id: 'behance',
          name: 'Behance',
          description: 'Showcase your creative projects and case studies',
          icon: '🎨',
          color: 'from-blue-500 to-purple-600',
          status: integrationData.behance.connected ? 'connected' : 'disconnected',
          features: ['Project Import', 'Case Studies', 'Creative Network', 'Portfolio Sync'],
          profileUrl: integrationData.behance.profileUrl
        },
        {
          id: 'website',
          name: 'Personal Website',
          description: 'Link to your main website or blog',
          icon: '🌐',
          color: 'from-green-500 to-teal-600',
          status: integrationData.website.connected ? 'connected' : 'disconnected',
          features: ['Website Link', 'Blog Integration', 'Custom Domain', 'SEO Benefits'],
          profileUrl: integrationData.website.profileUrl
        }
      ]

      setIntegrations(integrationsList)
    } catch (error) {
      console.error('Failed to load integrations:', error)
      toast.error('Failed to load integrations')
    } finally {
      setLoading(false)
    }
  }

  const handleConnect = async (integrationId) => {
    try {
      switch (integrationId) {
        case 'github':
          socialAuthAPI.connectGitHub()
          break
        case 'google':
          socialAuthAPI.connectGoogle()
          break
        case 'linkedin':
          socialAuthAPI.connectLinkedIn()
          break
        default:
          toast.info(`${integrationId} integration coming soon!`)
      }
    } catch (error) {
      toast.error(`Failed to connect ${integrationId}`)
    }
  }

  const handleDisconnect = async (integrationId) => {
    if (!confirm(`Are you sure you want to disconnect ${integrationId}?`)) return

    try {
      await socialAuthAPI.disconnectAccount(integrationId)
      toast.success(`${integrationId} disconnected successfully`)
      loadIntegrations()
    } catch (error) {
      toast.error(`Failed to disconnect ${integrationId}`)
    }
  }

  const handleSync = async (integrationId) => {
    setSyncing(integrationId)
    try {
      await socialAuthAPI.syncData(integrationId)
      toast.success(`${integrationId} data synced successfully`)
      loadIntegrations()
    } catch (error) {
      toast.error(`Failed to sync ${integrationId} data`)
    } finally {
      setSyncing(null)
    }
  }

  const loadGitHubRepos = async () => {
    try {
      const response = await githubAPI.getRepositories()
      setGithubRepos(response.data.repositories)
    } catch (error) {
      toast.error('Failed to load GitHub repositories')
    }
  }

  const loadGitHubStats = async () => {
    try {
      const response = await githubAPI.getStats()
      setGithubStats(response.data)
    } catch (error) {
      toast.error('Failed to load GitHub stats')
    }
  }

  const handleImportRepos = async () => {
    if (selectedRepos.length === 0) {
      toast.error('Please select repositories to import')
      return
    }

    setImporting(true)
    try {
      const response = await githubAPI.importRepositories(selectedRepos)
      toast.success(`Imported ${response.data.importedCount} projects successfully!`)
      setSelectedRepos([])
      setActiveTab('overview')
    } catch (error) {
      toast.error('Failed to import repositories')
    } finally {
      setImporting(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
      case 'error': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return '✅'
      case 'error': return '❌'
      default: return '⚪'
    }
  }

  const connectedCount = integrations.filter(i => i.status === 'connected').length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-200 dark:bg-dark-700 h-8 w-64 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-gray-200 dark:bg-dark-700 h-32 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Integrations & Connections
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Connect external services to enhance your portfolio
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {connectedCount}/{integrations.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Connected
          </div>
        </div>
      </div>

      {/* Connection Progress */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
            Integration Progress
          </h3>
          <div className="text-blue-900 dark:text-blue-100">
            {Math.round((connectedCount / integrations.length) * 100)}% Complete
          </div>
        </div>
        <ProgressBar
          value={(connectedCount / integrations.length) * 100}
          color="bg-gradient-to-r from-blue-500 to-purple-500"
          showValue={false}
          animated={true}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: '📋' },
          { id: 'github', label: 'GitHub', icon: '🐙' },
          { id: 'social', label: 'Social Media', icon: '🔗' },
          { id: 'settings', label: 'Settings', icon: '⚙️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === tab.id

                ? 'bg-white dark:bg-dark-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >

            <span>{tab.icon}</span>
            <span>{tab.label}</span>

          </button>
        ))}
      </div>


      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card p-6 transition-all duration-300 ${
                  integration.status === 'connected' 
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                    : integration.status === 'error'
                    ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                    : 'hover:border-primary-200 dark:hover:border-primary-800'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white text-2xl`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {integration.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                          {getStatusIcon(integration.status)} {integration.status}
                        </span>
                        {integration.username && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            @{integration.username}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {integration.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-1">
                    {integration.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last Sync */}
                {integration.lastSync && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    Last synced: {integration.lastSync.toLocaleDateString()}
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {integration.status === 'connected' ? (
                    <>
                      <motion.button
                        onClick={() => handleSync(integration.id)}
                        disabled={syncing === integration.id}
                        className="flex-1 btn-secondary text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {syncing === integration.id ? (
                          <div className="flex items-center justify-center space-x-2">
                            <motion.div
                              className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Syncing...</span>
                          </div>
                        ) : (
                          '🔄 Sync Data'
                        )}
                      </motion.button>
                      <motion.button
                        onClick={() => handleDisconnect(integration.id)}
                        className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Disconnect
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      onClick={() => handleConnect(integration.id)}
                      className="w-full btn-primary text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Connect {integration.name}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'github' && (
          <motion.div
            key="github"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                GitHub Integration
              </h3>
              {integrations.find(i => i.id === 'github')?.status === 'connected' && (
                <div className="flex space-x-2">
                  <motion.button
                    onClick={loadGitHubStats}
                    className="btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Load Stats
                  </motion.button>
                  <motion.button
                    onClick={loadGitHubRepos}
                    className="btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Load Repositories
                  </motion.button>
                </div>
              )}
            </div>

            {integrations.find(i => i.id === 'github')?.status === 'connected' ? (
              <div className="space-y-6">
                {/* GitHub Stats */}
                {githubStats && (
                  <div className="card p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      GitHub Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {githubStats.publicRepos}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Public Repos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {githubStats.totalStars}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Stars</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {githubStats.followers}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {githubStats.languages?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Languages</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Repository Import */}
                {githubRepos.length > 0 && (
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Import Repositories as Projects
                      </h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedRepos(githubRepos.map(r => r.id))}
                          className="btn-secondary text-sm"
                        >
                          Select All
                        </button>
                        <button
                          onClick={() => setSelectedRepos([])}
                          className="btn-secondary text-sm"
                        >
                          Clear All
                        </button>
                        <motion.button
                          onClick={handleImportRepos}
                          disabled={selectedRepos.length === 0 || importing}
                          className="btn-primary text-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {importing ? 'Importing...' : `Import ${selectedRepos.length} Selected`}
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                      {githubRepos.map((repo) => (
                        <div
                          key={repo.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedRepos.includes(repo.id)
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                          }`}
                          onClick={() => {
                            setSelectedRepos(prev => 
                              prev.includes(repo.id)
                                ? prev.filter(id => id !== repo.id)
                                : [...prev, repo.id]
                            )
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h5 className="font-semibold text-gray-900 dark:text-white">
                                  {repo.name}
                                </h5>
                                {repo.private && (
                                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded text-xs">
                                    Private
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {repo.description || 'No description available'}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                {repo.language && (
                                  <span className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>{repo.language}</span>
                                  </span>
                                )}
                                <span>⭐ {repo.stars}</span>
                                <span>🍴 {repo.forks}</span>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selectedRepos.includes(repo.id)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {selectedRepos.includes(repo.id) && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <div className="text-6xl mb-4">🐙</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Connect GitHub Account
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect your GitHub account to import repositories and showcase your code
                </p>
                <motion.button
                  onClick={() => handleConnect('github')}
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect GitHub
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'social' && (
          <motion.div
            key="social"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Social Media Connections
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.filter(i => ['linkedin', 'google', 'instagram', 'dribbble', 'behance', 'website'].includes(i.id)).map((integration) => (
                <div key={integration.id} className="card p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${integration.color} flex items-center justify-center text-white text-xl`}>
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {integration.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {getStatusIcon(integration.status)} {integration.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {integration.description}
                  </p>

                  {integration.profileUrl && (
                    <div className="mb-4">
                      <a
                        href={integration.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View Profile →
                      </a>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {integration.status === 'connected' ? (
                      <>
                        {['github', 'linkedin', 'google'].includes(integration.id) && (
                          <motion.button
                            onClick={() => handleSync(integration.id)}
                            disabled={syncing === integration.id}
                            className="flex-1 btn-secondary text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {syncing === integration.id ? 'Syncing...' : 'Sync'}
                          </motion.button>
                        )}
                        <motion.button
                          onClick={() => handleDisconnect(integration.id)}
                          className="px-3 py-2 text-red-600 hover:text-red-700 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Disconnect
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        onClick={() => handleConnect(integration.id)}
                        className="w-full btn-primary text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Connect
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Integration Settings
            </h3>
            
            <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                🔧 GitHub Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Auto-import Repositories</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Automatically create projects from your GitHub repositories
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">Include Private Repositories</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Import private repositories (requires additional permissions)
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
                🔗 LinkedIn Settings
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-purple-900 dark:text-purple-100">Sync Experience</h5>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Import work experience from LinkedIn
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-purple-900 dark:text-purple-100">Sync Skills</h5>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Import skills from LinkedIn profile
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integration Benefits */}
      <div className="card p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
          🚀 Why Connect Your Accounts?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-800 dark:text-green-200">
          <div>
            <h4 className="font-medium mb-2">🎯 For Developers:</h4>
            <ul className="space-y-1">
              <li>• Auto-import GitHub repositories as portfolio projects</li>
              <li>• Sync contribution stats and coding activity</li>
              <li>• Display programming languages and frameworks</li>
              <li>• Show open source contributions and collaboration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">🎨 For Everyone:</h4>
            <ul className="space-y-1">
              <li>• LinkedIn integration for professional experience</li>
              <li>• Social media presence for personal branding</li>
              <li>• Automatic profile data synchronization</li>
              <li>• Enhanced SEO with social proof</li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}


export default IntegrationsManager

