import React from 'react';
import './Arrow.css';

const ArrowLeft = (props) => (
  <button className="ArrowLeft" onClick={props.switchPage}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 53">
      <circle cx="26.5" cy="26.5" r="25.5" stroke="#0C0743" strokeWidth="2"/>
      <path fill="#0C0743" d="M33.41 36.0232l-9.5247-9.5455 9.5247-9.5454L30.4777 14 18 26.4777l12.4777 12.4778 2.9323-2.9323z"/>
    </svg>
  </button>
)

export default ArrowLeft;
