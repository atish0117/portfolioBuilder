// import express from 'express'
// import { body, validationResult } from 'express-validator'
// import User from '../models/User.js'
// import { auth } from '../middleware/auth.js'

// const router = express.Router()

// // SEO Score Calculation Function
// const calculateSeoScore = (user, seoData) => {
//   let score = 0
//   const checks = []

//   // Meta Title (20 points)
//   if (seoData.metaTitle) {
//     if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) {
//       score += 20
//       checks.push({ field: 'metaTitle', status: 'good', message: 'Meta title length is optimal' })
//     } else if (seoData.metaTitle.length > 0) {
//       score += 10
//       checks.push({ field: 'metaTitle', status: 'warning', message: 'Meta title should be 30-60 characters' })
//     }
//   } else {
//     checks.push({ field: 'metaTitle', status: 'error', message: 'Meta title is missing' })
//   }

//   // Meta Description (20 points)
//   if (seoData.metaDescription) {
//     if (seoData.metaDescription.length >= 120 && seoData.metaDescription.length <= 160) {
//       score += 20
//       checks.push({ field: 'metaDescription', status: 'good', message: 'Meta description length is optimal' })
//     } else if (seoData.metaDescription.length > 0) {
//       score += 10
//       checks.push({ field: 'metaDescription', status: 'warning', message: 'Meta description should be 120-160 characters' })
//     }
//   } else {
//     checks.push({ field: 'metaDescription', status: 'error', message: 'Meta description is missing' })
//   }

//   // Keywords (15 points)
//   if (seoData.keywords && seoData.keywords.length >= 5) {
//     score += 15
//     checks.push({ field: 'keywords', status: 'good', message: `${seoData.keywords.length} keywords added` })
//   } else if (seoData.keywords && seoData.keywords.length > 0) {
//     score += 8
//     checks.push({ field: 'keywords', status: 'warning', message: 'Add more keywords (recommended: 5-10)' })
//   } else {
//     checks.push({ field: 'keywords', status: 'error', message: 'Keywords are missing' })
//   }

//   // Open Graph (15 points)
//   if (seoData.ogTitle && seoData.ogDescription) {
//     score += 10
//     checks.push({ field: 'openGraph', status: 'good', message: 'Open Graph data is complete' })
//   }
//   if (seoData.ogImage) {
//     score += 5
//     checks.push({ field: 'ogImage', status: 'good', message: 'Open Graph image is set' })
//   } else {
//     checks.push({ field: 'ogImage', status: 'warning', message: 'Open Graph image recommended' })
//   }

//   // Profile Completeness (15 points)
//   let profileScore = 0
//   if (user.profileImgUrl) profileScore += 3
//   if (user.resumeUrl) profileScore += 3
//   if (user.bio && user.bio.length > 50) profileScore += 3
//   if (user.skills && user.skills.length >= 5) profileScore += 3
//   if (user.socialLinks && Object.values(user.socialLinks).filter(Boolean).length >= 2) profileScore += 3
//   score += profileScore
//   checks.push({ field: 'profile', status: profileScore >= 12 ? 'good' : 'warning', message: `Profile ${Math.round((profileScore/15)*100)}% complete` })

//   // Content Quality (15 points)
//   let contentScore = 0
//   if (user.experienceDetails && user.experienceDetails.length > 0) contentScore += 5
//   if (user.education && user.education.length > 0) contentScore += 5
//   if (user.certifications && user.certifications.length > 0) contentScore += 5
//   score += contentScore
//   checks.push({ field: 'content', status: contentScore >= 10 ? 'good' : 'warning', message: `Content sections ${Math.round((contentScore/15)*100)}% complete` })

//   return { score: Math.min(score, 100), checks }
// }

