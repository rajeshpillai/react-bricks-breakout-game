import React from 'react';


export default function Ball({state}) {
  const style = {
    x: state.x,
    y: state.y
  }
  let ballPos = {
    left: state.x + "px",
    top: state.y + "px"
  }
  return (
    <div className="ball" style={ballPos}></div>
  )
} 