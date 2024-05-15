import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from "../../../api/FirestoreAPI";

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);
  return isConnected ? (
    <></>
  ) : (
    <div className="grid-child">
      <img src={user.imageLink} style={{ marginBottom: "10px" }} />
      <p className="name" style={{ marginBottom: "10px" }}>{user.name}</p>
      <p className="headline" style={{ marginBottom: "10px" }}>{user.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Follow
      </button>
    </div>
  );
}
