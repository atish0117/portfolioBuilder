import express from "express"
import upload from "../middleware/upload.js"
import { uploadProfileImage, uploadResume } from "../controller/upload.controller.js"

const router = express.Router()

router.post("/upload/image", upload.single("file"), uploadProfileImage)
router.post("/upload/resume", upload.single("file"), uploadResume)

export default router