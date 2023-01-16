import { useEffect, useState } from 'react'
import './App.css'
import "xp.css/dist/98.css"
import Window from './Window'
import GameView from './GameView'
// import SockTest from './SockTest'
import io from 'socket.io-client'
import PreviewView from './PreviewView'

const socket = io('http://localhost:3000')


function App() {
  const [count, setCount] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [gd, setgd] = useState<any>(null)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('serverTest', (...args) => {
      console.log(args)
    })

    socket.on('receiveGameStateUpdate', (gameStateObject) => {
      setgd(gameStateObject)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('serverTest')
    }
  }, [])

  const joinRoom = (gameId: string) => {
    socket.emit('joinRoom', gameId, (res: string) => {
      console.log(res)
    })
  } 
  const sendGameState = (gameStateObject: any, gameId: string) => {
    socket.emit('sendGameStateUpdate', gameStateObject, gameId, )
    
  } 

  
  return (
    <div className="App">
      {/* <Window title={"Multi-2048"}>
        <p>There's so much room for activities!</p>
      </Window>
      <Window title={"Multi-2048"}>
        <div>Test</div>
        <button>Click Me</button>
      </Window>  */}
      <Window title={"Multi-2048"}>
        <GameView joinRoom={joinRoom} sendGameState={sendGameState}/>
      </Window> 
      <Window title={"Multi-2048"}>
        <PreviewView data={gd} />
      </Window> 
      {/*<Window title="socketIotest">
        <SockTest /> 
    </Window> */}
    </div>
  )
}

export default App