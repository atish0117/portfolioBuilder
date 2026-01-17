import User from '../models/User.js'
import Project from '../models/Project.js'

// GET public portfolio
export const getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params

    const userDoc = await User.findOne({ username })
    if (!userDoc) {
      return res.status(404).json({ message: 'Portfolio not found' })
    }

    const projects = await Project.find({ userId: userDoc._id })
    const user =userDoc.toObject()
    res.status(200).json({
      user,
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

    const userDoc = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    )

    res.status(200).json({
      message: 'Profile updated successfully',
      user:userDoc.toObject()
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Server error during profile update' })
  }
}
