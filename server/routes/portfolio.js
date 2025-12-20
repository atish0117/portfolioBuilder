import express from 'express'
import User from '../models/User.js'
import Project from '../models/Project.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Get public portfolio by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params

    const user = await User.findOne({ username }).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'Portfolio not found' })
    }

    const projects = await Project.find({ userId: user._id })

    res.json({
      user: {
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        profileImgUrl: user.profileImgUrl,
        resumeUrl: user.resumeUrl,
        title: user.title,

        phoneNumber: user.phoneNumber,
        location: user.location,
        tagLine: user.tagLine,

        socialLinks: user.socialLinks,
        intro: user.intro,
        aboutSections: user.aboutSections,
        availability: user.availability,
        hourlyRate: user.hourlyRate,
        preferredWorkType: user.preferredWorkType,
        languages: user.languages,
        timezone: user.timezone,
        skills: user.skills,
        workExperience: user.workExperience,
        experienceDetails: user.experienceDetails,
        education: user.education,
        testimonials: user.testimonials,
        certifications: user.certifications,
        sectionOrder: user.sectionOrder,
        visibleSections: user.visibleSections,
        selectedTemplate: user.selectedTemplate,
        role: user.role,
        status: user.status
      },
      projects
    })
  } catch (error) {
    console.error('Get portfolio error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update section order
router.put('/section-order', auth, async (req, res) => {
  try {
    const { sectionOrder } = req.body

    if (!Array.isArray(sectionOrder)) {
      return res.status(400).json({ message: 'Section order must be an array' })
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { sectionOrder },
      { new: true }
    )

    res.json({
      message: 'Section order updated successfully',
      sectionOrder: user.sectionOrder
    })
  } catch (error) {
    console.error('Update section order error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Toggle section visibility
router.put('/section-visibility', auth, async (req, res) => {
  try {
    const { section, visible } = req.body

    console.log('Toggling section visibility:', { section, visible })
    if (!section || typeof visible !== 'boolean') {
      return res.status(400).json({ message: 'Section and visible status are required' })
    }

    const user = await User.findById(req.user._id)
    
    if (!user.visibleSections) {
      user.visibleSections = new Map()
    }
    
    user.visibleSections.set(section, visible)
    await user.save()

    console.log('Updated visible sections:', Object.fromEntries(user.visibleSections))
    res.json({
      message: 'Section visibility updated successfully',
      visibleSections: Object.fromEntries(user.visibleSections)
    })
  } catch (error) {
    console.error('Toggle section visibility error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update user profile with additional fields
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      fullName,
      title,

      tagLine,

      email,
      phoneNumber,
      location,
      intro,
      aboutSections,
      availability,
      hourlyRate,
      preferredWorkType,
      languages,
      timezone,
      skills,
      workExperience,
      socialLinks,
      profileImgUrl,
      resumeUrl,
      experienceDetails,
      education,
      testimonials,
      certifications,
      selectedTemplate
    } = req.body

    const updateData = {}
    
    if (fullName) updateData.fullName = fullName
    if (title !== undefined) updateData.title = title
    if (tagLine !== undefined) updateData.tagLine = tagLine

    if (skills) updateData.skills = skills
    if (workExperience) updateData.workExperience = workExperience

    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber
    if (location !== undefined) updateData.location = location
    if (email !== undefined) updateData.email = email
    if (intro !== undefined) updateData.intro = intro
    if (aboutSections) updateData.aboutSections = aboutSections
    if (availability) updateData.availability = availability
    if (hourlyRate) updateData.hourlyRate = hourlyRate
    if (preferredWorkType) updateData.preferredWorkType = preferredWorkType
    if (languages) updateData.languages = languages
    if (timezone) updateData.timezone = timezone
    if (skills !== undefined) updateData.skills = skills
    if (workExperience !== undefined) updateData.workExperience = workExperience
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks
    if (profileImgUrl !== undefined) updateData.profileImgUrl = profileImgUrl
    if (resumeUrl !== undefined) updateData.resumeUrl = resumeUrl
    if (experienceDetails !== undefined) updateData.experienceDetails = experienceDetails
    if (education !== undefined) updateData.education = education
    if (testimonials !== undefined) updateData.testimonials = testimonials
    if (certifications !== undefined) updateData.certifications = certifications
    if (selectedTemplate !== undefined) updateData.selectedTemplate = selectedTemplate


    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password')

    res.json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
        resumeUrl: user.resumeUrl,
        title: user.title,
        tagLine: user.tagLine,

        socialLinks: user.socialLinks,
        skills: user.skills,
        workExperience: user.workExperience,
        experienceDetails: user.experienceDetails,
        education: user.education,
        testimonials: user.testimonials,
        certifications: user.certifications,
        sectionOrder: user.sectionOrder,
        visibleSections: user.visibleSections,
        selectedTemplate: user.selectedTemplate,
        role: user.role,            
        status: user.status
      }
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Server error during profile update' })
  }
})

export default router