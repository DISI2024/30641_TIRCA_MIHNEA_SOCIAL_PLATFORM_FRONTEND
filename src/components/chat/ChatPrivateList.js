import React from 'react';
import axios from 'axios';
import {Card, CardContent, Typography, List} from '@mui/material';
import ChatPrivateListResult from './ChatPrivateListResult';
import * as ChatApi from './ChatsApi';
import { useUserId } from '../../redux/slices/security/selectors';


export default function ChatPrivateList({userProfileId}) {

    const [userProfilesState, setUserProfilesState] = React.useState([]);
    const myUserId = useUserId();

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
                        if (userProf["id"] !== myUserId)
                            return (<ChatPrivateListResult userProfile={userProf} key={index}/>);
                    })}
                </List>
            </CardContent>
        </Card>
    );
}