export default function HeatExchanger({ color = '#39ff14' }) {
  // Isometric-ish 4-way pipe junction, viewed from above-left
  // Pipes are rounded tubes with top/side faces for depth
  const dark  = '#111318'
  const mid   = '#1e2028'
  const light = '#2a2e3a'

  return (
    <svg className="heat-exchanger" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">

      {/* ── LEFT ARM (horizontal, going left) ── */}
      {/* side face */}
      <rect x="2" y="23" width="14" height="5" fill={dark}/>
      {/* top face */}
      <rect x="2" y="18" width="14" height="5" fill={light}/>
      {/* color highlight strip */}
      <rect x="2" y="19" width="14" height="1.5" fill={color} opacity="0.4"/>
      {/* left end cap */}
      <rect x="2" y="18" width="2" height="10" rx="1" fill={mid}/>

      {/* ── RIGHT ARM (horizontal, going right) ── */}
      <rect x="24" y="23" width="14" height="5" fill={dark}/>
      <rect x="24" y="18" width="14" height="5" fill={light}/>
      <rect x="24" y="19" width="14" height="1.5" fill={color} opacity="0.4"/>
      <rect x="36" y="18" width="2"  height="10" rx="1" fill={mid}/>

      {/* ── TOP ARM (vertical, going up) ── */}
      {/* right face */}
      <rect x="24" y="2" width="5" height="17" fill={dark}/>
      {/* left face */}
      <rect x="19" y="2" width="5" height="17" fill={light}/>
      <rect x="20" y="2" width="1.5" height="17" fill={color} opacity="0.4"/>
      {/* top end cap */}
      <rect x="19" y="2" width="10" height="2" rx="1" fill={mid}/>

      {/* ── BOTTOM ARM (vertical, going down) ── */}
      <rect x="24" y="41" width="5" height="17" fill={dark}/>
      <rect x="19" y="41" width="5" height="17" fill={light}/>
      <rect x="20" y="41" width="1.5" height="17" fill={color} opacity="0.4"/>
      <rect x="19" y="56" width="10" height="2" rx="1" fill={mid}/>

      {/* ── CENTRAL HUB ── */}
      {/* bottom/side face */}
      <rect x="16" y="28" width="18" height="13" rx="1" fill={dark}/>
      {/* top face */}
      <rect x="16" y="18" width="18" height="13" rx="1" fill={light}/>
      {/* color accent on top */}
      <rect x="16" y="19" width="18" height="2" rx="1" fill={color} opacity="0.5"/>

      {/* Flange ring */}
      <circle cx="25" cy="24" r="5.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="25" cy="24" r="2.5" fill={mid}/>
      <circle cx="25" cy="24" r="1"   fill={color} opacity="0.8"/>

      {/* Bolt dots */}
      <circle cx="25" cy="19.5" r="0.8" fill={color} opacity="0.6"/>
      <circle cx="29.5" cy="24" r="0.8" fill={color} opacity="0.6"/>
      <circle cx="25" cy="28.5" r="0.8" fill={color} opacity="0.6"/>
      <circle cx="20.5" cy="24" r="0.8" fill={color} opacity="0.6"/>
    </svg>
  )
}
