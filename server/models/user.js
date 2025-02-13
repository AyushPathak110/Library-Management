import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  rfidNumber: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
