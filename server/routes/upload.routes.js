import express from "express"
import upload, { validateFileSignature, } from "../middleware/upload.js"
import { uploadProfileImage, uploadResume } from "../controller/upload.controller.js"
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post(
    "/upload/image",
    auth,
    upload.single("file"),
    validateFileSignature,
    uploadProfileImage
);

router.post(
    "/upload/resume",
    auth,
    upload.single("file"),
    validateFileSignature,
    uploadResume
);

export default router