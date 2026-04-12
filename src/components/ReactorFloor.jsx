import ReactorTile from './ReactorTile'
import MeltdownOverlay from './MeltdownOverlay'

const GRID_SIZE = 12

export default function ReactorFloor() {
  const tiles = []
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      tiles.push(<ReactorTile key={`${x}-${y}`} x={x} y={y} />)
    }
  }

  return (
    <div className="reactor-floor-wrapper">
      <div
        className="reactor-floor"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {tiles}
      </div>
      <MeltdownOverlay />
    </div>
  )
}
