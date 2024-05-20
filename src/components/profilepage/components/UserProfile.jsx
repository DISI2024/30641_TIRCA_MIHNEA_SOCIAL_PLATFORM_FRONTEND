import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserId, useToken } from "../../../redux/slices/security/selectors";
//import './UserProfile.css';

const UserProfile = () => {
    const userId = useUserId();
    const token = useToken();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const defaultProfilePicture = 'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg';

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/user-profiles/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userProfile) {
        return <div>Error loading profile.</div>;
    }

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img
                    src={userProfile.profilePictureUrl || defaultProfilePicture}
                    alt={`${userProfile.firstName} ${userProfile.lastName}`}
                    className="profile-picture"
                />
                <h1>{userProfile.firstName} {userProfile.lastName}</h1>
            </div>
            <div className="profile-details">
                <p><strong>Bio:</strong> {userProfile.description || "This user has not set up a bio yet."}</p>
                <p><strong>Posts:</strong> {userProfile.posts.length > 0 ? userProfile.posts.join(', ') : "No posts yet."}</p>
                <p><strong>Friends:</strong> {userProfile.friends.length > 0 ? userProfile.friends.map(friend => friend.firstName + ' ' + friend.lastName).join(', ') : "No friends yet."}</p>
                <p><strong>Photos:</strong> No photos yet.</p>
            </div>
        </div>
    );
};

export default UserProfile;
