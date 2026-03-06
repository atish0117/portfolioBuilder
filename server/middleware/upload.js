import multer from "multer"
import path from "path"

// temp storage (cloudinary me upload hoga )
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname)
    cb(null, unique)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(new Error("Only images allowed"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2mb
})

export default upload
