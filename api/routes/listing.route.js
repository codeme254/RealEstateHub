import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createListing,
  getSingleListing,
  getAllListings,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/new", verifyUser, createListing);
router.get("/all", getAllListings);
router.get("/:id", getSingleListing);

export default router;
