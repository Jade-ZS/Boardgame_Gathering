import React from "react";
import { useSearchParams } from "react-router-dom";
import "./PopOutMenu.css";

function PopOutMenu({ games, handleClose }) {

  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(event) {
    setSearchParams({
      categoryId: event.target.id
    })
  }

  const gameType = searchParams.get("categoryId");

  const gameList = gameType ? games.filter(game => game.categories.some(cat => cat.id === gameType)) : games

  console.log(gameList)

  return (
      <div className="pop-out-menu">
        <h4 onClick={handleClose}>Close</h4>
        <div className="menu-item">
          <p>Game Type</p>
          <div className="drop-down-menu">
            <ul>
              <li>Action</li>
              <li id="KUBCKBkGxV" onClick={handleClick}>Adventure</li>
              <li>Role Play</li>
              <li>Strategy</li>
            </ul>
          </div>
        </div>
        <div className="menu-item">
          <span>Number of Players</span>
          <div className="dropdown-menu">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4+</li>
            </ul>
          </div>
        </div>
        <div className="menu-item">
          <span>Rating</span>
          <div className="dropdown-menu">
            <ul>
              <li>1 Star</li>
              <li>2 Stars</li>
              <li>3 Stars</li>
              <li>4 Stars</li>
              <li>5 Stars</li>
            </ul>
          </div>
        </div>
      </div>
  );
}
export default PopOutMenu;