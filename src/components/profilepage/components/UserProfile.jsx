//
//
// import React, { useEffect, useState } from 'react';
// import { useUserId, useToken } from "../../../redux/slices/security/selectors";
// import { axiosInstance } from "../../../axios/axios";
// import Posts from "../../feed/components/Posts";
// import FriendList from "../../friendList/friendlist"; // Import the FriendList component
// import '../styles/UserProfile.css';
//
// const UserProfile = () => {
//     const userId = useUserId();
//     const token = useToken();
//     const [userProfile, setUserProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [editing, setEditing] = useState(false);
//     const [description, setDescription] = useState('');
//     const [userPosts, setUserPosts] = useState([]); // State to store user's posts
//     const defaultProfilePicture = 'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg';
//
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await axiosInstance.get(`/api/user-profiles/${userId}`, {
//                     headers: {
//                         Authorization: `${token}`
//                     }
//                 });
//                 console.log(response.data);
//                 setUserProfile(response.data);
//                 setDescription(response.data.description || '');
//             } catch (error) {
//                 console.error('Error fetching user profile:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         const fetchUserPosts = async () => {
//             try {
//                 const response = await axiosInstance.get('/api/posts/myPosts', {
//                     headers: {
//                         Authorization: `${token}`
//                     }
//                 });
//                 setUserPosts(response.data);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         fetchUserProfile();
//         fetchUserPosts();
//     }, [userId, token]);
//
//     const handleEditClick = () => {
//         setEditing(true);
//     };
//
//     const handleSaveClick = async () => {
//         try {
//             const response = await axiosInstance.put(`/api/user-profiles/${userId}/description`,
//                 description,
//                 {
//                     headers: {
//                         Authorization: `${token}`,
//                         'Content-Type': 'text/plain'
//                     }
//                 }
//             );
//             setUserProfile(response.data);
//             setEditing(false);
//         } catch (error) {
//             console.error('Error updating description:', error);
//         }
//     };
//
//     const handleCancelClick = () => {
//         setDescription(userProfile.description || '');
//         setEditing(false);
//     };
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     if (!userProfile) {
//         return <div>Error loading profile.</div>;
//     }
//
//     return (
//         <div className="user-profile">
//             <div className="profile-header">
//                 <img
//                     src={userProfile.profilePictureUrl || defaultProfilePicture}
//                     alt={`${userProfile.firstName} ${userProfile.lastName}`}
//                     className="profile-picture"
//                 />
//                 <h1>{userProfile.firstName} {userProfile.lastName}</h1>
//             </div>
//             <div className="profile-details">
//                 <div className="card bio-card">
//                     <p><strong>Bio:</strong></p>
//                     {editing ? (
//                         <div>
//                         <textarea
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             rows="4"
//                             cols="50"
//                         />
//                             <br />
//                             <button onClick={handleSaveClick}>Save</button>
//                             <button onClick={handleCancelClick}>Cancel</button>
//                         </div>
//                     ) : (
//                         <div>
//                             <p>{description || "This user has not set up a bio yet."}</p>
//                             <button onClick={handleEditClick}>Edit</button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="card posts-card">
//                     <p><strong>Posts:</strong></p>
//                     {userPosts.length > 0 ? <Posts posts={userPosts} /> : <p>No posts yet.</p>}
//                 </div>
//                 <div className="card friends-card">
//                     <p><strong>Friends:</strong></p>
//                     <FriendList />
//                 </div>
//                 <div className="card">
//                     <p><strong>Photos:</strong></p>
//                     <p>No photos yet.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default UserProfile;


import React, { useEffect, useState } from 'react';
import { useUserId, useToken } from "../../../redux/slices/security/selectors";
import { axiosInstance } from "../../../axios/axios";
import Posts from "../../feed/components/Posts";
import '../styles/UserProfile.css';
import { fetchFriendList } from '../../friendList/apiService';

const UserProfile = () => {
    const userId = useUserId();
    const token = useToken();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState('');
    const [userPosts, setUserPosts] = useState([]); // State to store user's posts
    const [friends, setFriends] = useState([]); // State to store friends
    const [error, setError] = useState(null); // State to handle error
    const [friendUsername, setFriendUsername] = useState('');
    const defaultProfilePicture = 'https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg';

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get(`/api/user-profiles/${userId}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                console.log(response.data);
                setUserProfile(response.data);
                setDescription(response.data.description || '');
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserPosts = async () => {
            try {
                const response = await axiosInstance.get('/api/posts/myPosts', {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                setUserPosts(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchFriends = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/api/userFriend/getAllFriends', {
                    headers: {
                        Authorization: `${token}`
                    }
                });
                const friendList = response.data;
                if (Array.isArray(friendList)) {
                    setFriends(friendList);
                } else {
                    console.error('Expected an array but got:', friendList);
                    setError('Invalid data format.');
                }
            } catch (error) {
                console.error('Failed to fetch friends:', error);
                setError('Failed to fetch friends.');
            }
        };

        fetchUserProfile();
        fetchUserPosts();
        fetchFriends();
    }, [userId, token]);

    const handleEditClick = () => {
        setEditing(true);
    };

    const fetchFriendList = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:8080/api/userFriend/getAllFriends', {
                headers: {
                    Authorization: `${token}`
                }
            });
            const friendList = response.data;
            if (Array.isArray(friendList)) {
                setFriends(friendList);
            } else {
                console.error('Expected an array but got:', friendList);
                setError('Invalid data format.');
            }
        } catch (error) {
            console.error('Failed to fetch friends:', error);
            setError('Failed to fetch friends.');
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await axiosInstance.put(`/api/user-profiles/${userId}/description`,
                description,
                {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'text/plain'
                    }
                }
            );
            setUserProfile(response.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating description:', error);
        }
    };

    const handleCancelClick = () => {
        setDescription(userProfile.description || '');
        setEditing(false);
    };

    const handleAddFriend = async () => {
        try {
            const response = await axiosInstance.post(`/api/userFriend/${friendUsername}/createFriendRequest`, 
                { username: friendUsername }
            );
            // Update the userProfile or show a success message
            console.log('Friend added:', response.data);
            console.log('Username: ', friendUsername)
            setFriendUsername('');
        } catch (error) {
            console.error('Error adding friend:', error);
        }
        fetchFriendList();
    };

    const handleRemoveFriend = async () => {
        try {
            const response = await axiosInstance.delete(`/api/userFriend/${friendUsername}/removeFriend`, 
                { data: { username: friendUsername }, 
                headers: {
                    Authorization: `${token}`
                }}
            );
            // Update the userProfile or show a success message
            console.log('Friend removed:', response.data);
            setFriendUsername('');
            fetchFriendList();
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

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
                <div className="card bio-card">
                    <p><strong>Bio:</strong></p>
                    {editing ? (
                        <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            cols="50"
                        />
                            <br />
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>{description || "This user has not set up a bio yet."}</p>
                            <button onClick={handleEditClick}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="card posts-card">
                    <p><strong>Posts:</strong></p>
                    {userPosts.length > 0 ? <Posts posts={userPosts} /> : <p>No posts yet.</p>}
                </div>
                <div className="card friends-card">
                    <p><strong>Friends:</strong></p>
                    {error ? (
                        <div className="friend-list-error">{error}</div>
                    ) : (
                        <ul>
                            {friends.map((friend, index) => (
                                <li key={index}>
                                    {friend.userProfile2.firstName} {friend.userProfile2.lastName}
                                </li>
                            ))}
                        </ul>
                    )}
                    <input
                        type="text"
                        value={friendUsername}
                        onChange={(e) => setFriendUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                    <button onClick={handleAddFriend}>Add Friend</button>
                    <button onClick={handleRemoveFriend}>Remove Friend</button>
                </div>
                <div className="card">
                    <p><strong>Photos:</strong></p>
                    <p>No photos yet.</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
