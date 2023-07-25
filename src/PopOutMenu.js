import React from "react";
// import { useSearchParams } from "react-router-dom";
import "./PopOutMenu.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function PopOutMenu({ allGames, handleClose }) {

  // const [searchParams, setSearchParams] = useSearchParams();
  
  // function handleClick(event) {
    //   setSearchParams({
      //     categoryId: event.target.id
      //   })
      // }
      
  // const gameType = searchParams.get("categoryId");
  // const gameList = gameType ? allGames.filter(game => game.categories.some(cat => cat.id === gameType)) : allGames
  
  const [gameList, setGameList] = useState([]);
  const [show, setShow] = useState(false)

  function filterByPlayers(event) {
    const numPlayers = allGames.filter(game => game.min_players === Number(event.target.value) || game.max_players > Number(event.target.value))
    setGameList(numPlayers)
    setShow(true)
  }

  function filterByType(event) {
    setGameList(allGames.filter(game => game.categories.some(cat => cat.id === event.target.id)))
    setShow(true)
  }

  function clearFilters() {
    setGameList([])
    setShow(false)
  }

  return (
      <div className="pop-out-menu">
        <div>
          {show &&
          <div className="filtered-games">
            <h3>Games</h3>
            <button onClick={clearFilters}>clear filter</button>
            <div>
          {gameList.length > 0 && gameList.map(game => (
                <Link to={`/${game.id}`} key={game.id}>
                <p>{game.handle.toUpperCase()}</p>
                </Link>
              ))}
            </div>
          </div>}
        </div>
        <div>
          <h4 onClick={handleClose}>Close</h4>
          <div className="menu-item">
            <p>Game Type</p>
            <div className="drop-down-menu">
              <ul>
                <li>Action</li>
                <li id="KUBCKBkGxV" onClick={filterByType}>Adventure</li>
                <li>Role Play</li>
                <li>Strategy</li>
              </ul>
            </div>
          </div>
          <div className="menu-item">
            <p>Number of Players</p>
            <div className="drop-down-menu">
              <ul>
                <li value="1" onClick={filterByPlayers}>1</li>
                <li value="2" onClick={filterByPlayers}>2</li>
                <li value="3" onClick={filterByPlayers}>3</li>
                <li value="4" onClick={filterByPlayers}>4+</li>
              </ul>
            </div>
          </div>
          <div className="menu-item">
            <p>Rating</p>
            <div className="drop-down-menu">
              <ul>
                <li>1 Star</li>
                <li>2 Stars</li>
                <li>3 Stars</li>
                <li>4 Stars</li>
                <li>5 Stars</li>
              </ul>
            </div>
          </div>
          {/* <ul>
            {gameList.length > 0 && gameList.map(game => (
              <Link to={`/${game.id}`}>
              <li key={game.id}>{game.handle}</li>
              </Link>
            ))}
          </ul> */}
        </div>
      </div>
  );
}
export default PopOutMenu;