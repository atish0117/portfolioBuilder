import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  portfolioViews: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  averageSessionDuration: {
    type: Number,
    default: 0 // in seconds
  },
  bounceRate: {
    type: Number,
    default: 0 // percentage
  },
  topPages: [{
    page: String,
    views: Number,
    percentage: Number
  }],
  trafficSources: [{
    source: String,
    visitors: Number,
    percentage: Number
  }],
  deviceBreakdown: [{
    device: String,
    percentage: Number
  }],
  geographicData: [{
    country: String,
    visitors: Number,
    percentage: Number
  }],
  conversionMetrics: {
    contactFormSubmissions: { type: Number, default: 0 },
    resumeDownloads: { type: Number, default: 0 },
    socialClicks: { type: Number, default: 0 },
    projectViews: { type: Number, default: 0 }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
})

// Compound index for efficient queries
analyticsSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.model('Analytics', analyticsSchema)