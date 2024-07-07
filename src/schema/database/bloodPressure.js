import mongoose from "mongoose";
import db from "../../config/main_db";

const BloodPressure = db.model(
  "BloodPressure",
  new mongoose.Schema({
    systole: {type: Number},
    diastole: {type: Number},
    isActive: { type: Boolean, required: true },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
  }),
  "blood_pressure"
);

export default BloodPressure;
