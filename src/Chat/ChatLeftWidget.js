import React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab/';
import ChatsTab from './ChatsTab';

export default function ChatLeftWidget() {

    const [tabsValue, setTabsValue] = React.useState("1");

    const handleChange = (event, newTabsValue) => {
        setTabsValue(newTabsValue);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={tabsValue}>
                <Box sx={{ borderBottom: 1, width: '100%' }}>
                    <TabList onChange={handleChange} sx={{ width: '100%' }}>
                        <Tab label="Chats" value="1" sx={{ width: '25%' }} />
                        {/* <Tab label="Chats" value="2" sx={{ width: '25%' }} />
                        <Tab label="Groups" value="3" sx={{ width: '25%' }} />
                        <Tab label="Requests" value="4" sx={{ width: '25%' }} /> */}
                    </TabList>
                </Box>

                <TabPanel value="1">
                    <ChatsTab/>
                </TabPanel>

                {/* <TabPanel value="2">
                    <Typography>Private chats</Typography>
                </TabPanel>

                <TabPanel value="3">
                    <Typography>Private chats</Typography>
                </TabPanel>

                <TabPanel value="4">
                    <Typography>Private chats</Typography>
                </TabPanel>
 */}
            </TabContext>
        </Box>
    )
}
