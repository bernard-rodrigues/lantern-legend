import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameOver } from './pages/GameOver';
import { InfoScreen } from './pages/InfoScreen';
import { InGame } from './pages/InGame';
import { MainPage } from "./pages/MainPage";
import { OptionPage } from "./pages/OptionsPage";

export function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/info" element={<InfoScreen />} />
          <Route path="/start" element={<InGame />} />
          <Route path="/options" element={<OptionPage />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
