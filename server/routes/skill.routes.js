import express from "express"
import { updateSkills } from "../controller/skill.controller.js"
import {auth} from "../middleware/auth.js"

const router = express.Router()

router.put("/skills", auth, updateSkills)

export default router
