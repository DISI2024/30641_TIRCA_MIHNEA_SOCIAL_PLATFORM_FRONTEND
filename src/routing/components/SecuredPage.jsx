import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {useAuthorization, useIsLoggedIn} from "../../redux/slices/security/selectors";

const isAllowedAccess = (userAuthorization, pageAuthorization) => {
    // If page requires no authorization
    if (pageAuthorization === undefined) {
        return true;
    }
    return userAuthorization !== null && userAuthorization === pageAuthorization;
}

const SecuredPage = ({page, authorization}) => {
    const navigate = useNavigate();
    const userAuthorization = useAuthorization();
    const isLoggedIn = useIsLoggedIn();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else if (!isAllowedAccess(userAuthorization, authorization)) {
            navigate('/home');
        }
    }, [isLoggedIn, userAuthorization, authorization, navigate]);

    return <>{page}</>
}

export default SecuredPage;