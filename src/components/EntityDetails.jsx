import useUiStore from '../store/uiStore'
import useEntityStore from '../store/entityStore'

export default function EntityDetails() {
  const selectedId = useUiStore((state) => state.selectedEntityId)
  const clearSelection = useUiStore((state) => state.clearSelection)
  const entity = useEntityStore(
    (state) => (selectedId ? state.entities[selectedId] : null)
  )

  if (!entity) return null

  return (
    <aside className="entity-details">
      <h2>{entity.name ?? selectedId}</h2>
      <button onClick={clearSelection}>Close</button>
    </aside>
  )
}
