// 9V battery — squat rectangle, two terminals on top
export default function Capacitor9V() {
  return (
    <svg className="capacitor" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="9v-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1a2a1a"/>
          <stop offset="25%"  stopColor="#2a4a2a"/>
          <stop offset="38%"  stopColor="#3a6a3a"/>
          <stop offset="50%"  stopColor="#2a4a2a"/>
          <stop offset="100%" stopColor="#142014"/>
        </linearGradient>
      </defs>

      {/* Body */}
      <rect x="4" y="12" width="32" height="44" rx="2" fill="url(#9v-body)"/>
      <rect x="4" y="12" width="32" height="3" rx="1" fill="#3a5a3a"/>

      {/* Terminals on top — positive (larger) and negative (smaller) */}
      <rect x="9"  y="5" width="10" height="8" rx="2" fill="#888"/>
      <rect x="11" y="3" width="6"  height="4" rx="1" fill="#aaa"/>
      <rect x="22" y="6" width="8"  height="7" rx="2" fill="#666"/>
      <rect x="24" y="4" width="4"  height="4" rx="1" fill="#888"/>

      {/* + / - labels */}
      <text x="14" y="10" textAnchor="middle" fill="#fff" fontSize="6" fontFamily="monospace">+</text>
      <text x="26" y="10" textAnchor="middle" fill="#fff" fontSize="6" fontFamily="monospace">−</text>

      {/* Lightning bolt */}
      <polygon points="22,24 15,36 19,36 17,44 26,29 22,29 24,24"
        fill="#88ddff" opacity="0.9"/>
    </svg>
  )
}
