import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, username, emailAddress, password, userType } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 15);
    const newUser = new User({
      firstName,
      lastName,
      username,
      emailAddress,
      password: hashedPassword,
      userType,
    });
    await newUser.save();
    res.status(201).json(`Account for ${username} successfully created.`);
  } catch (error) {
    next(error);
  }
};
