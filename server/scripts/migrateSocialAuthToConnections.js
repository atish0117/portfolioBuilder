import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

const migrate = async () => {
  await mongoose.connect(MONGO_URI)
  console.log('DB Connected')

  const users = await User.find({ socialAuth: { $exists: true } })

  for (const user of users) {
    if (!user.connections) user.connections = {}

    if (user.socialAuth?.github) {
      user.connections.github = {
        connected: true,
        connectedAt: user.socialAuth.github.lastSync || new Date(),
        lastSyncedAt: user.socialAuth.github.lastSync || new Date(),
        username: user.socialAuth.github.username,
        profileUrl: user.socialAuth.github.profileUrl
      }
    }

    if (user.socialAuth?.google) {
      user.connections.google = {
        connected: true,
        connectedAt: user.socialAuth.google.lastSync || new Date(),
        lastSyncedAt: user.socialAuth.google.lastSync || new Date(),
        email: user.socialAuth.google.email
      }
    }

    if (user.socialAuth?.linkedin) {
      user.connections.linkedin = {
        connected: true,
        connectedAt: user.socialAuth.linkedin.lastSync || new Date(),
        lastSyncedAt: user.socialAuth.linkedin.lastSync || new Date(),
        username: user.socialAuth.linkedin.username,
        profileUrl: user.socialAuth.linkedin.profileUrl
      }
    }

    // ❌ Remove old structure
    user.socialAuth = undefined

    await user.save()
    console.log(`Migrated user: ${user.email}`)
  }

  console.log('Migration complete')
  process.exit()
}

migrate().catch(err => {
  console.error(err)
  process.exit(1)
})
