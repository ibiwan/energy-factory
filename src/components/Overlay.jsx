import useUiStore from '../store/uiStore'

export default function Overlay() {
  const overlay = useUiStore((state) => state.overlay)
  const closeOverlay = useUiStore((state) => state.closeOverlay)

  if (!overlay) return null

  return (
    <div className="overlay" onClick={closeOverlay}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        {overlay}
      </div>
    </div>
  )
}
