import Window from "../../components/Window"
import React, { useEffect, useState } from 'react'

type Highscore = {
  username: string;
  score: Number
}

const HighScoreView = () => {
  const [highscores, setHighscores] = useState<Highscore[]>([])
  const [fetching, setFetching] = useState(false)
  useEffect(() => {
    fetchHighScores(false)
  }, [])

  const fetchHighScores = (delay=true) => {
    setFetching(true)
    fetch('https://www.ratdalservices.no/api/highscore')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setHighscores(data.data)
        setTimeout(() => {
          setFetching(false)
        }, delay ? 5000 : 0)
      })
    .catch((e) => {
      console.log(e)
      setTimeout(() => {
        setFetching(false)
      }, delay ? 5000 : 0)
    })
  }

  return (
    <Window width={240}>
        <h6 style={{ marginBlockStart: '1em', marginBlockEnd: '0.5em', fontSize: '1.3em' }}>Highscores</h6>
      <div>
        <ul className='tree-view' style={{maxHeight: '353px', overflow: 'auto'}}>
          {highscores.map((hs, i) => {
            return (
              <li key={hs?.username+'-'+i}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '8px' }}>
                    <p>
                      <span style={{paddingRight: '8px'}}>{i+1}.</span>{hs.username}
                    </p>
                  <p>
                    {String(hs.score)}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
      <button disabled={fetching} onClick={() => fetchHighScores()} style={{marginTop: 8, marginLeft: 'auto'}}>Refresh</button>
      </div>
    </Window>
  )
}

export default HighScoreView