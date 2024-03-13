import React, { useState, useRef } from "react";
import "./header.css";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

function Header() {
  const [revealNav, setRevealNav] = useState(false);
  const navRef = useRef(null);

  const handleRevealNav = (e) => {
    e.preventDefault();
    setRevealNav(!revealNav);
    if (revealNav) {
      navRef.current.classList.add("header__nav--reveal");
    } else {
      navRef.current.classList.remove("header__nav--reveal");
    }
  };
  return (
    <header className="header">
      <h1 className="header__logo">
        <span className="header__logo--left">RealEstate</span>
        <span className="header__logo--right">Hub</span>
      </h1>
      <button onClick={handleRevealNav} className="header-nav-toggle__btn">
        <IoIosMenu />
      </button>
      <nav className="header__nav" ref={navRef}>
        <ol className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/about">about</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/sign-in">sign in</Link>
          </li>
        </ol>
      </nav>
    </header>
  );
}

export default Header;
