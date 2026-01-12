

import express from 'express'
import {
  startOAuth,
  oauthCallback
} from '../controller/oauth.controller.js'

const router = express.Router()

router.get('/callback', oauthCallback)
router.get('/:provider', (req, res) => {
  return startOAuth(req.params.provider)(req, res)
})


export default router
