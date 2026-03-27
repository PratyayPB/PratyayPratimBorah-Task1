import { Router } from "express";
import assignmentRoutes from "./assignmentRoutes.js";
import submissionRoutes from "./submissionRoutes.js";
import groupRoutes from "./groupRoutes.js";
import groupMemberRoutes from "./groupMemberRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/submissions", submissionRoutes);
router.use("/groups", groupRoutes);
router.use("/group-members", groupMemberRoutes);
router.use("/users", userRoutes);

export default router;
