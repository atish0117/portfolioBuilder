import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()



const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_REDIRECT_URI = 'http://localhost:5000/api/auth/callback'

console.log( "GitHub OAuth Config:", GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI)

export const getGitHubAuthUrl = (state = '') => {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: 'user:email read:user public_repo',
    state: state,
    allow_signup: 'true'
  })

  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

export const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code
    }, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-Builder'
      }
    })

    if (response.data.error) {
      throw new Error(response.data.error_description || 'GitHub OAuth error')
    }

    return response.data.access_token
  } catch (error) {
    console.error('GitHub token exchange error:', error)
    throw new Error('Failed to exchange code for token')
  }
}

export const getGitHubUser = async (accessToken) => {
  try {
    const [userResponse, emailsResponse] = await Promise.all([
      axios.get('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${accessToken}`,
          'User-Agent': 'Portfolio-Builder'
        }
      }),
      axios.get('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `token ${accessToken}`,
          'User-Agent': 'Portfolio-Builder'
        }
      })
    ])

    const user = userResponse.data
    const emails = emailsResponse.data
    const primaryEmail = emails.find(email => email.primary)?.email || emails[0]?.email

    return {
      id: user.id.toString(),
      username: user.login,
      email: primaryEmail,
      fullName: user.name || user.login,
      profileImgUrl: user.avatar_url,
      bio: user.bio,
      location: user.location,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      accessToken
    }
  } catch (error) {
    console.error('GitHub user fetch error:', error)
    throw new Error('Failed to fetch GitHub user data')
  }
}

export const getGitHubRepositories = async (accessToken, options = {}) => {
  try {
    const params = new URLSearchParams({
      sort: 'updated',
      per_page: options.limit || '20',
      type: options.includePrivate ? 'all' : 'public'
    })

    const response = await axios.get(`https://api.github.com/user/repos?${params.toString()}`, {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'Portfolio-Builder'
      }
    })

    return response.data.map(repo => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
       url: repo.html_url,
      homepage: repo.homepage,
      private: repo.private,
      archived: repo.archived,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      pushedAt: repo.pushed_at
    }))
  } catch (error) {
    console.error('GitHub repositories fetch error:', error)
    throw new Error('Failed to fetch GitHub repositories')
  }
}

export const getGitHubStats = async (accessToken) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      axios.get('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}` }
      }),
      axios.get('https://api.github.com/user/repos?per_page=100', {
        headers: { Authorization: `token ${accessToken}` }
      })
    ])

    const user = userResponse.data
    const repos = reposResponse.data

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

    return {
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      totalStars
    }
  } catch (error) {
    console.error('GitHub stats fetch error:', error)
    throw new Error('Failed to fetch GitHub stats')
  }
}
