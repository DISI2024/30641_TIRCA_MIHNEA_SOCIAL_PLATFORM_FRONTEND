import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getUserData, logIn} from "./api";

const initState = () => {
    return {
        userData: null,
        loginStatus: 'loggedOut',
        token: ""
    };
}
const initialState = initState()

export const authenticate = createAsyncThunk(
    "security/login",
    async (logInData) => {
        const token = await logIn(logInData)
            .catch((error) => {
                throw new Error(error)
            })
        const userData = await getUserData(token);
        return {token: token, userData: userData};
    })

export const securitySlice = createSlice({
    name: 'security',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("persist:main-root");
            state.userData = initialState.userData;
            state.loginStatus = initialState.loginStatus;
            state.token = initialState.token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state) => {
                state.loginStatus = 'pending';
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                const authenticationData = action.payload;
                state.userData = authenticationData.userData;
                state.loginStatus = 'loggedIn';
                state.token = authenticationData.token;
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.loginStatus = 'loggedOut';
                console.log(action.error);
                throw action.error;
            })
    }
})

export const {logout} = securitySlice.actions

export const selectAuthorization = (state) => {
    return state.security.userData ? state.security.userData.role : null
}
export const selectUserId = (state) => {
    return state.security.userData ? state.security.userData.id : null
}
export const selectUsername = (state) => {
    return state.security.userData ? state.security.userData.username : null
}
export const selectFirstName = (state) => {
    return state.security.userData ? state.security.userData.firstName : null
}
export const selectLastName = (state) => {
    return state.security.userData ? state.security.userData.lastName : null
}
export const selectToken = (state) => state.security.token
export const selectIsLoggedIn = (state) => state.security.loginStatus === 'loggedIn'

export default securitySlice.reducer;