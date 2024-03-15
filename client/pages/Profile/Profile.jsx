import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user]);
  return (
    <div className="profile">
      {user && (
        <h3 className="profile__welcome">
          Howdy {user.username}, welcome to your profile
        </h3>
      )}
      <div className="profile__body-wrapper">
        <div className="profile__form-cover">
          <form className="profile__form">
            <div className="profile__form-group">
              <label htmlFor="firstName">first name</label>
              <input type="text" id="firstName" defaultValue={user.firstName} />
            </div>
            <div className="profile__form-group">
              <label htmlFor="lastName">last name</label>
              <input type="text" id="lastName" defaultValue={user.lastName} />
            </div>
            <div className="profile__form-group">
              <label htmlFor="username">username</label>
              <input type="text" id="username" defaultValue={user.username} />
            </div>
            <div className="profile__form-group">
              <label htmlFor="emailAddress">email</label>
              <input
                type="email"
                id="emailAddress"
                defaultValue={user.emailAddress}
              />
            </div>
            <div className="profile__form-group">
              <label htmlFor="password">password</label>
              <input type="password" id="password" />
            </div>
            <div className="form__controls">
              <button className="form__controls--btn">Update account</button>
              <button className="form__controls--btn">Sign out</button>
              <button className="form__controls--btn btn-delete">
                Delete Account
              </button>
            </div>
          </form>
        </div>
        <div className="profile__listing">
          <p>
            {user && `${user.username}, `}you have not created or saved any
            listings yet, once you create or save a listing, you will be able to
            see it here
          </p>
          <div className="profile__listing--explore">
            <Link className="profile__listing--new-btn" to="/new-listing">
              Create Listing
            </Link>
            <Link className="profile__listing--new-btn" to="/listing">
              explore listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
