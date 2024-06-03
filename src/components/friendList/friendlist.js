import React, { useState, useEffect } from 'react';
import { fetchFriendList } from './apiService.js';
import './styles/friendList.css';
import { useToken } from '../../redux/slices/security/selectors.js';

// const FriendList = () => {
//     const [friends] = useState([
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' },
//         { id: 3, name: 'Charlie' },
//     ]);

    const FriendList = () => {
        const [friends, setFriends] = useState([]);
        const [error, setError] = useState(null);
        const token = useToken;
        useEffect(() => {
            const getFriends = async () => {
                try {
                    const friendList = await fetchFriendList();
                    setFriends(friendList);
                    if (Array.isArray(friendList)) {
                        setFriends(friendList);
                    } else {
                        console.error('Expected an array but got:', friendList);
                        setError('Invalid data format.');
                    }
                } catch (err) {

                    setError('No friends :(.');
                }
            };
    
            getFriends();
        }, []);
    
        if (error) {
            return <div className="friend-list-error">{error}</div>;
        }

    return (
        <div className="friend-list">
            <ul>
                {friends.map((friend, index) => (
                    <li key={index}>
                        {friend.userProfile2.firstName} {friend.userProfile2.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendList;