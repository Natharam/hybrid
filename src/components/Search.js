import React from 'react';
import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const Search = ({ error, searchString, setSearchString, searchResults, isLocationSearching, setDetailId }) => {
  return (
    <>
      <SearchForm searchString={searchString} setSearchString={setSearchString} />

      {searchResults.length > 0 && (
        <>
          <div className="header-post">Posts</div>
          <SearchResult searchResults={searchResults} setDetailId={setDetailId} />
        </>
      )}

      {isLocationSearching && <h3>Loading...</h3>}

      {error && <div>{error}</div>}
    </>
  );
};

export default Search;
