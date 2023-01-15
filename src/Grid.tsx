import React from 'react'

type Grid = {
  grid: number[][]
}


const Grid = ({ grid }: Grid) => {
  console.log({ grid })
  return (
    <div style={{ padding: '8px' }}>
      {grid.map((row: number[], x) => {
        return (
            <div className='row' style={{ display: 'flex', gap: '16px', justifyContent: 'center' }} key={`${x}-${row.join('')}`}>
              {row.map((val: number, y) => {
                return (
                  <p className='column' style={{fontSize: '2em', margin: '0px'}} key={`${y}-${val}`}>{val}</p>
                )
              })}
            </div>
        )
      })}
    </div>

  )
}

export default Grid