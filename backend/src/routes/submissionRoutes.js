import { Router } from "express";
import {
  createSubmission,
  getSubmissions,
  getSubmission,
  updateSubmission,
  deleteSubmission,
} from "../controllers/submissionController.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
const router = Router();

router.post("/", protect, createSubmission);
router.get("/", protect, authorize("admin"), getSubmissions);
router.get("/:id", protect, authorize("admin"), getSubmission);
router.put("/:id", protect, updateSubmission);
router.delete("/:id", protect, deleteSubmission);

export default router;
