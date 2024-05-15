import React, { useMemo, useState } from "react";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Feed from "../Pages/Feed";

export default function FeedLayout() {
  const [currentUser, setCurrentUser] =useState([]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Feed />
    </div>
  );
}
