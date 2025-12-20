import express from 'express'
import User from '../models/User.js'
import { generateTokens } from '../utils/jwt.js'
import { auth } from '../middleware/auth.js'
    import {getGitHubUser} from '../services/oauth/githubOAuth.js'
import { exchangeCodeForToken } from '../services/oauth/githubOAuth.js'
import {getGitHubAuthUrl} from '../services/oauth/githubOAuth.js'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_REDIRECT_URI = 'http://localhost:5000/api/auth/callback'

// Google OAuth Configuration  
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI ='http://localhost:5000/api/auth/callback'

// LinkedIn OAuth Configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const LINKEDIN_REDIRECT_URI = 'http://localhost:5000/api/auth/callback'

// GitHub OAuth Initiation
router.get('/github', (req, res) => {
  try {
    const state = JSON.stringify({ 
      provider: 'github',
      timestamp: Date.now(),
      returnUrl: req.query.returnUrl || '/dashboard'
    })
    
    const params = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: GITHUB_REDIRECT_URI,
      scope: 'user:email read:user public_repo',
      state: state,
      allow_signup: 'true'
    })

    const authUrl = getGitHubAuthUrl(state);

    res.redirect(authUrl);

    // const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`
    // res.redirect(authUrl)
  } catch (error) {
    console.error('linkedIn auth initiation error:', error)
    res.redirect(`${process.env.CLIENT_URL}/login?error=github_init_failed`)
  }
})

// Google OAuth Initiation
router.get('/google', (req, res) => {
  try {
    const state = JSON.stringify({ 
      provider: 'google',
      timestamp: Date.now(),
      returnUrl: req.query.returnUrl || '/dashboard'
    })
    
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'select_account',
      state: state
    })

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    res.redirect(authUrl)
  } catch (error) {
    console.error('Google auth initiation error:', error)
    res.redirect(`${process.env.CLIENT_URL}/login?error=google_init_failed`)
  }
})

// LinkedIn OAuth Initiation
router.get('/linkedin', (req, res) => {
  try {
    const state = JSON.stringify({ 
      provider: 'linkedin',
      timestamp: Date.now(),
      returnUrl: req.query.returnUrl || '/dashboard'
    })
    
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: LINKEDIN_REDIRECT_URI,
      scope: 'openid profile email',
      state: state
    })

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
    res.redirect(authUrl)
  } catch (error) {
    console.error('LinkedIn auth initiation error:', error)
    res.redirect(`${process.env.CLIENT_URL}/login?error=linkedin_init_failed`)
  }
})

// GitHub Token Exchange
// const exchangeGitHubCode = async (code) => {
//   try {
//     const response = await fetch('https://github.com/login/oauth/access_token', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'User-Agent': 'Portfolio-Builder'
//       },
//       body: JSON.stringify({
//         client_id: GITHUB_CLIENT_ID,
//         client_secret: GITHUB_CLIENT_SECRET,
//         code: code
//       })
//     })

//     const data = await response.json()
    
//     if (data.error) {
//       throw new Error(data.error_description || 'GitHub OAuth error')
//     }

//     return data.access_token
//   } catch (error) {
//     console.error('GitHub token exchange error:', error)
//     throw new Error('Failed to exchange GitHub code for token')
//   }
// }

// GitHub User Data
// const getGitHubUser = async (accessToken) => {
//   try {
//     const [userResponse, emailsResponse] = await Promise.all([
//       fetch('https://api.github.com/user', {
//         headers: {
//           'Authorization': `token ${accessToken}`,
//           'User-Agent': 'Portfolio-Builder'
//         }
//       }),
//       fetch('https://api.github.com/user/emails', {
//         headers: {
//           'Authorization': `token ${accessToken}`,
//           'User-Agent': 'Portfolio-Builder'
//         }
//       })
//     ])

//     const user = await userResponse.json()
//     const emails = await emailsResponse.json()
//     const primaryEmail = emails.find(email => email.primary)?.email || emails[0]?.email

//     return {
//       id: user.id.toString(),
//       username: user.login,
//       email: primaryEmail,
//       fullName: user.name || user.login,
//       profileImgUrl: user.avatar_url,
//       bio: user.bio,
//       location: user.location,
//       profileUrl: user.html_url,
//       publicRepos: user.public_repos,
//       followers: user.followers,
//       following: user.following
//     }
//   } catch (error) {
//     console.error('GitHub user fetch error:', error)
//     throw new Error('Failed to fetch GitHub user data')
//   }
// }

