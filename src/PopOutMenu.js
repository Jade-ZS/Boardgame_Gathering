import React from "react";
import { useSearchParams } from "react-router-dom";
import "./PopOutMenu.css";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import PropTypes from 'prop-types'

function PopOutMenu({ games, handleClose }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [show, setShow] = useState(false);
  
  function handleClick(event, type) {
    setSearchParams({
      ...searchParams,
      [type]: event.target.id,
    });
    setShow(true)
  }

  function clearFilters() {
    setSearchParams({})
    setShow(false)
  }

  const yearPublished = searchParams.get("year_published");
  const gameType = searchParams.get("game_type");

  const yearList = yearPublished
    ? games.filter((game) => game.year_published === Number(yearPublished))
    : games;
  const gameList = gameType
    ? games.filter((game) => game.categories.some((cat) => cat.id === gameType))
    : games;
  console.log();

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
      <div className="menu-item">
        <div>
        <button onClick={handleClose}>Close</button>
        <p className="label">Game Type</p>
        <div className="drop-down-menu">
          <ul>
            <li
              id="nuHYRFmMjU"
              onClick={(event) => {
                handleClick(event, "game_type");
                setSelectedCategory(event.target.id);
              }}
              className={selectedCategory === "nuHYRFmMjU" ? "selected" : ""}
            >
              Renaissance
            </li>
            <li
              id="KUBCKBkGxV"
              onClick={(event) => {
                handleClick(event, "game_type");
                setSelectedCategory(event.target.id);
              }}
              className={selectedCategory === "KUBCKBkGxV" ? "selected" : ""}
            >
              Adventure
            </li>
            <li
              id="ge8pIhEUGE"
              onClick={(event) => {
                handleClick(event, "game_type");
                setSelectedCategory(event.target.id);
              }}
              className={selectedCategory === "ge8pIhEUGE" ? "selected" : ""}
            >
              Cooperative
            </li>
            <li
              id="JwHcKqxh33"
              onClick={(event) => { 
                handleClick(event, "game_type")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "JwHcKqxh33" ? "selected" : ""}
            >
              Trains
            </li>
          </ul>
        </div>
      </div>
      <div className="menu-item">
        <p className="label">Year Published</p>
        <div className="drop-down-menu">
          <ul>
          <li
              id="1995"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "1995" ? "selected" : ""}
            >
              1995
            </li>
            <li
              id="2000"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2000" ? "selected" : ""}
            >
              2000
            </li>
            <li
              id="2008"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2008" ? "selected" : ""}
            >
              2008
            </li>
            <li
              id="2016"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2016" ? "selected" : ""}
            >
              2016
            </li>
            <li
              id="2017"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2017" ? "selected" : ""}
            >
              2017
            </li>
            <li
              id="2018"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2018" ? "selected" : ""}
            >
              2018
            </li>
            <li
              id="2019"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2019" ? "selected" : ""}
            >
              2019
            </li>
            <li
              id="2022"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "2022" ? "selected" : ""}
            >
              2022
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>    
)}
export default PopOutMenu;

PopOutMenu.propTypes = {
  games: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
}