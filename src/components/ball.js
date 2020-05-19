import React from 'react';


export default function Ball({state}) {
  const style = {
    x: state.x,
    y: state.y,
    w: state.width,
    h: state.height
  }
  let ballPos = {
    left: state.x + "px",
    top: state.y + "px",
    width: state.width + "px",
    height: state.height + "px"
  }
  return (
    <div className="ball" style={ballPos}></div>
  )
} 