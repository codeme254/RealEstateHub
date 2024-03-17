import React from "react";
import { IoLogoGoogle } from "react-icons/io5";

function OAuth() {
  const handleGoogleAuthentication = (e) => {
    e.preventDefault();
    try {
      //
    } catch (error) {
      console.log("Could not sign up with google");
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
