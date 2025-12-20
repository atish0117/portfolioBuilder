import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    techStack: [String],
    githubLink: String,
    liveLink: String,
    imageUrl: String, // single/primary image URL
    category: {
      type: String,
      enum: ['web', 'mobile', 'design', 'backend', 'fullstack', 'other'],
      default: 'other'
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'featured'],
      default: 'published'
    },
    startDate: String,
    endDate: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);