import mongoose from "mongoose";
import db from "../../config/main_db";

const PatientVisit = db.model(
  "PatientVisit",
  new mongoose.Schema({
    patient: {
      e_id: { type: String, required: true },
      name: { type: String, required: true },
    },
    doctor: {
      e_id: { type: String, required: true },
      name: { type: String, required: true },
    },
    treatment: Array,
    price: {
      priceTotal: { type: Number },
    },
    isActive: { type: Boolean, required: true },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    updatedBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
    updatedAt: Date,
  }),
  "patient_visit"
);

export default PatientVisit;
