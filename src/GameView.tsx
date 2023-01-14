import React, { useEffect, useRef } from 'react'
import { Game} from './Game'

const GameView = () => {
   let gameRef = useRef<Game>(new Game())
  // useEffect(() => {
  //   gameRef = new Game()

  // },[])
  return (
    <div>
      GameView
      <button onClick={() => {gameRef.current.viewGrid()}}>View</button>
      <button onClick={() => {gameRef.current._setRandomSquare()}}>setRandomSquare</button>
    </div>
  )
}

export default GameView