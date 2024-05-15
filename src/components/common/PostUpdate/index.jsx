import React, { useState, useMemo, useEffect } from "react";
import { postStatus, getAllUsers, getStatus, updatePost } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import "./index.scss";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.userID,
      postImage: postImage,
    };
    await postStatus(object);
    setModalOpen(false);
    setIsEdit(false);
    setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers(setAllUsers);
      getStatus(setAllStatus);
    };
    fetchData();
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser?.imageLink} alt="imageLink" />
        <p className="name">{currentUser?.name}</p>
        <p className="headline" style={{ marginTop: '2px', marginBottom: '4px' }}>{currentUser?.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div style={{marginRight:"270px", width: "550px"}}>
      {allStatuses.map((posts) => {
    const user = allUsers.find((user) => user.userID === posts.userID);
    // Check if user is defined before accessing its properties
    if (user) {
      return (
        <div key={posts.id} className="todays-posts-container">
          <div className="post-grid">
            <PostsCard post={posts} getEditData={getEditData} user={user} currentUser={currentUser} />
          </div>
        </div>
      );
    } else {
      return null; // Or you can render a placeholder component or message
    }
  })}
</div>

    </div>
  );
}
