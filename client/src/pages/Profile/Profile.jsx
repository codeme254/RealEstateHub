import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FaRegPenToSquare } from "react-icons/fa6";
import { updateUser, logout } from "../../../src/redux/user";
import { randomId } from "../../../utils/randomId";
import "./profile.css";

function Profile() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false);
  const [uploadAvatarError, setUploadAvatarError] = useState(null);
  const [updatingUserInfo, setUpdatingUserInfo] = useState(false);
  const [updateUserInfoError, setUpdateUserInfoError] = useState(null);
  const [deletingUser, setDeletingUser] = useState(false);

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleProfileImageChange = (e) => {
    e.preventDefault();
    setNewProfileImage(e.target.files[0]);
    // console.log(randomId())
  };

  const handleChangeProfileImage = async (e) => {
    if (newProfileImage == null) {
      setUploadAvatarError("Please choose a new image");
      setUploadingProfileImage(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", newProfileImage),
      formData.append("upload_preset", "RealEstateHub");
    try {
      setUploadingProfileImage(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dz1yrbnpy/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (user) {
        // user.profilePictureUrl = data.secure_url;
        // send the profile image update to the backend and the data that comes back is now going to be the user data
        const response = await fetch(`/api/user/update/${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePictureUrl: data.secure_url }),
        });
        const response_data = await response.json();
        if (response_data.success === true) {
          dispatch(updateUser(response_data.data));
        } else {
          setUploadAvatarError(
            "There was an error uploading your profile photo. Please try again",
          );
        }
      }
      setUploadingProfileImage(false);
    } catch (e) {
      setUploadAvatarError(
        "There was an error uploading your avatar. Please try again.",
      );
      console.log(e);
      setUploadingProfileImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      setUpdateUserInfoError("Please update your information and try again.");
      return;
    }
    try {
      setUpdatingUserInfo(true);
      const response = await fetch(`/api/user/update/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (data.success) {
        dispatch(updateUser(data.data));
      } else {
        setUpdateUserInfoError(
          "There was a problem updating your information. Please Try again.",
        );
      }
      setUpdatingUserInfo(false);
    } catch (e) {
      setUpdatingUserInfo(false);
      setUpdateUserInfoError(
        "There was a problem updating your information. Please Try again",
      );
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeletingUser(true);
    try {
      const response = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success == true) {
        dispatch(logout());
        navigate("/sign-in");
      } else {
        alert("There was an error deleting your account, please try again");
      }
      setDeletingUser(false);
    } catch (e) {
      console.log(
        "There was an error deleting your account. Please try again.",
      );
      setDeletingUser(false);
    }
  };

  return (
    <div className="profile">
      {user && (
        <h3 className="profile__welcome">
          Hey{" "}
          {user.userType == "demo-user"
            ? `${user.lastName}`
            : `${user.username}`}
          , welcome to your profile
        </h3>
      )}
      {user && user.userType == "demo-user" ? (
        <p className="demo-user-info">
          Hey{" "}
          <span className="demo-user-info__bold">
            {`${user.firstName} ${user.lastName}, `}{" "}
          </span>
          as a demo user, you cannot update your account, feel free to explore
          RealEstateHub though with limited functionalities. Create an account
          to unlock full access.
        </p>
      ) : (
        ""
      )}
      <div className="profile__image">
        {user && user.profilePictureUrl ? (
          <img
            src={newProfileImage ? newProfileImage : user.profilePictureUrl}
            className="profile__image--avatar"
          />
        ) : newProfileImage ? (
          <img
            src={newProfileImage}
            alt=""
            className="profile__image--avatar"
          />
        ) : (
          <RxAvatar />
        )}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleProfileImageChange}
        />
        <button
          className="btn-image-change"
          onClick={() => fileRef.current.click()}
        >
          <span>
            <FaRegPenToSquare />
          </span>{" "}
          <span>new profile image</span>
        </button>
        <div>
          <button
            className="update-avatar-btn"
            onClick={handleChangeProfileImage}
            disabled={uploadingProfileImage}
          >
            {uploadingProfileImage ? "Please wait..." : "Update Profile Image"}
          </button>
          <p>{uploadAvatarError && uploadAvatarError}</p>
        </div>
      </div>
      <div className="profile__body-wrapper">
        <div className="profile__form-cover">
          {user && (
            <form className="profile__form" onSubmit={handleSubmit}>
              <div className="profile__form-group">
                <label htmlFor="firstName">first name</label>
                <input
                  type="text"
                  id="firstName"
                  defaultValue={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="profile__form-group">
                <label htmlFor="lastName">last name</label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue={user.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="profile__form-group">
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  id="username"
                  defaultValue={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="profile__form-group">
                <label htmlFor="emailAddress">email</label>
                <input
                  type="email"
                  id="emailAddress"
                  defaultValue={user.emailAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="profile__form-group">
                <label htmlFor="password">password</label>
                <input type="password" id="password" onChange={handleChange} />
              </div>
              <div className="form__controls">
                <button
                  className="form__controls--btn"
                  disabled={
                    user.userType == "demo-user" ||
                    updatingUserInfo ||
                    deletingUser
                  }
                >
                  Update account
                </button>
                <button
                  className="form__controls--btn btn-delete"
                  disabled={updatingUserInfo || deletingUser}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
              <p>{updateUserInfoError && updateUserInfoError}</p>
            </form>
          )}
        </div>
        <div className="profile__listing">
          {user && (
            <p>
              {user && user.userType == "demo-user"
                ? `${user.lastName}, `
                : `${user.username}, `}
              you have not created or saved any listings yet, once you create or
              save a listing, you will be able to see it here
            </p>
          )}
          <div className="profile__listing--explore">
            <Link className="profile__listing--new-btn" to="/new-listing">
              Create Listing
            </Link>
            <Link className="profile__listing--new-btn" to="/listing">
              explore listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
