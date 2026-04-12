import useEntityStore from '../store/entityStore'
import useCashStore from '../store/cashStore'
import useUiStore from '../store/uiStore'
import usePowerStore from '../store/powerStore'
import Canister from './Canister'
import Battery from './Battery'
import Explosion from './Explosion'

function placeTool(tool) {
  return {
    type: tool.type,
    tier: tool.tier,
    cost: tool.cost,
    pulses: tool.pulses,
    power: tool.power,
    heat: tool.heat,
    life: tool.life,
    maxLife: tool.life,
    powerCapacity: tool.powerCapacity,
    heatCapacity: tool.heatCapacity,
    currentHeat: 0,
  }
}

function onPlace(entity) {
  if (entity.type === 'battery') {
    usePowerStore.getState().setMaxPower(
      usePowerStore.getState().maxPower + entity.powerCapacity
    )
  }
}

function onRemove(entity) {
  if (entity.type === 'battery') {
    usePowerStore.getState().setMaxPower(
      usePowerStore.getState().maxPower - entity.powerCapacity
    )
  }
}

function canReplace(entity) {
  if (!entity) return true
  if (entity.type === 'explosion') return true
  if (entity.life !== undefined && entity.life <= 0) return true
  return false
}

function tryPlace(id, entity) {
  if (!canReplace(entity)) return false
  const tool = useUiStore.getState().selectedTool
  if (!tool) return false
  const { cash, spend } = useCashStore.getState()
  if (cash < tool.cost) {
    useCashStore.getState().flashInsufficient()
    return false
  }
  spend(tool.cost)
  if (entity) {
    onRemove(entity)
    useEntityStore.getState().remove(id)
  }
  const newEntity = placeTool(tool)
  useEntityStore.getState().add(id, newEntity)
  onPlace(newEntity)
  return true
}

// Track drag state at module level so all tiles share it
let dragMode = null // 'place' | 'remove' | null

function onGlobalMouseUp() {
  dragMode = null
  window.removeEventListener('mouseup', onGlobalMouseUp)
}

function tryRemove(id, entity) {
  if (!entity) return false
  onRemove(entity)
  useEntityStore.getState().remove(id)
  return true
}

export default function ReactorTile({ x, y }) {
  const id = `${x}-${y}`
  const entity = useEntityStore((state) => state.entities[id])

  const isAltClick = (e) =>
    e.altKey || e.shiftKey || e.metaKey || e.ctrlKey

  const handleMouseDown = (e) => {
    if (e.button === 2) return // context menu handled separately
    window.addEventListener('mouseup', onGlobalMouseUp)
    if (e.button === 0 && isAltClick(e)) {
      if (tryRemove(id, entity)) {
        dragMode = 'remove'
      }
    } else if (e.button === 0) {
      if (tryPlace(id, entity)) {
        dragMode = 'place'
      }
    }
  }

  const handleMouseEnter = () => {
    if (!dragMode) return
    const current = useEntityStore.getState().entities[id]
    if (dragMode === 'place') {
      tryPlace(id, current)
    } else if (dragMode === 'remove') {
      tryRemove(id, current)
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    if (entity) {
      tryRemove(id, entity)
    }
  }

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
