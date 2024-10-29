import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm }) {

  return (
    <div className="search-bar-container">
      <input className="search-input"
        type="text"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-button">Search</button>
    </div>
  );

}

export default SearchBar;


