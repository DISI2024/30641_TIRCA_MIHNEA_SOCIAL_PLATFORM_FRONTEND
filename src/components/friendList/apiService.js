import axios from 'axios';
import { useToken } from "../../redux/slices/security/selectors.js";
import { axiosInstance } from '../../axios/axios.js';
import { json } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8080/api/userFriend'; 

export const fetchFriendList = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/getAllFriends`);
        console.log("Response: " + JSON.stringify(response))

        return response.data;
    } catch (error) {
        console.error('Error fetching friend list:', error);
        throw error;
    }
};
