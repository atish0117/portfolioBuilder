import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token refresh on 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.post('/api/auth/refresh', { refreshToken })
          const { token } = response.data
          
          localStorage.setItem('token', token)
          originalRequest.headers.Authorization = `Bearer ${token}`
          
          return api(originalRequest)
        }
      } catch (refreshError) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

// Social Authentication API
export const socialAuthAPI = {
  // OAuth redirects
  connectGitHub: () => window.location.href = '/api/auth/github',
  connectGoogle: () => window.location.href = '/api/auth/google',
  connectLinkedIn: () => window.location.href = '/api/auth/linkedin',
  
  // Account management
  disconnectAccount: (provider) =>
    api.delete(`/auth/disconnect/${provider}`),
  
  syncData: (provider) =>
    api.post(`/auth/sync/${provider}`),
  
  getConnectedAccounts: () =>
    api.get('/auth/connected'),
}

// GitHub Integration API
export const githubAPI = {
  getRepositories: () =>
    api.get('/integrations/github/repos'),
  
  importRepositories: (repoIds) =>
    api.post('/integrations/github/import', { repoIds }),
  
  getStats: () =>
    api.get('/integrations/github/stats'),
  
  syncProfile: () =>
    api.post('/auth/sync/github'),
}

// LinkedIn Integration API
export const linkedinAPI = {
  getProfile: () =>
    api.get('/integrations/linkedin/profile'),
  
  getExperience: () =>
    api.get('/integrations/linkedin/experience'),
  
  syncProfile: () =>
    api.post('/auth/sync/linkedin'),
}

// Google Integration API
export const googleAPI = {
  getProfile: () =>
    api.get('/integrations/google/profile'),
  
  syncProfile: () =>
    api.post('/auth/sync/google'),
}

// Integration Settings API
export const integrationSettingsAPI = {
  updateSettings: (provider, settings) =>
    api.put('/integrations/settings', { provider, settings }),
  
  getStatus: () =>
    api.get('/integrations/status'),
}

// Analytics API
export const analyticsAPI = {
  getOverview: (timeRange = '7d') =>
    api.get(`/analytics/overview?range=${timeRange}`),
  
  getDetailedStats: (timeRange = '7d') =>
    api.get(`/analytics/detailed?range=${timeRange}`),
  
  getConversions: () =>
    api.get('/analytics/conversions'),

  exportData: (format, timeRange = '7d') =>
    api.get(`/analytics/export?format=${format}&range=${timeRange}`),
}

export default {
  socialAuthAPI,
  githubAPI,
  linkedinAPI,
  googleAPI,
  integrationSettingsAPI,
  analyticsAPI,
}