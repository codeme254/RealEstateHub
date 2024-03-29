import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import createDemoUser from "../utils/createDemoUser.js";
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
    res.status(201).json({
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

export const registerDemoUser = async (_, res, __) => {
  try {
    const demoUser = createDemoUser();
    demoUser.password = bcryptjs.hashSync(demoUser.password, 10);
    const newUser = new User(demoUser);
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...data } = newUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ data, success: true });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "something went wrong, pleae try again",
    });
  }
};

export const google = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ success: true, data: others });
    } else {
      const generatedPassword = (
        Date.now().toString(32) + Math.random().toString(16)
      ).replace(/\./, "");
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        profilePictureUrl: req.body.profilePictureUrl,
        password: hashedPassword,
        userType: "normal-user",
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...others } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ success: true, data: others });
    }
  } catch (e) {
    next(e);
  }
};
