import {useAppSelector} from "./hooks";
import {
    selectAuthorization,
    selectFirstName,
    selectIsLoggedIn, selectLastName,
    selectToken,
    selectUserId,
    selectUsername
} from "./securitySlice";

export const useUsername = () => {
    return useAppSelector(selectUsername);
}

export const useUserId = () => {
    return useAppSelector(selectUserId);
}

export const useFirstName = () => {
    return useAppSelector(selectFirstName)
}

export const useLastName = () => {
    return useAppSelector(selectLastName)
}

export const useToken = () => {
    return useAppSelector(selectToken);
}

export const useAuthorization = () => {
    return useAppSelector(selectAuthorization);
}

export const useIsLoggedIn = () => {
    return useAppSelector(selectIsLoggedIn);
}
