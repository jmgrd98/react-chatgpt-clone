import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";
import { environment } from '../environment.ts';
import Sidebar from "./components/Sidebar.tsx";
import { useChatContext } from "./context/ChatContext.tsx";

function App() {

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

  useEffect(() => {
    if (!currentTitle && value && message) {
        updateCurrentTitle(value);
    }
    if (currentTitle && value && message) {
        updatePreviousChats((prevChats: any) => (
            [...prevChats, {
                title: currentTitle,
                role: 'user',
                content: value
            }, {
                title: currentTitle,
                role: message.role,
                content: message.content
            }]
        ));
    }
}, [message, currentTitle, value]);

  const getMessages = async () => {

    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Authorization': `Bearer ${environment.openAIApiKey}`,
        'Content-Type': 'application/json'
      }
    }

    try {
      // const response = await fetch('http://54.207.142.190:5000/completions', options);
      const response = await fetch('http://localhost:5000/completions', options);
      const data = await response.json();
      console.log(data);
      updateMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  }

  const currentChat = previousChats.filter((previousChat: any) => previousChat.title === currentTitle);


  return (
    <div className="flex h-screen w-screen">
      <Sidebar/>

      <section className='bg-gray-900 h-screen w-full flex flex-col items-center justify-between p-5'>
        {!currentTitle ? <h1 className='text-3xl text-white font-bold'>CloneGPT</h1> : <h1 className='text-3xl text-white font-bold'>{currentTitle}</h1>}

        <ul>
          {currentChat?.map((chatMessage: any, index: any) => <li key={index}>
            <p className="text-gray-300 font-bold">{chatMessage.role}</p>
            <p className="text-gray-300">{chatMessage.content}</p>
            </li>)}
        </ul>

        <div className='w-full'>
          <div className="flex gap-3 items-center">
            <input placeholder="Digite sua mensagem" value={value} onChange={(e) => updateValue(e.target.value)} className='w-full h-10 bg-transparent border-2 text-white rounded border-gray-400 p-2' type='text'/>
            <div onClick={getMessages}>
              <IoMdSend className="text-white"/>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default App
