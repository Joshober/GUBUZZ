import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import Button from "../Button";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  
  return (
    <div className="popup-card">
      <div className="profile-info">
      <img
  className="profile-image"
  src={currentUser?.imageLink}
  alt="Profile"
  style={{ width: "50px", height: "50px" }}
/>

        <div style={{marginLeft:"5px"}}>
        <p className="name">{currentUser?.name}</p>
        <p className="headline">{currentUser?.headline}</p>
        </div>
      </div>
      
      
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.userID,
            },
          })
        }
      />
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}
