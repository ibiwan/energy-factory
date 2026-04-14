// Heat Inlet — warm orange fluid, pipe exits right → down
// Draws heat FROM neighbors INTO the reactor
export default function HeatInlet({ color = '#39ff14' }) {
  return (
    <svg className="heat-inlet" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`inlet-fluid-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#cc2200" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id={`inlet-glass-${color}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="30%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="70%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)"/>
        </linearGradient>
        <clipPath id={`inlet-clip-${color}`}>
          <rect x="4" y="6" width="22" height="34"/>
        </clipPath>
      </defs>

      {/* Tank body outline */}
      <rect x="3" y="5" width="24" height="36" rx="3" fill="#1a1010" stroke="#3a2010" strokeWidth="1.5"/>

      {/* Fluid fill — about 60% */}
      <rect x="4" y="20" width="22" height="20"
        fill={`url(#inlet-fluid-${color})`}
        clipPath={`url(#inlet-clip-${color})`}/>

      {/* Fluid surface shimmer */}
      <rect x="4" y="19" width="22" height="2" fill="#ff8833" opacity="0.6"
        clipPath={`url(#inlet-clip-${color})`}/>

      {/* Glass sheen */}
      <rect x="3" y="5" width="24" height="36" rx="3"
        fill={`url(#inlet-glass-${color})`}/>

      {/* End caps */}
      <rect x="7" y="3"  width="16" height="4" rx="1" fill="#2a1a10"/>
      <rect x="7" y="39" width="16" height="4" rx="1" fill="#2a1a10"/>

      {/* Pipe — horizontal exit right */}
      <rect x="27" y="17" width="11" height="6" fill="#1e2010"/>
      <rect x="27" y="17" width="11" height="2" fill={color} opacity="0.5"/>

      {/* Pipe — vertical down */}
      <rect x="33" y="22" width="6"  height="38" fill="#1e2010"/>
      <rect x="33" y="22" width="2"  height="38" fill={color} opacity="0.5"/>

      {/* Flow arrow */}
      <polygon points="28,19 33,20 28,21.5" fill="#ff6600" opacity="0.9"/>
    </svg>
  )
}
