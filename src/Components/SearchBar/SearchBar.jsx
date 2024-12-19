import React from 'react'
import "./search.css"
import { useState } from 'react'
const SearchBar = ( {onSearch} ) => {
    const [query,setQuery] = useState("");
    const handleSearch = ()=>{
        if(query.trim()){
            onSearch(query)
        }
    }
  return (
    <div className='search' >
        <input  type="text" placeholder='Film axtarin' value={query} onChange={(e)=> setQuery(e.target.value)}/>
         <button onClick={handleSearch}>Axtar</button>
    </div>
  )
}

export default SearchBar
