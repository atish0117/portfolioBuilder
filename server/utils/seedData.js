import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Template from '../models/Template.js'
import SystemSettings from '../models/SystemSettings.js'

export const seedAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email)
      return existingAdmin
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('admin123', salt)

    const adminUser = new User({
      fullName: 'Admin User',
      email: 'admin@portfoliobuilder.com',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      title: 'System Administrator',
      authProvider: 'local'
    })

    await adminUser.save()
    console.log('Admin user created successfully:', adminUser.email)
    console.log('Admin login credentials: admin@portfoliobuilder.com / admin123')
    return adminUser
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

export const seedTemplates = async () => {
  try {
    const existingTemplates = await Template.countDocuments()
    if (existingTemplates > 0) {
      console.log('Templates already exist, skipping seed')
      return
    }

    const templates = [
      {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean and simple design focusing on content with elegant typography',
        category: 'minimal',
        previewImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: ['Clean Layout', 'Typography Focus', 'Fast Loading', 'Mobile Responsive'],
        colorScheme: {
          primary: '#374151',
          secondary: '#6B7280',
          accent: '#3B82F6',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        targetAudience: ['developer', 'business', 'freelancer'],
        difficulty: 'beginner',
        isActive: true,
        isPremium: false,
        usageCount: 245,
        rating: 4.5,
        ratingCount: 89,
        tags: ['clean', 'simple', 'professional']
      },
      {
        id: 'modern',
        name: 'Modern',
        description: 'Contemporary design with bold elements and gradient accents',
        category: 'modern',
        previewImage: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: ['Bold Typography', 'Gradient Accents', 'Interactive Elements', 'Dark Mode'],
        colorScheme: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          background: '#F8FAFC',
          text: '#1E293B'
        },
        targetAudience: ['developer', 'designer', 'creative'],
        difficulty: 'intermediate',
        isActive: true,
        isPremium: false,
        usageCount: 189,
        rating: 4.7,
        ratingCount: 67,
        tags: ['modern', 'gradient', 'interactive']
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Artistic and unique layout perfect for creative professionals',
        category: 'creative',
        previewImage: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: ['Artistic Layout', 'Custom Animations', 'Portfolio Focus', 'Visual Impact'],
        colorScheme: {
          primary: '#EC4899',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          background: '#FDF2F8',
          text: '#831843'
        },
        targetAudience: ['designer', 'creative'],
        difficulty: 'advanced',
        isActive: true,
        isPremium: true,
        usageCount: 156,
        rating: 4.8,
        ratingCount: 45,
        tags: ['creative', 'artistic', 'visual']
      },
      {
        id: 'professional',
        name: 'Professional',
        description: 'Corporate-friendly design perfect for business professionals',
        category: 'professional',
        previewImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: ['Business Ready', 'Formal Layout', 'Corporate Colors', 'PDF Export'],
        colorScheme: {
          primary: '#1E40AF',
          secondary: '#3730A3',
          accent: '#059669',
          background: '#F8FAFC',
          text: '#1E293B'
        },
        targetAudience: ['business', 'freelancer'],
        difficulty: 'beginner',
        isActive: true,
        isPremium: false,
        usageCount: 203,
        rating: 4.4,
        ratingCount: 78,
        tags: ['professional', 'business', 'corporate']
      },
      {
        id: 'developer',
        name: 'Developer',
        description: 'Tech-focused design with code snippets and terminal aesthetics',
        category: 'developer',
        previewImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: ['Code Snippets', 'Tech Stack Focus', 'Dark Theme', 'GitHub Integration'],
        colorScheme: {
          primary: '#10B981',
          secondary: '#059669',
          accent: '#3B82F6',
          background: '#111827',
          text: '#F9FAFB'
        },
        targetAudience: ['developer'],
        difficulty: 'intermediate',
        isActive: true,
        isPremium: false,
        usageCount: 167,
        rating: 4.6,
        ratingCount: 52,
        tags: ['developer', 'tech', 'code']
      },
      {
        id: 'designer',
        name: 'Designer',
        description: 'Visual-heavy layout showcasing design work and creativity',
        category: 'designer',
        previewImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        features: ['Visual Portfolio', 'Image Gallery', 'Creative Sections', 'Behance Integration'],
        colorScheme: {
          primary: '#8B5CF6',
          secondary: '#A855F7',
          accent: '#EC4899',
          background: '#FEFBFF',
          text: '#581C87'
        },
        targetAudience: ['designer', 'creative'],
        difficulty: 'advanced',
        isActive: true,
        isPremium: true,
        usageCount: 134,
        rating: 4.9,
        ratingCount: 38,
        tags: ['designer', 'visual', 'portfolio']
      }
    ]

    await Template.insertMany(templates)
    console.log('Templates seeded successfully')
  } catch (error) {
    console.error('Error seeding templates:', error)
  }
}

export const seedSystemSettings = async () => {
  try {
    const existingSettings = await SystemSettings.countDocuments()
    if (existingSettings > 0) {
      console.log('System settings already exist, skipping seed')
      return
    }

    await SystemSettings.initializeDefaults()
    console.log('System settings seeded successfully')
  } catch (error) {
    console.error('Error seeding system settings:', error)
  }
}

export const seedAllData = async () => {
  console.log('🌱 Starting data seeding...')
  
  await seedAdminUser()
  await seedTemplates()
  await seedSystemSettings()
  
  console.log('✅ Data seeding completed!')
}