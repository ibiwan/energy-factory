import usePowerStore from '../store/powerStore'
import useCashStore from '../store/cashStore'

export default function SellPowerButton() {
  const power = usePowerStore((state) => state.power)
  const setPower = usePowerStore((state) => state.setPower)
  const addCash = useCashStore((state) => state.add)

  const sellable = Math.floor(power)

  const handleClick = () => {
    if (sellable <= 0) return
    setPower(power - sellable)
    addCash(sellable)
  }

  return (
    <button className="status-btn" onClick={handleClick}>
      Sell Power +${sellable}
    </button>
  )
}
