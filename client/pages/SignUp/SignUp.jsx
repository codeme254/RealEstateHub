import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { IoLogoGoogle } from "react-icons/io5";
import axios from "axios";

function SignUp() {
  // firstName, lastName, username, emailAddress, password
  const [formData, setFormData] = useState({ userType: "normal-user" });
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success == false) {
        setSignUpError(data.message);
      } else {
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  return (
    <div className="sign-up">
      <h2 className="form-title">Create an account</h2>
      <div className="form__img-wrapper">
        <div className="image-signup"></div>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <div className="form__group-flex">
            <div className="form__group">
              <label htmlFor="firstName">first name</label>
              <input
                type="text"
                required
                id="firstName"
                className="form__group--input"
                placeholder="your first name"
                onChange={handleChange}
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
                onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>
          <div className="form__group--control">
            <button className="form__group--btn" disabled={loading}>
              {loading ? "please wait ..." : "sign up"}
            </button>
            <button className="form__group--btn" type="button">
              {" "}
              <IoLogoGoogle />
              continue with google
            </button>
            <button className="form__group--btn" type="button">
              Demo
            </button>
          </div>
          <p className="form__txt">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
          {signUpError && <p className="form__txt">{signUpError}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
