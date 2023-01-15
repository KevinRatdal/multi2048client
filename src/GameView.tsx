import React, { useEffect, useRef, useState } from 'react'
import { Game } from './Game'
import Grid from './Grid'

const GameView = () => {
  const [grid, setGrid] = useState<number[][] | null>(null)
  const [gScore, setScore] = useState<number>(0)
  let gameRef = useRef<Game | null>(null)
  useEffect(() => {
    gameRef.current = new Game()
    let gridValue = gameRef.current.getGrid()
    setGrid([...gridValue])
    let gameScore = gameRef.current.getScore()
    setScore(gameScore)
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
    <div>
      GameView - Score: {gScore} 
      <div>
        {(grid !== null) && <Grid grid={grid} />}
      </div>
      <button onClick={handleView}>View</button>
      <button onClick={handleRenderView}>refresh view</button>
      <button onClick={handleSetAndRenderView}>setAndRefresh view</button>
      <button onClick={handleRandomSquare}>setRandomSquare</button>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px'}}>
        <button onClick={() => handleMove('up')}>Up</button>
        <div style={{display: 'flex', alignContent: 'center'}}>
          <button onClick={() => handleMove('left')}>Left</button>
          <button onClick={() => handleMove('right')}>Right</button>
        </div>
        <button onClick={() => handleMove('down')}>Down</button>
      </div>

    </div>
  )
}

export default GameView