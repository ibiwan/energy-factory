import useTickStore from '../store/tickStore'
import useEntityStore from '../store/entityStore'
import useSpeedStore, { SPEEDS } from '../store/speedStore'

let intervalId = null
let unsubscribe = null

function tick() {
  const { tick, increment } = useTickStore.getState()
  useEntityStore.getState().tickAll(tick)
  increment()
}

function applySpeed() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }

  const { speedIndex } = useSpeedStore.getState()
  const { tps } = SPEEDS[speedIndex]

  if (tps === 0) {
    useTickStore.getState().setRunning(false)
    return
  }

  useTickStore.getState().setRunning(true)
  const ms = Math.round(1000 / tps)
  intervalId = setInterval(tick, ms)
}

export function startGameLoop() {
  stopGameLoop()
  unsubscribe = useSpeedStore.subscribe(applySpeed)
  applySpeed()
}

export function stopGameLoop() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
  useTickStore.getState().setRunning(false)
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    startGameLoop()
  })
}
