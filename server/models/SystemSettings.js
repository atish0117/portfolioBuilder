import mongoose from 'mongoose'

const systemSettingsSchema = new mongoose.Schema({
  settingKey: {
    type: String,
    required: true,
    unique: true
  },
  settingValue: mongoose.Schema.Types.Mixed,
  category: {
    type: String,
    enum: ['general', 'seo', 'email', 'security', 'analytics', 'templates'],
    required: true
  },
  description: String,
  isPublic: {
    type: Boolean,
    default: false
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true 
})

// Default system settings
const defaultSettings = [
  {
    settingKey: 'default_theme_colors',
    settingValue: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    category: 'general',
    description: 'Default color scheme for new portfolios',
    isPublic: true
  },
  {
    settingKey: 'seo_defaults',
    settingValue: {
      siteName: 'Portfolio Builder',
      defaultMetaDescription: 'Professional portfolio created with Portfolio Builder',
      defaultKeywords: ['portfolio', 'professional', 'developer', 'designer']
    },
    category: 'seo',
    description: 'Default SEO settings for portfolios',
    isPublic: true
  },
  {
    settingKey: 'email_notifications',
    settingValue: {
      welcomeEmail: true,
      passwordReset: true,
      weeklyDigest: false,
      marketingEmails: false
    },
    category: 'email',
    description: 'Email notification preferences',
    isPublic: false
  },
  {
    settingKey: 'security_settings',
    settingValue: {
      maxLoginAttempts: 5,
      lockoutDuration: 15, // minutes
      passwordMinLength: 6,
      requireEmailVerification: false
    },
    category: 'security',
    description: 'Security and authentication settings',
    isPublic: false
  },
  {
    settingKey: 'analytics_settings',
    settingValue: {
      trackingEnabled: true,
      dataRetentionDays: 365,
      anonymizeIPs: true
    },
    category: 'analytics',
    description: 'Analytics and tracking settings',
    isPublic: false
  }
]

// Initialize default settings
systemSettingsSchema.statics.initializeDefaults = async function() {
  for (const setting of defaultSettings) {
    await this.findOneAndUpdate(
      { settingKey: setting.settingKey },
      setting,
      { upsert: true, new: true }
    )
  }
}

export default mongoose.model('SystemSettings', systemSettingsSchema)