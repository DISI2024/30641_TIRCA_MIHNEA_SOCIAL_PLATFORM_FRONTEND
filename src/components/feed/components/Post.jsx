import React from 'react';
import '../styles/Post.css';

const Post = ({ post }) => {
    // Set a default profile picture URL
    const defaultProfilePictureURL = 'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg'; // Use a placeholder image URL

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img
                            src={post.userProfile.profilePictureURL || defaultProfilePictureURL}
                            alt={`${post.userProfile.firstName} ${post.userProfile.lastName}`}
                        />
                        <div className="details">
                            <span className="name">{`${post.userProfile.firstName} ${post.userProfile.lastName}`}</span>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    {post.image && <img src={`data:image/jpeg;base64,${post.image}`} alt="Post content" />}
                </div>
            </div>
        </div>
    );
};

export default Post;
