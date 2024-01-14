import './App.css';
import { Board } from './Components/Board';
import React, { useState, useEffect } from 'react';
import { ScoreBoard } from './Components/ScoreBoard';
import { ResetButton } from './Components/ResetButton';

const WIN_CONDITIONS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal from top-left to bottom-right
  [2, 4, 6], // Diagonal from top-right to bottom-left
];

function App() {
  const [board, setboard] = useState(Array(9).fill(null));
  const [XPlaying, setXPlaying] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setscores] = useState({ XScores: 0, OScores: 0 });
  const [gameover, setgameover] = useState(false);

  useEffect(() => {
    if (gameover && winner) {
      updateScores(winner);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameover, winner]);

  const handleBoxClick = (boxindex) => {
    const updateBoard = board.map((value, index) => {
      if (index === boxindex) {
        return XPlaying === true ? 'X' : 'O';
      } else {
        return value;
      }
    });
    setboard(updateBoard);
    const newWinner = checkwinner(updateBoard);
    const isBoardFull = updateBoard.every((box) => box !== null);

    if (newWinner || isBoardFull) {
      setgameover(isBoardFull);
      setWinner(newWinner);
    } else {
      setXPlaying(!XPlaying);
    }
  };

  const updateScores = (currentWinner) => {
    if (currentWinner === 'O') {
      let { OScores } = scores;
      OScores = OScores + 1;
      setscores({ ...scores, OScores });
    } else {
      let { XScores } = scores;
      XScores = XScores + 1;
      setscores({ ...scores, XScores });
    }
  };

  const checkwinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setgameover(false);
    setboard(Array(9).fill(null));
    setWinner(null);
    setscores({ XScores: 0, OScores: 0 });
    
  };

  return (
    <div>
      <h1>Sapna's Tic-Tac-Toe Game</h1>
      <div className="App">
        <ScoreBoard scores={scores} XPlaying={XPlaying} winner={winner} />
        <Board board={board} onClick={gameover ? resetBoard : handleBoxClick} />
        <ResetButton resetBoard={resetBoard} />
        {winner && <p>Winner is player {winner}</p>}
        {gameover &&<p>No one is winner{gameover}</p>}
      </div>
    </div>
  );
}

export default App;
