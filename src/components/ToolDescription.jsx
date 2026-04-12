import useUiStore from '../store/uiStore'

export default function ToolDescription() {
  const tool = useUiStore((state) => state.selectedTool)

  if (!tool) {
    return <div className="tool-description empty">Select a tool</div>
  }

  return (
    <div className="tool-description">
      <h3>{tool.name}</h3>
      <p className="tool-desc-text">{tool.description}</p>
      <ul className="tool-stats">
        <li>Tier: {tool.tier}</li>
        <li>Cost: ${tool.cost}</li>
        {tool.pulses != null && <li>Pulses: {tool.pulses}/tick</li>}
        {tool.power != null && <li>Power: {tool.power}/pulse</li>}
        {tool.heat != null && <li>Heat: {tool.heat}/pulse</li>}
        {tool.life != null && <li>Life: {tool.life} ticks</li>}
        {tool.powerCapacity != null && <li>+{tool.powerCapacity} max power</li>}
      </ul>
    </div>
  )
}
