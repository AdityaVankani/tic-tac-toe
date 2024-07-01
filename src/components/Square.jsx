import React from 'react';

function Square({ value, onClick }) {
  return (
    <button className="square w-20 h-20 text-5xl" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
