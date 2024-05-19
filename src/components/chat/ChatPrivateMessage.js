import React from 'react';
import {Grid, Card, CardContent, Typography, CardMedia} from '@mui/material';
import { useUserId } from '../../redux/slices/security/selectors';

export default function ChatPrivateMessage({message}) {

    // const userAccount = JSON.parse(localStorage.getItem("user"));
    const currentUserId = useUserId();
    const [imageUrlState, setImageUrlState] = React.useState();
    const [soundUrlState, setSoundUrlState] = React.useState("");

    React.useEffect(() => {
        if (message["imageData"]) {
            console.log(message["imageData"]);
            setImageUrlState(`data:image/png;base64,${message["imageData"]}`);
        }
        
        if (message["soundData"]) {
            setSoundUrlState(`data:audio/mp3;base64,${message["soundData"]}`);
        }
    }, []);


    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    backgroundColor: (currentUserId === message["senderUserProfile"]["id"]) ? '#FFFFFF' : '#DCF8C6',
                    marginRight: (currentUserId === message["senderUserProfile"]["id"]) ? 0 : 'auto',
                    marginLeft: (currentUserId === message["senderUserProfile"]["id"]) ? 'auto' : 0,
                    width: '50%'
                }}
            >
                <CardContent>
                    <Typography variant="h6">
                        {message["senderUserProfile"]["firstName"] + " " + message["senderUserProfile"]["lastName"]
                            + ((message["seenByReceiver"] === true && message["senderUserProfile"]["id"] === currentUserId) ?
                                " - Seen" : "")
                        }
                    </Typography>
                    <Typography variant="body2">
                        {message["content"]}
                    </Typography>
                </CardContent>
                { message["imageData"] !== undefined && <CardMedia component="img" image={imageUrlState} />}
                {
                    soundUrlState &&
                    <audio controls>
                        <source src={soundUrlState} type="audio/mp3"></source>
                    </audio>
                }
            </Card>
        </Grid>
    );
}