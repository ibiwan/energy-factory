function MiniCanister({ x, y, filled, dimmed = false, color = '#39ff14' }) {
  const fill = filled ? color : '#444'
  const opacity = filled ? (dimmed ? '0.55' : '0.85') : '0.35'
  return (
    <>
      {/* Top endcap */}
      <rect x={x} y={y} width="13" height="7" rx="1" fill={dimmed ? '#2a2a2a' : '#3a3a3a'} />
      <rect x={x+1} y={y} width="4" height="7" rx="1" fill="#555" opacity={dimmed ? '0.3' : '0.6'}/>
      {/* Body fill */}
      <rect x={x} y={y+7} width="13" height="30" fill={fill} opacity={opacity} />
      {/* Glass edge */}
      <rect x={x} y={y+7} width="13" height="30" fill="none"
        stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
      {/* Glass streak */}
      <rect x={x+3} y={y+7} width="3" height="30"
        fill="rgba(255,255,255,0.3)" opacity={dimmed ? '0.4' : '1'} />
      {/* Bottom endcap */}
      <rect x={x} y={y+37} width="13" height="7" rx="1" fill={dimmed ? '#2a2a2a' : '#3a3a3a'} />
    </>
  )
}

export default function CanisterQuad({ fillLevel = 1, color = '#39ff14' }) {
  const filled = fillLevel > 0
  return (
    <svg className="canister" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      {/* Back row — offset up and right, dimmed */}
      <MiniCanister x={13} y={2}  filled={filled} dimmed color={color} />
      <MiniCanister x={27} y={2}  filled={filled} dimmed color={color} />
      {/* Front row */}
      <MiniCanister x={0}  y={14} filled={filled} color={color} />
      <MiniCanister x={14} y={14} filled={filled} color={color} />
    </svg>
  )
}
