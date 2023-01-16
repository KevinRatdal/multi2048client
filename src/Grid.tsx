
type Grid = {
  grid: number[][]
}


const Grid = ({ grid }: Grid) => {
  console.log({ grid })
  return (
    <div style={{ padding: '8px', display: "flex", flexDirection: "column", gap: '4px' }}>
      {grid.map((row: number[], x) => {
        return (
            <div className='row' style={{ display: 'flex', gap: '4px', justifyContent: 'center' }} key={`${x}-${row.join('')}`}>
              {row.map((val: number, y) => {
                return (
                  <Bloc key={`${y}-${val}`} value={val} />
                )
              })}
            </div>
        )
      })}
    </div>

  )
}

export default Grid


type Bloc = {
  value: number
}

export const Bloc = ({value}: Bloc) => {
  let lengthString = value.toString().length
  let fs = '2em'
  if (`Length_${lengthString}` in fontSizes) {
    fs = fontSizes[`Length_${lengthString}`]
  }

  return (
    <div style={{border: '1px solid black', height: '48px', width: '48px', display: 'flex', alignItems: "center", justifyContent: 'center'}}>
      <p className='column' style={{ fontSize: fs, margin: '0px' }} >{value}</p>

    </div>
  )
}

type tfontSizes = {
  [key: string]: string
}

const fontSizes: tfontSizes = {
  'Length_1': '2.4em',
  'Length_2': '2.4em',
  'Length_3': '2em',
  'Length_4': '1.6em',
  'Length_5': '1em',
  'Length_6': '1em',
}