import useHeatStore from '../store/heatStore'
import { formatTenths } from '../utils/format'

export default function DissipateButton() {
  const heat = useHeatStore((state) => state.heat)
  const dissipationRate = useHeatStore((state) => state.dissipationRate)
  const addHeat = useHeatStore((state) => state.addHeat)

  return (
    <button className="status-btn" onClick={() => addHeat(-1)}>
      -1 Heat ({formatTenths(-dissipationRate)} per tick)
    </button>
  )
}
