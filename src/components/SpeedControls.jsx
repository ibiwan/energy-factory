import useSpeedStore, { SPEEDS } from '../store/speedStore'

const ICONS = {
  pause: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
      <polygon points="6,4 20,12 6,20" />
    </svg>
  ),
  fast: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
      <polygon points="2,4 12,12 2,20" />
      <polygon points="12,4 22,12 12,20" />
    </svg>
  ),
  fastest: (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
      <polygon points="1,4 8,12 1,20" />
      <polygon points="9,4 16,12 9,20" />
      <polygon points="17,4 24,12 17,20" />
    </svg>
  ),
}

export default function SpeedControls() {
  const speedIndex = useSpeedStore((state) => state.speedIndex)
  const setSpeed = useSpeedStore((state) => state.setSpeed)

  return (
    <div className="speed-controls">
      {SPEEDS.map((speed, i) => (
        <button
          key={speed.label}
          className={`speed-btn${speedIndex === i ? ' active' : ''}`}
          onClick={() => setSpeed(i)}
          title={speed.label}
        >
          {ICONS[speed.label]}
        </button>
      ))}
    </div>
  )
}
