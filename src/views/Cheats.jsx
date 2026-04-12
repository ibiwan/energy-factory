import useCheatStore from '../store/cheatStore'

function Toggle({ label, active, onToggle }) {
  return (
    <button
      className={`cheat-toggle${active ? ' active' : ''}`}
      onClick={onToggle}
    >
      {active ? '✓' : '✗'} {label}
    </button>
  )
}

export default function Cheats() {
  const startCash = useCheatStore((state) => state.startCash)
  const fastDissipate = useCheatStore((state) => state.fastDissipate)
  const toggle = useCheatStore((state) => state.toggle)

  return (
    <div className="view cheats">
      <h2>Cheats</h2>
      <p style={{ marginBottom: 16, color: '#999' }}>Toggles are saved and apply on reload.</p>
      <div className="cheat-list">
        <Toggle
          label="Start with $10,000"
          active={startCash}
          onToggle={() => toggle('startCash')}
        />
        <Toggle
          label="100x heat dissipation"
          active={fastDissipate}
          onToggle={() => toggle('fastDissipate')}
        />
      </div>
    </div>
  )
}
