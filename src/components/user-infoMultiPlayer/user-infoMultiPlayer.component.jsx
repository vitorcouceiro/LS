import React, { useState, useEffect } from "react";
import "./user-infoMultiPlayer.css";

function UserInfoMultiPlayer({ multiPlayerName1, multiPlayerName2, currentPlayer, timeout }) {
  const playerXName = multiPlayerName2;
  const playerOName = multiPlayerName1;

  const [time, setTime] = useState(300); // Tempo inicial em segundos (5 minutos)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          timeout();
          return prevTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(value) {
    return value.toString().padStart(2, "0");
  }

  return (
    <div className="user-infoMultiPlayer">
      <div className="name-time-container">
        <div className="user-name-box">
          <span className="user-name">PLAYER'S NAME</span>
          <div className="user-box"> {multiPlayerName1}</div>
          <div className="user-box"> {multiPlayerName2}</div>
        </div>
        <div className="user-time-box">
          <span className="user-time">Game time</span>
          <div className="user-box">{formatTime(time)}</div>
        </div>
      </div>
      {currentPlayer === "X" ? (
        <div className="messageX">
          <span className="playerX">X</span> to Move
          <br />
          Please, <span className="playerXcolor">{playerXName}</span> make a move in the indicated area
        </div>
      ) : (
        <div className="messageO">
          <span className="playerO">O</span> to Move
          <br />
          Please, <span className="playerOcolor">{playerOName}</span> make a move in the indicated area
        </div>
      )}
    </div>
  );
}

export default UserInfoMultiPlayer;
