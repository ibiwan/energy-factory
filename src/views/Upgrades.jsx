import useUpgradeStore from '../store/upgradeStore'
import useHeatStore from '../store/heatStore'
import { formatCash } from '../utils/format'

function UpgradeCard({ name, description, level, cost, onBuy, maxLevel }) {
  const atMax = maxLevel != null && level >= maxLevel
  return (
    <div className="upgrade-card">
      <div className="upgrade-header">
        <span className="upgrade-name">{name}</span>
        <span className="upgrade-level">Lv {level}{maxLevel != null ? ` / ${maxLevel}` : ''}</span>
      </div>
      <p className="upgrade-desc">{description}</p>
      <button
        className="upgrade-buy-btn"
        onClick={onBuy}
        disabled={atMax}
      >
        {atMax ? 'MAXED' : `Buy — ${formatCash(cost)}`}
      </button>
    </div>
  )
}

export default function Upgrades() {
  const ffLevel = useUpgradeStore((s) => s.forcefulFission)
  const ffCost = useUpgradeStore((s) => s.getForcefulFissionCost())
  const buyFF = useUpgradeStore((s) => s.buyForcefulFission)
  const heat = useHeatStore((s) => s.heat)

  const ffBonus = ffLevel > 0 && heat >= 1
    ? `Current bonus: +${((ffLevel * Math.log10(Math.max(1, heat))) / 3).toFixed(2)}%`
    : 'No bonus at current heat level.'

  return (
    <div className="view upgrades">
      <h2>Upgrades</h2>
      <div className="upgrade-grid">
        <UpgradeCard
          name="Forceful Fission"
          level={ffLevel}
          cost={ffCost}
          onBuy={buyFF}
          description={`Cells produce +${ffLevel}% power per 3 orders of magnitude of reactor heat. ${ffBonus}`}
        />
      </div>
    </div>
  )
}
