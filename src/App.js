import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Dice from './components/Dice';
import './App.css';

function App() {
  const [value, setValue] = useState(1);
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('dice-history');
    return stored ? JSON.parse(stored) : [];
  });

  function rollDice() {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setValue(newValue);

    const newHistory = [newValue, ...history].slice(0, 5); // max 5 onglets
    setHistory(newHistory);
    localStorage.setItem('dice-history', JSON.stringify(newHistory));
  }

  function resetHistory() {
    setHistory([]);
    localStorage.removeItem('dice-history');
  }

  useEffect(() => {
    if (history.length > 0) {
      setValue(history[0]);
    }
  }, []);

  return (
    <div className="container">
      <h1>🎲 SIMULATION DE LANCER DE DÉ</h1>

      <div className="main-layout">
        {/* Valeur actuelle */}
        <div className="value-box">
          <p>Valeur actuelle</p>
          <span className="fs12">*Face du haut</span>
          <div className="value-display">{value}</div>
        </div>

        {/* Dé 3D */}
        <div className="dice-canvas">
          <Canvas camera={{ position: [2, 2, 2] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Dice value={value} />
          </Canvas>
        </div>

        {/* Historique */}
        <div className="history-box">
          <div className="history-header">
            <span>Historique</span>
            <button className="clear-button" onClick={resetHistory}>🗑</button>
          </div>
          <ul>
            {history.map((v, i) => (
              <li key={i}>Lancé [{history.length - i}] : {v}</li>
            ))}
          </ul>
        </div>
      </div>

      <button className="roll-button" onClick={rollDice}>🎲 Lancer le dé</button>
    </div>
  );
}

export default App;
