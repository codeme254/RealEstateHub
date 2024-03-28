import React from "react";
import { Link } from "react-router-dom";
import { FaBed } from "react-icons/fa6";
import { FaShower } from "react-icons/fa";

function SingleListing({
  id,
  coverPhoto,
  title,
  description,
  bedrooms,
  bathrooms,
  regularPrice,
}) {
  return (
    <div className="listing" to={`/listing/${id}`}>
      <div className="listing__image">
        <img src={coverPhoto} alt={`${title} cover photo`} />
      </div>
      <div className="listing__details">
        <h2 className="listing__details--title">{title}</h2>
        <p className="listing__details--description">{description}</p>
        <div className="listing__bottom">
          <div className="listing__meta">
            <div className="listing__meta-bedroom-bathroom">
              <div className="listing__meta--element">
                <FaBed />
                <p>{bedrooms} Bedrooms</p>
              </div>
              <div className="listing__meta--element">
                <FaShower />
                <p>{bathrooms} Bathrooms</p>
              </div>
            </div>
            <Link
              to={`/listing/${id}`}
              className="listing__meta-learn-more-btn"
            >
              Learn More
            </Link>
          </div>
          <h2 className="listing__price">
            <span className="listing__price--currency">ksh</span>{" "}
            <span className="listing__price--value">{regularPrice}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SingleListing;
