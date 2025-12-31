import crypto from 'crypto'

const SECRET = process.env.OAUTH_STATE_SECRET
const MAX_AGE = 5 * 60 * 1000 // 5 minutes

export const buildOAuthState = (payload) => {
  const data = {
    ...payload,
    ts: Date.now()
  }

  const encoded = Buffer
    .from(JSON.stringify(data))
    .toString('base64url') // URL safe

  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(encoded)
    .digest('hex')

  return `${encoded}.${signature}`
}

export const parseOAuthState = (state) => {
  try {
    const [encoded, signature] = state.split('.')
    if (!encoded || !signature) return null

    const expectedSig = crypto
      .createHmac('sha256', SECRET)
      .update(encoded)
      .digest('hex')

    if (!crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSig)
    )) return null

    const data = JSON.parse(
      Buffer.from(encoded, 'base64url').toString()
    )

    // ⏱️ Replay protection
    if (Date.now() - data.ts > MAX_AGE) return null

    return data
  } catch {
    return null
  }
}
