import React, { useState } from "react";
import "./menu-multiplayer.css";

function MenuMultiPlayer({ setShowTabuleiroMultiPlayer, setMultiPlayerName1, setMultiPlayerName2 }) {
  const [multiPlayerNameInput1, setMultiPlayerNameInput1] = useState("");
  const [multiPlayerNameInput2, setMultiPlayerNameInput2] = useState("");
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  const handleTabuleiroMultiPlayer = () => {
    if (!multiPlayerNameInput1 || !multiPlayerNameInput2) {
      setError1(!multiPlayerNameInput1);
      setError2(!multiPlayerNameInput2);
      return;
    }

    setMultiPlayerName1(multiPlayerNameInput1);
    setMultiPlayerName2(multiPlayerNameInput2);
    setShowTabuleiroMultiPlayer(true);
  };

  const handleChangeMultiPlayerName1 = (event) => {
    setMultiPlayerNameInput1(event.target.value);
    setError1(false);
  };

  const handleChangeMultiPlayerName2 = (event) => {
    setMultiPlayerNameInput2(event.target.value);
    setError2(false);
  };

  const inputContainerClassName1 = error1 ? "input-containerMulti error" : "input-containerMulti";
  const inputContainerClassName2 = error2 ? "input-containerMulti error" : "input-containerMulti";

  return (
    <div className="container">
      <div className="menu">
        <h2 className="player-title">PLAYER 1</h2>
        <div className={inputContainerClassName1}>
          <input
            type="text"
            placeholder="Write the name of player 1"
            onChange={handleChangeMultiPlayerName1}
            className={error1 ? "error" : ""}
          />
        </div>
        <h2 className="player-title">PLAYER 2</h2>
        <div className={inputContainerClassName2}>
          <input
            type="text"
            placeholder="Write the name of player 2"
            onChange={handleChangeMultiPlayerName2}
            className={error2 ? "error" : ""}
          />
        </div>
        <div className="buttonMulti">
          <button onClick={handleTabuleiroMultiPlayer}>Start Game</button>
        </div>
      </div>
    </div>
  );
}

export default MenuMultiPlayer;
