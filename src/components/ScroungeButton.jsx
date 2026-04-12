import useCashStore from '../store/cashStore'
import usePowerStore from '../store/powerStore'

export default function ScroungeButton() {
  const cash = useCashStore((state) => state.cash)
  const add = useCashStore((state) => state.add)
  const power = usePowerStore((state) => state.power)

  if (cash >= 10 || power > 0) return null

  return (
    <button className="status-btn" onClick={() => add(1)}>
      Scrounge for cash +$1
    </button>
  )
}
