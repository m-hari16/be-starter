import mongoose from "mongoose";
import db from "../../config/main_db";

const BloodOxygen = db.model(
  "BloodOxygen",
  new mongoose.Schema({
    e_id: { type: String },
    blood_oxygen: {type: Number},
    isActive: { type: Boolean, required: true },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
  }),
  "blood_oxygen"
);

export default BloodOxygen;
