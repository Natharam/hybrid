import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import useDebounce from './hooks/UseDebounce';
import Details from './components/Details';
import Search from './components/Search';
import './App.css';

const App = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [detailId, setDetailId] = useState();
  const [isLocationSearching, setIsLocationSearching] = useState(false);
  const [error, setError] = useState('');

  const debounceSearch = useDebounce(searchString);

  const getData = async () => {
    try {
      setIsLocationSearching(true);
      const response = await axios({
        method: 'get',
        url: `http://hn.algolia.com/api/v1/search?query=${debounceSearch}`
      });
      if (response?.data?.hits?.length > 0) {
        setError('');
        setSearchResults(response?.data.hits);
      } else setError('No results found');
      setIsLocationSearching(false);
    } catch (error) {
      setIsLocationSearching(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (debounceSearch === '') {
      setSearchResults([]);
    } else if (debounceSearch) {
      getData();
    }
  }, [debounceSearch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Search
          error={error}
          searchString={searchString}
          searchResults={searchResults}
          setDetailId={setDetailId}
          setSearchString={setSearchString}
          isLocationSearching={isLocationSearching}
        />
      )
    },
    {
      path: `/details`,
      element: <Details detailId={detailId} />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
