import express from "express";
import { updateUser } from "../controllers/users.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);

export default router;
