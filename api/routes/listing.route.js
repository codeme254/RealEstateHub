import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createListing,
  getSingleListing,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyUser, createListing);
router.get("/:id", getSingleListing);

export default router;
