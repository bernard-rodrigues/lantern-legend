import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InGame } from './pages/InGame';
import { MainPage } from "./pages/MainPage";
import { OptionPage } from "./pages/OptionsPage";

export function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/start" element={<InGame />} />
          <Route path="/options" element={<OptionPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
