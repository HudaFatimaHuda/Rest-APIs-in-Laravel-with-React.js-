import React from 'react'
import './Search.css'


const Search = ({searchQuery, handleSearch}) => {
  return (
    <div className='new-student__control text-end mb-2 search-bar'>
        <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
        />
    </div>
  )
}

export default Search
