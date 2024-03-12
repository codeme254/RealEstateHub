import React, { useState, useRef } from "react";
import "./header.css";
import { IoIosMenu } from "react-icons/io";

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
            <a href="">Home</a>
          </li>
          <li className="header__nav-item">
            <a href="">about</a>
          </li>
          <li className="header__nav-item">
            <a href="">sign in</a>
          </li>
        </ol>
      </nav>
    </header>
  );
}

export default Header;
