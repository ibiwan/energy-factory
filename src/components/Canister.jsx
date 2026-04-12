export default function Canister({ fillLevel = 0.5, className = '' }) {
  return (
    <svg
      className={`canister ${className}`}
      viewBox="0 0 40 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Endcap gradient - horizontal with bright streak */}
        <linearGradient id="cap-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="25%" stopColor="#555" />
          <stop offset="35%" stopColor="#888" />
          <stop offset="42%" stopColor="#555" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>

        {/* Glass highlight streak */}
        <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="15%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Glass edge */}
        <linearGradient id="glass-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="8%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="92%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>

        <clipPath id="glass-clip">
          <rect x="6" y="12" width="28" height="36" />
        </clipPath>
      </defs>

      {/* Fluid fill */}
      <rect
        x="6"
        y={12 + 36 * (1 - fillLevel)}
        width="28"
        height={36 * fillLevel}
        fill="#39ff14"
        opacity="0.85"
        clipPath="url(#glass-clip)"
      />

      {/* Glass body */}
      <rect x="6" y="12" width="28" height="36" fill="url(#glass-edge)" />
      <rect x="6" y="12" width="28" height="36" fill="url(#glass-grad)" />

      {/* Top endcap */}
      <rect x="4" y="0" width="32" height="12" rx="1" fill="url(#cap-grad)" />

      {/* Bottom endcap */}
      <rect x="4" y="48" width="32" height="12" rx="1" fill="url(#cap-grad)" />
    </svg>
  )
}
