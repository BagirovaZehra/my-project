import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./savedListPage.css"
import { useNavigate } from 'react-router-dom';
const SavedListPage = () => {
  const { id } = useParams(); 
  const [savedMovies, setSavedMovies] = useState([]); 
  const [listTitle, setListTitle] = useState(""); 
  const navigate = useNavigate();

  const handHomeClick = () =>{
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListTitle(data.title); 

        const movies = [];
        const fetchMovieDetails = (index) => {
          if (index >= data.movies.length) {
            setSavedMovies(movies);
            return;
          }

          fetch(`https://www.omdbapi.com/?i=${data.movies[index]}&apikey=aebce022`)
            .then((res) => res.json())
            .then((movieData) => {
              movies.push(movieData);
              fetchMovieDetails(index + 1); 
            });
        };

        fetchMovieDetails(0); 
      });
  }, [id]);

  return (
    <div className='link-page-container'>
      <h2>{listTitle}</h2>
      {savedMovies.length === 0 ? (
        <p>Bu siyahıda heç bir film yoxdur.</p>
      ) : (
        <ol>
          {savedMovies.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year}) - 
              <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
                IMDb Link
              </a>
            </li>
          ))}
        </ol>
      )}
      <button className='homepage-btn' onClick={handHomeClick}>Əsas səhifəyə keçid</button>
    </div>
  );
};

export default SavedListPage;
