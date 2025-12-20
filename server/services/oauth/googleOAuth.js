import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = 'http://localhost:5000/api/auth/callback'

console.log('Google OAuth Config:', GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI)

export const getGoogleAuthUrl = (state = '') => {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
    state: state
  })

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_REDIRECT_URI
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.data.error) {
      throw new Error(response.data.error_description || 'Google OAuth error')
    }

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
      idToken: response.data.id_token
    }
  } catch (error) {
    console.error('Google token exchange error:', error)
    throw new Error('Failed to exchange code for token')
  }
}

export const getGoogleUser = async (accessToken) => {
  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const user = response.data

    return {
      id: user.id,
      email: user.email,
      fullName: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
      profileImgUrl: user.picture,
      verified: user.verified_email,
      accessToken
    }
  } catch (error) {
    console.error('Google user fetch error:', error)
    throw new Error('Failed to fetch Google user data')
  }
}

export const refreshGoogleToken = async (refreshToken) => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in
    }
  } catch (error) {
    console.error('Google token refresh error:', error)
    throw new Error('Failed to refresh Google token')
  }
}

export const getGoogleProfile = async (accessToken) => {
  try {
    const response = await axios.get('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,locations,occupations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    console.error('Google profile fetch error:', error)
    throw new Error('Failed to fetch Google profile')
  }
}