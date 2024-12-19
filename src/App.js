import React, { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./Components/SearchBar/SearchBar";
import MovieList from "./Components/MovieList/MovieList";
import FavoriteMovie from "./Components/FavoriteMovie/FavoriteMovie";
import SavedListPage from "./Components/SavedListPage/SavedListPage";
import "./App.css"

const App = () => {
  const [movies,setMovies]=useState([]);
  const [selectedMovies, setSelectedMovies]=useState([]);
  const [savedLink,setSavedLink] = useState(null);
  const [saved,setSaved] = useState(false)


  const searchMovies = (query)=>{
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=aebce022`)
    .then(res=>res.json())
    .then((data)=>{
      setMovies(data.Search || []);
    })
    .catch(err=>console.log(err)
    )
  }

  useEffect(()=>{
    searchMovies("Harry Potter");
  },[])

  const addMovie = (movie)=>{
    if(!selectedMovies.find((m)=> m.imdbID===movie.imdbID)){
      setSelectedMovies([...selectedMovies,movie])
    }
  }

  const removeMovie = (id)=>{
    setSelectedMovies(selectedMovies.filter((movie)=> movie.imdbID !==id))
  }

  const saveList = (title)=>{
    fetch("https://acb-api.algoritmika.org/api/movies/list" , {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title:title,
        movies: selectedMovies.map((movie)=>movie.imdbID)
      }),
    })
    .then(res=>res.json())
    .then((data)=>{
      setSavedLink(`/list/${data.id}`)
      setSaved(true)
    }

    )
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div className="search-section">
              <div>
              <h1>Film Siyahısı Tətbiqi</h1>
              <SearchBar onSearch={searchMovies} />
              <MovieList saved={saved} movies={movies} onAdd={addMovie} />
              </div>
              <div className="favorite-section">
        <h2>Favori Filmlər</h2>
        <FavoriteMovie
          selectedMovies={selectedMovies}
          onRemove={removeMovie}
          onSave={saveList}
          savedLink={savedLink}
        />
      </div>
            </div>
            
          }
        />
        <Route path="/list/:id" element={<SavedListPage />} />
      </Routes>
      
    </div>
  );
}

export default App

