import Loader from "../components/common/Loader";
import Majoring from "../components/Majoring"; // Adjust the import statement
import React from "react";

export default function MajorPage({ currentUser, major }) {
  const loading = !major; // Determine loading state based on 'major' prop

  return loading ? (
    <Loader />
  ) : (
    <Majoring currentUser={currentUser} major={major} /> 
  );
}
