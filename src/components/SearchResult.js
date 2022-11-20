import React from 'react';
import ResultCard from './ResultCard';

const SearchResult = ({ searchResults, setDetailId }) => {
  return (
    <div className="SearchResult">
      {searchResults?.map((post, index) => (
        <>{post.author && <ResultCard post={post} setDetailId={setDetailId} key={index} />}</>
      ))}
    </div>
  );
};

export default SearchResult;
