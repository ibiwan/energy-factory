import useCashStore from '../store/cashStore'
import { formatCash } from '../utils/format'

export default function CashDisplay() {
  const cash = useCashStore((state) => state.cash)
  const flash = useCashStore((state) => state.flash)

  return (
    <div className={`cash-display${flash ? ' flash' : ''}`}>
      {formatCash(cash)}
    </div>
  )
}
