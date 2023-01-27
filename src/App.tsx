import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameOptionsProvider } from './contexts/GameOptions';
import { Credits } from './pages/Credits';
import { GameOver } from './pages/GameOver';
import { InfoScreen } from './pages/InfoScreen';
import { InGame } from './pages/InGame';
import { MainPage } from "./pages/MainPage";
import { OptionPage } from "./pages/OptionsPage";

export function App() {
  return (
    <div className="h-screen">
      <GameOptionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/info" element={<InfoScreen />} />
            <Route path="/start" element={<InGame />} />
            <Route path="/options" element={<OptionPage />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="/credits" element={<Credits />} />
          </Routes>
        </BrowserRouter>
      </GameOptionsProvider>
    </div>
  )
}
