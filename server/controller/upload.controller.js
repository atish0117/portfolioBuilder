
import cloudinary from "../utils/cloudinary.js";
import { removeTempFile } from "../middleware/upload.js";

// PROFILE IMAGE UPLOAD
export const uploadProfileImage = async (req, res) => {
  const tempPath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "profile_images",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error("Profile image upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });

  } finally {
    await removeTempFile(tempPath);
  }
};


// RESUME UPLOAD
export const uploadResume = async (req, res) => {
  const tempPath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await cloudinary.uploader.upload(tempPath, {
      resource_type: "raw",
      folder: "resumes",
      format: "pdf",
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Resume upload failed",
    });

  } finally {
    await removeTempFile(tempPath);
  }
};
