import cloudinary from "../utils/cloudinary.js"
import fs from "fs"

// 🔥 PROFILE IMAGE UPLOAD
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_images"
    })

    // delete temp file
    fs.unlinkSync(req.file.path)

    res.json({
      success: true,
      url: result.secure_url
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Image upload failed" })
  }
}

// 🔥 RESUME UPLOAD (PDF)
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // 🔥 IMPORTANT for PDF
      folder: "resumes",
      format: "pdf" 
    })

    fs.unlinkSync(req.file.path)

    res.json({
      success: true,
      url: result.secure_url
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Resume upload failed" })
  }
}