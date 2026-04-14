// Heat Outlet — cool blue fluid, pipe exits left → down
// Pushes heat FROM the reactor INTO neighbors
export default function HeatOutlet({ color = '#39ff14' }) {
  return (
    <svg className="heat-outlet" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`outlet-fluid-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22aaff" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#0044cc" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id={`outlet-glass-${color}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.18)"/>
          <stop offset="30%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="70%"  stopColor="rgba(255,255,255,0.05)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)"/>
        </linearGradient>
        <clipPath id={`outlet-clip-${color}`}>
          <rect x="14" y="6" width="22" height="34"/>
        </clipPath>
      </defs>

      {/* Tank body outline */}
      <rect x="13" y="5" width="24" height="36" rx="3" fill="#0a1020" stroke="#102030" strokeWidth="1.5"/>

      {/* Fluid fill — about 60% */}
      <rect x="14" y="20" width="22" height="20"
        fill={`url(#outlet-fluid-${color})`}
        clipPath={`url(#outlet-clip-${color})`}/>

      {/* Fluid surface shimmer */}
      <rect x="14" y="19" width="22" height="2" fill="#44ccff" opacity="0.6"
        clipPath={`url(#outlet-clip-${color})`}/>

      {/* Glass sheen */}
      <rect x="13" y="5" width="24" height="36" rx="3"
        fill={`url(#outlet-glass-${color})`}/>

      {/* End caps */}
      <rect x="17" y="3"  width="16" height="4" rx="1" fill="#0a1828"/>
      <rect x="17" y="39" width="16" height="4" rx="1" fill="#0a1828"/>

      {/* Pipe — horizontal exit left */}
      <rect x="2"  y="17" width="11" height="6" fill="#101820"/>
      <rect x="2"  y="17" width="11" height="2" fill={color} opacity="0.5"/>

      {/* Pipe — vertical down */}
      <rect x="1"  y="22" width="6"  height="38" fill="#101820"/>
      <rect x="3"  y="22" width="2"  height="38" fill={color} opacity="0.5"/>

      {/* Flow arrow */}
      <polygon points="12,19 7,20 12,21.5" fill="#22aaff" opacity="0.9"/>
    </svg>
  )
}
