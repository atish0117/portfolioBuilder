import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const LINKEDIN_REDIRECT_URI = 'http://localhost:5000/api/auth/callback'

console.log( "LinkedIn OAuth Config:", LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_REDIRECT_URI)
export const getLinkedInAuthUrl = (state = '') => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: LINKEDIN_REDIRECT_URI,
    scope: 'openid profile email',
    state: state,
  })

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`
}

export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    if (response.data.error) {
      throw new Error(response.data.error_description || 'LinkedIn OAuth error')
    }

    return response.data.access_token
  } catch (error) {
    console.error('LinkedIn token exchange error:', error)
    throw new Error('Failed to exchange code for token')
  }
}

export const getLinkedInUser = async (accessToken) => {
  try {
    const [profileResponse, emailResponse] = await Promise.all([
      axios.get('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }),
      axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
    ])

    const profile = profileResponse.data
    const emailData = emailResponse.data

    const email = emailData.elements?.[0]?.['handle~']?.emailAddress
    const profilePicture = profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier

    return {
      id: profile.id,
      email: email,
      fullName: `${profile.firstName.localized.en_US} ${profile.lastName.localized.en_US}`,
      firstName: profile.firstName.localized.en_US,
      lastName: profile.lastName.localized.en_US,
      profileImgUrl: profilePicture,
      username: profile.id,
      profileUrl: `https://linkedin.com/in/${profile.id}`,
      accessToken
    }
  } catch (error) {
    console.error('LinkedIn user fetch error:', error)
    throw new Error('Failed to fetch LinkedIn user data')
  }
}

export const getLinkedInProfile = async (accessToken) => {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,headline,location,summary)', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return response.data
  } catch (error) {
    console.error('LinkedIn profile fetch error:', error)
    throw new Error('Failed to fetch LinkedIn profile')
  }
}

export const getLinkedInExperience = async (accessToken) => {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/people/~:(id,positions)', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return response.data.positions?.values || []
  } catch (error) {
    console.error('LinkedIn experience fetch error:', error)
    throw new Error('Failed to fetch LinkedIn experience')
  }
}