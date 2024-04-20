import {Outlet} from 'react-router-dom'
import {Stack} from "@mui/material";
import React from 'react'
import Navbar from "../../components/overlay/components/Navbar";
import Rightbar from "../../components/overlay/components/Rightbar";
import {useIsLoggedIn} from "../../redux/slices/security/selectors";
import Leftbar from "../../components/overlay/components/Leftbar";

//ce e in afara Outlet va aparea mereu pe ecran
const Layout = () => {
    const loggedIn = useIsLoggedIn();


    return (
        loggedIn ? (
                <Stack>
                    <Navbar/>
                    <div style={{display: "flex"}}>
                        <Leftbar/>
                        <Outlet/>
                        <Rightbar/>
                    </div>
                </Stack>
            )
            : (
                <Outlet/>
            )
    )
}

export default Layout;
