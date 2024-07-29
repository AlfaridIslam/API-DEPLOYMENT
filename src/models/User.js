// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
