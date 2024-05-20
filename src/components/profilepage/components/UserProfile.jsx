// import React, { useEffect, useState } from 'react';
// import { useUserId, useToken } from "../../../redux/slices/security/selectors";
// import { axiosInstance } from "../../../axios/axios";
// import '../styles/UserProfile.css';
//
// const UserProfile = () => {
//     const userId = useUserId();
//     const token = useToken();
//     const [userProfile, setUserProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [editing, setEditing] = useState(false);
//     const [description, setDescription] = useState('');
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
//         fetchUserProfile();
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
//                 <p><strong>Bio:</strong></p>
//                 {editing ? (
//                     <div>
//                         <textarea
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             rows="4"
//                             cols="50"
//                         />
//                         <br />
//                         <button onClick={handleSaveClick}>Save</button>
//                         <button onClick={handleCancelClick}>Cancel</button>
//                     </div>
//                 ) : (
//                     <div>
//                         <p>{description || "This user has not set up a bio yet."}</p>
//                         <button onClick={handleEditClick}>Edit</button>
//                     </div>
//                 )}
//                 <p><strong>Posts:</strong> {"No posts yet."}</p>
//                 <p><strong>Friends:</strong> {"No friends yet."}</p>
//                 <p><strong>Photos:</strong> No photos yet.</p>
//             </div>
//         </div>
//     );
// };
//
// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { useUserId, useToken } from "../../../redux/slices/security/selectors";
import { axiosInstance } from "../../../axios/axios";
import '../styles/UserProfile.css';

const UserProfile = () => {
    const userId = useUserId();
    const token = useToken();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState('');
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

        fetchUserProfile();
    }, [userId, token]);

    const handleEditClick = () => {
        setEditing(true);
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
                <div className="card">
                    <p><strong>Posts:</strong></p>
                    <p>No posts yet.</p>
                </div>
                <div className="card">
                    <p><strong>Friends:</strong></p>
                    <p>No friends yet.</p>
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
