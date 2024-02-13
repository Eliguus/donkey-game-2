// App.jsx
import { useState, useEffect } from 'react';
import './Game.css';
import GameOverModal from './GameOverModal';

function App() {
  const [lives, setLives] = useState(3);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [clouds, setClouds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 0.5;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      switch (e.key) {
        case 'ArrowUp':
          if (position.y === 0) setVelocity(10);
          break;
        case 'ArrowRight':
          setPosition((prev) => ({ ...prev, x: 250 })); // Set x-position to 250 when moving right
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: 0 })); // Set x-position to 0 when moving left
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Removed position and gameOver from dependencies

  useEffect(() => {
    const interval = setInterval(() => {
      setClouds((prev) => [
        ...prev,
        { lane: Math.random() < 0.5 ? 1 : 2, position: 500, hit: false }, // Add hit property
      ]);
    }, 1000); // Generates one cloud per second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (position.y > 0 || velocity > 0) {
        setVelocity((prev) => prev - gravity);
        setPosition((prev) => ({ ...prev, y: Math.max(0, prev.y + velocity) }));
      }
      setClouds((prev) =>
        prev.map((cloud) => ({ ...cloud, position: cloud.position - 10 }))
      );
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [position, velocity]);

  useEffect(() => {
    let collisionOccurred = false;
    const newClouds = clouds.map((cloud) => {
      if (
        !cloud.hit &&
        position.y <= cloud.position + 50 &&
        position.y >= cloud.position - 50 &&
        Math.abs(position.x - 250 * (cloud.lane - 1)) < 50
      ) {
        collisionOccurred = true;
        return { ...cloud, hit: true }; // Return a new cloud object with hit set to true
      }
      return cloud; // Return the original cloud object
    });
  
    if (collisionOccurred) {
      setLives((prev) => prev - 1);
    }
  
    setClouds(newClouds); // Update the clouds state with the new array
  }, [position, clouds]);

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);

  return (
    <div className="App">
      <div className="game">
        <div className="character" style={{ left: `${position.x}px`, bottom: `${position.y}px` }}></div>
        {clouds.map((cloud, index) => (
          <div
            key={index}
            className="cloud"
            style={{ left: `${250 * (cloud.lane - 1)}px`, top: `${cloud.position}px` }}
          ></div>
        ))}
      </div>
      <div className="lives">Lives: {lives}</div>
      {gameOver && <GameOverModal/>}
    </div>
  );
}

export default App;