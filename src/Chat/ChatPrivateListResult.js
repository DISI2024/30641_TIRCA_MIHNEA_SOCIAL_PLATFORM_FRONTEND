import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Button } from '@mui/material';
import ChatSelectedContext from './ChatSelectedContext';
import axios from 'axios';
import * as ChatApi from './ChatsApi';

export default function ChatPrivateListResult({ userProfile }) {

    const [mostRecentMessageState, setMostRecentMessageState] = React.useState([]);
    const { selectedChatState, setSelectedChatState } = React.useContext(ChatSelectedContext);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    React.useEffect(() => {
        setInterval(() => {
            
            const jsonPayload = {
                "firstUserProfileId": currentUser["userProfileId"],
                "secondUserProfileId": userProfile["id"]
            }

            axios.post(ChatApi.FIND_MOST_RECENT_MESSAGE, jsonPayload).then(
                (response) => {
                    setMostRecentMessageState(response.data);
                }
            )
        }, 1000);

    }, []);

    const handleChatChange = (event) => {
        event.preventDefault();
        setSelectedChatState(userProfile["id"]);
    }

    const messageContent = () => {

        var ret = "";

        if (mostRecentMessageState["senderUserProfile"] && mostRecentMessageState["senderUserProfile"]["id"] == currentUser["userProfileId"])
            ret += "You: ";

        ret += mostRecentMessageState["content"];
        return ret;
    }

    return (
        <>
            {/* <ListItem alignItems="flex-start" onClick={handleChatChange} */}
            <ListItem alignItems="flex-start" onClick={handleChatChange}
                sx={{
                    backgroundColor: (mostRecentMessageState && mostRecentMessageState["receiverUserProfile"] && mostRecentMessageState["receiverUserProfile"]["id"] ==
                        currentUser["userProfileId"] && mostRecentMessageState["seenByReceiver"] === false) ? 'green' : 'white'
                }}>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText
                    secondary={mostRecentMessageState &&
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {messageContent()}
                            </Typography>

                        </React.Fragment>
                    }

                    primary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body3"
                                color="text.primary"
                            >
                                {userProfile && (userProfile["firstName"] + " " + userProfile["lastName"])}
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

