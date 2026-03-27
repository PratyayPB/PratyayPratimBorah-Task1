import { Router } from "express";
import {
  addGroupMember,
  getGroupMembers,
  removeGroupMember,
} from "../controllers/groupMemberController.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, addGroupMember);
router.get("/group/:groupId", protect, getGroupMembers);
router.delete("/:id", protect, removeGroupMember);

export default router;
