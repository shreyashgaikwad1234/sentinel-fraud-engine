import React from 'react';
import { useTicTacToe } from '../hooks/useTicTacToe';
import Board from './Board';
import './Game.css';

const Game: React.FC = () => {
  const {
    board,
    isXNext,
    winner,
    winningLine,
    gameMode,
    setGameMode,
    scores,
    handleClick,
    resetGame
  } = useTicTacToe();

  return (
    <div className="game">
      <div className="stats-panel">
        <div className="score-card">
          <span className="player-label">Player (X)</span>
          <span className="score-value">{scores.X}</span>
        </div>
        <div className="score-card">
          <span className="player-label">{gameMode === 'PvAI' ? 'AI (O)' : 'Player (O)'}</span>
          <span className="score-value">{scores.O}</span>
        </div>
      </div>

      <div className="status-message">
        {winner ? (
          winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`
        ) : (
          `Next Player: ${isXNext ? 'X' : 'O'}`
        )}
      </div>

      <Board 
        board={board}
        onCellClick={handleClick}
        winningLine={winningLine}
      />

      <div className="controls">
        <div className="mode-selector">
          <button 
            className={gameMode === 'PvP' ? 'active' : ''} 
            onClick={() => { setGameMode('PvP'); resetGame(); }}
          >
            PvP
          </button>
          <button 
            className={gameMode === 'PvAI' ? 'active' : ''} 
            onClick={() => { setGameMode('PvAI'); resetGame(); }}
          >
            Vs AI
          </button>
        </div>
        <button className="reset-btn" onClick={resetGame}>Reset Game</button>
      </div>

      {winner && (
        <div className="winner-overlay">
          <div className="winner-modal">
            <h2>{winner === 'Draw' ? 'Game Draw!' : `${winner} Victories!`}</h2>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
