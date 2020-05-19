import React from 'react';

export default function GameMessage({state}) {
  let message = "in-progress";
  if (state === true) {
    message = "You won!!";
  } else if (state === false) {
    message = "You Lost.  Try again!";
  }
  
  return (
    <h1 className="game-message">{message}</h1>
  );
}