import React from 'react';
import {Grid} from '@mui/material';
import ChatPrivateList from './ChatPrivateList';

export default function ChatsTab() {

    // const [userAccount, setUserAccount] = React.useState(JSON.parse(localStorage.getItem("user")));

    // const handleClick = (event) => {
    //     event.preventDefault();
    // }

    return (
        <div style={{width: '100%'}}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ChatPrivateList/>
                    {/* <Typography>Private Chat</Typography> */}
                </Grid>
            </Grid>
        </div>
    )
}