import React, { useEffect, useState } from "react";
import "./master-boardmulti.css";
import UserInfoMultiPlayer from "../user-infoMultiPlayer/user-infoMultiPlayer.component";

function MasterBoardMulti({
  multiPlayerName1,
  multiPlayerName2,
  currentPlayer,
  setCurrentPlayer,
}) {
  const [boards, setBoards] = useState(
    Array(9).fill({ cells: Array(9).fill(null), winner: null })
  );
  const [winner, setWinner] = useState(null);
  const [masterBoard, setMasterBoard] = useState(Array(9).fill(null));
  const [activeBoardIndex, setActiveBoardIndex] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleBoardClick = (boardIndex, cellIndex) => {
    if (
      gameOver ||
      winner ||
      boards[boardIndex].winner ||
      boards[boardIndex].cells[cellIndex] ||
      (activeBoardIndex !== null && activeBoardIndex !== boardIndex)
    ) {
      return;
    }

    const newBoards = [...boards];
    const newCells = [...newBoards[boardIndex].cells];
    newCells[cellIndex] = currentPlayer;

    const newWinner = calculateWinner(newCells);
    newBoards[boardIndex] = { cells: newCells, winner: newWinner };

    if (newWinner) {
      const newMasterBoard = [...masterBoard];
      newMasterBoard[boardIndex] = newWinner;
      setMasterBoard(newMasterBoard);
    }

    setBoards(newBoards);
    let nextActiveBoardIndex;
    if (
      newWinner ||
      newCells.every((cell) => cell !== null) ||
      masterBoard[cellIndex] !== null
    ) {
      nextActiveBoardIndex = getRandomActiveBoardIndex(newBoards);
    } else {
      nextActiveBoardIndex = cellIndex;
    }

    setActiveBoardIndex(nextActiveBoardIndex);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setWinner(calculateWinner(newBoards.map((board) => board.winner)));
  };

  useEffect(() => {
    if (calculateWinner(masterBoard)) {
      alert(
        `O jogador com o símbolo ${currentPlayer === "X" ? "O" : "X"} ganhou!`
      );
      return;
    }

    if (isDraw()) {
      const boardWins = calculateBoardWins();
      const mostWinsPlayer = findMostWinsPlayer(boardWins);
      if (mostWinsPlayer) {
        alert(
          `O jogador com o símbolo ${mostWinsPlayer} ganha devido a possuir mais vitórias!`
        );
      } else if(mostWinsPlayer===null) {
        alert("Empate!");
      }
    }
  }, [masterBoard]);

  const isDraw = () => {
    return (
      masterBoard.every((cell) => cell !== null) &&
      !calculateWinner(masterBoard) &&
      boards.every((board) => board.winner !== null)
    );
  };

  const calculateBoardWins = () => {
    const boardWins = { X: 0, O: 0 };
    masterBoard.forEach((cell) => {
      if (cell === "X") {
        boardWins.X++;
      } else if (cell === "O") {
        boardWins.O++;
      }
    });
    return boardWins;
  };

  const findMostWinsPlayer = (boardWins) => {
    if (boardWins.X > boardWins.O) {
      return "X";
    } else if (boardWins.O > boardWins.X) {
      return "O";
    }
    return null;
  };

  const getRandomActiveBoardIndex = (boardArr) => {
    const availableBoards = boardArr
      .map((board, index) => ({ board, index }))
      .filter(
        ({ board }) =>
          !board.winner && !board.cells.every((cell) => cell !== null)
      );

    if (availableBoards.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableBoards.length);
      return availableBoards[randomIndex].index;
    }

    return null;
  };

  const calculateWinner = (cells) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    return null;
  };

  function acabou() {
    const boardWins = calculateBoardWins();
    const mostWinsPlayer = findMostWinsPlayer(boardWins);

    if (mostWinsPlayer) {
      alert(
        `O jogador com o símbolo ${mostWinsPlayer} ganha devido a possuir mais vitórias!`
      );
    } else {
      alert("Empate!");
    }
    setGameOver(true);
  }

  return (
    <div className="MultiPlayerPainel">
      <div className={`master-board ${winner ? winner.toLowerCase() : ""}`}>
        {boards.map((board, boardIndex) => {
          const boardWinner = calculateWinner(board.cells);
          const isDraw =
            !boardWinner && board.cells.every((cell) => cell !== null);
          const boardClass = boardWinner
            ? boardWinner === "X"
              ? "red"
              : "blue"
            : isDraw
            ? "draw"
            : "";
          const isActive =
            activeBoardIndex === null || activeBoardIndex === boardIndex;

          return (
            <div>
              <div
                key={boardIndex}
                className={`board ${boardClass} ${isActive ? "active" : ""}`}
              >
                {board.cells.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`cell ${
                      cell === "X" ? "x" : cell === "O" ? "o" : ""
                    }`}
                    onClick={() => handleBoardClick(boardIndex, cellIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <UserInfoMultiPlayer
          multiPlayerName1={multiPlayerName1}
          multiPlayerName2={multiPlayerName2}
          currentPlayer={currentPlayer}
          timeout={acabou}
        />
      </div>
    </div>
  );
}

export default MasterBoardMulti;
