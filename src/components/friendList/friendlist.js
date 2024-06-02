import React, { useState, useEffect } from 'react';
import { fetchFriendList } from './apiService.js';
import './styles/friendList.css';

// const FriendList = () => {
//     const [friends] = useState([
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' },
//         { id: 3, name: 'Charlie' },
//     ]);

    const FriendList = () => {
        const [friends, setFriends] = useState([]);
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const getFriends = async () => {
                try {
                    const friendList = await fetchFriendList();
                    setFriends(friendList);
                } catch (err) {

                    setError('Failed to fetch friends.');
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
                {friends.map(friend => (
                    <li key={friend.id}>{friend.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default FriendList;