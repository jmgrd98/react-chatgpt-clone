import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

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

      <section className='bg-gray-900 h-screen w-full flex flex-col items-center p-5'>
        <h1 className='text-3xl text-white font-bold'>CloneGPT</h1>
      </section>
    </div>
  )
}

export default App
