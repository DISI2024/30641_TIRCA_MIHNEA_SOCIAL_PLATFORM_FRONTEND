import React from 'react';
import axios from 'axios';
import {Card, CardContent, Typography, List, Box} from '@mui/material';
import ChatPrivateListResult from './ChatPrivateListResult';
import * as ChatApi from './ChatsApi';
import { useUserId } from '../../redux/slices/security/selectors';


export default function ChatPrivateList({userProfileId}) {

    const [userProfilesState, setUserProfilesState] = React.useState([]);
    const userId = useUserId();
    const [myUserId, setMyUserId] = React.useState();

    React.useEffect(() => {
        axios.get(ChatApi.GET_ALL_USER_PROFILES).then(
            (response) => {
                setUserProfilesState(response.data);
            }
        );

        const jsonPayload = {
            "userId": userId
        };
        axios.post(ChatApi.GET_USER_PROFILE, jsonPayload).then(
            (response) => {
                setMyUserId(response.data["userId"])
            }
        );
    }, []);

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h5">
                        Chats List
                    </Typography>
                </Box>
                <List
                    sx={{width: '100%', height: '100%', overflow: 'auto', bgcolor: 'background.paper'}}>
                    {userProfilesState && userProfilesState.map((userProf, index) => {
                        if (userProf["id"] !== myUserId)
                            return (<ChatPrivateListResult userProfile={userProf} key={index}/>);
                    })}
                </List>
            </CardContent>
        </Card>
    );
}