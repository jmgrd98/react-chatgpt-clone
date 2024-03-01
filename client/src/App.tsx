import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <section className='side-bar'>
        <button>+ New Chat</button>
        <ul className='history'></ul>
        <nav>
          <p>Made by João Dantas</p>
        </nav>
      </section>

      <section className='main'>

      </section>
    </div>
  )
}

export default App
