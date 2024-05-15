import React, { useState } from "react";
import PostStatus from "./common/PostUpdate";
import Feeding from "./common/Feed";
import "../Sass/HomeComponent.scss";
export default function FeedConponent({ currentUser, fromRegistration }) {

  return (
    <div className="home-component">

    <Feeding currentUser={currentUser} />
    </div>

  );
}
