import User from '../models/User.js'

export const getIntegrationStatus = async (req, res) => {
  const user = await User.findById(req.user._id).lean()

  res.json({
    connections: user.connections || {}
  })
}

export const disconnectProvider = async (req, res) => {
  const { provider } = req.params
  const user = await User.findById(req.user._id)

  if (!user.connections?.[provider]?.connected) {
    return res.status(400).json({ message: 'Not connected' })
  }

  user.connections[provider] = {
    ...user.connections[provider],
    connected: false,
    lastSyncedAt: null,
    disconnectedAt: new Date()
  }

  await user.save()

  res.json({ message: `${provider} disconnected` })
}

/* 🔁 RE-SYNC */
export const resyncProvider = (provider) => (req, res) => {
  return res.redirect(
    `/api/auth/${provider}?action=sync`
  )
}

