import useUiStore from '../store/uiStore'

export default function Entity({ id, entity }) {
  const selectedId = useUiStore((state) => state.selectedEntityId)
  const selectEntity = useUiStore((state) => state.selectEntity)
  const isSelected = selectedId === id

  return (
    <div
      className={`entity${isSelected ? ' selected' : ''}`}
      onClick={() => selectEntity(id)}
    >
      {entity.name ?? id}
    </div>
  )
}
