export const GITHUB = {
  CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  REDIRECT_URI: `${process.env.API_URL}/api/auth/callback`
}

export const GOOGLE = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: `${process.env.API_URL}/api/auth/callback`
}

export const LINKEDIN = {
  CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
  REDIRECT_URI: `${process.env.API_URL}/api/auth/callback`
}
