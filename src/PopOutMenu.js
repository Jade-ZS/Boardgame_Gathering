import React from "react";
import { useSearchParams } from "react-router-dom";
import "./PopOutMenu.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";



function PopOutMenu({ games, handleClose, }) {

  // const [gameList, setGameList] = useState([]);
  // const [show, setShow] = useState(false);

  // function filterGamesByType(event) {
  //   const gameType = games.filter(game => game.categories.some(cat => cat.id === event.target.id))
  //   setGameList(gameType)
  //   setShow(true)
  // }

  // function filterGamesByPlayers(event) {
  //   const numPlayers = games.filter(game => game.min_players === Number(event.target.value) || game.max_players > Number(event.target.value))
  //   setGameList(numPlayers)
  //   setShow(true)
  // }

  // function clearFilters() {
  //   setGameList([])
  //   setShow(false)
  // }

  const [searchParams, setSearchParams] = useSearchParams();
 
  const [show, setShow] = useState(false)

  function handleClick(event, type) {
    setSearchParams({
      ...searchParams,
      [type]: event.target.id
    })
    setShow(true)
  }

  function clearFilters() {
    setSearchParams({})
    setShow(false)
  }

  const yearPublished = searchParams.get("year_published");
  const gameType = searchParams.get("game_type");

  const yearList = yearPublished ? games.filter(game => game.year_published === Number(yearPublished)) : games
  const gameList = gameType ? games.filter(game => game.categories.some(cat => cat.id === gameType)) : games
  console.log()
  return (
      <div className="pop-out-menu">
        <div className="filtered">
          {show && <div className="filter-ul">
            <button onClick={clearFilters}>Clear Filters</button>
            <p className="label">Your Options</p>
            {yearPublished && yearList.map(game => (
              <Link to={`/${game.id}`}>
                <div key={game.id} className="option">
                  <p>👾</p>
                  <li>{game.handle.replaceAll('-', ' ')}</li>
                </div>
              </Link>
            ))}
            {gameType && gameList.map(game => (
              <Link to={`/${game.id}`} className="game-link">
                <div key={game.id} className="option">
                  <p>👾</p>
                  <li>{game.handle.replaceAll('-', ' ')}</li>
                </div>
              </Link>
            ))}
          </div>}
        </div>
        <div>
        <button onClick={handleClose}>Close</button>
        <div className="menu-item">
          <p className="label">Game Type</p>
          <div className="drop-down-menu">
            <ul>
              <li id='nuHYRFmMjU' className="filter-li" onClick={(event) => handleClick(event, "game_type")}>Renaissance</li>
              <li id="KUBCKBkGxV" className="filter-li" onClick={(event) => handleClick(event, "game_type")}>Adventure</li>
              <li id="ge8pIhEUGE" className="filter-li" onClick={(event) => handleClick(event, "game_type")}>Cooperative</li>
              <li id="JwHcKqxh33" className="filter-li" onClick={(event) => handleClick(event, "game_type")}>Trains</li>
            </ul>
          </div>
        </div>
        <div className="menu-item">
          <p className="label">Year Published</p>
          <div className="drop-down-menu">
            <ul>
              <li id="2010" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2010</li>
              <li id="2011" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2011</li>
              <li id="2012" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2012</li>
              <li id="2013" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2013</li>
              <li id="2014" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2014</li>
              <li id="2015" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2015</li>
              <li id="2016" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2016</li>
              <li id="2017" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2017</li>
              <li id="2018" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2018</li>
              <li id="2019" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2019</li>
              <li id="2020" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2020</li>
              <li id="2021" className="filter-li" onClick={(event) => handleClick(event, "year_published")}>2021</li>
            </ul>
          </div>
          {/* <ul>
            {gameList.length > 0 && gameList.map(game => (
              <Link to={`/${game.id}`}>
              <li key={game.id}>{game.handle}</li>
              </Link>
            ))}
          </ul> */}
        </div>
        {/* <ul>
          <p>Your Options</p>
          {yearPublished && yearList.map(game => (
            <Link to={`/${game.id}`}>
              <div key={game.id}>
            <li>{game.handle}</li>
              </div>
            </Link>
          ))}
          {gameType && gameList.map(game => (
            <Link to={`/${game.id}`}>
              <div key={game.id}>
            <li>{game.handle}</li>
            <li>Type</li>
              </div>
            </Link>
          ))}
        </ul> */}
        </div>
      </div>
  );
}
export default PopOutMenu;
