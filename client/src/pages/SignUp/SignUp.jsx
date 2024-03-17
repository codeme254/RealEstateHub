import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../src/redux/user";
import axios from "axios";
import OAuth from "../../../src/components/OAuth/OAuth";

function SignUp() {
  // firstName, lastName, username, emailAddress, password
  const [formData, setFormData] = useState({ userType: "normal-user" });
  const [loading, setLoading] = useState(false);
  const [creatingDemoUser, setCreatingDemoUser] = useState(false);
  const [signUpError, setSignUpError] = useState(null);
  const [demoError, setDemoError] = useState(null);
  const dispatch = useDispatch();
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

  const signUpDemo = async (e) => {
    e.preventDefault();
    try {
      setCreatingDemoUser(true);
      const response = await fetch("/api/auth/signup/demo", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success == true) {
        dispatch(loginSuccess(data.data));
        navigate("/profile");
      } else {
        setDemoError(
          "Something went wrong generating demo account, please try again",
        );
      }
      setCreatingDemoUser(false);
    } catch (e) {
      setDemoError(
        "Something went wrong generating demo account, please try again",
      );
      setCreatingDemoUser(false);
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
            <button
              className="form__group--btn"
              disabled={loading || creatingDemoUser}
            >
              {loading ? "please wait ..." : "sign up"}
            </button>
            <OAuth />
            <button
              className="form__group--btn"
              type="button"
              onClick={signUpDemo}
              disabled={creatingDemoUser}
            >
              {creatingDemoUser ? "Please wait..." : "Demo"}
            </button>
          </div>
          <p className="form__txt">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
          {signUpError && <p className="form__txt">{signUpError}</p>}
          {demoError && <p className="form__txt">{demoError}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
