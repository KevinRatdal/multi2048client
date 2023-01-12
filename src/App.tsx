import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import "xp.css/dist/98.css"
import Window from './Window'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Window title={"Multi-2048"} />
      <Window title={"Multi-2048"}>
        <div>Test</div>
        <button>Click Me</button>
      </Window> 
    </div>
  )
}

export default App