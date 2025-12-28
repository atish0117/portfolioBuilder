
import User from '../models/User.js'
import { calculateSeoScore, generateSeoSuggestions } from '../utils/seo.utils.js'

// GET SEO DATA
export const getSeoData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean()

    let seoData = user.seoData

    if (!seoData || Object.keys(seoData).length === 0) {
      seoData = generateSeoSuggestions(user)

      await User.updateOne(
        { _id: user._id },
        { seoData }
      )
    }

    const { score, checks } = calculateSeoScore(user, seoData)

    res.json({
      seoData,
      seoScore: score,
      seoChecks: checks,
      suggestions: generateSeoSuggestions(user)
    })
  } catch (err) {
    console.error('Get SEO data error:', err)
    res.status(500).json({ message: 'Failed to load SEO data' })
  }
}

// UPDATE SEO DATA
export const updateSeoData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    const seoData = {
      ...user.seoData,

      // 🔥 FIXED keyword overwrite bug
      ...(req.body.metaTitle && { metaTitle: req.body.metaTitle }),
      ...(req.body.metaDescription && { metaDescription: req.body.metaDescription }),
      ...(req.body.keywords && { keywords: req.body.keywords }),

      ogTitle: req.body.ogTitle ?? user.seoData?.ogTitle,
      ogDescription: req.body.ogDescription ?? user.seoData?.ogDescription,
      ogImage: req.body.ogImage ?? user.seoData?.ogImage,
      twitterTitle: req.body.twitterTitle ?? user.seoData?.twitterTitle,
      twitterDescription: req.body.twitterDescription ?? user.seoData?.twitterDescription,
      canonicalUrl: req.body.canonicalUrl ?? user.seoData?.canonicalUrl,
      robotsDirective: req.body.robotsDirective ?? 'index,follow',
      lastSeoUpdate: new Date()
    }

    const { score, checks } = calculateSeoScore(user, seoData)
    seoData.seoScore = score

    user.seoData = seoData
    await user.save()

    res.json({
      message: 'SEO updated',
      seoData,
      seoScore: score,
      seoChecks: checks
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// SEO ANALYSIS
export const getSeoAnalysis = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean()
    const { score, checks } = calculateSeoScore(user, user.seoData || {})

    res.json({
      overallScore: score,
      checks,
      ranking:
        score >= 80 ? 'Excellent' :
        score >= 60 ? 'Good' :
        score >= 40 ? 'Fair' : 'Needs Improvement'
    })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
}

// SEO PREVIEW (PUBLIC)
export const getSeoPreview = async (req, res) => {
  try {
  const user = await User.findOne({ username: req.params.username }).lean()
  if (!user) return res.status(404).json({ message: 'User not found' })

  const seo = user.seoData || {}

  res.json({
    google: {
      title: seo.metaTitle || user.fullName,
      description: seo.metaDescription || user.tagLine,
      url: `${process.env.CLIENT_URL}/${user.username}`
    },
     twitter: {
        title: seoData.twitterTitle || seoData.ogTitle || seoData.metaTitle,
        description: seoData.twitterDescription || seoData.ogDescription || seoData.metaDescription,
        image: seoData.twitterImage || seoData.ogImage || user.profileImgUrl,
        card: seoData.twitterCard || 'summary_large_image'
      },
  })
}catch (error) {
    console.error('SEO preview error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
