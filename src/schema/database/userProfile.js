import mongoose from "mongoose";
import db from "../../config/main_db";

const UserProfile = db.model(
  "UserProfile",
  new mongoose.Schema({
    e_id: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    fullName: { type: String, required: true },
    email: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    homeAddress: { type: String, default: "" },
    gender: { type: String, enum: ["M", "F"] },
    dateOfBirth: { type: String },
    bloodGroup: { type: String, default: "" },
    profileType: {
      type: String,
      enum: ["PATIENT", "DOCTOR", "NURSE", "ADMIN"],
      default: "PATIENT",
    },
    createdBy: {
      e_id: { type: String, default: "" },
    },
    updatedBy: {
      e_id: { type: String, default: "" },
    },
    createdAt: Date,
    updatedAt: Date,
  }),
  "user_profile"
);

export default UserProfile;
