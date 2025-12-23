import express from 'express'
import { auth } from '../middleware/auth.js'
import {
  getPublicPortfolio,
  updateSectionOrder,
  toggleSectionVisibility,
  updateProfile
} from '../controllers/portfolio.controller.js'

const router = express.Router()

router.get('/:username', getPublicPortfolio)

router.put('/section-order', auth, updateSectionOrder)

router.put('/section-visibility', auth, toggleSectionVisibility)

router.put('/profile', auth, updateProfile)

export default router
