import { IoMdSend } from "react-icons/io";
import { useEffect } from "react";
import { environment } from '../environment.ts';
import Sidebar from "./components/Sidebar.tsx";
import { useChatContext } from "./context/ChatContext.tsx";
import TypewriterComponent from "typewriter-effect";

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
      typeText(document.getElementById('message'), data.choices[0].message)
    } catch (error) {
      console.error(error);
    }
  }

  const currentChat = previousChats.filter((previousChat: any) => previousChat.title === currentTitle);

  const loader = (element: any) => {
    element.textContent = '';
    let loadInterval = setInterval(() => {
      element.textContent += '.';

      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  };

  const typeText = (element: any, text: string) => {
    console.log(element, text)
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20)
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar/>

      <section className='bg-gray-900 h-screen w-full flex flex-col items-center justify-between p-5'>
        {!currentTitle ? <h1 className='text-3xl text-white font-bold'>CloneGPT</h1> : <h1 className='text-3xl text-white font-bold'>{currentTitle}</h1>}

        <ul>
          {currentChat?.map((chatMessage: any, index: any) => (
            <li key={index} className="my-5">
              <p className="text-gray-300 font-bold">{chatMessage.role}</p>
              <div className="text-gray-300" id="message">{chatMessage.role === 'CloneGPT' ? (
                <TypewriterComponent 
                  options={{
                    delay: 5,
                    wrapperClassName: 'text-white',
                    strings: [
                      chatMessage.content
                    ],
                    autoStart: true,
                    deleteSpeed: 0
                  }}
                />
              ) : chatMessage.content}
              </div>
            </li>
          ))}
        </ul>

        <div className='w-full'>
          <div className="flex gap-3 items-center">
            <input placeholder="Type your message..." value={value} onChange={(e) => updateValue(e.target.value)} className='w-full h-10 bg-transparent border-2 text-white rounded border-gray-400 p-2' type='text'/>
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
