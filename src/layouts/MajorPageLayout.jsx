import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MajorPage from "../Pages/MajorPage";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";

export default function MajorPageLayout() {
  const [currentUser, setCurrentUser] = useState({});
  const { major } = useParams(); // Access the major parameter from the URL

  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <MajorPage currentUser={currentUser} major={major} /> 
    </div>
  );
}
