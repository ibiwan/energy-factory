export default function HeatVent({ color = '#4455aa' }) {
  return (
    <svg className="heat-vent" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      {/* Outer duct shell */}
      <rect x="3" y="3" width="34" height="36" rx="3" fill="#1a1a24" stroke="#4a4a66" strokeWidth="2"/>
      {/* Inner duct opening */}
      <rect x="8" y="8" width="24" height="26" rx="1" fill="#0a0a10"/>

      {/* Fan blades */}
      <ellipse cx="20" cy="13" rx="6" ry="2.5" fill={color} opacity="0.9" transform="rotate(20 20 21)"/>
      <ellipse cx="20" cy="13" rx="6" ry="2.5" fill={color} opacity="0.9" transform="rotate(110 20 21)"/>
      <ellipse cx="20" cy="13" rx="6" ry="2.5" fill={color} opacity="0.9" transform="rotate(200 20 21)"/>
      <ellipse cx="20" cy="13" rx="6" ry="2.5" fill={color} opacity="0.9" transform="rotate(290 20 21)"/>

      {/* Center hub */}
      <circle cx="20" cy="21" r="3.5" fill="#22223a" stroke={color} strokeWidth="1.5"/>
      <circle cx="20" cy="21" r="1.5" fill={color}/>

      {/* Status lights — tinted by color */}
      <circle cx="10" cy="47" r="2.5" fill="#e04444"/>
      <circle cx="17" cy="47" r="2.5" fill="#44dd55"/>
      <circle cx="24" cy="47" r="2.5" fill={color} opacity="0.9"/>
      <circle cx="31" cy="47" r="2.5" fill="#eecc33"/>
    </svg>
  )
}
