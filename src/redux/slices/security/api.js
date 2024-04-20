import {axiosInstance} from "../../../axios/axios";
import {AUTHENTICATE_API, USER_API} from "../../../model/urls";

export const logIn = async (logInData) => {
    const response  = await axiosInstance.post(AUTHENTICATE_API, logInData);
    return "Bearer " + response.data.access_token
}

export const getUserData = async (token) => {
    const response = await axiosInstance.get(
        `${USER_API}/data`,
        {headers: {'Authorization': token}}
    );
    return response.data;
}