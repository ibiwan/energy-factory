export default function Capacitor() {
  return (
    <svg className="capacitor" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
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
      <rect x="6" y="6" width="28" height="54" rx="2" fill="url(#bat-body)" />

      {/* Lightning bolt */}
      <polygon
        points="22,14 15,30 19,30 17,42 26,26 22,26 24,14"
        fill="#39ff14"
        opacity="0.9"
      />
    </svg>
  )
}
