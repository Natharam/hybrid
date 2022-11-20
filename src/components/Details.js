import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import SearchResult from './SearchResult';

const PostDetail = ({ detailId }) => {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');

  const getPost = async () => {
    try {
      const id = detailId || window.location.search?.split('?')[1];
      const response = await axios({
        method: 'get',
        url: `http://hn.algolia.com/api/v1/items/${id}`
      });
      setError('');
      setDetail(response.data);
    } catch (error) {
      setError(error.message || 'No results found');
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {detail?.id ? (
        <Card className="details-card">
          <div className="details-title">Post Details</div>
          <div className="details">
            <div className="details-heading">
              <div className="title">
                <span>Title: </span>
                {detail?.title}
              </div>

              <div className="points">
                <div>
                  <span>Points: </span> {detail?.points}
                </div>
              </div>
            </div>
            <SearchResult searchResults={detail.children} setDetailId={() => {}} />
          </div>
        </Card>
      ) : (
        <h3>Loading...</h3>
      )}
      {error && <div>{error}</div>}
    </>
  );
};

export default PostDetail;
