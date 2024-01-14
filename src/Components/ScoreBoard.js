import React from 'react';
import './ScoreBoard.css';

export const ScoreBoard = ({  XPlaying }) => {

  return (
    <div className='scoreboard'>
      <span className={`score PlayerX ${!XPlaying && 'inactive'}`}>Player X</span>
      <span className={`score PlayerO ${XPlaying && 'inactive'}`}>Player O </span>
    </div>
  );
};
