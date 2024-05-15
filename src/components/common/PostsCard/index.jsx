import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  deletePost,
  getConnections,
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";
import PostsSection from "../PostsSection";

export default function PostsCard({ post, user, getEditData, currentUser }) {
  let navigate = useNavigate();
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleImageClick = () => {
    setImageModal(true);
  };
  const handleDeletePost = () => {
    // Implement delete functionality here
    deletePost(post?.id); // Optional chaining added here
  };

  useEffect(() => {
    getConnections(currentUser?.id, user?.id, setIsConnected); // Optional chaining added here
  }, [currentUser?.id, user?.id]); // Optional chaining added here

  return (isConnected || (currentUser && user && currentUser.id === user.id)) ? (
    <div className="posts-card" key={post?.id}>
      <div className="post-image-wrapper">
        <div onClick={() =>
          navigate("/profile", {
            state: { id: post?.userID, email: post?.userEmail }, // Optional chaining added here
          })
        } style={{ display: 'flex', alignItems: 'center' }}>
          <img
            alt={post?.userID}
            className="profile-image"
            src={user?.imageLink}
            width="60px"
            height="60px"
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: "10px" }}>
            <p className="name">{user?.name}</p>
            <p className="timestamp" style={{ marginLeft: "0", marginTop: "5px" }}>{post?.timeStamp}</p> {/* Optional chaining added here */}
          </div>

        </div>
        {currentUser.userID === post?.userID && ( // Optional chaining added here
          <button className="delete-button" onClick={handleDeletePost}>
            <BsTrash />
          </button>
        )}
      </div>

      {!post?.postImage && ( // Optional chaining added here
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ paddingBottom: "10px", margin: '10px', fontSize: '24px', textAlign: "center", fontWeight: 'bold' }}>{post?.title}</h2> {/* Optional chaining added here */}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {post?.postimage && !post?.postimage.includes("https://cdn.prestosports.com/action/cdn/logos/rpi/NAIA707/") && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: "150px", width: "166px", display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <img
                  alt={post?.userID}
                  className="profile-image"
                  src={post?.postimage}
                />
                <div style={{ height: "50px", textAlign: "center" , fontWeight: 'bold' }}>{post?.opponent}</div>
              </div>
            </div>
            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '30px', marginRight: '30px', }}>VS</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ height: "150px", width: "166px", display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <img
                  alt={post?.userID}
                  className="profile-image"
                  src={post?.selfimage}
                />
                <div style={{ height: "50px", textAlign: "center" , fontWeight: 'bold'}}>Graceland</div>
              </div>
            </div>
          </>
        )}
      </div>

      {post?.postImage && (
        <div className="image-container">
          <img
            onClick={handleImageClick}
            src={post?.postImage}
            className="post-image"
            style={{ padding: '10px', maxWidth: 'calc(100% - 40px)', maxHeight: 'calc(100% - 40px)' }}
            alt="post-image"
          />
        </div>
      )}
      
      <div style={{ marginRight: '30px', marginLeft: '30px', marginTop: '0px' }}>
        <p className="status" style={{textAlign: "center", margin: '0', fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.5', color: '#333', maxWidth: '100%', overflowWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: post?.status }}></p> {/* Optional chaining added here */}
      </div>

      {post?.relaselink && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href={post?.relaselink} target="_blank" rel="noopener noreferrer" className="live-stats-button">
            Live Stats
          </a>
        </div>
      )}
      <LikeButton
        userId={currentUser?.id}
        postId={post?.postID}
        currentUser={currentUser}
      />
    </div>
  ) : (
    <></>
  );
}
