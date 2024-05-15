import LikeButton from "../LikeButton";
import React, { useState, useEffect } from "react";
import { deleteConnection, getConnections, addConnection } from "../../../api/FirestoreAPI";
import { useLocation } from "react-router-dom";
import "../../../Sass/ConnectionsComponent.scss";
import "./index.scss"
import { useNavigate } from "react-router-dom";

const PostCardGrid = ({ todaysPost, allUsers, handleImageClick, currentUser }) => {
  const location = useLocation();
  let navigate = useNavigate();


  return (
    <div className="post-card-grid">
      {todaysPost.map((post) => {
        let user = allUsers.find((user) => user.userID === post.userID);
        return (
          <div className="post-card" key={post.id}>
            <div className="post-content">
              <div className="post-header">
                <div onClick={() =>
                  navigate(`/profile/${post.userID}`, {
                  })
                } style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    alt={post.userID}
                    className="profile-image"
                    src={user?.imageLink}
                    onClick={() =>
                      navigate("/profile", {
                        state: { id: user?.userID, email: user.userEmail }
                      })}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p className="name" onClick={() =>
                      navigate("/profile", {
                        state: { id: user?.userID, email: user.userEmail }
                      })}>
                      {user?.name}</p>

                    <p className="timestamp">{post.timeStamp}</p>

                  </div>
                </div>
                <p className="headline">{user?.headline}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {!post.postimage && (
                  <h2 style={{ margin: '10px', fontSize: '24px', textAlign: "center", fontWeight: 'bold' }}>{post.title}</h2>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {post.postimage && !post.postimage.includes("https://cdn.prestosports.com/action/cdn/logos/rpi/NAIA707/") && (
                  <>
                    <div style={{ textAlign: "center" }}>
                      <img
                        alt={post.userID}
                        className="profile-image"
                        src={post.postimage}
                      />
                      <p>{post.opponent}</p>
                    </div>
                    <span style={{ margin: '30px' }}>VS</span>
                    <div style={{ textAlign: "center" }}>
                      <img
                        alt={post.userID}
                        className="profile-image"
                        src={post.selfimage}
                      />
                      <p>Graceland</p>
                    </div>

                  </>
                )}
              </div>
              <p className="status" style={{ margin: '20px', textAlign: "center" }} dangerouslySetInnerHTML={{ __html: post.status }}></p>
              {post.relaselink && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <a href={post.relaselink} target="_blank" rel="noopener noreferrer" className="live-stats-button">
                    Live Stats
                  </a>
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCardGrid;
