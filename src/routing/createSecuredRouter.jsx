import {createBrowserRouter, Navigate} from "react-router-dom";
import SecuredPage from "./components/SecuredPage";
import React from "react";
import Login from "../components/login/components/Login";
import Register from "../components/register/Register";

const mapRoutes = (routes) => {
    return routes.map(({path, element, authorization, children}) => {
        return {
            ...{path: path, element: <SecuredPage page={element} authorization={authorization}/>},
            ...(children && {children: mapRoutes(children)}),
        };
    })
}
const createSecuredRouter = (routes) => {
    return createBrowserRouter([
        ...mapRoutes(routes),
        {path: '/login', element: <Login/>},
        {path: '/register', element: <Register/>},
        {path: '*', element: <Navigate to={'/home'}/>}
    ]);
}

export default createSecuredRouter;
