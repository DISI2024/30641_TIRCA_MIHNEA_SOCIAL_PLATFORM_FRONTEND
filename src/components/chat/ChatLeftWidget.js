import React from 'react';
import {Box, Tab} from '@mui/material';
import {TabPanel, TabContext, TabList} from '@mui/lab/';
import ChatsTab from './ChatsTab';

export default function ChatLeftWidget() {

    const [tabsValue, setTabsValue] = React.useState("1");

    const handleChange = (event, newTabsValue) => {
        setTabsValue(newTabsValue);
    }

    return (
        // <Box sx={{width: '100%'}}>
        //     <TabContext value={tabsValue}>
        //         <Box sx={{borderBottom: 1, width: '100%'}}>
        //             <TabList onChange={handleChange} sx={{width: '100%'}}>
        //                 <Tab label="Chats" value="1" sx={{width: '25%'}}/>
        //             </TabList>
        //         </Box>

        //         <TabPanel value="1">
        //             <ChatsTab/>
        //         </TabPanel>

        //     </TabContext>
        // </Box>
        <Box sx={{width: '100%'}}>
            <ChatsTab/>
        </Box>
    )
}
