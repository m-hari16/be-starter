import mongoose from "mongoose";
import db from "../../config/main_db";

const HeartRate = db.model(
  "HeartRate",
  new mongoose.Schema({
    heartRate: {type: Number},
    isActive: { type: Boolean, required: true },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
  }),
  "heart_rate"
);

export default HeartRate;
