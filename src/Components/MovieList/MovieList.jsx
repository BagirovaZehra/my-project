import React from 'react'
import "./movieList.css"
const MovieList = ({movies, onAdd, saved}) => {
  return (
    <div className='movies'>
        <h3>Filmlər:</h3>
        {movies.length === 0 ? (
            <p>Film tapılmadı</p>
        ) : (
            <ul className='movie-list'>
                {movies.map((movie)=>(
                    <li className='movie-item' key={movie.imdbID}>
                        <img  src={movie.Poster} alt="img" />
                        <div>
                        <p>{movie.Title} ({movie.Year})</p>
                        <button disabled={saved} onClick={()=> onAdd(movie)}>Favorilərə əlavə et</button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default MovieList

