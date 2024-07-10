import express from "express";
import authRoutes from "./auth";
import patientRoutes from "./patient";
import deviceRoutes from "./device_iot";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/patient", patientRoutes);
router.use("/device", deviceRoutes);

export default router;
