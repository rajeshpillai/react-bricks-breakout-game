import React from 'react';
export default function Player({state}) {
  let style= {
    left: state.x + "px",
    width: state.width + "px",
    height: state.height + "px",
    top: state.y + "px"
  }
  return (
    <div className="player" style={style}></div>
  )
}
