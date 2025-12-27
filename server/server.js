import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

// Import routes
import authRoutes from './routes/auth.js'
import passwordRoutes from './routes/password.routes.js'
import socialAuthRoutes from './routes/socialAuth.js'
import integrationsRoutes from './routes/integrationRoutes.js'
import portfolioRoutes from './routes/portfolio.routes.js'
import projectRoutes from './routes/projects.routes.js'
import seoRoutes from './routes/seo.js'
import adminRoutes from './routes/admin.js'
import { seedAllData } from './utils/seedData.js'
import dbConnect from './db/dbConnect.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))



// Routes
app.use('/api/auth', authRoutes)
app.use('/api/auth', socialAuthRoutes)
app.use('/api/password', passwordRoutes)
app.use('/api/integrations', integrationsRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/seo', seoRoutes)
app.use('/api/admin', adminRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Connect to MongoDB

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .then(() => seedAllData())
// .catch(err => console.error('MongoDB connection error:', err))
dbConnect().then(()=>{
app.listen(PORT ,()=>{
  console.log(`server running on port ${PORT}`)
})
}).catch(()=>{
  console.log("mongoDB connection failed ", error)
})
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })