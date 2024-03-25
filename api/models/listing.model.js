import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    wifi: {
      type: Boolean,
      required: true,
    },
    swimmingPool: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    gym: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imgUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
