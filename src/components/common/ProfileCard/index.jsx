import React, { useState, useMemo, useEffect } from "react";
import { getSingleStatus, getSingleUserbyId, getSingleUser, deleteConnection, getConnections, addConnection, getConnectionCount, getRequestCount, getPostCount } from "../../../api/FirestoreAPI";
import PostsCard from "../PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload"; ``
import "./index.scss";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import "../../../Sass/ConnectionsComponent.scss";

export default function ProfileCard({  currentUser, profileuser,  edit, onEdit }) {
  const location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);
  const [connectionRequestsCount, setConnectionRequestsCount] = useState(0);

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.userID,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useEffect(() => {
    if (profileuser) {
      getConnectionCount(profileuser, setConnectionCount);
      getRequestCount(profileuser, setConnectionRequestsCount);
      getPostCount(profileuser, setPostCount);
      getSingleStatus(  setAllStatus, profileuser );

    }
    else if (currentUser.id){
      // console.log(currentUser)
      getConnectionCount(currentUser.id, setConnectionCount);
      getRequestCount(currentUser.id, setConnectionRequestsCount);
      getPostCount(currentUser.id, setPostCount);

    }
 
  }, [currentUser.id, profileuser]);

  useMemo(() => {
    if (profileuser) {
    }
    else if (currentUser.id){
      // console.log(currentUser)
      getSingleStatus(setAllStatus, currentUser.id);

    }
    if (profileuser) {
        getSingleUserbyId(setCurrentProfile, profileuser);
    }
    else if (currentUser.id){
      console.log(currentUser)
      getSingleUserbyId(setCurrentProfile, currentUser.id);

    }
  }, [profileuser]);
  const isCurrentUserProfile = profileuser === undefined || currentUser.id === profileuser;
  const handleConnect = () => {
    addConnection(currentUser.userID, profileuser);
  };

  const handleDisconnect = () => {
    deleteConnection(currentUser.id, profileuser);
  };
// console.log(isCurrentUserProfile)
  return (
    <>


      <div className="profile-card">
        {isCurrentUserProfile && (
          <div className="edit-btn">
            <HiOutlinePencil className="edit-icon" onClick={() => {
              onEdit();


            }} />
          </div>
        )}
        <div className="profile-info">
          <div className="profile-center">
          <div className="profile-info-container">
  <img
    className={isCurrentUserProfile ? "profile-image clickable" : "profile-image"}
    onClick={isCurrentUserProfile ? () => setModalOpen(true) : null}
    src={
      Object.values(currentProfile).length === 0
        ? currentUser.imageLink
        : currentProfile?.imageLink
    }
    alt="profile-image"
  />
  <h3 className="userName">
    {Object.values(currentProfile).length === 0
      ? currentUser.name
      : currentProfile?.name}
  </h3>
  <div className="button-container">
    {!isCurrentUserProfile && (
      <button onClick={isConnected ? handleDisconnect : handleConnect}>
        {isConnected ? "Following" : "Follow"}
      </button>
    )}
  </div>
</div>

            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
              (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )}

          </div>

          <div className="right-info">
            <div className="profile-profile-center">
            <div className="counter-block" style={{marginLeft:"40px", marginRight:"10px"}}>
                <p><strong>{postCount}</strong></p>
                <p>Posts</p>
              </div>
              <div className="counter-block" style={{marginLeft:"20px", marginRight:"0px"}}>
                <p><strong>{connectionCount}</strong></p>
                <p>Followers</p>
              </div>
              <div className="counter-block" style={{marginLeft:"20px", marginRight:"10px"}}>
                <p><strong>{connectionRequestsCount}</strong></p>
                <p>Following</p>
              </div>

            </div>
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
            {currentUser.website || currentProfile?.website ? (
              <a
                className="website"
                target="_blank"
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }
              >
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
         {currentUser.skills || (currentProfile && currentProfile.skills) ? (
  <p className="skills">
    <span className="skill-label">Skills</span>:&nbsp;
    {currentProfile && Object.values(currentProfile).length === 0
      ? currentUser.skills
      : currentProfile.skills}
  </p>
) : (
  <></>
)}

          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>


      </div>

      {allStatuses && !edit && (
        <div className="post-status-main">
          {allStatuses?.map((posts) => {

            return (
              <div key={posts.postID}>
                <PostsCard post={posts} currentUser={currentUser} user= {currentProfile} />

              </div>
            );
          })}
        </div>
      )}
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
    </>

  );
}
