import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: {
    type: String,
    enum: ['minimal', 'modern', 'creative', 'professional', 'developer', 'designer'],
    required: true
  },
  previewImage: { 
    type: String, 
    required: true 
  },
  thumbnailImage: String,
  features: [{ 
    type: String 
  }],
  colorScheme: {
    primary: String,
    secondary: String,
    accent: String,
    background: String,
    text: String
  },
  targetAudience: [{
    type: String,
    enum: ['developer', 'designer', 'business', 'creative', 'student', 'freelancer']
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isPremium: { 
    type: Boolean, 
    default: false 
  },
  usageCount: { 
    type: Number, 
    default: 0 
  },
  rating: { 
    type: Number, 
    default: 0,
    min: 0,
    max: 5 
  },
  ratingCount: { 
    type: Number, 
    default: 0 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  version: { 
    type: String, 
    default: '1.0.0' 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
})

// Update usageCount when template is selected
templateSchema.methods.incrementUsage = function() {
  this.usageCount += 1
  return this.save()
}

// Calculate average rating
templateSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating * this.ratingCount) + newRating
  this.ratingCount += 1
  this.rating = totalRating / this.ratingCount
  return this.save()
}

export default mongoose.model('Template', templateSchema)