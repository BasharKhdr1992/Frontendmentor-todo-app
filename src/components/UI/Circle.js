import React from 'react';
import './Circle.css';

const Circle = ({ className, onClick, title }) => {
  return (
    <div
      onClick={onClick}
      title={title}
      className={`circle ${className}`}
    ></div>
  );
};

export default Circle;
