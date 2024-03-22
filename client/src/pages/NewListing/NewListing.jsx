import React from "react";
import "./new-listing.css";

function NewListing() {
  return (
    <div className="new-listing">
      <h2 className="create-listing-title">Create a listing</h2>
      <form className="new-listing__form">
        <div className="new-listing__form-group">
          <label htmlFor="title" className="new-listing__form-group--label">
            title
          </label>
          <input
            type="text"
            id="title"
            className="new-listing__form-group--text-input"
            placeholder="title"
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
            />
          </div>
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
            />
          </div>
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
            />
          </div>
        </div>

        <div className="new-listing__form-group--flex">
          <div className="new-listing__form-group">
            <label htmlFor="beds" className="new-listing__form-group--label">
              number of bedrooms
            </label>
            <input
              type="number"
              id="beds"
              className="new-listing__form-group--text-input"
              placeholder="number of bedrooms"
            />
          </div>

          <div className="new-listing__form-group">
            <label htmlFor="baths" className="new-listing__form-group--label">
              number of bathrooms
            </label>
            <input
              type="number"
              id="baths"
              className="new-listing__form-group--text-input"
              placeholder="number of bathrooms"
            />
          </div>
        </div>

        <div className="new-listing__form-group--flex mb-fix">
          <div className="checkbox-group">
            <label htmlFor="wifi">wifi</label>
            <input type="checkbox" id="wifi" />
          </div>
          <div className="checkbox-group">
            <label htmlFor="parking">parking</label>
            <input type="checkbox" id="parking" />
          </div>
          <div className="checkbox-group">
            <label htmlFor="swimmingPool">swimming pool</label>
            <input type="checkbox" id="swimmingPool" />
          </div>
          <div className="checkbox-group">
            <label htmlFor="furnished">furnished</label>
            <input type="checkbox" id="furnished" />
          </div>
          <div className="checkbox-group">
            <label htmlFor="gym">gym</label>
            <input type="checkbox" id="gym" />
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
            />
            <button className="upload-listing-images-btn">upload</button>
          </div>
        </div>
        <button className="btn-create-listing">create listing</button>
      </form>
    </div>
  );
}

export default NewListing;
