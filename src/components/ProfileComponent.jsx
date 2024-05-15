import React, { useState } from "react";
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "./common/ProfileEdit";
import ConnectedUsersPFBTN from "./common/ConnectedUsersProfile"; // Adjusted import path

export default function ProfileComponent({ currentUser,  profileuser }) {
  const [isEdit, setIsEdit] = useState();
  const onEdit = () => {
    setIsEdit(!isEdit);
  };

 
  // const getCurrentUser = (id) => {
  //   addConnection(currentUser.id, id);
  // };
  return (
 
    <div>
      <ProfileCard
        currentUser={currentUser}
        onEdit={onEdit}
        edit={isEdit}
        profileuser={profileuser}
      />
      
      {(isEdit || currentUser.userID === profileuser) && (
        <ProfileEdit onEdit={onEdit} profileuser={profileuser} currentUser={currentUser} />
      )}
    </div>
    
  );
}
