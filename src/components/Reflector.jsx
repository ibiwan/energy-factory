export default function Reflector({ life = 1, color = '#aaccff' }) {
  const dimmed = life <= 0
  const bodyOpacity = dimmed ? 0.3 : 1

  return (
    <svg className="reflector" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      {/* Base platform */}
      <rect x="8" y="50" width="24" height="6" rx="1" fill="#2a2a2a" opacity={bodyOpacity}/>
      <rect x="8" y="50" width="24" height="2" rx="1" fill="#444" opacity={bodyOpacity}/>

      {/* Left face of prism */}
      <polygon points="20,4 8,50 20,50" fill={color} opacity={dimmed ? 0.15 : 0.55}/>
      {/* Right face of prism */}
      <polygon points="20,4 32,50 20,50" fill={color} opacity={dimmed ? 0.1 : 0.35}/>

      {/* Mirror sheen — left face */}
      <polygon points="20,4 8,50 20,50"
        fill="url(#refl-left)" opacity={dimmed ? 0.1 : 0.6}/>
      {/* Mirror sheen — right face */}
      <polygon points="20,4 32,50 20,50"
        fill="url(#refl-right)" opacity={dimmed ? 0.1 : 0.4}/>

      <defs>
        <linearGradient id="refl-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)"/>
          <stop offset="60%" stopColor="rgba(255,255,255,0.4)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)"/>
        </linearGradient>
        <linearGradient id="refl-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)"/>
          <stop offset="40%" stopColor="rgba(255,255,255,0.0)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.0)"/>
        </linearGradient>
      </defs>

      {/* Apex gem */}
      <polygon points="20,4 16,14 20,12 24,14"
        fill={color} opacity={dimmed ? 0.2 : 0.9}/>
      <polygon points="20,4 16,14 20,12"
        fill="white" opacity={dimmed ? 0.1 : 0.5}/>

      {/* Left edge outline */}
      <line x1="20" y1="4" x2="8" y2="50"
        stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      {/* Right edge outline */}
      <line x1="20" y1="4" x2="32" y2="50"
        stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
    </svg>
  )
}
