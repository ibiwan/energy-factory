import { useState } from 'react'
import StatusArea from './StatusArea'
import ToolSlot from './ToolSlot'
import Canister from './Canister'
import CanisterDouble from './CanisterDouble'
import CanisterQuad from './CanisterQuad'
import Capacitor from './Capacitor'
import CapacitorD from './CapacitorD'
import Capacitor9V from './Capacitor9V'
import CapacitorCar from './CapacitorCar'
import CapacitorTesla from './CapacitorTesla'
import HeatVent from './HeatVent'
import Reflector from './Reflector'
import HeatExchanger from './HeatExchanger'
import HeatInlet from './HeatInlet'
import HeatOutlet from './HeatOutlet'
import { TOOLS } from '../data/tools'

const COLS = 5
const ROWS = 10
const TOTAL = COLS * ROWS

const TOOL_RENDERERS = {
  canister:         <Canister fillLevel={1} color="#39ff14" />,
  canisterDouble:   <CanisterDouble fillLevel={1} color="#39ff14" />,
  canisterQuad:     <CanisterQuad fillLevel={1} color="#39ff14" />,
  plutonium:        <Canister fillLevel={1} color="#ffaa00" />,
  plutoniumDouble:  <CanisterDouble fillLevel={1} color="#ffaa00" />,
  plutoniumQuad:    <CanisterQuad fillLevel={1} color="#ffaa00" />,
  thorium:          <Canister fillLevel={1} color="#88ddff" />,
  thoriumDouble:    <CanisterDouble fillLevel={1} color="#88ddff" />,
  thoriumQuad:      <CanisterQuad fillLevel={1} color="#88ddff" />,
  seaborgium:       <Canister fillLevel={1} color="#ff88cc" />,
  seaborgiumDouble: <CanisterDouble fillLevel={1} color="#ff88cc" />,
  seaborgiumQuad:   <CanisterQuad fillLevel={1} color="#ff88cc" />,
  dolorium:         <Canister fillLevel={1} color="#ff3333" />,
  doloriumDouble:   <CanisterDouble fillLevel={1} color="#ff3333" />,
  doloriumQuad:     <CanisterQuad fillLevel={1} color="#ff3333" />,
  nefastium:        <Canister fillLevel={1} color="#3322aa" />,
  nefastiumDouble:  <CanisterDouble fillLevel={1} color="#3322aa" />,
  nefastiumQuad:    <CanisterQuad fillLevel={1} color="#3322aa" />,
  reflector:        <Reflector life={1} color="#39ff14" />,
  reflector2:       <Reflector life={1} color="#ffaa00" />,
  reflector3:       <Reflector life={1} color="#88ddff" />,
  reflector4:       <Reflector life={1} color="#ff88cc" />,
  reflector5:       <Reflector life={1} color="#ff3333" />,
  capacitor:        <Capacitor />,
  capacitorD:       <CapacitorD />,
  capacitor9V:      <Capacitor9V />,
  capacitorCar:     <CapacitorCar />,
  capacitorTesla:   <CapacitorTesla />,
  heatVent:         <HeatVent color="#39ff14" />,
  heatVent2:        <HeatVent color="#ffaa00" />,
  heatVent3:        <HeatVent color="#88ddff" />,
  heatVent4:        <HeatVent color="#ff88cc" />,
  heatVent5:        <HeatVent color="#ff3333" />,
  heatExchanger:    <HeatExchanger color="#39ff14" />,
  heatExchanger2:   <HeatExchanger color="#ffaa00" />,
  heatExchanger3:   <HeatExchanger color="#88ddff" />,
  heatExchanger4:   <HeatExchanger color="#ff88cc" />,
  heatExchanger5:   <HeatExchanger color="#ff3333" />,
  heatInlet:        <HeatInlet  color="#39ff14" />,
  heatInlet2:       <HeatInlet  color="#ffaa00" />,
  heatInlet3:       <HeatInlet  color="#88ddff" />,
  heatInlet4:       <HeatInlet  color="#ff88cc" />,
  heatInlet5:       <HeatInlet  color="#ff3333" />,
  heatOutlet:       <HeatOutlet color="#39ff14" />,
  heatOutlet2:      <HeatOutlet color="#ffaa00" />,
  heatOutlet3:      <HeatOutlet color="#88ddff" />,
  heatOutlet4:      <HeatOutlet color="#ff88cc" />,
  heatOutlet5:      <HeatOutlet color="#ff3333" />,
}

