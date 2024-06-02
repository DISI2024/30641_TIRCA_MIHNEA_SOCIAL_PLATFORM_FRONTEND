import React from 'react';
import '../styles/Post.css';

const Post = ({ post }) => {
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <span className="name">{post.name}</span>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    {post.img && <img src={`data:image/jpeg;base64,${post.img}`} alt="" />}
                </div>
            </div>
        </div>
    );
};

export default Post;
