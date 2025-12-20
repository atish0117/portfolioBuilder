import mongoose from 'mongoose';

const integrationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  provider: { type: String, enum: ['google-analytics','github','linkedin','dribbble','behance','medium','figma','codepen'], index: true },
  connected: { type: Boolean, default: false },

  // OAuth tokens (encrypt these in prod / use KMS)
  accessToken: String,
  refreshToken: String,
  tokenType: String,
  expiresAt: Date,
  scope: String,

  // Display/state
  lastSyncedAt: Date,
  meta: mongoose.Schema.Types.Mixed // e.g. username, profile url, etc.
}, { timestamps: true });

export default mongoose.model('Integration', integrationSchema);
