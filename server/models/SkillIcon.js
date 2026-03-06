import mongoose from "mongoose"

const skillIconSchema = new mongoose.Schema({
  skillKey: { type: String, required: true, index: true },
  iconUrl: { type: String, required: true },
  label: { type: String },
  publicId: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }
}, { timestamps: true })

export default mongoose.model("SkillIcon", skillIconSchema)
