import StatusArea from './StatusArea'
import ToolSlot from './ToolSlot'
import Canister from './Canister'
import Battery from './Battery'
import { TOOLS, TOOL_LAYOUT } from '../data/tools'

const COLS = 5
const ROWS = 10
const TOTAL = COLS * ROWS

const TOOL_RENDERERS = {
  canister: <Canister fillLevel={1} />,
  battery: <Battery />,
}

// Build index → tool map from sparse layout
const slotTools = {}
for (const [index, key] of TOOL_LAYOUT) {
  slotTools[index] = TOOLS[key]
}

export default function ToolPalette() {
  const slots = []
  for (let i = 0; i < TOTAL; i++) {
    const tool = slotTools[i] || null
    slots.push(
      <ToolSlot key={i} index={i} tool={tool}>
        {tool && TOOL_RENDERERS[tool.type]}
      </ToolSlot>
    )
  }

  return (
    <aside className="tool-palette">
      <StatusArea />
      <h3>Tools</h3>
      <div className="tool-grid">
        {slots}
      </div>
    </aside>
  )
}
