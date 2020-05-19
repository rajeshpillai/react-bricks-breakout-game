import React from 'react';

export default function GameMessage({state, won}) {
  let message = "in-progress";
  if (won === true) {
    message = "You won!!";
  } else if (won === false) {
    message = "You Lost.  Try again!";
  }
  
  return (
    <div>
      <h1 className="game-message">{won !== undefined && message}</h1>
      {(!state) && <h2>Touch/Click or Press space to start the game again...</h2>}
    </div>
  );
}