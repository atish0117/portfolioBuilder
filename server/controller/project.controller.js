import Project from '../models/Project.js'


//  GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .lean()

    res.json(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}


//  CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      imageUrl,
      startDate,
      endDate,
      status,
      category
    } = req.body

    const project = await Project.create({
      userId: req.user._id,
      title,
      description,
      techStack: techStack || [],
      githubLink,
      liveLink,
      imageUrl,
      startDate,
      endDate,
      status,
      category
    })

    res.status(201).json({
      message: 'Project created successfully',
      project
    })
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}


//  UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const allowedFields = [
      'title',
      'description',
      'techStack',
      'githubLink',
      'liveLink',
      'imageUrl',
      'startDate',
      'endDate',
      'status',
      'category'
    ]

    const updateData = {}

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] =
        field === 'techStack' ? req.body[field] || [] : req.body[field]
      }
    })

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true }
    )

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json({
      message: 'Project updated successfully',
      project
    })
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}


//  DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    })

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
