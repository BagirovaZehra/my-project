import React, { useState } from 'react';
import "./favoriteMovie.css"
import { NavLink } from 'react-router-dom';
const FavoriteMovie = ({ selectedMovies, onRemove, onSave, savedLink }) => {
  const [listTitle, setListTitle] = useState("");

  const handleSave = () => {
    if (listTitle.trim()) {
      onSave(listTitle);
    }
  };

  return savedLink ? (
    <div>
      <p>Siyahınız saxlanıldı</p>
      <div className='favorite' >
      <div >
        <input className='new-list-input'
          type="text"
          placeholder='Siyahiya ad verin'
          value={listTitle}
          disabled
          onChange={(e) => setListTitle(e.target.value)}
        />
      </div>

      {selectedMovies.length === 0 ? (
        <p className='no-choosen'>Heç bir film seçilməyib</p>
      ) : (
        <ul className='favorite-items'>
          {selectedMovies.map((movie) => (
            <li className='favorite-item' key={movie.imdbID}>
              <span>{movie.Title} ({movie.Year})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    <NavLink className='link-btn' to={savedLink}>Favori list</NavLink>
    </div>
  ) : (
    <div className='favorite' >
      <div >
        <input
          type="text"
          placeholder='Siyahiya ad verin'
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
        />
        <button className='save' disabled={selectedMovies.length === 0} onClick={handleSave}>Yadda saxla</button>
      </div>

      {selectedMovies.length === 0 ? (
        <p className='no-choosen'>Heç bir film seçilməyib</p>
      ) : (
        <ul className='favorite-items'>
          {selectedMovies.map((movie) => (
            <li className='favorite-item' key={movie.imdbID}>
              <span>{movie.Title} ({movie.Year})</span>
              <button className='remove' onClick={() => onRemove(movie.imdbID)}>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteMovie;
