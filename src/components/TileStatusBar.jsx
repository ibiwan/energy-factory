function lifeColor(pct) {
  if (pct >= 0.5) return '#1a6a1a'
  if (pct >= 0.25) return '#b0a020'
  return '#c02020'
}

function heatColor(pct) {
  if (pct >= 0.9) return '#c02020'
  if (pct >= 0.75) return '#d07020'
  if (pct >= 0.5) return '#b0a020'
  return '#1a6a1a'
}

export default function TileStatusBar({ pct, mode }) {
  const clamped = Math.min(1, Math.max(0, pct))
  const color = mode === 'life' ? lifeColor(clamped) : heatColor(clamped)

  return (
    <div className="tile-status-bar-track">
      <div
        className="tile-status-bar-fill"
        style={{ width: `${clamped * 100}%`, background: color }}
      />
    </div>
  )
}
