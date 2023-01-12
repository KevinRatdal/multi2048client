import React from 'react'
import Draggable from 'react-draggable'
type Props = {
    children?: React.ReactNode,
    width?: Number,
    title?: String
}

const Window = ({children, width=300, title}: Props) => {
  return (
    <Draggable handle='.title-bar'>
    <div className="window" style={{width: `${width}px`}}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <p>There's so much room for activities!</p>
        {children}
      </div>
    </div>
    </Draggable>
  )
}

export default Window