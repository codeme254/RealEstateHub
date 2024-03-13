import React, { useState, useRef } from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
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
