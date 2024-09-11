import React from "react";

function Search({ search, updateSearch }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search by interests:</label>
      <input
        value={search}
        type="text"
        id="search"
        placeholder="Enter interest to search..."
        onChange={(e) => updateSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;