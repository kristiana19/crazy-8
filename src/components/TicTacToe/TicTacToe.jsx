import React, { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Function to determine the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Horizontal lines
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Vertical lines
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  // Click handler for the cell
  const handleClick = (index) => {
    if (board[index] || winner) return; // Disable click if the cell is occupied or there is a winner

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div style={styles.game}>
      <h1>Tic Tac Toe</h1>
      <Board squares={board} onClick={handleClick} />
      <p>
        {winner
          ? `Zmagovalec: ${winner}`
          : `Naslednja poteza: ${isXNext ? "X" : "O"}`}
      </p>
      <button onClick={resetGame} style={styles.resetButton}>
        Začni znova
      </button>
    </div>
  );
}

// Game board component (Board)
function Board({ squares, onClick }) {
  return (
    <div style={styles.board}>
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

// Cell component (Square)
function Square({ value, onClick }) {
  return (
    <button onClick={onClick} style={styles.square}>
      {value}
    </button>
  );
}

// CSS в JS (Inline Styles)
const styles = {
  game: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 80px)",
    gap: "5px",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: "70px",
    height: "70px",
    fontSize: "24px",
    textAlign: "center",
    lineHeight: "80px",
    cursor: "pointer",
    border: "2px solid black",
    backgroundColor: "#fff",
  },
  resetButton: {
    marginTop: "10px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};
