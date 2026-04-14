import useUiStore from '../store/uiStore'

export default function ToolSlot({ index, tool, children }) {
  const selectedTool = useUiStore((state) => state.selectedTool)
  const selectTool = useUiStore((state) => state.selectTool)
  const isSelected = tool && selectedTool?.name === tool.name

  const handleClick = () => {
    if (tool) selectTool(tool)
  }

  return (
    <div className={`tool-slot${isSelected ? ' selected' : ''}`} onClick={handleClick}>
      {children}
    </div>
  )
}
