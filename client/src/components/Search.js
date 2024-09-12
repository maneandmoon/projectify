import React from 'react';

function Search({ search, updateSearch }) {
  const handleChange = (e) => {
    updateSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleChange}
      placeholder="Search projects..."
    />
  );
}

export default Search;
