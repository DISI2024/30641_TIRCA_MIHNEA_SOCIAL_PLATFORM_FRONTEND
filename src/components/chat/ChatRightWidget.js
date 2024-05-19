import React from 'react';
import {Typography, Grid, TextField, Button, AppBar, Toolbar} from '@mui/material';
import Fab from '@mui/material/Fab';
import ChatSelectedContext from './ChatSelectedContext';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import axios from 'axios';
import ChatPrivateMessage from './ChatPrivateMessage';
import * as ChatApi from './ChatsApi';
import { useUserId } from '../../redux/slices/security/selectors';
import { AddAPhoto, AddReaction, AddAlarmRounded } from '@mui/icons-material';
import MicRecorder from 'mic-recorder-to-mp3';

var chatStompClient = null;
var chatSubscriptionObject = null;
var updateInterval = null;
var upload = null;
export default function ChatRightWidget() {

    const {selectedChatState, setSelectedChatState} = React.useContext(ChatSelectedContext);

    const [messageTextState, setMessageTextState] = React.useState("");
    const [chatContent, setChatContent] = React.useState(null);
    const currentUserId = useUserId();

    const [mp3RecorderState, setMp3RecorderState] = React.useState(null);
    const [isMicBlockedState, setIsMicBlockedState] = React.useState(false);
    const [isRecordingState, setIsRecordingState] = React.useState(false);
    const [audioBlobState, setAudioBlobState] = React.useState(null);
    const [audioUrlState, setAudioUrlState] = React.useState(null);

    const handleChange = (event) => {
        event.preventDefault();
        setMessageTextState(event.target.value);
    };

    const handleFileChange = (event) => {
        
        const file = event.target.files[0];
        console.log("EVENT TARGET FILES: " + file);
        
        if (file) {
            const formData = new FormData();

            formData.append('imageData', file);
            formData.append('senderUserProfileId', currentUserId);
            formData.append('receiverUserProfileId', selectedChatState);

            axios.post(ChatApi.IMAGE_MESSAGE_UPLOAD, formData).
                then(
                    (response) => {
                        console.log(response);
                    }
                );
        }

        event.target.files = null;
    }

    const handleSendClick = (event) => {
        event.preventDefault();

        // const userAccount = JSON.parse(localStorage.getItem("user"));
        
        // if (groupSelectedState === false) {
        //     const jsonPayload = {
        //         "senderUserProfileId": userAccount["userProfileId"],
        //         "receiverUserProfileId": selectedChatState,
        //         "content": messageText
        //     }

        //     if (selectedChatState !== -1) {
        //         stompClient.send("/app/message", {}, JSON.stringify(jsonPayload));
        //     }
        // }

        // else {
        //     const jsonPayload = {
        //         "senderUserProfileId": userAccount["userProfileId"],
        //         "receiverGroupId": selectedChatState,
        //         "content": messageText
        //     }

        //     if (selectedChatState !== -1) {
        //         stompClient.send("/app/groupMessage", {}, JSON.stringify(jsonPayload));
        //     }
        // }

        const jsonPayload = {
            "senderUserProfileId": currentUserId,
            "receiverUserProfileId": selectedChatState,
            "content": messageTextState
        };

        console.log("Find all messages payload: ");
        console.log(jsonPayload);

        if (selectedChatState !== -1)
            chatStompClient.send("/app/message", {}, JSON.stringify(jsonPayload));

        setMessageTextState("");
    };

    const connectToPrivateChat = () => {
        if (selectedChatState !== -1) {
            if (chatSubscriptionObject !== null)
                chatSubscriptionObject.unsubscribe();

            const userAccount = JSON.parse(localStorage.getItem("user"));
            const jsonPayload = {
                "firstUserProfileId": currentUserId,
                "secondUserProfileId": selectedChatState
            }

            axios.post(ChatApi.FIND_ALL_MESSAGES_FOR_USERS, jsonPayload).then(
                (response) => {
                    setChatContent(response.data);
                }
            );

            const socket = new SockJS('http://localhost:8080/stomp');
            chatStompClient = Stomp.over(socket);
            chatStompClient.connect({}, () => {
                console.log("STOMP s-a conectat ok");
                const destination = '/user/' + selectedChatState + '/' + currentUserId + '/messages';
                chatSubscriptionObject = chatStompClient.subscribe(destination, (response) => {
                    const responseData = JSON.parse(response.body);
                    console.log(responseData);


                    // if (responseData["receiverUserProfile"]["id"] === userAccount["userProfileId"]) {
                    //     const jsonPayload = {
                    //         'messageId': responseData["id"]
                    //     }

                    //     axios.post("http://localhost:8080/api/message/markReceivedMessageAsSeen", jsonPayload).then(
                    //         (response) => {
                    //             console.log(response.data);
                    //             setChatContent(current => [...current, response.data]);
                    //         }
                    //     );
                    // }

                    // else {
                    //     setChatContent(current => [...current, responseData]);
                    // }

                    setChatContent(current => [...current, responseData]);

                })

            }, () => {
                console.log("Nu ne-am putut conecta cu STOMP")
            });
        }
    };

    React.useEffect(() => {
        connectToPrivateChat();

        setMp3RecorderState(new MicRecorder({ bitrate: 128}));
        navigator.getUserMedia({ audio: true }, 
            () => {
                setIsMicBlockedState(false);
            },
            () => {
                setIsMicBlockedState(true);
            }
        );


        if (updateInterval !== null)
            clearInterval(updateInterval);

            updateInterval = setInterval(() => {
                
                const jsonPayload = {
                    "firstUserProfileId": currentUserId,
                    "secondUserProfileId": selectedChatState
                };

                if (selectedChatState !== -1) {
                    axios.post(ChatApi.MARK_ALL_RECEIVED_MESSAGES_AS_SEEN, jsonPayload);
                }
            }, 1000);

    }, [selectedChatState]);

    const startRecording = (event) => {
        event.preventDefault();
        if (!isMicBlockedState) {
            mp3RecorderState.start().then(
                () => {
                    setIsRecordingState(true);
                }
            ).catch((e) => console.log(e));
        }
    }

    const stopRecording = (event) => {
        event.preventDefault();
        mp3RecorderState.stop().getMp3()
            .then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob);
                setIsRecordingState(false);
                setAudioBlobState(blobURL);
                setAudioBlobState(blob);
            }).catch((e) => console.log(e));
    }

    const handleAudioUpload = (event) => {
        event.preventDefault();
        if (audioBlobState) {
            const formData = new FormData();
            formData.append('soundData', audioBlobState);
            formData.append('senderUserProfileId', currentUserId);
            formData.append('receiverUserProfileId', selectedChatState);

            axios.post(ChatApi.VOCAL_MESSAGE_UPLOAD, formData).then(
                (response) => {
                    console.log(response.data);
                }
            )
        }
    }

    return (
        <>
            <div style={{height: 700, overflowY: 'scroll'}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {selectedChatState}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Grid container spacing={2}>
                    {chatContent && chatContent.map((chatMessage, index) => {
                        return <ChatPrivateMessage message={chatMessage} key={index}/>;
                    })}
                </Grid>
            </div>

            <Grid container spacing={3}>
                <Grid item sm={10}>
                    <TextField sx={{width: "100%"}} variant="outlined" label="Text message" id="content"
                               value={messageTextState} onChange={handleChange}></TextField>
                </Grid>
                <Grid item sm={2}>
                    <Button sx={{width: "100%"}} variant="contained" onClick={handleSendClick}>Send the message</Button>
                </Grid>
                <Grid item sm={3}>
                    <div>
                        <input id="myInput" type="file" onChange={(event) => { handleFileChange(event); }} ref={(ref) => upload = ref} style={{ display: 'none'}} />
                        <Fab
                            className="floatingButton"
                            sx={{ backgroundColor: '#1976d2'}}
                            variant="extended"
                            onClick={(e) => upload.click()}
                        >
                            <AddAPhoto />
                            Select Image
                        </Fab>
                    </div>
                </Grid>
                <Grid item sm={3}>
                    <div>
                        <Fab
                            className="floatingButton"
                            sx={{
                                backgroundColor: (isRecordingState) ? '#9f1f00' : '#1976d2',
                            }}
                            variant="extended"
                            onClick={(e) => {
                                (isRecordingState) ? (stopRecording(e)) : startRecording(e)
                            }}
                        >
                            <AddAlarmRounded />
                            Record Audio
                        </Fab>
                    </div>
                </Grid>
                <Grid item sm={1}>
                    <div>
                        <Fab
                            className="floatiingButton"
                            sx={{ backgroundColor: '#1976d2' }}
                            variant="extended"
                            onClick={handleAudioUpload}
                        >
                            <AddReaction />
                            Send vocal message
                        </Fab>
                    </div>
                </Grid>
                {audioUrlState &&
                    <Grid item sm={2}>
                        <audio controls key={audioUrlState}>
                            <source src={audioUrlState} type="audio/mp3" />
                        </audio>
                    </Grid>
                }
            </Grid>

        </>
    );
}