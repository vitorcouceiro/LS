import React, { useState } from "react";
import "./menu-signgleplayer.css";

function MenuSinglePlayer({ setShowTabuleiroSinglePlayer, setSinglePlayerName }) {
  const [singlePlayerNameInput, setSinglePlayerNameInput] = useState("");
  const [errorSingle, setErrorSingle] = useState(false);

  const handleTabuleiroSinglePlayer = () => {
    if (!singlePlayerNameInput) {
      setErrorSingle(true);
      return;
    }

    setSinglePlayerName(singlePlayerNameInput);
    setShowTabuleiroSinglePlayer(true);
  };

  const handleChangeSinglePlayerName = (event) => {
    setSinglePlayerNameInput(event.target.value);
    setErrorSingle(false);
  };
 
  const inputContainerClassName = errorSingle ? "input-container errorSingle" : "input-container";
  
  
  return (
    <div className="container">
      <div className="menu">
        <h2 className="player-title">PLAYER</h2>
        <div className={inputContainerClassName}>
          <input type="text" placeholder="Type your name" onChange={handleChangeSinglePlayerName} />
          <button onClick={handleTabuleiroSinglePlayer}>Start Game</button>
        </div>
      </div>
    </div>
  );
}

export default MenuSinglePlayer;
