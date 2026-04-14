// Car battery — wide squat box, two chunky terminals on top
export default function CapacitorCar() {
  return (
    <svg className="capacitor" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2a2a2a"/>
          <stop offset="100%" stopColor="#111"/>
        </linearGradient>
      </defs>

      {/* Main body */}
      <rect x="2" y="18" width="36" height="38" rx="2" fill="url(#car-body)"/>
      {/* Top ridge */}
      <rect x="2" y="14" width="36" height="6"  rx="1" fill="#333"/>

      {/* Cell vents — row of lines */}
      <line x1="8"  y1="26" x2="8"  y2="50" stroke="#444" strokeWidth="1"/>
      <line x1="14" y1="26" x2="14" y2="50" stroke="#444" strokeWidth="1"/>
      <line x1="20" y1="26" x2="20" y2="50" stroke="#444" strokeWidth="1"/>
      <line x1="26" y1="26" x2="26" y2="50" stroke="#444" strokeWidth="1"/>
      <line x1="32" y1="26" x2="32" y2="50" stroke="#444" strokeWidth="1"/>

      {/* Positive terminal */}
      <rect x="6"  y="6"  width="10" height="10" rx="2" fill="#cc2222"/>
      <rect x="9"  y="3"  width="4"  height="5"  rx="1" fill="#dd3333"/>
      <text x="11" y="13" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace">+</text>

      {/* Negative terminal */}
      <rect x="24" y="6"  width="10" height="10" rx="2" fill="#222255"/>
      <rect x="27" y="3"  width="4"  height="5"  rx="1" fill="#333366"/>
      <text x="29" y="13" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace">−</text>

      {/* Lightning bolt */}
      <polygon points="22,22 15,36 19,36 17,46 26,32 22,32 24,22"
        fill="#ff88cc" opacity="0.9"/>

      {/* Warning stripe */}
      <rect x="2" y="50" width="36" height="6" rx="1" fill="#333"/>
      <rect x="2"  y="51" width="6"  height="4" fill="#cc9900" opacity="0.6"/>
      <rect x="14" y="51" width="6"  height="4" fill="#cc9900" opacity="0.6"/>
      <rect x="26" y="51" width="6"  height="4" fill="#cc9900" opacity="0.6"/>
    </svg>
  )
}
