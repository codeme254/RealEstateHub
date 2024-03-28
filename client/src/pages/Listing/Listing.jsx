import React, { useEffect, useState } from "react";
import SingleListing from "./SingleListing";
import dummyCover from "../../assets/listing-dummy-img.jpg";
import "./listing.css";
import { limitText } from "../../../utils/limitText";

function Listing() {
  const [listings, setListings] = useState([]);
  const [errorFetchingListings, setErrorFetchingListings] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/all`);
        const data = await response.json();
        console.log(data);
        if (data.success === true) {
          setListings(data.data);
        } else {
          setErrorFetchingListings(true);
        }
      } catch (e) {
        setErrorFetchingListings(true);
      }
      setLoading(false);
    };
    fetchListings();
  }, []);
  return (
    <div className="listings">
      {/* <SingleListing
        id="sldfjsldkfjlkfjs"
        coverPhoto={dummyCover}
        title="zaph suites premier"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus explicabo itaque aliquam, totam voluptate! Excepturi aliquam quas minus, qui laboriosam non explicabo suscipit rerum itaque, soluta quis autem neque dignissimos saepe consequatur hic unde. Rem unde assumenda ut eum."
        bedrooms={3}
        bathrooms={3}
        regularPrice={25000}
      /> */}
      {loading && <h2>Loading...</h2>}
      {errorFetchingListings ? (
        <h2>
          There was an error fetching listings, please try refreshing this page.
        </h2>
      ) : listings.length <= 0 ? (
        <h2>No listings found at the moment</h2>
      ) : (
        listings.map((listing, idx) => (
          <SingleListing
            key={idx}
            id={listing._id}
            coverPhoto={listing.imgUrls[0]}
            title={listing.title}
            description={limitText(listing.description, 30)}
            bathrooms={listing.bathrooms}
            bedrooms={listing.bedrooms}
            regularPrice={listing.regularPrice}
          />
        ))
      )}
    </div>
  );
}
export default Listing;
