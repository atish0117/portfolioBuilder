import SkillIcon from "../models/SkillIcon.js"
import cloudinary from "../utils/cloudinary.js"

/* -------------------------------------------------- */
/* UPLOAD ICON */
/* -------------------------------------------------- */
export const uploadSkillIcon = async (req, res) => {
  try {
    const { skillKey, label } = req.body

    if (!skillKey) {
      return res.status(400).json({ message: "Skill key required" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    // upload to cloudinary
    const upload = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "skill-icons" }
    )

    const icon = await SkillIcon.create({
      skillKey: skillKey.toLowerCase().trim(),
      iconUrl: upload.secure_url,
      publicId: upload.public_id,
      label,
      createdBy: req.user._id
    })

    res.json(icon)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Upload failed" })
  }
}

/* -------------------------------------------------- */
/* GET ICONS BY SKILL */
/* -------------------------------------------------- */
export const getIconsBySkill = async (req, res) => {
  try {
    const { skill } = req.params

    const icons = await SkillIcon.find({
      skillKey: skill.toLowerCase().trim()
    }).sort({ createdAt: -1 })

    res.json(icons)
  } catch {
    res.status(500).json({ message: "Fetch failed" })
  }
}

/* -------------------------------------------------- */
/* DELETE ICON */
/* -------------------------------------------------- */
export const deleteSkillIcon = async (req, res) => {
  try {
    const icon = await SkillIcon.findById(req.params.id)

    if (!icon) {
      return res.status(404).json({ message: "Not found" })
    }

    // delete from cloudinary
    if (icon.publicId) {
      await cloudinary.uploader.destroy(icon.publicId)
    }

    await icon.deleteOne()

    res.json({ message: "Icon deleted" })
  } catch {
    res.status(500).json({ message: "Delete failed" })
  }
}

/* -------------------------------------------------- */
/* UPDATE ICON */
/* -------------------------------------------------- */
export const updateSkillIcon = async (req, res) => {
  try {
    const { skillKey, label } = req.body

    const icon = await SkillIcon.findByIdAndUpdate(
      req.params.id,
      {
        skillKey: skillKey?.toLowerCase().trim(),
        label
      },
      { new: true }
    )

    res.json(icon)
  } catch {
    res.status(500).json({ message: "Update failed" })
  }
}

/* -------------------------------------------------- */
/* GET ALL ICONS (ADMIN PANEL) */
/* -------------------------------------------------- */
export const getAllIcons = async (req, res) => {
  try {
    const icons = await SkillIcon.find().sort({ createdAt: -1 })
    res.json(icons)
  } catch {
    res.status(500).json({ message: "Fetch failed" })
  }
}
