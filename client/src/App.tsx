import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.tsx";
import { useChatContext } from "./context/ChatContext.tsx";
import { Typewriter } from 'react-simple-typewriter';
import ReactMarkdown from 'react-markdown';
import Loader from "./components/Loader.tsx";

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
  const [loading, setLoading] = useState(false);

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
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY

    setLoading(true);

    const options = {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          model: 'gpt-4',
          messages: [
              {
                  role: 'user',
                  content: inputValue
              }
          ],
          max_tokens: 1000
      })
  }

  try {
        const response = await fetch('\n' + 'https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        updateMessage(data.choices[0].message);
        updateValue(inputValue);
      } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
          setInputValue('');
        }
  };

  const currentChat = previousChats.filter((previousChat: any) => previousChat.title === currentTitle);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar/>
      <section className='bg-gray-900 h-screen w-full flex flex-col items-left justify-between p-5 overflow-y-scroll'>
        <h1 className='text-3xl text-white font-bold mx-auto'>{(!currentTitle || !previousChats.length) ? 'CloneGPT' : currentTitle}</h1>
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

              {loading ? <Loader />: <IoMdSend className="text-white"/>}
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
