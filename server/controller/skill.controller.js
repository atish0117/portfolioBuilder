import User from "../models/User.js"

export const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body
      console.log(req.body)

      console.log("BODY:", req.body)
console.log("TYPE:", typeof req.body.skills)
console.log("IS ARRAY:", Array.isArray(req.body.skills))


    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be array" })
    }

    // sanitize
    const cleanSkills = skills.map(s => ({
      name: s.name?.trim() || "",
      icon: s.icon || "",
      category: s.category || "Other",
      level: s.level || "beginner",
      yearsOfExperience: Number(s.yearsOfExperience) || 0,
      isPrimary: !!s.isPrimary
    }))

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { skills: cleanSkills },
      { new: true, runValidators: true }
    ).select("-password")

    res.json({
      message: "Skills updated",
      skills: user.skills
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Skill update failed" })
  }
}
