import React, { useEffect, useRef, useState } from 'react'
import { Game } from './Game'
import Grid from './Grid'

const GameView = () => {
  const [grid, setGrid] = useState<number[][] | null>(null)
  const [gScore, setScore] = useState<number>(0)
  const [debug, setDebug] = useState(false)
  const [gameId, setGameId] = useState(0)
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
      } )
      containerRef.current.addEventListener('click', () => {
        containerRef.current?.focus()
      })
    }
  }, [])

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
  console.log('grid from gameview',{ grid })

  return (
    <div ref={containerRef}>
      GameView - Score: {gScore} 
      <div>
        {(grid !== null) && <Grid grid={grid} />}
      </div>
      <button>Focus</button>
      { debug &&
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', padding: '16px'}}>
        <button onClick={handleView}>View</button>
        <button onClick={handleRenderView}>refresh view</button>
        <button onClick={handleSetAndRenderView}>setAndRefresh view</button>
        <button onClick={handleRandomSquare}>setRandomSquare</button>
      </div>
      }
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px'}}>
        <button onClick={() => handleMove('up')}>Up</button>
        <div style={{display: 'flex', alignContent: 'center'}}>
          <button onClick={() => handleMove('left')}>Left</button>
          <button onClick={() => handleMove('right')}>Right</button>
        </div>
        <button onClick={() => handleMove('down')}>Down</button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: '16px'}}>
        <button onClick={() => setDebug(prev => !prev)}>{debug ? 'HIDE' : 'SHOW'} DEBUG MENU</button>
        <button onClick={() => setGameId(prevGameId => prevGameId + 1)}> Restart</button>
      </div>

    </div>
  )
}

export default GameView