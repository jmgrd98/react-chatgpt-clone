import { createContext, useState, useContext } from "react";

const ChatContext = createContext(null);

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatContextProvider');
    }
    return context;
};

export const ChatContextProvider = ({ children }: any) => {
    const [previousChats, setPreviousChats] = useState<any>([]);
    const [currentTitle, setCurrentTitle] = useState('');
    const [message, setMessage] = useState<any>(null);
    const [value, setValue] = useState('');

    const updatePreviousChats = (newPreviousChats: any) => {
        setPreviousChats(newPreviousChats);
    }

    const updateCurrentTitle = (newCurrentTitle: any) => {
        setCurrentTitle(newCurrentTitle);
    }

    const updateMessage = (newMessage: any) => {
        setMessage(newMessage);
    }

    const updateValue = (newValue: any) => {
        setValue(newValue);
    }



    const contextValue: any = {
        previousChats,
        updatePreviousChats,
        currentTitle,
        updateCurrentTitle,
        message,
        updateMessage,
        value,
        updateValue
    };

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}