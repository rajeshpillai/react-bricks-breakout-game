import React from 'react';
export default function Player({state}) {
  const style = {
    x: state.x,
    y: state.y
  }
  let playerPos= {
    left: state.x + "px"
  }
  return (
    <div className="player" style={playerPos}></div>
  )
}
