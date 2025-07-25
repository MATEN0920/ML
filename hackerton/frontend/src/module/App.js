import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LivingRoom from './LivingRoom';
import LivingRoom1 from './LivingRoom1';
import MainRoom from './MainRoom';
import Kitchen from './Kitchen';
import FirePage from './FirePage';
import HamzzyRoom from './HamzzyRoom';
import Entrance from './Entrance';
import Out from './Out';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LivingRoom />} />
        <Route path="/living" element={<LivingRoom />} />
        <Route path="/living1" element={<LivingRoom1 />} />
        <Route path="/main" element={<MainRoom />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/hamzzy" element={<HamzzyRoom />} />
        <Route path="/fire" element={<FirePage />} />
        <Route path="/entrance" element={<Entrance />} />
        <Route path="/out" element={<Out />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
