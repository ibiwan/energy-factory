import useEntityStore from '../store/entityStore'
import Canister from './Canister'
import CanisterDouble from './CanisterDouble'
import CanisterQuad from './CanisterQuad'
import Capacitor from './Capacitor'
import CapacitorD from './CapacitorD'
import Capacitor9V from './Capacitor9V'
import CapacitorCar from './CapacitorCar'
import CapacitorTesla from './CapacitorTesla'
import HeatVent from './HeatVent'
import HeatExchanger from './HeatExchanger'
import HeatInlet from './HeatInlet'
import HeatOutlet from './HeatOutlet'
import Reflector from './Reflector'
import Explosion from './Explosion'
import TileStatusBar from './TileStatusBar'
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
      {entity?.type === 'canister' && (() => {
        const fill = entity.life / entity.maxLife
        const color = entity.color || '#39ff14'
        const Icon = entity.pulses >= 3 ? CanisterQuad
                   : entity.pulses >= 2 ? CanisterDouble
                   : Canister
        return (
          <>
            <Icon fillLevel={fill} color={color} />
            <TileStatusBar pct={fill} mode="life" />
          </>
        )
      })()}
      {entity?.type === 'capacitor' && (() => {
        const ICONS = {
          capacitorD:     <CapacitorD />,
          capacitor9V:    <Capacitor9V />,
          capacitorCar:   <CapacitorCar />,
          capacitorTesla: <CapacitorTesla />,
        }
        const Icon = ICONS[entity.icon] ?? <Capacitor />
        return (
          <>
            {Icon}
            <TileStatusBar pct={(entity.currentHeat || 0) / entity.heatCapacity} mode="heat" />
          </>
        )
      })()}
      {entity?.type === 'heatExchanger' && (
        <>
          <HeatExchanger color={entity.color || '#39ff14'} />
          <TileStatusBar pct={(entity.currentHeat || 0) / entity.heatCapacity} mode="heat" />
        </>
      )}
      {entity?.type === 'heatVent' && (
        <>
          <HeatVent color={entity.color || '#4455aa'} />
          <TileStatusBar pct={(entity.currentHeat || 0) / entity.heatCapacity} mode="heat" />
        </>
      )}
      {entity?.type === 'reflector' && (
        <>
          <Reflector life={entity.life} color={entity.color || '#aaccff'} />
          <TileStatusBar pct={entity.life / entity.maxLife} mode="life" />
        </>
      )}
      {entity?.type === 'heatInlet' && <HeatInlet color={entity.color || '#39ff14'} />}
      {entity?.type === 'heatOutlet' && <HeatOutlet color={entity.color || '#39ff14'} />}
      {entity?.type === 'explosion' && <Explosion />}
    </div>
  )
}
