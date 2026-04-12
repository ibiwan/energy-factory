import useTickStore from '../store/tickStore'

export default function TickDisplay() {
  const tick = useTickStore((state) => state.tick)

  return <p className="tick-display">Tick: {tick}</p>
}
