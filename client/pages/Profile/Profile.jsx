import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user]);
  return (
    <div>{user && <h3>Howdy {user.username}, welcome to your profile</h3>}</div>
  );
}

export default Profile;
