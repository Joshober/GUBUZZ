import React from 'react';
import "./index.scss";
import LikeButton from "../LikeButton";

function PostsSection({ posts, allUsers, navigate, handleImageClick, currentUser }) {
  return (
    <div className="post-status-main" style={{ display: 'flex', justifyContent: 'center' }}>
      <div class="container">

        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          {/* Content goes here */}
          {posts.map((post) => {
            const user = allUsers.find((user) => user.userID == post.userID);
            return (
              <div className="posts-card" key={post.id}>
                <div className="post-image-wrapper">
                  <div onClick={() =>
                    navigate(`/profile/${post.userID}`, {
                    })
                  } style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      alt={post.userID}
                      className="profile-image"
                      src={user?.imageLink}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p className="name">{user?.name}</p>
                      <p className="timestamp">{post.timeStamp}</p>
                    </div>

                  </div>
                  <p className="headline">{user?.headline}</p>
                  {console.log(post.pubDate)}
                  <div>
                  </div>
                  <div>
                    <p
                      className="name"
                      onClick={() =>
                        navigate(`/profile/${post.userID}`, {
                          state: { id: post?.userID, email: post.userEmail },
                        })
                      }
                    >
                    </p>
                    <p className="headline">{user?.headline}</p>
                    {/* <p className="timestamp">{post.timeStamp}</p> */}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!post.postimage && (
                    <h2 style={{ margin: '10px', fontSize: '24px', textAlign: "center", fontWeight: 'bold' }}>{post.title}</h2>
                  )}</div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                  {post.postimage && !post.postimage.includes("https://cdn.prestosports.com/action/cdn/logos/rpi/NAIA707/") && (
                    <>
                      <div style={{ textAlign: "center" }}>
                        <img
                          alt={post.userID}
                          className="profile-image"
                          src={post.postimage}
                        />
                        <p style={{fontWeight: 'bold'}} >{post.opponent}</p>
                      </div>
                      <span style={{ marginLeft: '30px', marginRight: '30px', fontWeight: 'bold'}}>VS</span>
                      <div style={{ textAlign: "center" }}>
                        <img
                          alt={post.userID}
                          className="profile-image"
                          src={post.selfimage}
                        />
                        <p style={{fontWeight: 'bold'}}>Graceland</p>
                      </div>

                    </>
                  )}

                </div>
                {post.postImage && (
                  <img
                    onClick={handleImageClick}
                    src={post.postImage}
                    className="post-image"
                    alt="post-image"
                  />
                )}

                <p className="status" style={{ margin: ' 20px', textAlign: "center" }} dangerouslySetInnerHTML={{ __html: post.status }}></p>

                {post.relaselink && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href={post.relaselink} target="_blank" rel="noopener noreferrer" className="live-stats-button">
                      Live Stats
                    </a>

                  </div>
                )}
                {post.link && !post.relaselink && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="live-stats-button">
                      Learn More
                    </a>

                  </div>
                )}
                <LikeButton
                  userId={currentUser?.id}
                  postId={post.postID}
                  currentUser={currentUser}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostsSection;