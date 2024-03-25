import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import { FaSquareParking } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import { MdChair } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { FaBed } from "react-icons/fa6";
import { FaShower } from "react-icons/fa";
import calculateDiscount from "../../../utils/calculateDiscount";
import "./single-listing.css";

function SingleListing() {
  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const params = useParams();
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listing/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setListing(data.data);
        }
      } catch (e) {
        alert(
          "Could not fetch this listing, please refresh the page to try again",
        );
      }
    };
    fetchData();
  }, [params.id]);
  return (
    <div>
      {listing ? (
        <div className="single-listing">
          <div className="listing__hero">
            <img src={listing.imgUrls[activeImage]} alt="listing cover photo" />
            {listing.offer === true ? (
              <div className="offer-component">
                <div className="was">
                  <p>Was</p>
                  <h3>{listing.regularPrice}</h3>
                </div>
                <div className="current">
                  <p>Now</p>
                  <h3>{listing.discountedPrice}</h3>
                </div>
                <div>
                  <p>Off</p>
                  <h3>
                    {calculateDiscount(
                      listing.regularPrice,
                      listing.discountedPrice,
                    )}
                    %
                  </h3>
                </div>
              </div>
            ) : (
              <div className="single-listing__regular-price">
                <h4>
                  Ksh. {listing.regularPrice}{" "}
                  {listing.type === "sale" ? "" : "/month"}
                </h4>
              </div>
            )}
          </div>
          <div className="listing__images-container">
            <h6>Click on any of the images to view full</h6>
            <div className="listing__images">
              {listing.imgUrls.map((image, i) => (
                <img src={image} key={i} onClick={() => setActiveImage(i)} />
              ))}
            </div>
          </div>
          <div className="single-listing__title-address">
            <h2 className="single-listing__title">{listing.title}</h2>
            <div className="flex-element_icon">
              <FaLocationDot />
              <h3 className="single-listing__address">{listing.address}</h3>
            </div>
          </div>
          <div className="single-listing__amenities">
            {listing.wifi && (
              <div className="single-listing-amenity__flex">
                <IoIosWifi /> <p>Wifi</p>
              </div>
            )}
            {listing.furnished && (
              <div className="single-listing-amenity__flex">
                <MdChair /> <p>furnished</p>
              </div>
            )}
            {listing.gym && (
              <div className="single-listing-amenity__flex">
                <CgGym /> <p>gym</p>
              </div>
            )}
            {listing.swimmingPool && (
              <div className="single-listing-amenity__flex">
                <MdPool /> <p>swimming pool</p>
              </div>
            )}
            {listing.parking && (
              <div className="single-listing-amenity__flex">
                <FaSquareParking /> <p>parking</p>
              </div>
            )}
          </div>
          <div className="bedrooms__bathrooms">
            {listing.bedrooms > 0 ? (
              <div className="single-listing-amenity__flex">
                <FaBed />
                <p>{listing.bedrooms} Bedrooms</p>
              </div>
            ) : (
              <div className="single-listing-amenity__flex">
                <FaBed />
                <p>No Bedrooms</p>
              </div>
            )}
            {listing.bathrooms > 0 ? (
              <div className="single-listing-amenity__flex">
                <FaShower />
                <p>{listing.bathrooms} bathrooms</p>
              </div>
            ) : (
              <div className="single-listing-amenity__flex">
                <FaShower />
                <p>No bathrooms</p>
              </div>
            )}
          </div>
          <div className="single-listing__body">
            <div className="single-listing__body--left">
              <p>{listing.description}</p>
            </div>
            <div className="single-listing__body--right">
              {user && user._id === listing.userRef._id ? (
                <div>
                  <p className="u-mb-md">You own this Listing!</p>
                  <Link className="single-listing__action-btn">
                    Update Listing
                  </Link>
                  <Link className="single-listing__action-btn btn-delete">
                    Delete Listing
                  </Link>
                </div>
              ) : (
                <form>
                  <div className="listing-owner">
                    <img
                      src={listing.userRef.profilePictureUrl}
                      alt="listing owner profile photo"
                    />
                    <p>Listing posted by {listing.userRef.username}</p>
                  </div>
                  <input
                    type="text"
                    id="subject"
                    placeholder="subject"
                    className="listing-contact__text-input"
                  />
                  <textarea
                    name=""
                    id=""
                    className="single-listing__message-box"
                    placeholder="message"
                  ></textarea>
                  {user && user.userType === "demo-user" ? (
                    <p className="font-sm">
                      As a demo user, we can't allow you to send enquiry to the
                      owner of this listing, please create an acccount to unlock
                      full access
                    </p>
                  ) : (
                    <button className="single-listing__contact-button">
                      Contact {listing.userRef.username}
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h2>listing not found</h2>
      )}
    </div>
  );
}

export default SingleListing;
