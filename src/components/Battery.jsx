export default function Battery({ heatPct = 0 }) {
  return (
    <svg className="battery" viewBox="0 0 40 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bat-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="25%" stopColor="#555" />
          <stop offset="35%" stopColor="#777" />
          <stop offset="45%" stopColor="#555" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="bat-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666" />
          <stop offset="40%" stopColor="#999" />
          <stop offset="60%" stopColor="#666" />
          <stop offset="100%" stopColor="#444" />
        </linearGradient>
      </defs>

      {/* Terminal nub */}
      <rect x="14" y="0" width="12" height="6" rx="1" fill="url(#bat-cap)" />

      {/* Body */}
      <rect x="6" y="6" width="28" height="48" rx="2" fill="url(#bat-body)" />

      {/* Lightning bolt */}
      <polygon
        points="22,16 15,32 19,32 17,44 26,28 22,28 24,16"
        fill="#c8a820"
        opacity="0.9"
      />

      {/* Heat bar background */}
      <rect x="6" y="57" width="28" height="5" rx="1" fill="#222" />

      {/* Heat bar fill */}
      <rect
        x="6"
        y="57"
        width={28 * heatPct}
        height="5"
        rx="1"
        fill={heatPct > 0.75 ? '#e02020' : heatPct > 0.5 ? '#d07020' : '#c8a820'}
      />
    </svg>
  )
}
