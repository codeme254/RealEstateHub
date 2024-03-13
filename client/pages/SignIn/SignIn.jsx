import React from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import { IoLogoGoogle } from "react-icons/io5";

function SignIn() {
  // firstName, lastName, username, emailAddress, password
  return (
    <div className="sign-up">
      <h2 className="form-title">Sign In</h2>
      <div className="form__img-wrapper">
        <div className="image"></div>
        <form className="sign-in-form">
          <div className="form__group">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              required
              className="form__group--input"
              placeholder="email address"
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
            <button className="form__group--btn">sign in</button>
            <button className="form__group--btn">
              {" "}
              <IoLogoGoogle />
              continue with google
            </button>
          </div>
          <p className="form__txt">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
