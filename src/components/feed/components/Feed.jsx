import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';
import { useFirstName, useLastName, useUserId } from "../../../redux/slices/security/selectors";
import { axiosInstance } from "../../../axios/axios";

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const firstName = useFirstName();
    const lastName = useLastName();
    const userId = useUserId();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('/api/posts/friends');
            setPosts(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePostCreate = async (postContent, image) => {
        try {
            const newPost = {
                description: postContent,
                image: image ? await toBase64(image) : null,
            };
            await axiosInstance.post('/api/posts/create', newPost);
            fetchPosts(); // Refresh the posts after creating a new one
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const userProfile = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        // Add profilePic here if available
    };

    return (
        <div className="home">
            <CreatePost onPostCreate={handlePostCreate} userProfile={userProfile} />
            <Posts posts={posts} />
        </div>
    );
};

export default Feed;
