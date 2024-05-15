import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Profile from "../Pages/Profile";
import { useParams } from "react-router-dom";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});
  const { profileuser } = useParams(); // Access the major parameter from the URL

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Profile profileuser= {profileuser} currentUser={currentUser} />
    </div>
  );
}
