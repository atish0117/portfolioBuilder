import express from "express";
import {
  uploadSkillIcon,
  getIconsBySkill,
  deleteSkillIcon,
  updateSkillIcon,
  getAllIcons,
} from "../controller/adminIcon.controller.js";

import  { auth } from "../middleware/auth.js";
import {adminAuth} from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/icon", auth, adminAuth, upload.single("icon"), uploadSkillIcon);
router.get("/icon/:skill", getIconsBySkill);
router.get("/icons", auth, adminAuth, getAllIcons);
router.delete("/icon/:id", auth, adminAuth, deleteSkillIcon);
router.put("/icon/:id", auth, adminAuth, updateSkillIcon);

export default router;
