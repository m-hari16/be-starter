import express from "express";
import authRoutes from "./auth";
import patientRoutes from "./patient";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/patient", patientRoutes);

export default router;
