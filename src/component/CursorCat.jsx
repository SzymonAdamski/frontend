import React, { useState, useEffect } from 'react';
import './CursorCat.css';

function CursorCat() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Kot podąża za kursorem z lekkim opóźnieniem
      setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="cursor-cat"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        🐱
      </div>
      <button
        className="toggle-cat-btn"
        onClick={() => setIsVisible(!isVisible)}
        title={isVisible ? "Ukryj kota" : "Pokaż kota"}
      >
        {isVisible ? "🐱 Ukryj kota" : "👻 Pokaż kota"}
      </button>
    </>
  );
}

export default CursorCat;
