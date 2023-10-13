import React, { useState, useEffect } from 'react';
import './App.css';
import spinSound from './media/audio.mp3';
import winSound from './media/audio1.mp3';
import spinningWheelImage from './img/wheel.svg';
import spinningArrowImage from './img/arrow-icon.png';

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
      
      // Start the spinning animation
      const spinningWheel = document.querySelector('.spinning-wheel');
      spinningWheel.style.animation = 'spin 3s linear infinite';

      // Set a timeout to stop the spinning animation and play the win sound (if applicable)
      setTimeout(() => {
        setIsSpinning(false);

        // Stop the spinning animation
        spinningWheel.style.animation = 'none';

        // Play the win sound (if applicable)
        if (currentSlice !== 'Lose') {
          winAudio.play();
        }

        // Reset the current slice
        setCurrentSlice('');
      }, 3000);
    }
  };

  // Set the current slice when the wheel stops spinning
  useEffect(() => {
    if (!isSpinning) {
      const currentSliceElement = document.querySelector('.spinning-wheel__slice.active');
      setCurrentSlice(currentSliceElement.textContent);
    }
  }, [isSpinning]);

  return (
    <div className="App">
      <div className="game-container">
        <div className={`spinning-wheel ${isSpinning ? 'spin' : ''}`}>
          <img src={spinningWheelImage} alt="Spinning Wheel" />
          {wheelSlices.map((slice, index) => (
            <div key={index} className={`spinning-wheel__slice ${slice === currentSlice ? 'active' : ''}`}>
              {slice}
            </div>
          ))}
          {isSpinning && <img src={spinningArrowImage} alt="Spinning Arrow" className="spinning-arrow" />}
        </div>
        <h1 className="game-title">Spinning Game</h1>
        <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
          Spin the Wheel
        </button>
        {isSpinning && <p className="spinning-text">Spinning...</p>}
        {currentSlice !== '' && <p className="win-text">You won {currentSlice}!</p>}
      </div>
    </div>
  );
}

export default App;
