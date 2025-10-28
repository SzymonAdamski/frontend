import React from 'react';
import './FloatingEmojis.css';

function FloatingEmojis() {
  const emojis = ['⭐', '✨', '💫', '🌟', '🎨', '🎭', '🎪', '🎡', '🎢', '🎠'];
  
  return (
    <div className="floating-emojis-container">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="floating-emoji"
          style={{
            left: `${(index + 1) * 10}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${8 + index}s`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}

export default FloatingEmojis;