const PANES = [
  {
    id: 'power',
    mode: 'grid',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <polygon points="13,2 4,14 11,14 10,22 20,9 13,9" />
      </svg>
    ),
    layout: [
      [0, 'canister'], [1, 'canisterDouble'], [2, 'canisterQuad'],
      [5, 'plutonium'], [6, 'plutoniumDouble'], [7, 'plutoniumQuad'],
      [10, 'thorium'], [11, 'thoriumDouble'], [12, 'thoriumQuad'],
      [15, 'seaborgium'], [16, 'seaborgiumDouble'], [17, 'seaborgiumQuad'],
      [20, 'dolorium'], [21, 'doloriumDouble'], [22, 'doloriumQuad'],
      [25, 'nefastium'], [26, 'nefastiumDouble'], [27, 'nefastiumQuad'],
      [30, 'reflector'], [31, 'reflector2'], [32, 'reflector3'], [33, 'reflector4'], [34, 'reflector5'],
      [35, 'capacitor'], [36, 'capacitorD'], [37, 'capacitor9V'], [38, 'capacitorCar'], [39, 'capacitorTesla'],
    ],
  },
  {
    id: 'heat',
    mode: 'grid',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 C10 6 7 7 7 11 C7 14.3 9.7 17 13 17 C13 17 11 15 11 13 C11 11 13 10 13 7 C15 9 16 11 15 13 C16 12 17 10.5 17 9 C17 6 15 4 12 2Z M9 17.5 C8 18.5 8 20 9 21 C10 22 12 22 13 21 C14 20 14 18.5 13 17.5 C12.5 18 12 18.5 12 19.5 C12 20 11.5 20.5 11 20 C10 19.5 10 18 10.5 17.5 C10 17.3 9.5 17.3 9 17.5Z" />
      </svg>
    ),
    layout: [
      [0, 'heatVent'], [1, 'heatVent2'], [2, 'heatVent3'], [3, 'heatVent4'], [4, 'heatVent5'],
      [5, 'heatExchanger'], [6, 'heatExchanger2'], [7, 'heatExchanger3'], [8, 'heatExchanger4'], [9, 'heatExchanger5'],
      [10, 'heatInlet'], [11, 'heatInlet2'], [12, 'heatInlet3'], [13, 'heatInlet4'], [14, 'heatInlet5'],
      [15, 'heatOutlet'], [16, 'heatOutlet2'], [17, 'heatOutlet3'], [18, 'heatOutlet4'], [19, 'heatOutlet5'],
    ],
  },
]

function buildSlotMap(layout) {
  const map = {}
  for (const [index, key] of layout) {
    map[index] = { ...TOOLS[key], _key: key }
  }
  return map
}

export default function ToolPalette() {
  const [paneIndex, setPaneIndex] = useState(0)
  const pane = PANES[paneIndex]

  const slotTools = buildSlotMap(pane.layout)
  const slots = []
  for (let i = 0; i < TOTAL; i++) {
    const tool = slotTools[i] || null
    slots.push(
      <ToolSlot key={i} index={i} tool={tool}>
        {tool && TOOL_RENDERERS[tool._key]}
      </ToolSlot>
    )
  }
  const content = <div className="tool-grid">{slots}</div>

  return (
    <aside className="tool-palette">
      <StatusArea />
      <div className="tool-pane-nav">
        {PANES.map((p, i) => (
          <button
            key={p.id}
            className={`tool-pane-btn${i === paneIndex ? ' active' : ''}`}
            onClick={() => setPaneIndex(i)}
            title={p.id}
          >
            {p.icon}
          </button>
        ))}
      </div>
      {content}
    </aside>
  )
}
