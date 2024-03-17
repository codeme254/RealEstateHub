import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.json({ message: "Welcome to RealEstate API..." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to the database...");
  })
  .catch((error) => {
    console.log("There was an error connecting to the database");
    console.error(error);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((error, _, res, __) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000...`);
});
