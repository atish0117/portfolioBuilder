import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true 
})

// Add auth token to requests
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes('/login')
    ) {
      // Optional: sirf protected pages pe redirect
      console.warn('Session expired')
    }
    return Promise.reject(error)
  }
)



// Auth API
export const authAPI = {
  login: (credentials) =>
    api.post('/auth/login', credentials),

  register: (userData) =>
    api.post('/auth/register', userData),
  
  logout: () => api.post('/auth/logout'),

  getProfile: () => api.get('/auth/profile'),

  updateProfile: (profileData) =>
    api.put('/auth/profile', profileData),
  
  forgotPassword: (email) =>
    api.post('/password/forgot-password', { email }),
  
  resetPassword: (token, password, confirmPassword) =>
    api.post('/password/reset-password', { token, password, confirmPassword }),
  
  verifyResetToken: (token) =>
    api.get(`/password/verify-reset-token/${token}`),

  changePassword: (currentPassword, newPassword, confirmPassword) =>
    api.put('/password/change-password', { currentPassword, newPassword, confirmPassword }),
}

// Portfolio API
export const portfolioAPI = {
  getPortfolio: (username) =>
    api.get(`/portfolio/${username}`),

  updateSectionOrder: (sectionOrder) =>
    api.put('/portfolio/section-order', { sectionOrder }),

  toggleSectionVisibility: (section, visible) =>
    api.put('/portfolio/section-visibility', { section, visible }),
}

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects'),

  createProject: (projectData) =>
    api.post('/projects', projectData),

  updateProject: (id, projectData) =>
    api.put(`/projects/${id}`, projectData),

  deleteProject: (id) =>
    api.delete(`/projects/${id}`),
}

// SEO API
export const seoAPI = {
  getSeoData: () => api.get('/seo/data'),
  
  updateSeoData: (seoData) =>
    api.put('/seo/data', seoData),
  
  generateSuggestions: () =>
    api.post('/seo/suggestions'),
  
  getSeoAnalysis: () =>
    api.get('/seo/analysis'),
  
  getSeoPreview: (username) =>
    api.get(`/seo/preview/${username}`),
}

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  
  getUsers: (params) => api.get('/admin/users', { params }),

  updateUserStatus: (userId, status, reason) =>
    api.put(`/admin/users/${userId}/status`, { status, reason }),

  updateUserRole: (userId, role) =>
    api.put(`/admin/users/${userId}/role`, { role }),

  deleteUser: (userId) =>
    api.delete(`/admin/users/${userId}`),

  bulkUserAction: (userIds, action, reason) =>
    api.post('/admin/users/bulk-action', { userIds, action, reason }),
  
  getTemplates: () => api.get('/admin/templates'),

  createTemplate: (templateData) =>
    api.post('/admin/templates', templateData),

  updateTemplate: (templateId, templateData) =>
    api.put(`/admin/templates/${templateId}`, templateData),

  deleteTemplate: (templateId) =>
    api.delete(`/admin/templates/${templateId}`),

  getAnalytics: (timeRange = '30d') =>
    api.get(`/admin/analytics?range=${timeRange}`),
  
  getSystemSettings: () => api.get('/admin/settings'),

  updateSystemSetting: (settingKey, settingValue, description) =>
    api.put(`/admin/settings/${settingKey}`, { settingValue, description }),
}


export default api
