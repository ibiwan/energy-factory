function SmallCanister({ x, filled, color = '#39ff14' }) {
  const fill = filled ? color : '#444'
  const opacity = filled ? '0.85' : '0.5'
  // 14px wide canister: endcaps at x, body slightly inset
  return (
    <>
      {/* Top endcap */}
      <rect x={x} y="4" width="14" height="8" rx="1" fill="#3a3a3a" />
      <rect x={x+1} y="4" width="5" height="8" rx="1" fill="#555" opacity="0.6"/>
      {/* Body fill */}
      <rect x={x} y="12" width="14" height="36" fill={fill} opacity={opacity} />
      {/* Glass edge */}
      <rect x={x} y="12" width="14" height="36" fill="none"
        stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      {/* Glass streak */}
      <rect x={x+4} y="12" width="3" height="36"
        fill="rgba(255,255,255,0.35)" />
      {/* Bottom endcap */}
      <rect x={x} y="48" width="14" height="8" rx="1" fill="#3a3a3a" />
      <rect x={x+1} y="48" width="5" height="8" rx="1" fill="#555" opacity="0.6"/>
    </>
  )
}

export default function CanisterDouble({ fillLevel = 1, color = '#39ff14' }) {
  const filled = fillLevel > 0
  return (
    <svg className="canister" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <SmallCanister x={4}  filled={filled} color={color} />
      <SmallCanister x={22} filled={filled} color={color} />
    </svg>
  )
}