// // Generate SEO Suggestions
// const generateSeoSuggestions = (user) => {
//   const suggestions = {
//     metaTitle: `${user.fullName} - ${user.title || 'Professional Portfolio'} | ${user.skills?.[0] || 'Expert'}`,
//     metaDescription: user.bio 
//       ? `${user.bio.substring(0, 140)}...` 
//       : `Professional portfolio of ${user.fullName}, ${user.title || 'experienced professional'} specializing in ${user.skills?.slice(0, 3).join(', ') || 'various technologies'}. View projects, experience, and contact information.`,
//     keywords: [
//       ...(user.skills || []),
//       user.fullName.split(' '),
//       user.title?.split(' ') || [],
//       'portfolio',
//       'professional',
//       user.workExperience?.includes('Senior') ? 'senior' : user.workExperience?.includes('Junior') ? 'junior' : 'experienced',
//       ...(user.experienceDetails?.map(exp => exp.companyName.split(' ')).flat() || [])
//     ].flat().filter(Boolean).slice(0, 10),
//     ogTitle: `${user.fullName} | ${user.title || 'Professional Portfolio'}`,
//     ogDescription: user.bio || `Explore ${user.fullName}'s professional portfolio showcasing expertise in ${user.skills?.slice(0, 2).join(' and ') || 'technology'}.`,
//     ogImage: user.profileImgUrl || '',
//     twitterTitle: `${user.fullName} - ${user.title || 'Portfolio'}`,
//     twitterDescription: user.bio?.substring(0, 180) || `Check out ${user.fullName}'s professional work and projects.`,
//     twitterImage: user.profileImgUrl || '',
//     canonicalUrl: `${process.env.CLIENT_URL || 'http://localhost:5173'}/${user.username}`,
//     structuredData: {
//       type: 'Person',
//       jobTitle: user.title || '',
//       worksFor: user.experienceDetails?.[0]?.companyName || '',
//       url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/${user.username}`,
//       sameAs: Object.values(user.socialLinks || {}).filter(Boolean),
//       knowsAbout: user.skills || [],
//       alumniOf: user.education?.map(edu => edu.institution) || [],
//       award: user.certifications?.map(cert => cert.title) || []
//     }
//   }

//   return suggestions
// }

// // Get SEO Data
// router.get('/data', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password')
    
//     if (!user.seoData || Object.keys(user.seoData).length === 0) {
//       // Generate initial SEO suggestions
//       const suggestions = generateSeoSuggestions(user)
//       user.seoData = suggestions
//       await user.save()
//     }

//     const { score, checks } = calculateSeoScore(user, user.seoData)
    
//     res.json({
//       seoData: user.seoData,
//       seoScore: score,
//       seoChecks: checks,
//       suggestions: generateSeoSuggestions(user)
//     })
//   } catch (error) {
//     console.error('Get SEO data error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // Update SEO Data
// router.put('/data', auth, [
//   body('metaTitle').optional().isLength({ max: 60 }).withMessage('Meta title must be 60 characters or less'),
//   body('metaDescription').optional().isLength({ max: 160 }).withMessage('Meta description must be 160 characters or less'),
//   body('keywords').optional().isArray().withMessage('Keywords must be an array'),
//   body('ogTitle').optional().isLength({ max: 60 }).withMessage('OG title must be 60 characters or less'),
//   body('ogDescription').optional().isLength({ max: 160 }).withMessage('OG description must be 160 characters or less'),
//   body('twitterTitle').optional().isLength({ max: 70 }).withMessage('Twitter title must be 70 characters or less'),
//   body('twitterDescription').optional().isLength({ max: 200 }).withMessage('Twitter description must be 200 characters or less')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const {
//       metaTitle,
//       metaDescription,
//       keywords,
//       ogTitle,
//       ogDescription,
//       ogImage,
//       twitterCard,
//       twitterTitle,
//       twitterDescription,
//       twitterImage,
//       canonicalUrl,
//       robotsDirective,
//       structuredData,
//       customMetaTags
//     } = req.body

//     const user = await User.findById(req.user._id)
    
//     // Update SEO data
//     const seoData = {
//       ...user.seoData,
//       metaTitle,
//       metaDescription,
//       keywords: keywords || [],
//       ogTitle,
//       ogDescription,
//       ogImage,
//       twitterCard: twitterCard || 'summary_large_image',
//       twitterTitle,
//       twitterDescription,
//       twitterImage,
//       canonicalUrl,
//       robotsDirective: robotsDirective || 'index,follow',
//       structuredData: structuredData || user.seoData?.structuredData,
//       customMetaTags: customMetaTags || [],
//       lastSeoUpdate: new Date()
//     }

//     // Calculate new SEO score
//     const { score, checks } = calculateSeoScore(user, seoData)
//     seoData.seoScore = score

//     user.seoData = seoData
//     await user.save()

