import React, { useEffect } from "react";
import "./home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/profile");
  }, [user]);
  return (
    <div className="home">
      <div className="home__text-box">
        <h2 className="home__title">
          <span className="home__title--sub">Find your next</span>
          <span className="home__title--main">Dream Home</span>
        </h2>
        <Link to="/sign-in" className="hero__cta">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
