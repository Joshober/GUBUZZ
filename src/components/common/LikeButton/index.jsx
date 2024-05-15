import React, { useMemo, useState } from "react";
import {
  likePost,
  getLikesByUser,
  postComment,
  getComments,
  deletePostwithPostID,
  getAllUsers,
  deleteComment,
} from "../../../api/FirestoreAPI";
import { BsExclamationSquare } from "react-icons/bs";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function LikeButton({ userId, postId, currentUser }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getLikesByUser(userId, postId, setLiked, setLikesCount);
    getComments(postId, setComments);
    getAllUsers(setAllUsers);

  }, [userId, postId]);

  const handleLike = () => {
    likePost(userId, postId, liked);
  };

  const deleteCommentById = (id) => {
    deleteComment(id);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postComment(postId, comment, getCurrentTimeStamp("LLL"),  userId);
    setComment("");
  };

  const handleDeletePost = () => {
    deletePostwithPostID(postId);
  };
  
  return (
    <div className="like-container">
<p style={{ textAlign: "left" }}>{likesCount} People Like this Post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}
          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        <div className="likes-comment-inner" onClick={() => setShowCommentBox(!showCommentBox)}>
          <AiOutlineComment size={30} color={showCommentBox ? "#0a66c2" : "#212121"} />
          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
        <div className="likes-comment-inner" onClick={handleDeletePost} style={{ position: 'relative' }}>
          <BsExclamationSquare size={30}  />
          <p>Report Post</p>
        </div>
      </div>

      {showCommentBox && (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>
          {comments.length > 0 && comments.map((comment, index) => {
            const user = allUsers.find(user => user.id === comment.userID);
            return (
              <div key={index} className="all-comments">
                <div className="delete">
                  {comment.userID === currentUser.id && (
                    <MdDelete onClick={() => deleteCommentById(comment.id)} />
                  )}
                </div>
                <div className="profile">
                  {user && (
                    <img
                      src={user.imageLink}
                      className="post-image"
                      alt="post-image"
                    />
                  )}
                  <div className="text-container">
                    <p className="name">{user ? user.name : "Unknown User"}</p>
                    <p className="comment">{comment.comment}</p>
                  </div>
                </div>
                <p className="timestamp">{comment.timeStamp}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
