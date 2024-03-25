import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createListing } from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyUser, createListing);

export default router;
