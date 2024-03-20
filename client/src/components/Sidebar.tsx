import { useState } from 'react'

const Sidebar = () => {

    const [previousChats, setPreviousChats] = useState<any>([]);
    const [currentTitle, setCurrentTitle] = useState('');
    const [message, setMessage] = useState<any>(null);
    const [value, setValue] = useState('');

    const createNewChat = () => {
        setMessage(null);
        setValue('');
        setCurrentTitle('');
      };

      const handleClick = (uniqueTitle: string) => {
        setCurrentTitle(uniqueTitle);
        setMessage(null);
        setValue('');
      };

    const currentChat = previousChats.filter((previousChat: any) => previousChat.title === currentTitle);
    const uniqueTitles = Array.from(new Set(previousChats.map((previousChat: any) => previousChat.title)));

  return (
    <section className='h-screen w-1/6 bg-black p-5 text-white flex flex-col justify-between'>
        <button onClick={createNewChat} className='border-white bg-transparent text-white w-full rounded-xl p-3 mb-10'>+ New Chat</button>
        <ul className='flex flex-col items-center gap-5'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} className="cursor-pointer" onClick={() => handleClick(uniqueTitle as string)}>{uniqueTitle as string}</li>)}
        </ul>
        <nav className=''>
          <p>Made by João Dantas</p>
        </nav>
      </section>
  )
}

export default Sidebar
