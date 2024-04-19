import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

export default function ChatPrivateMessage({ message }) {

    const userAccount = JSON.parse(localStorage.getItem("user"));
    
    return (
        <Grid item xs={12} >
            <Card
                sx={{
                    backgroundColor: (userAccount["userProfileId"] === message["senderUserProfile"]["id"]) ? '#FFFFFF' : '#DCF8C6',
                    marginRight: (userAccount["userProfileId"] === message["senderUserProfile"]["id"]) ? 0 : 'auto',
                    marginLeft: (userAccount["userProfileId"] === message["senderUserProfile"]["id"]) ? 'auto' : 0,
                    width: '50%'
                }}
            >
                <CardContent>
                    <Typography variant="h6">
                        {message["senderUserProfile"]["firstName"] + " " + message["senderUserProfile"]["lastName"]
                            + ((message["seenByReceiver"] === true && message["senderUserProfile"]["id"] === userAccount["userProfileId"]) ?
                                " - Seen" : "")
                        }
                    </Typography>
                    <Typography variant="body2">
                        {message["content"]}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}