import React, { useState } from 'react';
import '../styles/CreatePost.css';

const CreatePost = ({ onPostCreate, userProfile }) => {
    const [postContent, setPostContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (postContent.trim() || image) {
            await onPostCreate(postContent, image);
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