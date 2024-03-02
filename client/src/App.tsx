import { IoMdSend } from "react-icons/io";

function App() {

  const getMessages = async () => {

    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: 'hello how are you?'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const response = await fetch('http://localhost:5000/completions', options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-screen w-screen">
      <section className='h-screen w-1/6 bg-black p-5 text-white flex flex-col justify-between'>
        <button className='border-white bg-transparent text-white w-full rounded-xl p-3 mb-10'>+ New Chat</button>
        <ul className='flex flex-col items-center gap-5'>
        </ul>
        <nav className=''>
          <p>Made by João Dantas</p>
        </nav>
      </section>

      <section className='bg-gray-900 h-screen w-full flex flex-col items-center justify-between p-5'>
        <h1 className='text-3xl text-white font-bold'>CloneGPT</h1>

        <ul>

        </ul>

        <div className='w-full'>
          <div className="flex gap-3 items-center">
            <input className='w-full h-10 bg-transparent border-2 text-white rounded border-gray-400 p-2' type='text'/>
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
