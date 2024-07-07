import mongoose from "mongoose";
import db from "../../config/main_db";

const PatientCondition = db.model(
  "PatientCondition",
  new mongoose.Schema({
    e_id: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    patientProfile: Object,
    latestTreatment: { type: String, default: "" },
    latestBloodPressure: {
      systole: { type: Number },
      diastole: { type: Number },
    },
    latestHeartRate: { type: Number },
    latestBloodGlucose: { type: Number },
    latestTemperature: { type: Number },
    latestBloodOxygen: { type: Number },
    latestRiskStatus: {
      type: String,
      enum: ["HIGH", "MODERATE", "LOW", "NORMAL"],
    },
    latestDesease: { type: String, default: "" },
    isConnectedDevice: { type: Boolean, default: false },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    updatedBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
    updatedAt: Date,
  }),
  "patient_condition"
);

export default PatientCondition;
