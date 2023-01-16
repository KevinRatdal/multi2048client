import { useState } from 'react'
import './App.css'
import "xp.css/dist/98.css"
import Window from './Window'
import GameView from './GameView'
import SockTest from './SockTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Window title={"Multi-2048"}>
        <p>There's so much room for activities!</p>
      </Window>
      <Window title={"Multi-2048"}>
        <div>Test</div>
        <button>Click Me</button>
      </Window>  */}
      {/* <Window title={"Multi-2048"}>
        <GameView />
      </Window> 
      <Window title={"Multi-2048"}>
        <GameView />
      </Window>  */}
      <Window title="socketIotest">
        <SockTest />
      </Window>
    </div>
  )
}

export default App