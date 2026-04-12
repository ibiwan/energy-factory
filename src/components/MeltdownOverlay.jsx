import useUiStore from '../store/uiStore'

export default function MeltdownOverlay() {
  const meltdown = useUiStore((state) => state.meltdown)

  if (!meltdown) return null

  return (
    <div className="meltdown-overlay">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#e02020" opacity="0.9" />
      </svg>
      <span className="meltdown-text">MELTDOWN</span>
    </div>
  )
}
