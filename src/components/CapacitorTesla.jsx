// Tesla Powerwall — flat panel, grid of cells, anode/cathode connectors
export default function CapacitorTesla() {
  return (
    <svg className="capacitor" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tesla-panel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0a1520"/>
          <stop offset="50%"  stopColor="#112233"/>
          <stop offset="100%" stopColor="#0a1520"/>
        </linearGradient>
      </defs>

      {/* Panel body */}
      <rect x="3" y="4" width="34" height="48" rx="2" fill="url(#tesla-panel)"/>
      <rect x="3" y="4" width="34" height="2"  rx="1" fill="#1a3a5a"/>
      <rect x="3" y="50" width="34" height="2" rx="1" fill="#1a3a5a"/>

      {/* Cell grid — 3×4 */}
      {[0,1,2].map(col =>
        [0,1,2,3].map(row => (
          <rect
            key={`${col}-${row}`}
            x={6 + col * 10}
            y={8 + row * 10}
            width="8" height="8" rx="1"
            fill="#0d2a3a"
            stroke="#1a4a6a"
            strokeWidth="0.75"
          />
        ))
      )}

      {/* Cell shimmer */}
      {[0,1,2].map(col =>
        [0,1,2,3].map(row => (
          <rect
            key={`s-${col}-${row}`}
            x={6 + col * 10}
            y={8 + row * 10}
            width="8" height="2" rx="1"
            fill="rgba(100,180,255,0.15)"
          />
        ))
      )}

      {/* Lightning bolt */}
      <polygon points="22,8 15,22 19,22 17,32 26,18 22,18 24,8"
        fill="#ff3333" opacity="0.9"/>

      {/* Tesla T logo area */}
      <rect x="14" y="48" width="12" height="4" rx="1" fill="#112233"/>
      <line x1="20" y1="49" x2="20" y2="52" stroke="#4488aa" strokeWidth="1.5"/>
      <line x1="17" y1="49" x2="23" y2="49" stroke="#4488aa" strokeWidth="1.5"/>

      {/* Anode — red, bottom right */}
      <circle cx="33" cy="55" r="3" fill="#882222"/>
      <text x="33" y="57" textAnchor="middle" fill="#fff" fontSize="4" fontFamily="monospace">+</text>

      {/* Cathode — blue, bottom left */}
      <circle cx="7"  cy="55" r="3" fill="#222266"/>
      <text x="7"  y="57" textAnchor="middle" fill="#fff" fontSize="4" fontFamily="monospace">−</text>
    </svg>
  )
}
