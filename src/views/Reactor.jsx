import ToolPalette from '../components/ToolPalette'
import ToolDescription from '../components/ToolDescription'
import ReactorFloor from '../components/ReactorFloor'

export default function Reactor() {
  return (
    <div className="view reactor">
      <ToolPalette />
      <div className="reactor-main">
        <ToolDescription />
        <ReactorFloor />
      </div>
    </div>
  )
}
