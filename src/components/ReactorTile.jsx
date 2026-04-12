import useEntityStore from '../store/entityStore'
import Canister from './Canister'
import Battery from './Battery'
import Explosion from './Explosion'
import useReactorTile from './useReactorTile'

export default function ReactorTile({ x, y }) {
  const id = `${x}-${y}`
  const entity = useEntityStore((state) => state.entities[id])
  const { handleMouseDown, handleMouseEnter, handleContextMenu } = useReactorTile(id, entity)

  return (
    <div
      className="reactor-tile"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onContextMenu={handleContextMenu}
    >
      {entity?.type === 'canister' && (
        <Canister fillLevel={entity.life / entity.maxLife} />
      )}
      {entity?.type === 'battery' && (
        <Battery heatPct={(entity.currentHeat || 0) / entity.heatCapacity} />
      )}
      {entity?.type === 'explosion' && <Explosion />}
    </div>
  )
}
