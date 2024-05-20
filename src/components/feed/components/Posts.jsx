import React from 'react';
import Post from "./Post";
import '../styles/Posts.css';

const Posts = ({ posts }) => {
    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default Posts;
