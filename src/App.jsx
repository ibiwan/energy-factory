import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'
import { startGameLoop, stopGameLoop } from './store/gameLoop'
import { applyCheats } from './store/cheatStore'
import NavBar from './components/NavBar'
import Reactor from './views/Reactor'
import Upgrades from './views/Upgrades'
import Prestige from './views/Prestige'
import Cheats from './views/Cheats'

function App() {
  useEffect(() => {
    applyCheats()
    startGameLoop()
    return () => stopGameLoop()
  }, [])

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/reactor" replace />} />
          <Route path="/reactor" element={<Reactor />} />
          <Route path="/upgrades" element={<Upgrades />} />
          <Route path="/prestige" element={<Prestige />} />
          <Route path="/cheats" element={<Cheats />} />
        </Routes>
      </main>
    </>
  )
}

export default App
