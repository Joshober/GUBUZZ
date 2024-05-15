import React, { useEffect, useState } from "react";
import Home from "../Pages/Home";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";

export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = getCurrentUser(setCurrentUser);

    // Cleanup function to unsubscribe from snapshot listener
    return () => unsubscribe();
  }, []);
  
  return (
    <div>
      {currentUser === null ? (
        // Render loading state while waiting for currentUser
        <div>Loading...</div>
      ) : (
        <>
          <Topbar currentUser={currentUser} />
          <Home currentUser={currentUser} />
        </>
      )}
    </div>
  );
}
