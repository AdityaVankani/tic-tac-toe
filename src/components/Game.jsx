import React, { useState, useEffect } from 'react';
import Board from './Board';
import { getAIMove } from './AI';

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isAIGame, setIsAIGame] = useState(false);
  const [mode, setMode] = useState('Human vs. Human');

  useEffect(() => {
    if (!xIsNext && isAIGame && !calculateWinner(board) && board.includes(null)) {
      handleAIMove();
    }
  }, [xIsNext]);

  const handleClick = (i) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[i]) {
      return;
    }
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleAIMove = () => {
    const newBoard = board.slice();
    const aiMove = getAIMove(newBoard);
    if (aiMove !== undefined) {
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      setXIsNext(true);
    }
  };

  const winner = calculateWinner(board);
  useEffect(() => {
    if (winner) {
      const newScores = { ...scores };
      newScores[winner]++;
      setScores(newScores);
      setTimeout(() => setBoard(Array(9).fill(null)), 500);
    } else if (!board.includes(null)) {
      setTimeout(() => setBoard(Array(9).fill(null)), 500); // reset the board on draw
    }
  }, [board]);

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
  };

  const toggleMode = () => {
    setIsAIGame(!isAIGame);
    setMode(isAIGame ? 'Human vs. Human' : 'Human vs. AI');
    resetScores();
    setBoard(Array(9).fill(null));
  };

  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-mode text-xl my-10">
        Mode: {mode}
      </div>
      <div className="game-board ">
        <Board  className="w-1/2" squares={board} onClick={handleClick} />
      </div>
      <div className="game-info my-7">
        <div className='my-5 text-lg text-center p-5'>{status}</div>
        <button  className=" text-xl mx-7 bg-gray-700 rounded-lg p-3" onClick={toggleMode}>
          {isAIGame ? 'Switch to Human vs. Human' : 'Switch to Human vs. AI'}
        </button>
        <button className=' text-xl mx-7 bg-gray-700 rounded-lg p-3' onClick={resetScores}>
          Reset Scores
        </button>
        <div className="score-section">
          <div className='text-center text-lg'>Score:</div>
          <div className="score">
            <div>X: {scores.X}</div>
            <div>O: {scores.O}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
