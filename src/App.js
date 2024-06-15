import React, { useState } from "react";
import "./assets/App.css";
import { Footer, Header, MasterBoardSingle, MasterBoardMulti, Menu, MenuMultiPlayer, MenuSinglePlayer } from "./components";

function App() {
  const [showSinglePlayer, setShowSinglePlayer] = useState(false);
  const [showMultiPlayer, setShowMultiPlayer] = useState(false);

  const [showTabuleiroSinglePlayer, setShowTabuleiroSinglePlayer] = useState(false);
  const [showTabuleiroMultiPlayer, setShowTabuleiroMultiPlayer] = useState(false);

  const [singlePlayerName, setSinglePlayerName] = useState("");

  const [multiPlayerName1, setMultiPlayerName1] = useState(" ");
  const [multiPlayerName2, setMultiPlayerName2] = useState(" ");

  const [currentPlayer, setCurrentPlayer] = useState(Math.random() < 0.5 ? 'X' : 'O');


  return (
    <div className="App">
      {(showTabuleiroSinglePlayer || showTabuleiroMultiPlayer) && <Header />}
      <body>
        {!showSinglePlayer && !showMultiPlayer && <Menu setShowSinglePlayer={setShowSinglePlayer} setShowMultiPlayer={setShowMultiPlayer} />}
        {showSinglePlayer && !showTabuleiroSinglePlayer && (
          <MenuSinglePlayer setShowTabuleiroSinglePlayer={setShowTabuleiroSinglePlayer} setSinglePlayerName={setSinglePlayerName} />
        )}
        {showMultiPlayer && !showTabuleiroMultiPlayer && (
          <MenuMultiPlayer setShowTabuleiroMultiPlayer={setShowTabuleiroMultiPlayer} setMultiPlayerName1={setMultiPlayerName1} setMultiPlayerName2={setMultiPlayerName2} />
        )}
        {showTabuleiroSinglePlayer && <MasterBoardSingle singlePlayerName={singlePlayerName} />}
        {showTabuleiroMultiPlayer && <MasterBoardMulti multiPlayerName1={multiPlayerName1} multiPlayerName2={multiPlayerName2} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />}
      </body>
      {(showTabuleiroSinglePlayer || showTabuleiroMultiPlayer) && <Footer />}
    </div>
  );
}
export default App;
