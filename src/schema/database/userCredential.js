import mongoose from "mongoose";
import db from "../../config/main_db";

const UserCredential = db.model(
  "UserCredential",
  new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    e_id: { type: String },
    isActive: { type: Boolean, required: true },
    credentialType: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  }),
  "user_credential"
);

export default UserCredential;
