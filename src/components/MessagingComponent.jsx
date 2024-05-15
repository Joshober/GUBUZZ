import React, { useState } from "react";
import Messages from "./common/Messaging";
export default function MessagingComponent({ currentUser, fromRegistration }) {

  return (
    
<Messages  currentUser={currentUser}/>    
  );
}
