import useEntityStore from '../store/entityStore'
import Entity from './Entity'

export default function GameArea() {
  const entities = useEntityStore((state) => state.entities)

  return (
    <div className="game-area">
      {Object.entries(entities).map(([id, entity]) => (
        <Entity key={id} id={id} entity={entity} />
      ))}
    </div>
  )
}
