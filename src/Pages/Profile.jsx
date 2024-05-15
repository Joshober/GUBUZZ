import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

export default function Profile({ currentUser, profileuser }) {
  const [loading, setLoading] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? <Loader /> : <ProfileComponent profileuser= {profileuser} currentUser={currentUser} />;
}
