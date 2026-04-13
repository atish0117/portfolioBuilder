import express from "express"
import { getPublicTemplates } from "../controller/template.controller.js"

const router = express.Router()

// PUBLIC ROUTE
router.get("/templates/public", getPublicTemplates)

export default router