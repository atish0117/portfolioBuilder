export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  const errors = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateUsername = (username) => {
  const errors = []

  if (username.length < 3) {
    errors.push('Username must be at least 3 characters long')
  }

  if (username.length > 20) {
    errors.push('Username must be less than 20 characters long')
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    errors.push('Username can only contain letters, numbers, hyphens, and underscores')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '')
}
