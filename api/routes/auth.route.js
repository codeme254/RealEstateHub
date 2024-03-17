import express from "express";
import {
  signUp,
  signIn,
  registerDemoUser,
  google,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signup/demo", registerDemoUser);
router.post("/google", google);

export default router;
