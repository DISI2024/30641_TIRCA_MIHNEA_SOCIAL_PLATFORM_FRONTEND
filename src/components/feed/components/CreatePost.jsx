import React, { useState } from 'react';
import '../styles/CreatePost.css';

const CreatePost = ({ onPostCreate }) => {
    const [postContent, setPostContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postContent.trim() || image) {
            const newPost = {
                id: Date.now(),
                name: "User Name", // Replace with dynamic user name
                userId: 3, // Replace with dynamic user ID
                profilePic: "https://via.placeholder.com/40", // Replace with user's profile picture
                desc: postContent,
                img: image ? URL.createObjectURL(image) : null,
            };
            onPostCreate(newPost);
            setPostContent('');
            setImage(null);
            setImageName('');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name);
        }
    };

    return (
        <div className="createPost">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <div className="fileInputContainer">
                    <label htmlFor="fileInput" className="customFileInput">
                        Select a picture
                    </label>
                    <span className="imageName">{imageName}</span>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
