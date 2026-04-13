import Template from "../models/Template.js"

// Public templates (user ke liye)
export const getPublicTemplates = async (req, res) => {
  try {
    const templates = await Template.find()
      .select("-__v")
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      templates
    })
  } catch (error) {
    console.error("Public template error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates"
    })
  }
}