import React,{useEffect,useState} from "react";
import "./user-infoSinglePlayer.css";

function UserInfoSinglePlayer({ singlePlayerName ,timeout, isDisabled}) {
  
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
    <div class="user-infoSinglePlayer">
      <div class="name-time-container">
        <div class="user-name-box">
          <span class="user-name">PLAYER NAME</span>
          <div class="user-box"> {singlePlayerName}</div>
        </div>
        <div class="user-time-box">
          <span class="user-time">Game time</span>
          <div class="user-box">{formatTime(time)}</div>
        </div>
      </div>
      <div className="messagePlayer">
          <span className="playerX">X</span> to Move
          <br />
          Please, <span className="playerXcolor">{singlePlayerName}</span> make a move in the indicated area
          <div className={`messagePlayer ${isDisabled ? "disabled" : ""}`}></div>
      </div>
    </div>
  );
}

export default UserInfoSinglePlayer;
