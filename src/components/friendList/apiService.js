import axios from 'axios';
import { useToken } from "../../redux/slices/security/selectors.js";

const API_BASE_URL = 'http://localhost:8080/api/userFriend'; 

export const fetchFriendList = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getAllFriends`, {
            headers: {
                'Authorization': token
            }
        });
        console.log("Response: " + response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching friend list:', error);
        throw error;
    }
};