//     res.json({
//       message: 'SEO data updated successfully',
//       seoData: user.seoData,
//       seoScore: score,
//       seoChecks: checks
//     })
//   } catch (error) {
//     console.error('Update SEO data error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // Generate SEO Suggestions
// router.post('/suggestions', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password')
//     const suggestions = generateSeoSuggestions(user)
    
//     res.json({
//       suggestions,
//       message: 'SEO suggestions generated successfully'
//     })
//   } catch (error) {
//     console.error('Generate SEO suggestions error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // SEO Analysis
// router.get('/analysis', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password')
//     const { score, checks } = calculateSeoScore(user, user.seoData || {})
    
//     const analysis = {
//       overallScore: score,
//       checks: checks,
//       recommendations: [],
//       competitorAnalysis: {
//         averageScore: 75,
//         yourRanking: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement'
//       }
//     }

//     // Generate recommendations based on score
//     if (score < 40) {
//       analysis.recommendations.push('Start with basic SEO setup: meta title and description')
//       analysis.recommendations.push('Add at least 5 relevant keywords')
//       analysis.recommendations.push('Complete your profile information')
//     } else if (score < 70) {
//       analysis.recommendations.push('Optimize meta descriptions for better click-through rates')
//       analysis.recommendations.push('Add Open Graph images for social sharing')
//       analysis.recommendations.push('Include structured data for rich snippets')
//     } else if (score < 90) {
//       analysis.recommendations.push('Fine-tune keyword targeting')
//       analysis.recommendations.push('Add custom meta tags for specific platforms')
//       analysis.recommendations.push('Optimize for local SEO if applicable')
//     } else {
//       analysis.recommendations.push('Your SEO is excellent! Monitor and maintain current optimization')
//       analysis.recommendations.push('Consider A/B testing different meta descriptions')
//     }

//     res.json(analysis)
//   } catch (error) {
//     console.error('SEO analysis error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // SEO Preview
// router.get('/preview/:username', async (req, res) => {
//   try {
//     const { username } = req.params
//     const user = await User.findOne({ username }).select('-password')
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }

//     const seoData = user.seoData || {}
//     const portfolioUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/${username}`

//     const preview = {
//       google: {
//         title: seoData.metaTitle || `${user.fullName} - Portfolio`,
//         description: seoData.metaDescription || user.bio || `Professional portfolio of ${user.fullName}`,
//         url: portfolioUrl
//       },
//       facebook: {
//         title: seoData.ogTitle || seoData.metaTitle || `${user.fullName} - Portfolio`,
//         description: seoData.ogDescription || seoData.metaDescription || user.bio,
//         image: seoData.ogImage || user.profileImgUrl,
//         url: portfolioUrl
//       },
//       twitter: {
//         title: seoData.twitterTitle || seoData.ogTitle || seoData.metaTitle,
//         description: seoData.twitterDescription || seoData.ogDescription || seoData.metaDescription,
//         image: seoData.twitterImage || seoData.ogImage || user.profileImgUrl,
//         card: seoData.twitterCard || 'summary_large_image'
//       },
//       linkedin: {
//         title: seoData.ogTitle || seoData.metaTitle,
//         description: seoData.ogDescription || seoData.metaDescription,
//         image: seoData.ogImage || user.profileImgUrl
//       }
//     }

//     res.json(preview)
//   } catch (error) {
//     console.error('SEO preview error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// export default router