// Google Token Exchange
const exchangeGoogleCode = async (code) => {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: GOOGLE_REDIRECT_URI
      })
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error_description || 'Google OAuth error')
    }

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      idToken: data.id_token
    }
  } catch (error) {
    console.error('Google token exchange error:', error)
    throw new Error('Failed to exchange Google code for token')
  }
}

// Google User Data
const getGoogleUser = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const user = await response.json()

    return {
      id: user.id,
      email: user.email,
      fullName: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
      profileImgUrl: user.picture,
      verified: user.verified_email
    }
  } catch (error) {
    console.error('Google user fetch error:', error)
    throw new Error('Failed to fetch Google user data')
  }
}

// LinkedIn Token Exchange
const exchangeLinkedInCode = async (code) => {
  try {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      })
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error_description || 'LinkedIn OAuth error')
    }

    return data.access_token
  } catch (error) {
    console.error('LinkedIn token exchange error:', error)
    throw new Error('Failed to exchange LinkedIn code for token')
  }
}

// LinkedIn User Data
// const getLinkedInUser = async (accessToken) => {
//   try {
//     const [profileResponse, emailResponse] = await Promise.all([
//       fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       }),
//       fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       })
//     ])

//     const profile = await profileResponse.json()
//     const emailData = await emailResponse.json()

//     const email = emailData.elements?.[0]?.['handle~']?.emailAddress
//     const profilePicture = profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier

//     return {
//       id: profile.id,
//       email: email,
//       fullName: `${profile.firstName.localized.en_US} ${profile.lastName.localized.en_US}`,
//       firstName: profile.firstName.localized.en_US,
//       lastName: profile.lastName.localized.en_US,
//       profileImgUrl: profilePicture,
//       username: profile.id,
//       profileUrl: `https://linkedin.com/in/${profile.id}`
//     }
//   } catch (error) {
//     console.error('LinkedIn user fetch error:', error)
//     throw new Error('Failed to fetch LinkedIn user data')
//   }
// }


// LinkedIn User Data (Updated for OpenID Connect)
const getLinkedInUser = async (accessToken) => {
  try {
    // YEH NAYA AUR SAHI API ENDPOINT HAI
    const response = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn user data.');
    }

    const user = await response.json();

    return {
      id: user.sub,
      email: user.email,
      fullName: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
      profileImgUrl: user.picture,
      username: user.sub,
      profileUrl: `https://linkedin.com/in/${user.sub}`
    };

  } catch (error) {
    console.error('LinkedIn user fetch error:', error);
    throw new Error('Failed to fetch LinkedIn user data');
  }
}



