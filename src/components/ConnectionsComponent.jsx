import React, { useEffect, useState } from "react";
import { getAllUsers, addConnection } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";
import "../Sass/ConnectionsComponent.scss";

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  
  // Function to handle adding a connection
  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };

  useEffect(() => {
    // Fetch all users and filter them based on the 'public' field
    getAllUsers((allUsers) => {
      const publicUsers = allUsers.filter(user => user.isPublic); // Filter users with 'public' field set to true
      setUsers(publicUsers);
    });
  }, []);

  return users.length > 0 ? (
    <div className="connections-main">
      {users.map((user) => (
        <ConnectedUsers
          key={user.id}
          currentUser={currentUser}
          user={user}
          getCurrentUser={getCurrentUser}
        />
      ))}
    </div>
  ) : (
    <div className="connections-main">No Connections to Add!</div>
  );
}
