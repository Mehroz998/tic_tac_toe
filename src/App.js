// import React, { useState, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [currentPlayer, setCurrentPlayer] = useState('Player 1');
//   const [winner, setWinner] = useState(null);
//   const [bgColor , setBgColor] = useState("blue")

//   useEffect(() => {
//     const calculatedWinner = calculateWinner(board);
//     if (calculatedWinner) {
//       setWinner(calculatedWinner);
//       setTimeout(() => {
//         alert(`${calculatedWinner === 'X' ? 'Player 1' : 'Player 2'} wins!`);
//         handleRestart();
//       }, 100);
//     }
//     if(currentPlayer==='Player 2'){
//       setBgColor("red")
//     }
//     else{
//       setBgColor("blue")
//     }
//   }, [board]);

//   const handleClick = (index) => {
    
//     if (board[index] || winner) {
//       return;
//     }
//     const newBoard = board.slice();
//     newBoard[index] = currentPlayer === 'Player 1' ? 'X' : 'O';

//     setBoard(newBoard);
//     setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
//   };
  

//   const handleRestart = () => {
//     setBoard(Array(9).fill(null));
//     setCurrentPlayer('Player 1');
//     setWinner(null);
//   };

//   const status = winner ? `${winner === 'X' ? 'Player 1' : 'Player 2'} wins!` : `Current player: ${currentPlayer}`;

//   const renderSquare = (index) => (
//     <button className="square" onClick={() => handleClick(index)}>
//       {board[index]}
//     </button>
//   );

//   return (
//     <div className="game" style={{backgroundColor:`${bgColor}`}}>
//       <div className="game-board">
//         <div className="board-row">
//           {renderSquare(0)}
//           {renderSquare(1)}
//           {renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {renderSquare(3)}
//           {renderSquare(4)}
//           {renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {renderSquare(6)}
//           {renderSquare(7)}
//           {renderSquare(8)}
//         </div>
//       </div>
//       <div className="game-info">
//         <div style={{color:"white",textAlign:"center"}}>{status}</div>
//         <button onClick={handleRestart} className='Reset' style={{marginTop:"30px"}}>Restart Game</button>
//       </div>
//     </div>
//   );
// };

// const calculateWinner = (squares) => {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }

//   return null;
// };

// export default App;

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const calculateWinner = (squares) => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] === 'X' ? 'Player 1' : 'Player 2';
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner || !board.includes(null)) {
      setWinner(newWinner || 'Draw');
      // Automatically reset game after 3 seconds
      const timer = setTimeout(() => {
        resetGame();
      }, 1500);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [board]);

  const renderCell = (index) => {
    return (
      <button
        className={`cell ${board[index] ? 'filled' : ''} ${board[index] === 'X' ? 'x' : 'o'}`}
        onClick={() => handleClick(index)}
        disabled={!!winner}
      >
        {board[index]}
      </button>
    );
  };

  const getStatusMessage = () => {
    if (winner === 'Draw') return 'Game Draw!';
    if (winner) return `Winner: ${winner}`;
    return `Next Player: ${isXNext ? 'Player 1' : 'Player 2'}`;
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{getStatusMessage()}</div>
      <div className="board">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="cell-container">
            {renderCell(index)}
          </div>
        ))}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;