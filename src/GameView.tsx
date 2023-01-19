import React, { useEffect, useRef, useState } from 'react'
import { Game } from './Game'
import Grid from './Grid'
import Window from './Window'

type GameView = {
  sendGameState?: Function,
  joinRoom?: Function
}

const GameView = ({ sendGameState, joinRoom }: GameView) => {
  const [grid, setGrid] = useState<number[][] | null>(null)
  const [gScore, setScore] = useState<number>(0)
  const [debug, setDebug] = useState(false)
  const [gameId, setGameId] = useState(0)
  const [roomId, setRoomId] = useState('')
  const [currentPName, setCurrentPName] = useState('')

  let gameRef = useRef<Game | null>(null)
  let containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gameRef.current = new Game()
    let gridValue = gameRef.current.getGrid()
    setGrid([...gridValue])
    let gameScore = gameRef.current.getScore()
    setScore(gameScore)
  }, [gameId])

  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.addEventListener('keydown', (event) => {
        console.log(event)
        if (event.code === 'ArrowUp') {
          handleMove('up')
        }
        if (event.code === 'ArrowDown') {
          handleMove('down')
        }
        if (event.code === 'ArrowLeft') {
          handleMove('left')
        }
        if (event.code === 'ArrowRight') {
          handleMove('right')
        }
      })
      containerRef.current.addEventListener('click', () => {
        containerRef.current?.focus()
      })
    }
  }, [])


  useEffect(() => {
    if (typeof sendGameState === 'function' && roomId !== '') {
      sendGameState({ grid: grid, gScore: gScore, player: 'player' }, roomId)
    }
  }, [grid, gScore, roomId])


  const handleJoinRoom = (_roomId: string, pName: string) => {
    if (roomId === '' && typeof joinRoom === 'function') {
      joinRoom(_roomId, pName)
      setCurrentPName(pName)
      setRoomId(_roomId)
      setDebug(false)
    }

  }

  const handleView = () => {
    if (gameRef.current !== null) {
      gameRef.current.viewGrid()
    }
  }


  const handleRenderView = () => {
    if (gameRef.current !== null) {
      let gridValue = gameRef.current.getGrid()
      console.log(JSON.stringify(gridValue))
      setGrid([...gridValue])
      let gameScore = gameRef.current.getScore()
      setScore(gameScore)
    }
  }
  const handleSetAndRenderView = () => {
    if (gameRef.current !== null) {
      gameRef.current._setRandomSquare()
      let gridValue = gameRef.current.getGrid()
      setGrid([...gridValue])
    }
  }
  const handleRandomSquare = () => {
    if (gameRef.current !== null) {
      gameRef.current._setRandomSquare()
    }
  }

  const handleMove = (direction: string) => {
    if (gameRef.current !== null) {
      gameRef.current.move(direction)
      handleRenderView()
    }
  }
  console.log('grid from gameview', { grid })

  return (
    <Window title={`Multi-2048 - ${currentPName} - ${roomId}`} zIndex={100}>
      <div ref={containerRef} style={{userSelect: 'none'}}>
        <h6 style={{ marginBlockStart: '1em',marginBlockEnd: '0.5em', fontSize: '1.3em'}}>Score: {gScore}</h6>
        <div>
          {(grid !== null) && <Grid grid={grid} />}
        </div>
        <button disabled={!!(roomId)} onClick={() => handleJoinRoom('test1', `player_${Math.floor(Math.random() * 99)}`)}>join room test1</button>
        <button>Focus</button>
        {debug &&
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', padding: '16px' }}>
            <button onClick={handleView}>View</button>
            <button onClick={handleRenderView}>refresh view</button>
            <button onClick={handleSetAndRenderView}>setAndRefresh view</button>
            <button onClick={handleRandomSquare}>setRandomSquare</button>
            <button disabled={!!(roomId)} onClick={() => handleJoinRoom('test1', `player_${Math.floor(Math.random() * 99)}`)}>join room test1</button>
          </div>
        }
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
          <button onClick={() => handleMove('up')}>Up</button>
          <div style={{ display: 'flex', alignContent: 'center', gap: 25, padding: '1px' }}>
            <button onClick={() => handleMove('left')}>Left</button>
            <button onClick={() => handleMove('right')}>Right</button>
          </div>
          <button onClick={() => handleMove('down')}>Down</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onDoubleClick={() => setDebug(prev => !prev)}>DEBUG</button>
          <button onClick={() => setGameId(prevGameId => prevGameId + 1)}> Restart</button>
        </div>
      </div>
    </Window>
  )
}

export default GameView