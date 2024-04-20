import createSecuredRouter from "./createSecuredRouter";
import Layout from "./components/Layout";
import ChatPage from "../components/chat/ChatPage";
import Login from "../components/login/components/Login";
import React from 'react'
import Feed from "../components/feed/components/Feed";

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
                element: <Feed/>
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