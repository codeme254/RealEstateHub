import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, username, emailAddress, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 15);
    const newUser = new User({
      firstName,
      lastName,
      username,
      emailAddress,
      password: hashedPassword,
      userType: "normal",
    });
    await newUser.save();
    res.status(201).json({ message: "new user created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
