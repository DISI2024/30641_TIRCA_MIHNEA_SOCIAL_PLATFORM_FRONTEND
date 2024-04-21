import {axiosInstance} from "../../../axios/axios";
import {AUTHENTICATE_API, REGISTER_API, USER_API} from "../../../model/urls";

export const logIn = async (logInData) => {
    const response  = await axiosInstance.post(AUTHENTICATE_API, logInData);
    return "Bearer " + response.data.access_token
}

export const register = async (registerData) => {
    try {
        const response = await axiosInstance.post(REGISTER_API, registerData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to register:', error.response.data);
    }
}

export const getUserData = async (token) => {
    const response = await axiosInstance.get(
        `${USER_API}/data`,
        {headers: {'Authorization': token}}
    );
    return response.data;
}