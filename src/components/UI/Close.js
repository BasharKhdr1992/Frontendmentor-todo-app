import React from 'react';
import assets from '../../assets';

const Close = ({ onClick }) => {
  return (
    <button className="list-btn" onClick={onClick}>
      <img src={assets.cross} alt="cross" />
    </button>
  );
};

export default Close;
