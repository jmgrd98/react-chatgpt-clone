import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";

function App() {

  const [message, setMessage] = useState(null);
  const [value, setValue] = useState('');
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
        setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
        setPreviousChats((prevChats: any) => (
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
}, [message, currentTitle]);

  const getMessages = async () => {
    console.log(previousChats)

    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch('http://localhost:5000/completions', options);
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  }

  const createNewChat = () => {
    setMessage(null);
    setValue('');
    setCurrentTitle('');
  };

  const currentChat = previousChats.filter((previousChat: any) => previousChat.title === currentTitle)

  return (
    <div className="flex h-screen w-screen">
      <section className='h-screen w-1/6 bg-black p-5 text-white flex flex-col justify-between'>
        <button onClick={createNewChat} className='border-white bg-transparent text-white w-full rounded-xl p-3 mb-10'>+ New Chat</button>
        <ul className='flex flex-col items-center gap-5'>
        </ul>
        <nav className=''>
          <p>Made by João Dantas</p>
        </nav>
      </section>

      <section className='bg-gray-900 h-screen w-full flex flex-col items-center justify-between p-5'>
        {!currentTitle && <h1 className='text-3xl text-white font-bold'>CloneGPT</h1>}

        <ul>
          {currentChat.map((chatMessage: any, index: any) => <li key={index}>
            <p className="font-bold">{chatMessage.role}</p>
            <p>{chatMessage.message}</p>
            </li>)}
        </ul>

        <div className='w-full'>
          <div className="flex gap-3 items-center">
            <input value={value} onChange={(e) => setValue(e.target.value)} className='w-full h-10 bg-transparent border-2 text-white rounded border-gray-400 p-2' type='text'/>
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
