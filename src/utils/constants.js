export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  PORTFOLIO: {
    GET: (username) => `/api/portfolio/${username}`,
    SECTION_ORDER: '/api/portfolio/section-order',
    SECTION_VISIBILITY: '/api/portfolio/section-visibility',
    PROFILE: '/api/portfolio/profile',
  },
  PROJECTS: {
    BASE: '/api/projects',
    BY_ID: (id) => `/api/projects/${id}`,
  },
}

export const STORAGE_KEYS = {
  TOKEN: 'token',
  THEME: 'theme',
  DRAFT_PROFILE: 'draft_profile',
}

export const PORTFOLIO_SECTIONS = [
  { id: 'hero', label: 'Hero Section', icon: '🏠', description: 'Introduction and profile image' },
  { id: 'skills', label: 'Skills', icon: '⚡', description: 'Technical skills and expertise' },
  { id: 'projects', label: 'Projects', icon: '💼', description: 'Portfolio projects showcase' },
  { id: 'education', label: 'Education', icon: '🎓', description: 'Educational background' },
  { id: 'experience', label: 'Experience', icon: '💻', description: 'Work experience details' },
  { id: 'certifications', label: 'Certifications', icon: '🏆', description: 'Professional certifications' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬', description: 'Client and colleague reviews' },
  { id: 'contact', label: 'Contact', icon: '📧', description: 'Contact information and form' },
]

export const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    preview: '🎨',
    features: ['Clean Layout', 'Typography Focus', 'Fast Loading'],
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold elements',
    preview: '✨',
    features: ['Bold Typography', 'Gradient Accents', 'Interactive Elements'],
    color: 'from-blue-400 to-purple-600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and unique layout for creatives',
    preview: '🎭',
    features: ['Artistic Layout', 'Custom Animations', 'Portfolio Focus'],
    color: 'from-pink-400 to-red-600'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-friendly design for business',
    preview: '💼',
    features: ['Business Ready', 'Formal Layout', 'Corporate Colors'],
    color: 'from-indigo-400 to-blue-600'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused design for developers',
    preview: '💻',
    features: ['Code Snippets', 'Tech Stack Focus', 'Dark Theme'],
    color: 'from-green-400 to-teal-600'
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Visual-heavy layout for designers',
    preview: '🎨',
    features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections'],
    color: 'from-purple-400 to-pink-600'
  }
]

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'],
}

export const SOCIAL_PLATFORMS = [
  { id: 'github', label: 'GitHub', icon: '🐙', placeholder: 'https://github.com/username' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/in/username' },
  { id: 'twitter', label: 'Twitter', icon: '🐦', placeholder: 'https://twitter.com/username' },
  { id: 'instagram', label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/username' },
  { id: 'dribbble', label: 'Dribbble', icon: '🏀', placeholder: 'https://dribbble.com/username' },
  { id: 'behance', label: 'Behance', icon: '🎨', placeholder: 'https://behance.net/username' },
]
