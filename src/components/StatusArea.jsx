import CashDisplay from './CashDisplay'
import ScroungeButton from './ScroungeButton'
import HeatBar from './HeatBar'
import DissipateButton from './DissipateButton'
import PowerBar from './PowerBar'
import SellPowerButton from './SellPowerButton'

export default function StatusArea() {
  return (
    <div className="status-area">
      <CashDisplay />
      <ScroungeButton />
      <HeatBar />
      <DissipateButton />
      <PowerBar />
      <SellPowerButton />
    </div>
  )
}
