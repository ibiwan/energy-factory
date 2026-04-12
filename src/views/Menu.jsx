import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu">
      <h1>Energy Factory</h1>
      <nav>
        <Link to="/game">Play</Link>
      </nav>
    </div>
  )
}
