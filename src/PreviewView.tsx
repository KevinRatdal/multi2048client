import React from 'react'
import Grid from './Grid'

type PreviewView = {
  data: any
}

const PreviewView = ({ data }: PreviewView) => {
  return (
    <div>
        <p>{data?.player} - Score: {data?.gScore}</p>
      { data?.grid && 
      <Grid grid={data?.grid} />}
    </div>
  )
}

export default PreviewView