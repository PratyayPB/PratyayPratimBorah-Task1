import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController.js";

import { protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/", protect, createGroup);
router.get("/", protect, getGroups);
router.get("/:id", protect, getGroupById);
router.put("/:id", protect, updateGroup);
router.delete("/:id", protect, deleteGroup);

export default router;
