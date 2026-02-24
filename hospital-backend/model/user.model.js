import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  role: { type: String, enum: ["doctor", "patient"] },
});

export const userModel = mongoose.model("User", userSchema);
