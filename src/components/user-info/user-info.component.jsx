import React from "react";
import "./user-info.css";

function UserInfo() {
  return (
      <div class="user-info">
        <div class="name-time-container">
          <div class="user-name-box">
            <span class="user-name">Nome do Jogador</span>
            <div class="user-box"></div>
            <div class="user-box"></div>
          </div>
          <div class="user-time-box">
            <span class="user-time">Tempo de Jogo</span>
            <div class="user-box"></div>
            <div class="user-box"></div>
          </div>
        </div>
      </div>
  );
}

export default UserInfo;
