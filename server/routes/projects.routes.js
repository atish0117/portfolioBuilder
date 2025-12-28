// import express from 'express'
// import { body, validationResult } from 'express-validator'
// import Project from '../models/Project.js'
// import { auth } from '../middleware/auth.js'

// const router = express.Router()

// // Get all projects for authenticated user
// router.get('/', auth, async (req, res) => {
//   try {
//     const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 })
//     res.json(projects)
//   } catch (error) {
//     console.error('Get projects error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // Create new project
// router.post('/', auth, [
//   body('title').trim().isLength({ min: 1 }).withMessage('Project title is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { title, description, techStack, githubLink, liveLink, imageUrl,startDate,endDate,status,category } = req.body

//     const project = new Project({
//       userId: req.user._id,
//       title,
//       description,
//       techStack: techStack || [],
//       githubLink,
//       liveLink,
//       imageUrl,
//       startDate,
//       endDate,
//       status,
//       category
//     })

//     await project.save()

//     res.status(201).json({
//       message: 'Project created successfully',
//       project
//     })
//   } catch (error) {
//     console.error('Create project error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // Update project
// router.put('/:id', auth, [
//   body('title').trim().isLength({ min: 1 }).withMessage('Project title is required')
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array()[0].msg })
//     }

//     const { title, description, techStack, githubLink, liveLink, imageUrl, startDate, endDate, status, category } = req.body

//     const project = await Project.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user._id },
//       {
//         title,
//         description,
//         techStack: techStack || [],
//         githubLink,
//         liveLink,
//         imageUrl,
//         startDate,
//         endDate,
//         status,
//         category
//       },
//       { new: true }
//     )

//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' })
//     }

//     res.json({
//       message: 'Project updated successfully',
//       project
//     })
//   } catch (error) {
//     console.error('Update project error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// // Delete project
// router.delete('/:id', auth, async (req, res) => {
//   try {
//     const project = await Project.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user._id
//     })

//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' })
//     }

//     res.json({ message: 'Project deleted successfully' })
//   } catch (error) {
//     console.error('Delete project error:', error)
//     res.status(500).json({ message: 'Server error' })
//   }
// })

// export default router



import express from 'express'
import { body } from 'express-validator'
import { auth } from '../middleware/auth.js'
import { validateRequest } from '../middleware/validateRequest.js'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controller/project.controller.js'

const router = express.Router()

/* =========================
  PROJECT ROUTES
========================= */

// GET all projects
router.get('/', auth, getProjects)

// CREATE project
router.post(
  '/',
  auth,
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Project title is required')
  ],
  validateRequest,
  createProject
)

// UPDATE project
router.put(
  '/:id',
  auth,
  [
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Project title cannot be empty')
  ],
  validateRequest,
  updateProject
)

// DELETE project
router.delete('/:id', auth, deleteProject)

export default router
