// D cell — fatter, shorter cylinder than AA
export default function CapacitorD() {
  return (
    <svg className="capacitor" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dcell-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#2a2a3a"/>
          <stop offset="20%"  stopColor="#4a4a5a"/>
          <stop offset="32%"  stopColor="#6a6a7a"/>
          <stop offset="42%"  stopColor="#4a4a5a"/>
          <stop offset="100%" stopColor="#1e1e2e"/>
        </linearGradient>
        <linearGradient id="dcell-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#555"/>
          <stop offset="40%"  stopColor="#999"/>
          <stop offset="60%"  stopColor="#666"/>
          <stop offset="100%" stopColor="#444"/>
        </linearGradient>
      </defs>

      {/* Terminal nub — wide */}
      <rect x="12" y="1" width="16" height="7" rx="2" fill="url(#dcell-cap)"/>

      {/* Body — wider/shorter than AA */}
      <rect x="3" y="8" width="34" height="46" rx="3" fill="url(#dcell-body)"/>

      {/* Label band */}
      <rect x="3" y="20" width="34" height="18" fill="#1a1a2a" opacity="0.5"/>
      <text x="20" y="32" textAnchor="middle" fill="#8888aa" fontSize="7" fontFamily="monospace">D</text>

      {/* Lightning bolt */}
      <polygon points="22,14 15,28 19,28 17,38 26,24 22,24 24,14"
        fill="#ffaa00" opacity="0.9"/>
    </svg>
  )
}
