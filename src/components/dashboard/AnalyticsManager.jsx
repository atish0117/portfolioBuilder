
// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
// import toast from 'react-hot-toast'

// const AnalyticsManager = () => {
//   const { user } = useSelector((state) => state.auth)

//   const [analyticsData, setAnalyticsData] = useState({
//     views: 0,
//     uniqueVisitors: 0,
//     averageTime: '0:00',
//     topSections: [],
//     recentVisits: []
//   })

//   useEffect(() => {
//     const mockData = {
//       views: Math.floor(Math.random() * 1000) + 100,
//       uniqueVisitors: Math.floor(Math.random() * 500) + 50,
//       averageTime: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
//       topSections: [
//         { name: 'Hero Section', views: Math.floor(Math.random() * 100) + 50 },
//         { name: 'Projects', views: Math.floor(Math.random() * 80) + 40 },
//         { name: 'Skills', views: Math.floor(Math.random() * 60) + 30 },
//         { name: 'Experience', views: Math.floor(Math.random() * 50) + 25 },
//         { name: 'Contact', views: Math.floor(Math.random() * 40) + 20 },
//       ],
//       recentVisits: Array.from({ length: 7 }, (_, i) => ({
//         date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
//         views: Math.floor(Math.random() * 50) + 10
//       })).reverse()
//     }
//     setAnalyticsData(mockData)
//   }, [])

//   const StatCard = ({ title, value, icon, color }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`card p-6 ${color}`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium opacity-80">{title}</p>
//           <p className="text-xl font-bold mt-2">{value}</p>
//         </div>
//         <div className="text-4xl opacity-60">{icon}</div>
//       </div>
//     </motion.div>
//   )

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Portfolio Analytics
//         </h2>
//         <div className="text-sm text-gray-500 dark:text-gray-400">
//           Last updated: {new Date().toLocaleDateString()}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Views"
//           value={analyticsData.views.toLocaleString()}
//           icon="👁️"
//           color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-900 dark:text-blue-100"
//         />
//         <StatCard
//           title="Unique Visitors"
//           value={analyticsData.uniqueVisitors.toLocaleString()}
//           icon="👥"
//           color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-900 dark:text-green-100"
//         />
//         <StatCard
//           title="Avg. Time"
//           value={analyticsData.averageTime}
//           icon="⏱️"
//           color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-900 dark:text-purple-100"
//         />
//         <StatCard
//           title="Portfolio URL"
//           value={`/${user?.username}`}
//           // icon="🔗"
//           color="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 text-orange-900 dark:text-orange-100"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="card p-6"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Most Viewed Sections
//           </h3>
//           <div className="space-y-3">
//             {analyticsData.topSections.map((section, index) => (
//               <div key={section.name} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
//                     index === 0 ? 'bg-yellow-500' :
//                     index === 1 ? 'bg-gray-400' :
//                     index === 2 ? 'bg-orange-500' :
//                     'bg-gray-300'
//                   }`}>
//                     {index + 1}
//                   </div>
//                   <span className="text-gray-900 dark:text-white">{section.name}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-24 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
//                     <div
//                       className="bg-primary-500 h-2 rounded-full"
//                       style={{ width: `${(section.views / Math.max(...analyticsData.topSections.map(s => s.views))) * 100}%` }}
//                     />
//                   </div>
//                   <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
//                     {section.views}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="card p-6"
//         >
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//             Recent Activity (7 days)
//           </h3>
//           <div className="space-y-3">
//             {analyticsData.recentVisits.map((visit) => (
//               <div key={visit.date} className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   {visit.date}
//                 </span>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-16 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
//                     <div
//                       className="bg-green-500 h-2 rounded-full"
//                       style={{ width: `${(visit.views / Math.max(...analyticsData.recentVisits.map(v => v.views))) * 100}%` }}
//                     />
//                   </div>
//                   <span className="text-sm font-medium text-gray-900 dark:text-white w-6 text-right">
//                     {visit.views}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800"
//       >
//         <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
//           📊 Insights & Recommendations
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-800 dark:text-indigo-200">
//           <div>
//             <h4 className="font-medium mb-2">🎯 Performance Insights:</h4>
//             <ul className="space-y-1">
//               <li>• Your portfolio has great engagement!</li>
//               <li>• Projects section is performing well</li>
//               <li>• Average session time is above industry standard</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-medium mb-2">💡 Improvement Tips:</h4>
//             <ul className="space-y-1">
//               <li>• Add more projects to increase engagement</li>
//               <li>• Update your tagLine to improve conversion</li>
//               <li>• Consider adding testimonials section</li>
//             </ul>
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="card p-6"
//       >
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Share Your Portfolio
//         </h3>
//         <div className="flex items-center space-x-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               value={`${window.location.origin}/${user?.username}`}
//               readOnly
//               className="input-field"
//             />
//           </div>
//           <motion.button
//             onClick={() => {
//               navigator.clipboard.writeText(`${window.location.origin}/${user?.username}`)
//               toast.success('Portfolio URL copied to clipboard!')
//             }}
//             className="btn-primary"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Copy Link
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default AnalyticsManager



