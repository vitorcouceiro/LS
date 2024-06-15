import React from "react";
import "./menu.css";


function Menu({ setShowSinglePlayer, setShowMultiPlayer }) {
  const handleSinglePlayerClick = () => {
    setShowSinglePlayer(true);
  };
  const handleMultiPlayerClick = () => {
    setShowMultiPlayer(true);
  };
  return (
    <div class="container">
      <div class="menu">
        <ul>
          <li class="singleplayer">
            <a href="#" onClick={handleSinglePlayerClick}>Singleplayer</a>
          </li>
          <li class="multiplayer">
            <a href="#"onClick={handleMultiPlayerClick}>Multiplayer</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
