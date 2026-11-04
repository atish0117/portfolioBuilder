
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileTypeFromFile } from "file-type";

// Temporary upload directory
const uploadDir = path.resolve("uploads");

// Create directory if it does not exist
fs.mkdirSync(uploadDir, { recursive: true });

// Allowed extensions and MIME types
const allowedFiles = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

// Temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${crypto.randomUUID()}${ext}`;

    cb(null, uniqueName);
  },
});

// Validate extension and MIME type
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const expectedMime = allowedFiles[ext];

  if (!expectedMime || file.mimetype !== expectedMime) {
    return cb(
      new Error("Only JPG, JPEG, PNG, WebP and PDF files are allowed")
    );
  }

  cb(null, true);
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },
});

// Verify actual file content using magic bytes
export const validateFileSignature = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please select a file",
    });
  }

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();
    const expectedMime = allowedFiles[ext];

    const detectedType = await fileTypeFromFile(req.file.path);

    if (!detectedType || detectedType.mime !== expectedMime) {
      await removeTempFile(req.file.path);

      return res.status(400).json({
        success: false,
        message: "Invalid file content. Please upload a genuine image or PDF.",
      });
    }

    req.verifiedFile = {
      mime: detectedType.mime,
      ext: detectedType.ext,
    };

    next();
  } catch (error) {
    await removeTempFile(req.file.path);

    console.error("File signature validation error:", error);

    return res.status(400).json({
      success: false,
      message: "Unable to validate uploaded file",
    });
  }
};

// Safely remove temporary file
export const removeTempFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Temporary file cleanup failed:", error);
    }
  }
};

export default upload;
