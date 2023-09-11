
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
    <div style={blocStyle(value)}>
      <p className='column' style={{ fontSize: fs, margin: '0px' }} >{value !== 0 && value}</p>

    </div>
  )
}

const blocStyle = (v: number) => ({ 
  boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey',
  // border: '1px solid black', 
  color: blocCol[v],
  height: '48px', 
  width: '48px', 
  display: 'flex', 
  alignItems: "center", 
  justifyContent: 'center' 
})


type tblocCol = {
  [key: number]: string
}

const blocCol: tblocCol = {
 0: '',
 2: 'gray',
 4: 'black',
 8: 'green',
 16: 'blue',
 32: 'seagreen',
 64: 'purple',
  128: 'navy',
  256: 'mediumvioletred',
  512: 'maroon',
  1024: 'firebrick',
  2048: 'red',
  4096: 'purple',
  8192: 'purple',
  16384: 'purple',
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