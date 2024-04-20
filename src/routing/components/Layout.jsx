import {Outlet} from 'react-router-dom'
import {Stack} from "@mui/material";
import React from 'react'

//todo ce e in afara Outlet va aparea mereu pe ecran
const Layout = () => {
    return (
        <Stack>
            {/*{useIsLoggedIn() && <Header/>}*/}
            <div style={{marginTop: 80}}>
                <Outlet/>
            </div>
        </Stack>
    )
}

export default Layout;
