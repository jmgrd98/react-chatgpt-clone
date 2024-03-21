import { useChatContext } from '../context/ChatContext';
import { FaTrashAlt } from "react-icons/fa";

const Sidebar = () => {
    const { 
        previousChats,
        updatePreviousChats,
        currentTitle,
        updateCurrentTitle,
        message, 
        updateMessage,
        value,
        updateValue
     } = useChatContext();

    const createNewChat = () => {
        updateMessage(null);
        updateValue('');
        updateCurrentTitle('');
    };

    const handleClick = (uniqueTitle: string) => {
        updateCurrentTitle(uniqueTitle);
        updateMessage(null);
        updateValue('');
    };

    const handleRemoveChat = (uniqueTitle: string) => {
        const updatedChats = previousChats.filter((chat: any) => chat.title !== uniqueTitle);
        updatePreviousChats(updatedChats);
        console.log(previousChats);
    };

    const uniqueTitles = Array.from(new Set(previousChats.map((previousChat: any) => previousChat.title)));

    return (
        <section className='h-screen w-1/6 bg-black p-5 text-white flex flex-col justify-between'>
            <button onClick={createNewChat} className='border-white bg-transparent text-white w-full rounded-xl p-3 mb-10'>+ New Chat</button>
            <ul className='flex flex-col items-center gap-5'>
                {uniqueTitles?.map((uniqueTitle, index) => (
                    <li key={index}
                        className="flex items-center justify-evenly cursor-pointer bg-zinc-400/20 p-2 px-5 rounded min-w-full text-center hover:bg-zinc-400/30"
                        onClick={() => handleClick(uniqueTitle as string)}>
                            <p>{uniqueTitle as string}</p>
                            <FaTrashAlt onClick={() => handleRemoveChat(uniqueTitle as string)} className="cursor-pointer ml-2 hover:w-5 hover:h-5" />
                    </li>
                    )
                )}
            </ul>
            <nav className=''>
                <p>Made by João Dantas</p>
            </nav>
        </section>
    );
};

export default Sidebar;
