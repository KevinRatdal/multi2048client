import { useEffect, useState } from 'react'
import './App.css'
import "xp.css/dist/98.css"
import Window from './Window'
import GameView from './GameView'
// import SockTest from './SockTest'
import io from 'socket.io-client'
import PreviewView from './PreviewView'
import Highscores from './Highscores'

type gameStateObject = {
  sockId?: string,
  pName?: string,
  grid: number[][], 
  gScore: number, 
  player: string
}

type gameStateState = {
  [sockId: string]: any
}

const socket = io(import.meta.env.VITE_VERCEL_WS_ADD)

function App() {
  const [count, setCount] = useState(0)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [gd, setgd] = useState<gameStateState>({})

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

      setgd(prev => {
        return {...prev, [gameStateObject.sockId]: gameStateObject}
      })
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('serverTest')
    }
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
      }
    }, false);
  }, [])

  const joinRoom = (gameId: string, pName: string) => {
    socket.emit('joinRoom', gameId, pName, (res: string) => {
      console.log(res)
    })
  } 
  const sendGameState = (gameStateObject: any, gameId: string) => {
    socket.emit('sendGameStateUpdate', gameStateObject, gameId)
    
  } 

  
  return (
    <div className="App">
      <GameView joinRoom={joinRoom} sendGameState={sendGameState}/>
      {Object.keys(gd).map((socketId) => {
        return (
          <PreviewView key={gd.sockId} data={gd[socketId]} />
        )
      })}
      <Highscores/>
      
      {/*<Window title="socketIotest">
        <SockTest /> 
    </Window> */}
    </div>
  )
}

export default App