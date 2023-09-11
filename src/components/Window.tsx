import React, { useState } from 'react'
import Draggable from 'react-draggable'

type Props = {
  children?: React.ReactNode,
  width?: Number,
  title?: String,
  zIndex?: number
  onMinimize?: Function
  onMaximise?: Function
  onClose?: Function
  windowStyle?: React.CSSProperties | undefined
}

const Window = ({ children, width = 300, title, zIndex, onMinimize, onMaximise, onClose, windowStyle }: Props) => {
  const [isFocused, setIsFocused] = useState(false)
  const handleIsFocused = () => {
    setIsFocused(prev => !prev)
  }

  const handleOnMinimize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onMinimize?.(event)
  }

  const handleOnMaximize = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onMaximise?.(event)
  }

  const handleOnClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onClose?.(event)
  }


  return (
    <Draggable handle='.title-bar' bounds='parent'>
      {/* <Draggable handle='.title-bar' bounds={{left: 0, top: 0}}> */}
      <div className={"window"} style={{ width: `${width}px`, zIndex: zIndex, ...windowStyle }}>
        <div className="title-bar" style={{ userSelect: 'none' }}>
          <div className="title-bar-text" style={{cursor: 'unset'}}>{title}</div>
          <div className="title-bar-controls">
            <button onClick={handleOnMinimize} aria-label="Minimize"></button>
            <button onClick={handleOnMaximize} aria-label="Maximize"></button>
            <button onClick={handleOnClose} aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          {children}
        </div>
      </div>
    </Draggable>
  )
}

export default Window