import Listing from "../models/listing.model.js";
export const createListing = async (req, res, next) => {
  if (
    req.body.offer === true &&
    req.body.discountedPrice > req.body.regularPrice
  ) {
    return res.status(400).json({
      success: "false",
      message: "Discounted price cannot be greater than regular price",
    });
  }
  try {
    const newListing = await Listing.create(req.body);
    return res.status(201).json({
      success: "true",
      message: "Listing created successfully",
      data: newListing,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: "false", message: error.message });
  }
};

export const getSingleListing = async (req, res) => {
  const id = req.params.id;
  try {
    const listing = await Listing.findById(id).populate("userRef");
    if (!listing)
      return res
        .status(400)
        .json({ success: false, message: "Listing not found" });
    return res.status(200).json({ success: true, data: listing });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    return res.status(200).json({ success: true, data: listings });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// images for testing the api
// 'https://res.cloudinary.com/dz1yrbnpy/image/upload/v1711364014/bckxvn9bo39jpjtezeq0.jpg',
// 'https://res.cloudinary.com/dz1yrbnpy/image/upload/v1711364016/xwmsmblj4azar2irbofe.jpg',
// 'https://res.cloudinary.com/dz1yrbnpy/image/upload/v1711364017/oegydxzpdvyh6e1lfry9.jpg',
// 'https://res.cloudinary.com/dz1yrbnpy/image/upload/v1711364019/ldcb05teezewmhkpliza.jpg'
