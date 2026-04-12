import GameHeader from '../components/GameHeader'
import GameArea from '../components/GameArea'
import EntityDetails from '../components/EntityDetails'
import Overlay from '../components/Overlay'

export default function MainGame() {
  return (
    <div className="main-game">
      <GameHeader />
      <GameArea />
      <EntityDetails />
      <Overlay />
    </div>
  )
}
