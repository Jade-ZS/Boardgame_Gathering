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

  const yearsCatagory = yearPublished && yearList.map(game => (
    <Link to={`/${game.id}`}>
      <div key={game.id} className="option">
        <p>👾</p>
        <li>{game.handle.replaceAll('-', ' ')}</li>
      </div>
    </Link>
  ))

  const gamesCatagory =  gameType && gameList.map(game => (
    <Link to={`/${game.id}`} className="game-link">
      <div key={game.id} className="option">
        <p>👾</p>
        <li>{game.handle.replaceAll('-', ' ')}</li>
      </div>
    </Link>
  ))

  return (
    <div className="pop-out-menu">
      <div className="filtered">
        {show && <div className="filter-ul">
          <button onClick={clearFilters}>Clear Filters</button>
          <p className="label">Your Options</p>
          {yearList.length ? yearsCatagory : <p>Sorry No Games For This Year</p>}
          {gameList.length ? gamesCatagory : <p>Sorry No Games For This Catagory</p>}
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
        <p className="label">Featured Year The 90's</p>
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
              id="1996"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "1996" ? "selected" : ""}
            >
              1996
            </li>
            <li
              id="1997"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "1997" ? "selected" : ""}
            >
              1997
            </li>
            <li
              id="1998"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "1998" ? "selected" : ""}
            >
              1998
            </li>
            <li
              id="1999"
              onClick={(event) => { 
                handleClick(event, "year_published")
                setSelectedCategory(event.target.id)
              }}
              className={selectedCategory === "1999" ? "selected" : ""}
            >
              1999
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