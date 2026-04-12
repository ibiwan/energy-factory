import usePowerStore from '../store/powerStore'
import { formatNumber, formatDelta } from '../utils/format'

export default function PowerBar() {
  const power = usePowerStore((state) => state.power)
  const maxPower = usePowerStore((state) => state.maxPower)
  const delta = usePowerStore((state) => state.delta)
  const fillPct = maxPower > 0 ? (power / maxPower) * 100 : 0

  return (
    <div className="power-bar">
      <div className="power-bar-fill" style={{ width: `${fillPct}%` }} />
      <span className="power-bar-text">
        Power: {formatNumber(Math.floor(power))} / {formatNumber(maxPower)} ({formatDelta(delta, true)} per tick)
      </span>
    </div>
  )
}
