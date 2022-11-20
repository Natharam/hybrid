import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import parse from 'html-react-parser';

const ResultCard = ({ post, setDetailId }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Card className="result-card">
      {post.title && <Card.Header className="header">{post.title}</Card.Header>}
      {post.text && (
        <Card.Header className={showMore ? 'header' : 'header-sort'} onClick={() => setShowMore(!showMore)}>
          {parse(post.text)}
        </Card.Header>
      )}
      <Card.Body className="body">
        <Card.Text>Author: {post.author}</Card.Text>
        {post.title && (
          <Link
            className="get-detail"
            variant="primary"
            onClick={() => setDetailId(post.objectID)}
            to={`/details?${post.objectID}`}
          >
            View Details
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
