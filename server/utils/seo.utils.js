
export const calculateSeoScore = (user, seoData) => {
  let score = 0
  const checks = []

  // Meta Title (20 points)
  if (seoData.metaTitle) {
    if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) {
      score += 20
      checks.push({ field: 'metaTitle', status: 'good', message: 'Meta title length is optimal' })
    } else {
      score += 10
      checks.push({ field: 'metaTitle', status: 'warning', message: 'Meta title should be 30-60 characters' })
    }
  } else {
    checks.push({ field: 'metaTitle', status: 'error', message: 'Meta title is missing' })
  }

  // Meta Description (20 points)
  if (seoData.metaDescription) {
    if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) {
      score += 20
      checks.push({ field: 'metaDescription', status: 'good', message: 'Meta description length is optimal' })
    } else {
      score += 10
      checks.push({ field: 'metaDescription', status: 'warning', message: 'Meta description should be 120-160 characters' })
    }
  } else {
    checks.push({ field: 'metaDescription', status: 'error', message: 'Meta description is missing' })
  }

  // Keywords (15 points)
  if (seoData.keywords?.length >= 5) {
    score += 15
    checks.push({ field: 'keywords', status: 'good', message: `${seoData.keywords.length} keywords added` })
  } else if (seoData.keywords?.length > 0) {
    score += 8
    checks.push({ field: 'keywords', status: 'warning', message: 'Add more keywords (5–10)' })
  } else {
    checks.push({ field: 'keywords', status: 'error', message: 'Keywords missing' })
  }

  // Open Graph (15 points)
  if (seoData.ogTitle && seoData.ogDescription){
    score += 10
  checks.push({ field: 'openGraph', status: 'good', message: 'Open Graph data is complete' })
  }
  if (seoData.ogImage) {
    score += 5
    checks.push({ field: 'ogImage', status: 'good', message: 'Open Graph image is set' })
  } else {
    checks.push({ field: 'ogImage', status: 'warning', message: 'Open Graph image recommended' })
  }

  // Profile Completeness (15 points)
let profileScore = 0
if (user.profileImgUrl) profileScore += 3
if (user.resumeUrl) profileScore += 3
if (user.tagLine && user.tagLine.length > 50) profileScore += 3
if (user.skills && user.skills.length >= 5) profileScore += 3
if (Object.values(user.socialLinks || {}).filter(Boolean).length >= 2) profileScore += 3

score += profileScore
checks.push({
  field: 'profile',
  status: profileScore >= 12 ? 'good' : 'warning',
  message: `Profile ${Math.round((profileScore / 15) * 100)}% complete`
})


// Content Quality (15 points)
let contentScore = 0
if (user.experienceDetails && user.experienceDetails.length > 0) contentScore += 5
if (user.education && user.education.length > 0) contentScore += 5
if (user.certifications && user.certifications.length > 0) contentScore += 5

score += contentScore
checks.push({
  field: 'content',
  status: contentScore >= 10 ? 'good' : 'warning',
  message: `Content sections ${Math.round((contentScore / 15) * 100)}% complete`
})

return { score: Math.min(score, 100), checks }

}

export const generateSeoSuggestions = (user) => {
  const keywords = [
    ...(user.skills || []),
    ...(user.fullName?.split(' ') || []),
    ...(user.title?.split(' ') || []),
    ...(user.location?.split(' ') || []),
    ...(user.experienceDetails?.flatMap(exp =>
      exp.companyName?.split(' ') || []
    ) || []),
    'portfolio',
    'professional'
  ]
    .map(k => k.toLowerCase())
    .filter(Boolean)

  return {
    metaTitle: `${user.fullName} - ${user.title || 'Professional Portfolio'} | ${user.skills?.[0] || 'Expert'}`,

    metaDescription: user.tagLine
      ? user.tagLine.slice(0, 160)
      : user.intro
      ? user.intro.slice(0, 160)
      : `Professional portfolio of ${user.fullName} showcasing experience in ${user.skills?.slice(0, 3).join(', ') || 'modern technologies'}.`,

    keywords: [...new Set(keywords)].slice(0, 10),

    ogTitle: `${user.fullName} | ${user.title || 'Portfolio'}`,
    ogDescription:
      user.tagLine ||
      user.intro ||
      `Explore ${user.fullName}'s professional work and projects.`,
    ogImage: user.profileImgUrl || '',

    twitterTitle: `${user.fullName} - ${user.title || 'Portfolio'}`,
    twitterDescription:
      user.tagLine?.slice(0, 200) ||
      `Check out ${user.fullName}'s professional portfolio.`,
    twitterImage: user.profileImgUrl || '',

    canonicalUrl: `${process.env.CLIENT_URL}/${user.username}`,

    structuredData: {
      '@type': 'Person',
      name: user.fullName,
      jobTitle: user.title || '',
      url: `${process.env.CLIENT_URL}/${user.username}`,
      sameAs: Object.values(user.socialLinks || {}).filter(Boolean),
      knowsAbout: user.skills || [],
      worksFor: user.experienceDetails?.[0]?.companyName || '',
      alumniOf: user.education?.map(e => e.institution) || []
    }
  }
}

