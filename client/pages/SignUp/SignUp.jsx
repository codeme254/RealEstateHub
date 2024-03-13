import React from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { IoLogoGoogle } from "react-icons/io5";

function SignUp() {
  // firstName, lastName, username, emailAddress, password
  return (
    <div className="sign-up">
      <h2 className="form-title">Create an account</h2>
      <div className="form__img-wrapper">
        <div className="image-signup"></div>
        <form className="sign-up-form">
          <div className="form__group-flex">
            <div className="form__group">
              <label htmlFor="firstName">first name</label>
              <input
                type="text"
                required
                id="firstName"
                className="form__group--input"
                placeholder="your first name"
              />
            </div>
            <div className="form__group">
              <label htmlFor="lastName">last name</label>
              <input
                type="text"
                id="lastName"
                required
                className="form__group--input"
                placeholder="your last name"
              />
            </div>
          </div>
          <div className="form__group">
            <label htmlFor="username">preffered username</label>
            <input
              type="text"
              id="username"
              required
              className="form__group--input"
              placeholder="pick a username"
            />
          </div>
          <div className="form__group">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              required
              className="form__group--input"
              placeholder="your email address"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              required
              className="form__group--input"
              placeholder="password"
            />
          </div>
          <div className="form__group--control">
            <button className="form__group--btn">sign up</button>
            <button className="form__group--btn">
              {" "}
              <IoLogoGoogle />
              continue with google
            </button>
          </div>
          <p className="form__txt">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
