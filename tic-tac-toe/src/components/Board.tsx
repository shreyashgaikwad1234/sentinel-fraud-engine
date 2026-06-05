import React from 'react';
import Cell from './Cell';
import './Game.css';

interface BoardProps {
  board: ('X' | 'O' | null)[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, winningLine }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell 
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index) ?? false}
        />
      ))}
    </div>
  );
};

export default Board;
