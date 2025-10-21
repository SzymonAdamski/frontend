import React from 'react';

function RatingBar({ rate = 0 }) {
  const totalStars = 10;
  
  return (
    <div className="rating-bar d-flex align-items-center">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rate ? 'filled' : 'empty'}`}
          style={{
            fontSize: '16px',
            color: index < rate ? '#ffc107' : '#e9ecef',
            marginRight: '2px',
          }}
        >
          ★
        </span>
      ))}
      <span className="ms-2 small text-muted">({rate}/10)</span>
    </div>
  );
}

export default RatingBar;
