import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API_URL || '/api'

const api = axios.create({
  baseURL:API_BASE_URL,
  withCredentials: true // cookies only
})

// Handle token refresh on 401 responses
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url || ''

    // 🔕 silent auth check fail
    if (status === 401 && url.includes('/auth/profile')) {
      return Promise.reject(error)
    }

    if (status === 401) {
      window.location.href = '/login'
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


