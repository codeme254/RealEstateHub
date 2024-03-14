import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, username, emailAddress, password, userType } =
    req.body;
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
    res
      .status(201)
      .json({
        message: `Account for ${username} successfully created.`,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { emailAddress, password } = req.body;
  try {
    const user = await User.findOne({ emailAddress });
    if (!user) return next(errorHandler(401, "Invalid login credentials"));
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return next(errorHandler(402, "Invalid login credentials"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...data } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ data, success: true });
  } catch (error) {
    next(error);
  }
};
