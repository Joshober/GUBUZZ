import React, { useState, useEffect } from "react";
import { getTodaysEvents, GetEventPost, getCurrentUser, getAllEventsUsers, deletePost } from "../../../api/FirestoreAPI";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import "./index.scss";
import PostsSection from "../../common/PostsSection";
import PostCardGrid from "../../common/PostCardGrid";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [todaysPost, setTodaysPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getTodaysEvents(setTodaysPost);
      await GetEventPost(setPosts);
      await getCurrentUser(setCurrentUser);
      await getAllEventsUsers(setAllUsers);
    };
    fetchData();
  }, []);

  const handleImageClick = () => {
    setImageModal(true);
  };

  return (
    <div>
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Recent Events</h2>
    </div>
    <PostCardGrid
      todaysPost={todaysPost}
      allUsers={allUsers}
      handleImageClick={handleImageClick}
      currentUser={currentUser}
    />
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Future Events</h2>
    </div>
    <div className="todays-posts-container">
      <div className="post-grid">
          <PostsSection
            posts={posts}
            allUsers={allUsers}
            navigate={navigate}
            handleImageClick={handleImageClick}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}
