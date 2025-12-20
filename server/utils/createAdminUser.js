import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder')
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email)
      process.exit(0)
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('admin123', salt)

    const adminUser = new User({
      fullName: 'Portfolio Admin',
      email: 'admin@portfoliobuilder.com',
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      title: 'System Administrator',
      authProvider: 'local'
    })

    await adminUser.save()
    
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@portfoliobuilder.com')
    console.log('🔑 Password: admin123')
    console.log('👑 Role: admin')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()