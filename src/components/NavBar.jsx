import { NavLink } from 'react-router-dom'
import SpeedControls from './SpeedControls'

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <NavLink to="/reactor" className={({ isActive }) => `nav-reactor${isActive ? ' active' : ''}`} title="Reactor">Reactor</NavLink>
      <NavLink to="/upgrades" className={({ isActive }) => `nav-upgrades${isActive ? ' active' : ''}`} title="Upgrades">Upgrades</NavLink>
      <NavLink to="/prestige" className={({ isActive }) => `nav-prestige${isActive ? ' active' : ''}`} title="Prestige">Prestige</NavLink>
      <NavLink to="/cheats" className={({ isActive }) => `nav-cheats${isActive ? ' active' : ''}`} title="Cheats">Cheats</NavLink>
      <div className="nav-spacer" />
      <SpeedControls />
    </nav>
  )
}
