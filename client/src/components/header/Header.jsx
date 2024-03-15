import React, { useState, useRef } from "react";
import "./header.css";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { logout } from "../../redux/user";
import defaultImgForDemoUser from "../../assets/default-img-for-demo-users.jpg";
// import sampleUserImg from "../../assets/sample-user-img.jpg";

function Header() {
  const [revealNav, setRevealNav] = useState(false);
  const navRef = useRef(null);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleRevealNav = (e) => {
    e.preventDefault();
    setRevealNav(!revealNav);
    if (revealNav) {
      navRef.current.classList.add("header__nav--reveal");
    } else {
      navRef.current.classList.remove("header__nav--reveal");
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
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
            <Link to="/listing">listing</Link>
          </li>
          {user && (
            <li className="header__nav-item">
              <Link to="/new-listing">create listing</Link>
            </li>
          )}
          <li className="header__nav-item">
            {user ? (
              <Link to="/" onClick={handleSignOut}>
                sign out
              </Link>
            ) : (
              <Link to="/sign-in">sign in</Link>
            )}
          </li>
          {user && (
            <li className="header__nav-item">
              <Link to="/profile" className="user__avatar-name">
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    className="user__avatar-name--avatar"
                  />
                ) : user.userType == "demo-user" ? (
                  <img
                    src={defaultImgForDemoUser}
                    alt="avatar"
                    className="user__avatar-name--avatar"
                  />
                ) : (
                  <RxAvatar />
                )}
                <p className="user__avatar-name--name">
                  {user.userType == "demo-user" ? user.lastName : user.username}
                </p>
              </Link>
            </li>
          )}
        </ol>
      </nav>
    </header>
  );
}

export default Header;
