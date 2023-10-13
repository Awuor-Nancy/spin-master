import React, { useState, useEffect } from 'react';
import './App.css';
import spinSound from './media/audio3.mp3'; // Change to your sound file
import winSound from './media/tick.mp3'; // Change to your sound file
import spinningWheelImage from './img/wheel.svg'; // Change to your spinning wheel image
import spinningArrowImage from './img/arrow-icon.png'; // Change to your arrow image

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelSlices, setWheelSlices] = useState([
    'Prize 1',
    'Prize 2',
    'Prize 3',
    'Prize 4',
    'Lose',
  ]);
  const [currentSlice, setCurrentSlice] = useState('');
  const spinAudio = new Audio(spinSound);
  const winAudio = new Audio(winSound);

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      spinAudio.play();

      // Shuffle the wheel slices
      const shuffledWheelSlices = wheelSlices.sort(() => Math.random() - 0.5);
      setWheelSlices(shuffledWheelSlices);

      // Set a timeout to stop the spinning animation and play the win sound (if applicable)
      setTimeout(() => {
        setIsSpinning(false);

        // Play the win sound (if applicable)
        if (currentSlice !== 'Lose') {
          winAudio.play();
        }

        // Set the current slice
        setCurrentSlice(shuffledWheelSlices[0]);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isSpinning) {
      document.querySelector('.spinning-wheel').style.animation = 'spin 3s linear infinite';
    } else {
      document.querySelector('.spinning-wheel').style.animation = 'none';
    }
  }, [isSpinning]);

  return (
    <div className="App">
      <div className="game-container">
        <div className="spinning-wheel">
          <img src={spinningWheelImage} alt="Spinning Wheel" />
          {wheelSlices.map((slice, index) => (
            <div
              key={index}
              className={`spinning-wheel__slice ${slice === currentSlice ? 'active' : ''}`}
            >
              {slice}
            </div>
          ))}
          {isSpinning && (
            <img src={spinningArrowImage} alt="Spinning Arrow" className="spinning-arrow" />
          )}
        </div>
        <h1 className="game-title">Spin & Win</h1>
        <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
          Spin the Wheel
        </button>
        {isSpinning && <p className="spinning-text">Spinning...</p>}
        {currentSlice !== '' && <p className="win-text">Congratulations! You won {currentSlice}!</p>}
      </div>
    </div>
  );
}

export default App;
