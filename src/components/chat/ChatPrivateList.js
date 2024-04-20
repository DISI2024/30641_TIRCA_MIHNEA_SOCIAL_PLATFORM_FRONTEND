import React from 'react';
import axios from 'axios';
import {Card, CardContent, Typography, List} from '@mui/material';
import ChatPrivateListResult from './ChatPrivateListResult';
import * as ChatApi from './ChatsApi';


export default function ChatPrivateList({userProfileId}) {

    const [userProfilesState, setUserProfilesState] = React.useState([]);

    React.useEffect(() => {
        axios.get(ChatApi.GET_ALL_USER_PROFILES).then(
            (response) => {
                setUserProfilesState(response.data);
            }
        );
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Chats List
                </Typography>
                <List
                    sx={{width: '100%', maxWidth: 360, maxHeight: 200, overflow: 'auto', bgcolor: 'background.paper'}}>
                    {userProfilesState && userProfilesState.map((userProf, index) => {
                        console.log(userProf);
                        return (<ChatPrivateListResult userProfile={userProf} key={index}/>);
                    })}
                </List>
            </CardContent>
        </Card>
    );
}