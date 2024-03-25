import React, { useState, useEffect } from "react";
import uploadImage from "../../../utils/upload";
import "./new-listing.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NewListing() {
  const [images, setImages] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const user = useSelector((state) => state.user.value);
  const [creatingListing, setCreatingListing] = useState(false);
  const [createListingError, setCreateListingError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    type: "rent",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    bedrooms: 0,
    bathrooms: 0,
    wifi: false,
    parking: false,
    swimmingPool: false,
    furnished: false,
    gym: false,
  });

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id == "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "wifi" ||
      e.target.id === "parking" ||
      e.target.id === "swimmingPool" ||
      e.target.id === "furnished" ||
      e.target.id === "gym" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleUploadImages = async (e) => {
    e.preventDefault();
    if (images.length < 2) return alert("Please select at least 4 images");
    setUploadingImages(true);
    try {
      const urlsArr = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImage(images[i]);
        urlsArr.push(url);
      }
      setImgUrls(urlsArr);
      setFormData({ ...formData, imgUrls: urlsArr });
    } catch (e) {
      alert("There was an error uploading, please try again");
    }
    setUploadingImages(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    formData["userRef"] = user._id;
    try {
      setCreatingListing(true);
      const response = await fetch("/api/listing/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // console.log(data);
      if (data.success) {
        navigate(`/listing/${data.data._id}`);
      } else {
        setCreateListingError(data.message);
      }
      setCreatingListing(false);
    } catch (e) {
      setCreateListingError(e);
      setCreatingListing(false);
    }
  };
  return (
    <div className="new-listing">
      <h2 className="create-listing-title">
        Hey {user && user.username}, Create a listing
      </h2>
      <form className="new-listing__form" onSubmit={handleSubmit}>
        <div className="new-listing__form-group">
          <label htmlFor="title" className="new-listing__form-group--label">
            title
          </label>
          <input
            type="text"
            id="title"
            className="new-listing__form-group--text-input"
            placeholder="title"
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className="new-listing__form-group">
          <label htmlFor="address" className="new-listing__form-group--label">
            address
          </label>
          <input
            type="text"
            id="address"
            className="new-listing__form-group--text-input"
            placeholder="address"
            onChange={handleChange}
            value={formData.address}
          />
        </div>

        <div className="new-listing__form-group">
          <label
            htmlFor="description"
            className="new-listing__form-group--label"
          >
            description
          </label>
          <textarea
            id="description"
            className="new-listing-text-area"
            placeholder="description"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>

        <div className="new-listing__form-group-radio">
          <div className="radio-group">
            <label htmlFor="rent" className="new-listing__form-group--label">
              rent
            </label>
            <input
              type="radio"
              name="type"
              id="rent"
              className="new-listing__form-group--radio"
              onChange={handleChange}
              checked={formData.type === "rent"}
            />
          </div>
          <div className="radio-group">
            <label htmlFor="sale" className="new-listing__form-group--label">
              sale
            </label>
            <input
              type="radio"
              name="type"
              id="sale"
              className="new-listing__form-group--radio"
              onChange={handleChange}
              checked={formData.type === "sale"}
            />
          </div>
        </div>

        <div className="radio-group mb-fix">
          <label htmlFor="offer" className="new-listing__form-group--label">
            offer
          </label>
          <input
            type="checkbox"
            id="offer"
            className="new-listing__form-group--radio"
            onChange={handleChange}
            checked={formData.offer}
          />
        </div>

        <div className="new-listing__form-group--flex">
          <div className="new-listing__form-group">
            <label
              htmlFor="regularPrice"
              className="new-listing__form-group--label"
            >
              regular price (kshs)
            </label>
            <input
              type="number"
              id="regularPrice"
              className="new-listing__form-group--text-input"
              placeholder="regular price"
              onChange={handleChange}
              value={formData.regularPrice}
            />
          </div>
          {formData.offer === true && (
            <div className="new-listing__form-group">
              <label
                htmlFor="discountedPrice"
                className="new-listing__form-group--label"
              >
                discounted price (kshs)
              </label>
              <input
                type="number"
                id="discountedPrice"
                className="new-listing__form-group--text-input"
                placeholder="discounted price"
                onChange={handleChange}
                value={formData.discountedPrice}
              />
            </div>
          )}
        </div>

        <div className="new-listing__form-group--flex">
          <div className="new-listing__form-group">
            <label htmlFor="beds" className="new-listing__form-group--label">
              number of bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              className="new-listing__form-group--text-input"
              placeholder="number of bedrooms"
              onChange={handleChange}
              value={formData.bedrooms}
            />
          </div>

          <div className="new-listing__form-group">
            <label htmlFor="baths" className="new-listing__form-group--label">
              number of bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              className="new-listing__form-group--text-input"
              placeholder="number of bathrooms"
              onChange={handleChange}
              value={formData.bathrooms}
            />
          </div>
        </div>

        <div className="new-listing__form-group--flex mb-fix">
          <div className="checkbox-group">
            <label htmlFor="wifi">wifi</label>
            <input
              type="checkbox"
              id="wifi"
              onChange={handleChange}
              checked={formData.wifi === true}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="parking">parking</label>
            <input
              type="checkbox"
              id="parking"
              onChange={handleChange}
              checked={formData.parking === true}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="swimmingPool">swimming pool</label>
            <input
              type="checkbox"
              id="swimmingPool"
              onChange={handleChange}
              checked={formData.swimmingPool === true}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="furnished">furnished</label>
            <input
              type="checkbox"
              id="furnished"
              onChange={handleChange}
              checked={formData.furnished === true}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="gym">gym</label>
            <input
              type="checkbox"
              id="gym"
              onChange={handleChange}
              checked={formData.gym === true}
            />
          </div>
        </div>
        <div className="new-listing__form-group">
          <p>
            Upload Images, the first image will be used as cover photo for your
            listing
          </p>
          <div className="image-upload">
            <input
              type="file"
              name=""
              id=""
              className="image-upload-input"
              accept="image/*"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
            <button
              className="upload-listing-images-btn"
              onClick={handleUploadImages}
              disabled={
                uploadingImages ||
                (user && user.userType === "demo-user") ||
                creatingListing
              }
            >
              {uploadingImages ? "Uploading images, please wait..." : "upload"}
            </button>
          </div>
        </div>
        {imgUrls && (
          <div className="images_preview">
            {imgUrls.map((img, i) => (
              <img src={img} key={i} width="300" height="300" />
            ))}
          </div>
        )}
        {user && user.userType === "demo-user" && (
          <p>Please create an account to unlock all features</p>
        )}
        {user && user.userType === "demo-user" ? (
          <p>
            We do not allow demo users to create a listing, please sign up for
            an account to unlock all features
          </p>
        ) : (
          <button
            className="btn-create-listing"
            disabled={
              uploadingImages ||
              (user && user.userType === "demo-user") ||
              creatingListing
            }
          >
            create listing
          </button>
        )}
        {
          createListingError && <p>{createListingError}</p>
        }
      </form>
    </div>
  );
}

export default NewListing;
