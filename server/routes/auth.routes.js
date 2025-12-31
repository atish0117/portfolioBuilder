

import express from 'express'
import {
  startOAuth,
  oauthCallback
} from '../controllers/auth.controller.js'

const router = express.Router()

router.get('/:provider', startOAuth)
router.get('/callback', oauthCallback)

export default router
