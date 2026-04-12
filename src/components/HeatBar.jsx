import useHeatStore from '../store/heatStore'
import { formatTenths, formatDelta } from '../utils/format'

function heatColor(pct) {
  if (pct >= 90) return '#c02020'
  if (pct >= 75) return '#d07020'
  if (pct >= 50) return '#b0a020'
  return '#1a6a1a'
}

export default function HeatBar() {
  const heat = useHeatStore((state) => state.heat)
  const maxHeat = useHeatStore((state) => state.maxHeat)
  const delta = useHeatStore((state) => state.delta)
  const pct = maxHeat > 0 ? (heat / maxHeat) * 100 : 0
  const fillPct = Math.min(pct, 100)

  return (
    <div className="heat-bar">
      <div
        className="heat-bar-fill"
        style={{ width: `${fillPct}%`, background: heatColor(pct) }}
      />
      <span className="heat-bar-text">
        Heat: {formatTenths(heat)} / {formatTenths(maxHeat)} ({formatDelta(delta, true)} per tick)
      </span>
    </div>
  )
}
