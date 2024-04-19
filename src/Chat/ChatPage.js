import React from 'react';
import ChatLeftWidget from './ChatLeftWidget';
import { Grid, Card, Box, CardContent, Typography} from '@mui/material';
import ChatRightWidget from './ChatRightWidget';
import ChatSelectedContext from './ChatSelectedContext';

export default function ChatPage() {

    const [selectedChatState, setSelectedChatState] = React.useState(-1);
    const valueChat = { selectedChatState, setSelectedChatState };

    return (
        <ChatSelectedContext.Provider value={valueChat}>
            <Grid container spacing={1} style={{ height: '100vh'}}>
                <Grid item sm={4} style={{ height: '90%'}}>
                    <Box style={{ height: '100%'}}>
                        <Card variant="outlined" style={{ height: '100%'}}>
                            <CardContent>
                                <Typography>
                                    Your chats
                                </Typography>
                                <ChatLeftWidget/>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>

                <Grid item sm={8} style={{ height: '90%'}}>
                    <Box style={{ height: '100%'}}>
                        <Card variant="outlined" style={{ height: '100%'}}>
                            <CardContent>
                                <ChatRightWidget/>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>            
        </ChatSelectedContext.Provider>
    );
}