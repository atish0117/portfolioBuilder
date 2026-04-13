export const setAuthCookies = (res, tokens) => {

  const isProd = process.env.NODE_ENV === "production"

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/"
  }

  res.cookie("accessToken", tokens.token, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000
  })

  res.cookie("refreshToken", tokens.refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

export const clearAuthCookies = (res) => {

  const isProd = process.env.NODE_ENV === "production"

  const cookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/"
  }

  res.clearCookie("accessToken", cookieOptions)
  res.clearCookie("refreshToken", cookieOptions)

}
