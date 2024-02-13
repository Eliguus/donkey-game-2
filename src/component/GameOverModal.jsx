// GameOverModal.jsx
// import React from 'react';
import './GameOverModal.css';

function GameOverModal() {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Game Over</h1>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    </div>
  );
}

export default GameOverModal;