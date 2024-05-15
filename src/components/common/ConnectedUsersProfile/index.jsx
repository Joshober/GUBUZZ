import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from "../../../api/FirestoreAPI";

export default function ConnectedUsersPFBTN({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id, setIsConnected]);

  return (
    <>
      {!isConnected && (
        <div className="grid-child">
          <p className="name">{user.name}</p>
          <button onClick={() => getCurrentUser(user.id)}>
            <AiOutlineUsergroupAdd size={20} />
            Connect
          </button>
        </div>
      )}
    </>
  );
}
