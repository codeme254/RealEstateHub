import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogoGoogle } from "react-icons/io5";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { randomId } from "../../../utils/randomId";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuthentication = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const fullNameArr = result.user.displayName.split(" ");
      const firstName = fullNameArr[0];
      const lastName = fullNameArr[1];
      const username = fullNameArr[1] + randomId();
      const emailAddress = result.user.email;
      const profilePictureUrl = result.user.photoURL;

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          emailAddress,
          profilePictureUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess(data.data));
        navigate("/profile");
      } else {
        alert(
          "There was an error signing you in with google, please try again",
        );
      }
    } catch (error) {
      console.log("Could not sign up with google");
      alert("There was an error signing you in with google, please try again");
    }
  };
  return (
    <button
      className="form__group--btn"
      type="button"
      onClick={handleGoogleAuthentication}
    >
      <IoLogoGoogle />
      continue with google
    </button>
  );
}

export default OAuth;
