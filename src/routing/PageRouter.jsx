import createSecuredRouter from "./createSecuredRouter";
import Layout from "./components/Layout";
import ChatPage from "../components/chat/ChatPage";
import Login from "../components/login/components/Login";
import React from 'react'
import Home from "../components/home/components/Home";

const pageRouter = createSecuredRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <Login/>,
                // empty authorization means anyone can access
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/chat',
                element: <ChatPage/>,
                authorization: "CLIENT",
            },
            //
            // {
            //     path: '/admin',
            //     element: <AdminComponent/>,
            //     authorization: "ADMIN"
            // },
            // {
            //     path: '/client',
            //     element: <ClientComponent/>,
            //     authorization: "CLIENT"
            // }
        ]
    }
])

export default pageRouter;