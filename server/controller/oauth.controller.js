import User from '../models/User.js'
import { buildOAuthState, parseOAuthState } from '../utils/oauthState.utils.js'
import { generateTokens } from '../utils/jwt.js'
import { setAuthCookies } from '../utils/cookie.js'
// GitHub
import {
  getGitHubAuthUrl,
  exchangeCodeForToken as githubToken,
  getGitHubUser,
  getGitHubRepositories
} from '../services/oauth/github.service.js'

// Google
import {
  getGoogleAuthUrl,
  exchangeCodeForToken as googleToken,
  getGoogleUser,
  getGoogleProfile
} from '../services/oauth/google.service.js'

// LinkedIn
import {
  getLinkedInAuthUrl,
  exchangeCodeForToken as linkedinToken,
  getLinkedInUser,
  getLinkedInExperience
} from '../services/oauth/linkedin.service.js'

/* ================= START OAUTH ================= */

export const startOAuth = (provider) => (req, res) => {
  const state = buildOAuthState({
    provider,
    action: req.query.action || 'login', // login | connect | sync
    userId: req.user?._id,
    ts: Date.now()
  })

  const map = {
    github: getGitHubAuthUrl,
    google: getGoogleAuthUrl,
    linkedin: getLinkedInAuthUrl
  }

  return res.redirect(map[provider](state))
}

/* ================= OAUTH CALLBACK ================= */

export const oauthCallback = async (req, res) => {
  try {
    const { code, state } = req.query
    const payload = parseOAuthState(state)

    if (!payload || !code) {
      return res.redirect(
        `${process.env.CLIENT_URL}/login?error=invalid_state`
      )
    }

    const { provider, action, userId } = payload

    const tokenMap = {
      github: githubToken,
      google: googleToken,
      linkedin: linkedinToken
    }

    const userMap = {
      github: getGitHubUser,
      google: getGoogleUser,
      linkedin: getLinkedInUser
    }

    /* ---------- TOKEN + BASIC USER DATA ---------- */
    const accessToken = await tokenMap[provider](code)
    const userData = await userMap[provider](accessToken)

    let user

    /* ================= LOGIN FLOW ================= */
    if (action === 'login') {
      user = await User.findOne({ email: userData.email })

      if (!user) {
        user = await User.create({
          email: userData.email,
          fullName: userData.fullName,
          profileImgUrl: userData.profileImgUrl,
          authProvider: provider
        })
      }

      const tokens = generateTokens(user)
      setAuthCookies(res, tokens)
    }



    /* ================= CONNECT / SYNC FLOW ================= */
    if (action !== 'login') {
      user = await User.findById(userId)
      if (!user) {
        return res.redirect(

          // option

          `${process.env.CLIENT_URL}/login?error=user_not_found`
          
          // return res.redirect(`${process.env.CLIENT_URL}/login`)
        )
      }
    }

    /* ================= SYNC EXTRA DATA ================= */
    if (action === 'sync') {

      // 🔹 LinkedIn Experience
      if (provider === 'linkedin') {
        const experience = await getLinkedInExperience(accessToken)
        user.workExperience = experience
      }

      // 🔹 Google Advanced Profile
      if (provider === 'google') {
        const profile = await getGoogleProfile(accessToken)

        if (!user.profileImgUrl && profile.photos?.length) {
          user.profileImgUrl = profile.photos[0].url
        }

        if (!user.location && profile.locations?.length) {
          user.location = profile.locations[0].value
        }

        if (!user.title && profile.occupations?.length) {
          user.title = profile.occupations[0].value
        }
      }

      // 🔹 GitHub Repos (future-ready)
      if (provider === 'github') {
        const repos = await getGitHubRepositories(accessToken)
        // yahan future me project import logic add kar sakte ho
        // user.githubRepos = repos
      }
    }

    /* ================= CONNECTION METADATA ================= */
    if (!user.connections) user.connections = {}

    user.connections[provider] = {
      connected: true,
      connectedAt:
        user.connections?.[provider]?.connectedAt || new Date(),
      lastSyncedAt: new Date(),
      username: userData.username,
      email: userData.email,
      profileUrl: userData.profileUrl
    }

    await user.save()


    // REDIRECT
    res.redirect(`${process.env.CLIENT_URL}/dashboard`)
  } catch (err) {
    console.error('OAuth Callback Error:', err)
    res.redirect(
      `${process.env.CLIENT_URL}/login?error=oauth_failed`
    )
  }
}
