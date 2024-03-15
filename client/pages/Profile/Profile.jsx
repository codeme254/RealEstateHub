import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <h3>Howdy {user.username}, welcome to your profile</h3>
    </div>
  );
}

export default Profile;
