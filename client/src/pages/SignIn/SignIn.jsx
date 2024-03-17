import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../src/redux/user";
import OAuth from "../../../src/components/OAuth/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormData = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess(data.data));
        navigate("/profile");
      } else {
        console.log("no success, let's see the error");
        setError(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("There was an error signing you in");
      setLoading(false);
    }
  };
  return (
    <div className="sign-up">
      <h2 className="form-title">Sign In</h2>
      <div className="form__img-wrapper">
        <div className="image"></div>
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="form__group">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              required
              className="form__group--input"
              placeholder="email address"
              onChange={handleFormData}
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
              onChange={handleFormData}
            />
          </div>
          <div className="form__group--control">
            <button className="form__group--btn" disabled={loading}>
              {loading ? "Please wait..." : "sign in"}
            </button>
            <OAuth />
          </div>
          <p className="form__txt">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
          {error && <p className="form__txt">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