// Universal OAuth Callback Handler
router.get('/callback', async (req, res) => {
   console.log('GitHub OAuth callback query:', req.query);
  try {
    const { code, state, error } = req.query

    console.log('OAuth Callback received:', { code: !!code, state, error })

    if (error) {
      console.error('OAuth error:', error)
      return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_denied`)
    }

    if (!code || !state) {
      console.error('Missing code or state:', { code: !!code, state: !!state })
      return res.redirect(`${process.env.CLIENT_URL}/login?error=missing_params`)
    }

    let stateData
    try {
      stateData = JSON.parse(state)
    } catch (parseError) {
      console.error('State parsing error:', parseError)
      return res.redirect(`${process.env.CLIENT_URL}/login?error=invalid_state`)
    }

    const { provider } = stateData
    console.log('Processing OAuth for provider:', provider)

    let userData, accessToken

    // Exchange code for token and get user data based on provider
    try {
      switch (provider) {
        case 'github':
          accessToken = await exchangeCodeForToken(code)
          userData = await getGitHubUser(accessToken)
          break
        case 'google':
          const googleTokens = await exchangeGoogleCode(code)
          accessToken = googleTokens.accessToken
          userData = await getGoogleUser(accessToken)
          break
        case 'linkedin':
          accessToken = await exchangeLinkedInCode(code)
          userData = await getLinkedInUser(accessToken)
          break
        default:
          throw new Error(`Unsupported provider: ${provider}`)
      }

      console.log('OAuth user data received:', { 
        provider, 
        email: userData.email, 
        fullName: userData.fullName 
      })

    } catch (providerError) {
      console.error(`${provider} OAuth error:`, providerError)
      return res.redirect(`${process.env.CLIENT_URL}/login?error=${provider}_oauth_failed`)
    }

    // Find or create user
    let user = await User.findOne({ email: userData.email })

    if (user) {
      console.log('Existing user found, updating OAuth data')
      
      // Update existing user with OAuth data
      if (!user.socialAuth) user.socialAuth = {}
      
      user.socialAuth[provider] = {
        id: userData.id,
        username: userData.username || userData.email,
        accessToken: accessToken,
        profileUrl: userData.profileUrl || userData.url,
        lastSync: new Date()
      }

      // Update profile data if not set
      if (!user.profileImgUrl && userData.profileImgUrl) {
        user.profileImgUrl = userData.profileImgUrl
      }
      if (!user.location && userData.location) {
        user.location = userData.location
      }
      if (!user.intro && userData.bio) {
        user.intro = userData.bio
      }
      if (!user.socialLinks) user.socialLinks = {}
      if (!user.socialLinks[provider] && userData.profileUrl) {
        user.socialLinks[provider] = userData.profileUrl
      }

      await user.save()
    } else {
      console.log('Creating new user from OAuth data')
      
      // Create new user
      user = new User({
        fullName: userData.fullName,
        email: userData.email,
        profileImgUrl: userData.profileImgUrl,
        location: userData.location,
        intro: userData.bio,
        authProvider: provider,
        socialAuth: {
          [provider]: {
            id: userData.id,
            username: userData.username || userData.email,
            accessToken: accessToken,
            profileUrl: userData.profileUrl || userData.url,
            lastSync: new Date()
          }
        },
        socialLinks: {
          [provider]: userData.profileUrl || userData.url
        }
      })

      await user.save()
      console.log('New user created:', user.username)
    }

    // Generate JWT token
    const tokens = generateTokens(user)
    console.log('JWT tokens generated for user:', user.email)

    // Redirect to frontend with token
    const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${tokens.token}&provider=${provider}&refresh=${tokens.refreshToken}`
    console.log('Redirecting to:', redirectUrl)
    
    res.redirect(redirectUrl)

  } catch (error) {
    console.error('OAuth callback error:', error)
    res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_callback_failed`)
  }
})

// Connect Social Account (for existing users)
router.post('/connect/:provider', auth, async (req, res) => {
  try {
    const { provider } = req.params
    
    const authUrls = {
      github: () => {
        const state = JSON.stringify({ 
          provider: 'github', 
          userId: req.user._id,
          action: 'connect'
        })
        const params = new URLSearchParams({
          client_id: GITHUB_CLIENT_ID,
          redirect_uri: GITHUB_REDIRECT_URI,
          scope: 'user:email read:user public_repo',
          state: state
        })
        return `https://github.com/login/oauth/authorize?${params.toString()}`
      },
      google: () => {
        const state = JSON.stringify({ 
          provider: 'google', 
          userId: req.user._id,
          action: 'connect'
        })
        const params = new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID,
          redirect_uri: GOOGLE_REDIRECT_URI,
          response_type: 'code',
          scope: 'openid email profile',
          state: state
        })
        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
      },
      linkedin: () => {
        const state = JSON.stringify({ 
          provider: 'linkedin', 
          userId: req.user._id,
          action: 'connect'
        })
        const params = new URLSearchParams({
          response_type: 'code',
          client_id: LINKEDIN_CLIENT_ID,
          redirect_uri: LINKEDIN_REDIRECT_URI,
          scope: 'r_liteprofile r_emailaddress',
          state: state
        })
        return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
      }
    }

    if (authUrls[provider]) {
      res.json({ 
        message: `Redirecting to ${provider} authentication`,
        authUrl: authUrls[provider]()
      })
    } else {
      res.status(400).json({ message: 'Unsupported provider' })
    }
  } catch (error) {
    console.error('Connect social account error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Disconnect Social Account
router.delete('/disconnect/:provider', auth, async (req, res) => {
  try {
    const { provider } = req.params
    const user = await User.findById(req.user._id)

    if (user.socialAuth && user.socialAuth[provider]) {
      delete user.socialAuth[provider]
      
      // Also remove from social links if it was auto-added
      if (user.socialLinks && user.socialLinks[provider]) {
        user.socialLinks[provider] = ''
      }
      
      await user.save()
    }

    res.json({
      message: `${provider} account disconnected successfully`,
      connectedAccounts: Object.keys(user.socialAuth || {})
    })
  } catch (error) {
    console.error('Disconnect social account error:', error)
    res.status(500).json({ message: 'Failed to disconnect account' })
  }
})

// Sync Data from Connected Accounts
router.post('/sync/:provider', auth, async (req, res) => {
  try {
    const { provider } = req.params
    const user = await User.findById(req.user._id)

    if (!user.socialAuth || !user.socialAuth[provider]) {
      return res.status(400).json({ message: `${provider} account not connected` })
    }

    const accessToken = user.socialAuth[provider].accessToken
    let syncedData = {}

    switch (provider) {
      case 'github':
        syncedData = await syncGitHubData(user, accessToken)
        break
      case 'linkedin':
        syncedData = await syncLinkedInData(user, accessToken)
        break
      case 'google':
        syncedData = await syncGoogleData(user, accessToken)
        break
      default:
        return res.status(400).json({ message: 'Sync not supported for this provider' })
    }

    user.socialAuth[provider].lastSync = new Date()
    await user.save()

    res.json({
      message: `${provider} data synced successfully`,
      syncedData,
      lastSync: user.socialAuth[provider].lastSync
    })
  } catch (error) {
    console.error('Sync data error:', error)
    res.status(500).json({ message: 'Failed to sync data' })
  }
})

// Get Connected Accounts Status
router.get('/connected', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('socialAuth socialLinks')
    
    const connectedAccounts = {}
    if (user.socialAuth) {
      Object.keys(user.socialAuth).forEach(provider => {
        connectedAccounts[provider] = {
          connected: true,
          lastSync: user.socialAuth[provider].lastSync,
          username: user.socialAuth[provider].username || user.socialAuth[provider].email
        }
      })
    }

    res.json({
      connectedAccounts,
      socialLinks: user.socialLinks || {},
      totalConnected: Object.keys(connectedAccounts).length
    })
  } catch (error) {
    console.error('Get connected accounts error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Helper functions for syncing data
const syncGitHubData = async (user, accessToken) => {
  try {
    const Project = (await import('../models/Project.js')).default
    
    // Get user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'Portfolio-Builder'
      }
    })
    const profileData = await profileResponse.json()

    // Get repositories
    const reposResponse = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'Portfolio-Builder'
      }
    })
    const repos = await reposResponse.json()

    // Update user profile with GitHub data
    if (!user.intro && profileData.bio) {
      user.intro = profileData.bio
    }
    if (!user.location && profileData.location) {
      user.location = profileData.location
    }
    if (!user.socialLinks.github) {
      user.socialLinks.github = profileData.html_url
    }

    // Auto-import repositories as projects (if enabled)
    let importedProjects = 0
    if (user.integrationSettings?.github?.autoImportRepos !== false) {
      for (const repo of repos.slice(0, 5)) { // Import top 5 repos
        if (!repo.fork && repo.stargazers_count >= 0) {
          const existingProject = await Project.findOne({
            userId: user._id,
            githubLink: repo.html_url
          })

          if (!existingProject) {
            const project = new Project({
              userId: user._id,
              title: repo.name,
              description: repo.description || `${repo.language} project from GitHub`,
              techStack: repo.language ? [repo.language] : [],
              githubLink: repo.html_url,
              liveLink: repo.homepage,
              category: 'web',
              status: 'published'
            })
            await project.save()
            importedProjects++
          }
        }
      }
    }

    await user.save()

    return {
      profileUpdated: true,
      repositoriesFound: repos.length,
      projectsImported: importedProjects,
      publicRepos: profileData.public_repos,
      followers: profileData.followers
    }
  } catch (error) {
    console.error('GitHub sync error:', error)
    return { error: 'Failed to sync GitHub data' }
  }
}

const syncLinkedInData = async (user, accessToken) => {
  try {
    // Get LinkedIn profile
    const response = await fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,headline,location,summary)', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const profile = await response.json()

    // Update user profile with LinkedIn data
    if (profile.headline && !user.title) {
      user.title = profile.headline
    }
    if (profile.summary && !user.intro) {
      user.intro = profile.summary
    }
    if (profile.location && !user.location) {
      user.location = profile.location.name
    }

    await user.save()

    return {
      profileUpdated: true,
      headline: profile.headline,
      location: profile.location?.name
    }
  } catch (error) {
    console.error('LinkedIn sync error:', error)
    return { error: 'Failed to sync LinkedIn data' }
  }
}

const syncGoogleData = async (user, accessToken) => {
  try {
    // Get Google profile
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const profile = await response.json()

    // Update profile image if not set
    if (profile.picture && !user.profileImgUrl) {
      user.profileImgUrl = profile.picture
    }

    await user.save()

    return {
      profileUpdated: true,
      profilePicture: profile.picture
    }
  } catch (error) {
    console.error('Google sync error:', error)
    return { error: 'Failed to sync Google data' }
  }
}

export default router