import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import StatsCard from '../ui/StatsCard'
import ProgressBar from '../ui/ProgressBar'



const AnalyticsManager= () => {
  const { user } = useSelector((state) => state.auth)
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    averageSessionTime: '0:00',
    bounceRate: 0,
    topPages: [],
    trafficSources: [],
    deviceBreakdown: [],
    geographicData: [],
    timeOnSite: [],
    conversionMetrics: {
      contactFormSubmissions: 0,
      resumeDownloads: 0,
      socialClicks: 0,
      projectViews: 0
    }
  })
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    generateMockAnalytics()
  }, [timeRange, user])

  const generateMockAnalytics = () => {
    setLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const mockData = {
        totalViews: Math.floor(Math.random() * 5000) + 1000,
        uniqueVisitors: Math.floor(Math.random() * 2000) + 500,
        averageSessionTime: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        bounceRate: Math.floor(Math.random() * 30) + 20,
        topPages: [
          { page: 'Portfolio Home', views: Math.floor(Math.random() * 500) + 200, percentage: 45 },
          { page: 'Projects', views: Math.floor(Math.random() * 300) + 150, percentage: 25 },
          { page: 'About', views: Math.floor(Math.random() * 200) + 100, percentage: 15 },
          { page: 'Contact', views: Math.floor(Math.random() * 150) + 75, percentage: 10 },
          { page: 'Resume', views: Math.floor(Math.random() * 100) + 50, percentage: 5 }
        ],
        trafficSources: [
          { source: 'Direct', visitors: Math.floor(Math.random() * 300) + 150, percentage: 40 },
          { source: 'Google', visitors: Math.floor(Math.random() * 200) + 100, percentage: 25 },
          { source: 'LinkedIn', visitors: Math.floor(Math.random() * 150) + 75, percentage: 20 },
          { source: 'GitHub', visitors: Math.floor(Math.random() * 100) + 50, percentage: 10 },
          { source: 'Other', visitors: Math.floor(Math.random() * 50) + 25, percentage: 5 }
        ],
        deviceBreakdown: [
          { device: 'Desktop', percentage: 60 },
          { device: 'Mobile', percentage: 35 },
          { device: 'Tablet', percentage: 5 }
        ],
        geographicData: [
          { country: 'United States', visitors: Math.floor(Math.random() * 200) + 100, percentage: 35 },
          { country: 'India', visitors: Math.floor(Math.random() * 150) + 75, percentage: 25 },
          { country: 'United Kingdom', visitors: Math.floor(Math.random() * 100) + 50, percentage: 15 },
          { country: 'Canada', visitors: Math.floor(Math.random() * 80) + 40, percentage: 12 },
          { country: 'Germany', visitors: Math.floor(Math.random() * 60) + 30, percentage: 8 },
          { country: 'Others', visitors: Math.floor(Math.random() * 40) + 20, percentage: 5 }
        ],
        timeOnSite: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          avgTime: Math.floor(Math.random() * 300) + 60
        })),
        conversionMetrics: {
          contactFormSubmissions: Math.floor(Math.random() * 50) + 10,
          resumeDownloads: Math.floor(Math.random() * 100) + 25,
          socialClicks: Math.floor(Math.random() * 200) + 50,
          projectViews: Math.floor(Math.random() * 500) + 100
        }
      }
      
      setAnalyticsData(mockData)
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

          Advanced Analytics
        </h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-500'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Views"
          value={analyticsData.totalViews.toLocaleString()}
          icon="👁️"
          color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-900 dark:text-blue-100"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard

          title="Unique Visitors"
          value={analyticsData.uniqueVisitors.toLocaleString()}
          icon="👥"
          color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-900 dark:text-green-100"

          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Avg. Session"
          value={analyticsData.averageSessionTime}
          icon="⏱️"
          color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-900 dark:text-purple-100"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Bounce Rate"
          value={`${analyticsData.bounceRate}%`}
          icon="📉"
          color="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 text-orange-900 dark:text-orange-100"
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Conversion Metrics */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Conversion Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analyticsData.conversionMetrics.contactFormSubmissions}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Contact Forms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analyticsData.conversionMetrics.resumeDownloads}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Resume Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {analyticsData.conversionMetrics.socialClicks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Social Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {analyticsData.conversionMetrics.projectViews}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Project Views</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Pages
          </h3>
          <div className="space-y-3">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${

                    index === 0 ? 'bg-yellow-500' :
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' :
                    'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>

                  <span className="text-gray-900 dark:text-white">{page.page}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ProgressBar
                    value={page.percentage}
                    className="w-20"
                    height="h-2"
                    animated={false}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {page.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Traffic Sources
          </h3>
          <div className="space-y-3">
            {analyticsData.trafficSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    source.source === 'Direct' ? 'bg-blue-500' :
                    source.source === 'Google' ? 'bg-red-500' :
                    source.source === 'LinkedIn' ? 'bg-blue-600' :
                    source.source === 'GitHub' ? 'bg-gray-800' :
                    'bg-gray-400'
                  }`}></div>
                  <span className="text-gray-900 dark:text-white">{source.source}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ProgressBar
                    value={source.percentage}
                    className="w-20"
                    height="h-2"
                    animated={false}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {source.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Device Breakdown
          </h3>
          <div className="space-y-4">
            {analyticsData.deviceBreakdown.map((device) => (
              <div key={device.device}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-900 dark:text-white">{device.device}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{device.percentage}%</span>
                </div>
                <ProgressBar
                  value={device.percentage}
                  color={
                    device.device === 'Desktop' ? 'bg-blue-500' :
                    device.device === 'Mobile' ? 'bg-green-500' :
                    'bg-purple-500'
                  }
                  animated={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Data */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Countries
          </h3>
          <div className="space-y-3">
            {analyticsData.geographicData.map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-900 dark:text-white">{country.country}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ProgressBar
                    value={country.percentage}
                    className="w-16"
                    height="h-2"
                    animated={false}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">
                    {country.visitors}

                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Performance Insights */}
      <div className="card p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
          📈 Performance Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-800 dark:text-green-200">
          <div>
            <h4 className="font-medium mb-2">🎯 What's Working Well:</h4>
            <ul className="space-y-1">
              <li>• High engagement on projects section</li>
              <li>• Good average session duration</li>
              <li>• Strong direct traffic indicates brand recognition</li>
              <li>• Mobile traffic shows good responsive design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">💡 Optimization Opportunities:</h4>
            <ul className="space-y-1">
              <li>• Add more call-to-action buttons</li>
              <li>• Optimize for search engines (SEO)</li>
              <li>• Create more engaging project descriptions</li>
              <li>• Add testimonials to build credibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Export Analytics */}
      <div className="card p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Export Analytics Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Download your analytics data for external analysis
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                const dataStr = JSON.stringify(analyticsData, null, 2)
                const dataBlob = new Blob([dataStr], { type: 'application/json' })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement('a')
                link.href = url
                link.download = `analytics-${user?.username}-${timeRange}.json`
                link.click()
                URL.revokeObjectURL(url)
              }}
              className="btn-secondary text-sm"
            >
              Export JSON
            </button>
            <button
              onClick={() => {
                const csvData = [
                  ['Metric', 'Value'],
                  ['Total Views', analyticsData.totalViews],
                  ['Unique Visitors', analyticsData.uniqueVisitors],
                  ['Average Session Time', analyticsData.averageSessionTime],
                  ['Bounce Rate', `${analyticsData.bounceRate}%`],
                  ...analyticsData.topPages.map(page => [page.page, page.views])
                ].map(row => row.join(',')).join('\n')
                
                const dataBlob = new Blob([csvData], { type: 'text/csv' })
                const url = URL.createObjectURL(dataBlob)
                const link = document.createElement('a')
                link.href = url
                link.download = `analytics-${user?.username}-${timeRange}.csv`
                link.click()
                URL.revokeObjectURL(url)
              }}
              className="btn-secondary text-sm"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AnalyticsManager

