import React from 'react';
import './RatingBar.css';

function RatingBar({ rate = 0 }) {
  const totalStars = 10;
  
  return (
    <div className="rating-bar d-flex align-items-center">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rate ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      ))}
      <span className="ms-2 small rating-text">({rate}/10)</span>
    </div>
  );
}

export default RatingBar;
