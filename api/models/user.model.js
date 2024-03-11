import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 40,
      min: 2,
    },
    lastName: {
      type: String,
      required: true,
      max: 40,
      min: 2,
    },
    username: {
      type: String,
      required: true,
      min: 2,
      max: 20,
      unique: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
    },
    profilePictureUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
