import React from 'react'

const ChatSelectedContext = React.createContext({
    selectedChat: -1,
    setSelectedChat: () => { }
});

export default ChatSelectedContext;