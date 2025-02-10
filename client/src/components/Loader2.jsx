// Loader.js
import React from 'react';
import './loader2.css'; // Import the CSS file

// Circle Loader
const CircleLoader = () => {
  return (
    <div className="loader">
      <svg viewBox="0 0 80 80">
        <circle r="32" cy="40" cx="40"></circle>
      </svg>
    </div>
  );
};

// Triangle Loader
const TriangleLoader = () => {
  return (
    <div className="loader triangle">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>
  );
};

// Rectangle Loader
const RectangleLoader = () => {
  return (
    <div className="loader">
      <svg viewBox="0 0 80 80">
        <rect height="64" width="64" y="8" x="8"></rect>
      </svg>
    </div>
  );
};

// Fullscreen Loader Component
const Spinner = () => {
  return (
    <div className="loader-wrapper">
      <CircleLoader />
      <TriangleLoader />
      <RectangleLoader />
    </div>
  );
};

export default Spinner;
