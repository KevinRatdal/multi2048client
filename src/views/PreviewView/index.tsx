import React from 'react'
import Grid from '../../components/Grid'
import Window from '../../components/Window'

type PreviewView = {
  data: any
}

const PreviewView = ({ data }: PreviewView) => {
  return (
    <Window title={`Multi-2048 - ${data?.pName} `}>
      <div style={{ userSelect: 'none' }}>
        <h6 style={{ marginBlockStart: '1em', marginBlockEnd: '0.5em', fontSize: '1.3em' }}>Score: {data.gScore}</h6>
        {data?.grid &&
          <Grid grid={data?.grid} />}
        {data?.finished && <p>Finished</p>}
      </div>
    </Window>
  )
}

export default PreviewView