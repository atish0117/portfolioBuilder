
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    techStack: {
      type: [String],
      default: [],
    },

    githubLink: {
      type: String,
      default: "",
    },

    liveLink: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: ["web", "mobile", "design", "backend", "fullstack", "other"],
      default: "other",
    },

    status: {
      type: String,
      enum: ["draft", "published", "featured"],
      default: "published",
      index: true,
    },

    startDate: {
      type: String,
      default: "",
    },

    endDate: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Optimize public portfolio project queries
projectSchema.index({
  userId: 1,
  status: 1,
  createdAt: -1,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
