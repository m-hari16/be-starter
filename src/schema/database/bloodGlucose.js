import mongoose from "mongoose";
import db from "../../config/main_db";

const BloodGlucose = db.model(
  "BloodGlucose",
  new mongoose.Schema({
    bloodGlucose: {type: Number},
    isActive: { type: Boolean, required: true },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
  }),
  "blood_glucose"
);

export default BloodGlucose;
