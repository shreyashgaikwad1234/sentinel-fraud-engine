import React from 'react';
import './Game.css';

interface CellProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningCell: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell }) => {
  return (
    <div 
      className={`cell ${value ? 'filled' : ''} ${isWinningCell ? 'winning' : ''}`} 
      onClick={onClick}
    >
      {value === 'X' && (
        <svg viewBox="0 0 100 100" className="marker x-marker">
          <path d="M20 20 L80 80 M80 20 L20 80" />
        </svg>
      )}
      {value === 'O' && (
        <svg viewBox="0 0 100 100" className="marker o-marker">
          <circle cx="50" cy="50" r="35" />
        </svg>
      )}
    </div>
  );
};

export default Cell;
