// ChatContext.tsx

import { createContext, useState, useContext } from "react";

interface ChatContextType {
    previousChats: any[];
    updatePreviousChats: (newPreviousChats: any[]) => void;
    currentTitle: string;
    updateCurrentTitle: (newCurrentTitle: string) => void;
    message: any;
    updateMessage: (newMessage: any) => void;
    value: string;
    updateValue: (newValue: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatContextProvider');
    }
    return context;
};

export const ChatContextProvider: React.FC = ({ children }: any) => {
    const [previousChats, setPreviousChats] = useState<any>([]);
    const [currentTitle, setCurrentTitle] = useState('');
    const [message, setMessage] = useState<any>(null);
    const [value, setValue] = useState('');

    const updatePreviousChats = (newPreviousChats: any) => {
        setPreviousChats(newPreviousChats);
    }

    const updateCurrentTitle = (newCurrentTitle: string) => {
        setCurrentTitle(newCurrentTitle);
    }

    const updateMessage = (newMessage: any) => {
        setMessage(newMessage);
    }

    const updateValue = (newValue: string) => {
        setValue(newValue);
    }

    const contextValue: ChatContextType = {
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
