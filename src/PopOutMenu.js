import React from "react";
import { useSearchParams } from "react-router-dom";
import "./PopOutMenu.css";
import { Link } from "react-router-dom";

function PopOutMenu({ games, handleClose, }) {

  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(event, type) {
    setSearchParams({
      ...searchParams,
      [type]: event.target.id
    })
  }

  const yearPublished = searchParams.get("year_published");
  const gameType = searchParams.get("game_type");

  const yearList = yearPublished ? games.filter(game => game.year_published === Number(yearPublished)) : games
  const gameList = gameType ? games.filter(game => game.categories.some(cat => cat.id === gameType)) : games
  console.log()
  return (
      <div className="pop-out-menu">
        <h4 onClick={handleClose}>Close</h4>
        <div className="menu-item">
          <p>Game Type</p>
          <div className="drop-down-menu">
            <ul>
              <li id='nuHYRFmMjU' onClick={(event) => handleClick(event, "game_type")}>Renaissance</li>
              <li id="KUBCKBkGxV" onClick={(event) => handleClick(event, "game_type")}>Adventure</li>
              <li id="ge8pIhEUGE" onClick={(event) => handleClick(event, "game_type")}>Cooperative</li>
              <li id="JwHcKqxh33" onClick={(event) => handleClick(event, "game_type")}>Trains</li>
            </ul>
          </div>
        </div>
        <div className="menu-item">
          <span>Year Published</span>
          <div className="drop-down-menu">
            <ul>
              <li id="2010" onClick={(event) => handleClick(event, "year_published")}>2010</li>
              <li id="2011" onClick={(event) => handleClick(event, "year_published")}>2011</li>
              <li id="2012" onClick={(event) => handleClick(event, "year_published")}>2012</li>
              <li id="2013" onClick={(event) => handleClick(event, "year_published")}>2013</li>
              <li id="2014" onClick={(event) => handleClick(event, "year_published")}>2014</li>
              <li id="2015" onClick={(event) => handleClick(event, "year_published")}>2015</li>
              <li id="2016" onClick={(event) => handleClick(event, "year_published")}>2016</li>
              <li id="2017" onClick={(event) => handleClick(event, "year_published")}>2017</li>
              <li id="2018" onClick={(event) => handleClick(event, "year_published")}>2018</li>
              <li id="2019" onClick={(event) => handleClick(event, "year_published")}>2019</li>
              <li id="2020" onClick={(event) => handleClick(event, "year_published")}>2020</li>
              <li id="2021" onClick={(event) => handleClick(event, "year_published")}>2021</li>
            </ul>
          </div>
        </div>
        <ul>
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
        </ul>
      </div>
  );
}
export default PopOutMenu;
