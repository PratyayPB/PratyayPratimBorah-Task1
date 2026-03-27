import { Router } from "express";
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/", protect, authorize("admin"), createAssignment);
router.get("/", protect, getAssignments);
router.get("/:id", protect, getAssignmentById);
router.put("/:id", protect, authorize("admin"), updateAssignment);
router.delete("/:id", protect, authorize("admin"), deleteAssignment);

export default router;
