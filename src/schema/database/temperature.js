import mongoose from "mongoose";
import db from "../../config/main_db";

const Temperature = db.model(
  "Temperature",
  new mongoose.Schema({
    temperature: {type: Number},
    isActive: { type: Boolean, required: true },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
  }),
  "temperature"
);

export default Temperature;