import express from 'express'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// SEO Score Calculation Function
const calculateSeoScore = (user, seoData) => {
  let score = 0
  const checks = []

  // Meta Title (20 points)
  if (seoData.metaTitle) {
    if (seoData.metaTitle.length >= 30 && seoData.metaTitle.length <= 60) {
      score += 20
      checks.push({ field: 'metaTitle', status: 'good', message: 'Meta title length is optimal' })
    } else if (seoData.metaTitle.length > 0) {
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
    } else if (seoData.metaDescription.length > 0) {
      score += 10
      checks.push({ field: 'metaDescription', status: 'warning', message: 'Meta description should be 120-160 characters' })
    }
  } else {
    checks.push({ field: 'metaDescription', status: 'error', message: 'Meta description is missing' })
  }

  // Keywords (15 points)
  if (seoData.keywords && seoData.keywords.length >= 5) {
    score += 15
    checks.push({ field: 'keywords', status: 'good', message: `${seoData.keywords.length} keywords added` })
  } else if (seoData.keywords && seoData.keywords.length > 0) {
    score += 8
    checks.push({ field: 'keywords', status: 'warning', message: 'Add more keywords (recommended: 5-10)' })
  } else {
    checks.push({ field: 'keywords', status: 'error', message: 'Keywords are missing' })
  }

  // Open Graph (15 points)
  if (seoData.ogTitle && seoData.ogDescription) {
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
  if (user.socialLinks && Object.values(user.socialLinks).filter(Boolean).length >= 2) profileScore += 3
  score += profileScore
  checks.push({ field: 'profile', status: profileScore >= 12 ? 'good' : 'warning', message: `Profile ${Math.round((profileScore/15)*100)}% complete` })

  // Content Quality (15 points)
  let contentScore = 0
  if (user.experienceDetails && user.experienceDetails.length > 0) contentScore += 5
  if (user.education && user.education.length > 0) contentScore += 5
  if (user.certifications && user.certifications.length > 0) contentScore += 5
  score += contentScore
  checks.push({ field: 'content', status: contentScore >= 10 ? 'good' : 'warning', message: `Content sections ${Math.round((contentScore/15)*100)}% complete` })

  return { score: Math.min(score, 100), checks }
}

// Generate SEO Suggestions
const generateSeoSuggestions = (user) => {
  const suggestions = {
    metaTitle: `${user.fullName} - ${user.title || 'Professional Portfolio'} | ${user.skills?.[0] || 'Expert'}`,
    metaDescription: user.tagLine 
      ? `${user.tagLine.substring(0, 140)}...` 
      : `Professional portfolio of ${user.fullName}, ${user.title || 'experienced professional'} specializing in ${user.skills?.slice(0, 3).join(', ') || 'various technologies'}. View projects, experience, and contact information.`,
    keywords: [
      ...(user.skills || []),
      user.fullName.split(' '),
      user.title?.split(' ') || [],
      user.location?.split(' ') || [],
      'portfolio',
      'professional',
      user.workExperience?.includes('Senior') ? 'senior' : user.workExperience?.includes('Junior') ? 'junior' : 'experienced',
      ...(user.experienceDetails?.map(exp => exp.companyName.split(' ')).flat() || [])
    ].flat().filter(Boolean).slice(0, 10),
    ogTitle: `${user.fullName} | ${user.title || 'Professional Portfolio'}`,
    ogDescription: user.tagLine || user.intro || `Explore ${user.fullName}'s professional portfolio showcasing expertise in ${user.skills?.slice(0, 2).join(' and ') || 'technology'}.`,
    ogImage: user.profileImgUrl || '',
    twitterTitle: `${user.fullName} - ${user.title || 'Portfolio'}`,
    twitterDescription: user.tagLine?.substring(0, 180) || `Check out ${user.fullName}'s professional work and projects.`,
    twitterImage: user.profileImgUrl || '',
    canonicalUrl: `${process.env.CLIENT_URL || 'http://localhost:5173'}/${user.username}`,
    structuredData: {
      type: 'Person',
      jobTitle: user.title || '',
      worksFor: user.experienceDetails?.[0]?.companyName || '',
      url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/${user.username}`,
      sameAs: Object.values(user.socialLinks || {}).filter(Boolean),
      knowsAbout: user.skills || [],
      alumniOf: user.education?.map(edu => edu.institution) || [],
      award: user.certifications?.map(cert => cert.title) || [],
      address: user.location || '',
      telephone: user.phoneNumber || '',
      description: user.intro || user.tagLine || ''
    }
  }

  return suggestions
}

// Get SEO Data
router.get('/data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    
    if (!user.seoData || Object.keys(user.seoData).length === 0) {
      // Generate initial SEO suggestions
      const suggestions = generateSeoSuggestions(user)
      user.seoData = suggestions
      await user.save()
    }

    const { score, checks } = calculateSeoScore(user, user.seoData)
    
    res.json({
      seoData: user.seoData,
      seoScore: score,
      seoChecks: checks,
      suggestions: generateSeoSuggestions(user)
    })
  } catch (error) {
    console.error('Get SEO data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update SEO Data
router.put('/data', auth, [
  body('metaTitle').optional().isLength({ max: 60 }).withMessage('Meta title must be 60 characters or less'),
  body('metaDescription').optional().isLength({ max: 160 }).withMessage('Meta description must be 160 characters or less'),
  body('keywords').optional().isArray().withMessage('Keywords must be an array'),
  body('ogTitle').optional().isLength({ max: 60 }).withMessage('OG title must be 60 characters or less'),
  body('ogDescription').optional().isLength({ max: 160 }).withMessage('OG description must be 160 characters or less'),
  body('twitterTitle').optional().isLength({ max: 70 }).withMessage('Twitter title must be 70 characters or less'),
  body('twitterDescription').optional().isLength({ max: 200 }).withMessage('Twitter description must be 200 characters or less')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const {
      metaTitle,
      metaDescription,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage,
      canonicalUrl,
      robotsDirective,
      structuredData,
      customMetaTags
    } = req.body

    const user = await User.findById(req.user._id)
    
    // Update SEO data
    const seoData = {
      ...user.seoData,
      metaTitle,
      metaDescription,
      keywords: keywords || [],
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard: twitterCard || 'summary_large_image',
      twitterTitle,
      twitterDescription,
      twitterImage,
      canonicalUrl,
      robotsDirective: robotsDirective || 'index,follow',
      structuredData: structuredData || user.seoData?.structuredData,
      customMetaTags: customMetaTags || [],
      lastSeoUpdate: new Date()
    }

    // Calculate new SEO score
    const { score, checks } = calculateSeoScore(user, seoData)
    seoData.seoScore = score

    user.seoData = seoData
    await user.save()

    res.json({
      message: 'SEO data updated successfully',
      seoData: user.seoData,
      seoScore: score,
      seoChecks: checks
    })
  } catch (error) {
    console.error('Update SEO data error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Generate SEO Suggestions
router.post('/suggestions', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    const suggestions = generateSeoSuggestions(user)
    
    res.json({
      suggestions,
      message: 'SEO suggestions generated successfully'
    })
  } catch (error) {
    console.error('Generate SEO suggestions error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// SEO Analysis
router.get('/analysis', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    const { score, checks } = calculateSeoScore(user, user.seoData || {})
    
    const analysis = {
      overallScore: score,
      checks: checks,
      recommendations: [],
      competitorAnalysis: {
        averageScore: 75,
        yourRanking: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement'
      }
    }

    // Generate recommendations based on score
    if (score < 40) {
      analysis.recommendations.push('Start with basic SEO setup: meta title and description')
      analysis.recommendations.push('Add at least 5 relevant keywords')
      analysis.recommendations.push('Complete your profile information')
    } else if (score < 70) {
      analysis.recommendations.push('Optimize meta descriptions for better click-through rates')
      analysis.recommendations.push('Add Open Graph images for social sharing')
      analysis.recommendations.push('Include structured data for rich snippets')
    } else if (score < 90) {
      analysis.recommendations.push('Fine-tune keyword targeting')
      analysis.recommendations.push('Add custom meta tags for specific platforms')
      analysis.recommendations.push('Optimize for local SEO if applicable')
    } else {
      analysis.recommendations.push('Your SEO is excellent! Monitor and maintain current optimization')
      analysis.recommendations.push('Consider A/B testing different meta descriptions')
    }

    res.json(analysis)
  } catch (error) {
    console.error('SEO analysis error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// SEO Preview
router.get('/preview/:username', async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username }).select('-password')
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const seoData = user.seoData || {}
    const portfolioUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/${username}`

    const preview = {
      google: {
        title: seoData.metaTitle || `${user.fullName} - Portfolio`,
        description: seoData.metaDescription || user.tagLine || `Professional portfolio of ${user.fullName}`,
        url: portfolioUrl
      },
      facebook: {
        title: seoData.ogTitle || seoData.metaTitle || `${user.fullName} - Portfolio`,
        description: seoData.ogDescription || seoData.metaDescription || user.tagLine,
        image: seoData.ogImage || user.profileImgUrl,
        url: portfolioUrl
      },
      twitter: {
        title: seoData.twitterTitle || seoData.ogTitle || seoData.metaTitle,
        description: seoData.twitterDescription || seoData.ogDescription || seoData.metaDescription,
        image: seoData.twitterImage || seoData.ogImage || user.profileImgUrl,
        card: seoData.twitterCard || 'summary_large_image'
      },
      linkedin: {
        title: seoData.ogTitle || seoData.metaTitle,
        description: seoData.ogDescription || seoData.metaDescription,
        image: seoData.ogImage || user.profileImgUrl
      }
    }

    res.json(preview)
  } catch (error) {
    console.error('SEO preview error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router