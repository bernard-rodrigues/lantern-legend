import './utils/database'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameOptionsProvider } from './contexts/GameOptions';
import { Credits } from './pages/Credits';
import { GameOver } from './pages/GameOver';
import { InfoScreen } from './pages/InfoScreen';
import { InGame } from './pages/InGame';
import { MainPage } from "./pages/MainPage";
import { OptionPage } from "./pages/OptionsPage";
import { Scoreboard } from './pages/Scoreboard';
import { WarningScreen } from './pages/WarningScreen';
import { useEffect, useState } from 'react';

export function App() {
  const [ width, setWidth ] = useState(0)
  
  function handleWindowResize(){
    setWidth(innerWidth)
  }

  function preventContextMenu(e: React.MouseEvent){
    e.preventDefault()
  }
  
  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
  }, [])
  
  return (
    <div className="h-screen" onContextMenu={preventContextMenu}>
      {width >= 992 ? 
      <GameOptionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/info" element={<InfoScreen />} />
            <Route path="/start" element={<InGame />} />
            <Route path="/options" element={<OptionPage />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
          </Routes>
        </BrowserRouter>
      </GameOptionsProvider>
      :
      <WarningScreen />
      }
      
    </div>
  )
}
