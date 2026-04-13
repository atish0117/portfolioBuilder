import multer from "multer"
import path from "path"
import fs from "fs"

// temp storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/"
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  }
})

// UPDATED FILTER (image + pdf support)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") || // profile image
    file.mimetype === "application/pdf" // resume
  ) {
    cb(null, true)
  } else {
    cb(new Error("Only images & PDF allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

export default upload