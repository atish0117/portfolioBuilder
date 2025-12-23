import User from '../models/User.js'
import Project from '../models/Project.js'

// GET public portfolio
export const getPublicPortfolio = async (req, res) => {
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
}

// UPDATE section order
export const updateSectionOrder = async (req, res) => {
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
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// TOGGLE section visibility
export const toggleSectionVisibility = async (req, res) => {
  try {
    const { section, visible } = req.body

    if (!section || typeof visible !== 'boolean') {
      return res.status(400).json({ message: 'Invalid payload' })
    }

    const user = await User.findById(req.user._id)

    if (!user.visibleSections) {
      user.visibleSections = new Map()
    }

    user.visibleSections.set(section, visible)
    await user.save()

    res.json({
      message: 'Section visibility updated',
      visibleSections: Object.fromEntries(user.visibleSections)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE profile
export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'fullName',
      'title',
      'tagLine',
      'email',
      'phoneNumber',
      'location',
      'intro',
      'aboutSections',
      'availability',
      'hourlyRate',
      'preferredWorkType',
      'languages',
      'timezone',
      'skills',
      'workExperience',
      'socialLinks',
      'profileImgUrl',
      'resumeUrl',
      'experienceDetails',
      'education',
      'testimonials',
      'certifications',
      'selectedTemplate'
    ]

    const updateData = {}

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field]
      }
    })

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
}
