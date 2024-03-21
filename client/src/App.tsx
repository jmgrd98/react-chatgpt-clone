import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";
import { environment } from '../environment.ts';
import Sidebar from "./components/Sidebar.tsx";
import { useChatContext } from "./context/ChatContext.tsx";
import { Typewriter } from 'react-simple-typewriter';
import ReactMarkdown from 'react-markdown';

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

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!currentTitle && value && message) {
        updateCurrentTitle(value);
    }
    if (currentTitle && value && message) {
        updatePreviousChats((prevChats: any) => (
            [...prevChats, {
                title: currentTitle,
                role: 'User',
                content: value
            }, {
                title: currentTitle,
                role: 'CloneGPT',
                content: message.content
            }]
        ));
    }
  }, [message, currentTitle, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getMessages();
    }
  }

  const getMessages = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: inputValue
      }),
      headers: {
        'Authorization': `Bearer ${environment.openAIApiKey}`,
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch('http://localhost:5000/completions', options);
      const data = await response.json();
      console.log(data);
      updateMessage(data.choices[0].message);
      updateValue(inputValue);
    } catch (error) {
      console.error(error);
    } finally {
      setInputValue('');
    }
  }

  const currentChat = previousChats.filter((previousChat: any) => previousChat.title === currentTitle);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar/>
      <section className='bg-gray-900 h-screen w-full flex flex-col items-center justify-between p-5'>
        {!currentTitle ? <h1 className='text-3xl text-white font-bold'>CloneGPT</h1> : <h1 className='text-3xl text-white font-bold'>{currentTitle}</h1>}
        <ul>
        {currentChat?.map((chatMessage: any, index: any) => (
          <li key={index} className="my-5">
            <p className="text-gray-300 font-bold">{chatMessage.role}</p>
            <div className="text-gray-300" id="message">
              {chatMessage.role === 'CloneGPT' ? (
                <>
                  {chatMessage.content.includes('```') ? (
                    <ReactMarkdown
                      components={{
                        pre: ({ node, ...props }) => (
                          <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                            <pre {...props} />
                          </div>
                        ),
                        code: ({ node, ...props }) => (
                          <code className='bg-black/10 rounded-lg p1' {...props} />
                        )
                      }}
                      className={'text-sm overflow-hidden leading-7'}
                    >
                      {chatMessage.content || ''}
                    </ReactMarkdown>
                  ) : (
                    <Typewriter
                      words={[chatMessage.content]}
                      typeSpeed={20}
                    />
                  )}
                </>
              ) : chatMessage.content}
            </div>
          </li>
        ))}
        </ul>
        <div className='w-full'>
          <div className="flex gap-3 items-center">
            <input 
              placeholder="Type your message..." 
              value={inputValue} 
              onChange={handleInputChange} 
              onKeyPress={handleKeyPress}
              className='w-full h-10 bg-transparent border-2 text-white rounded border-gray-400 p-2' 
              type='text'
            />
            <div onClick={getMessages}>
              <IoMdSend className="text-white"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;