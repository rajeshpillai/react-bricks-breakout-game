import React from 'react';


export default function Ball({state, won}) {
  let ballPos = {
    left: state.x + "px",
    top: state.y + "px",
    width: state.width + "px",
    height: state.height + "px"
  }
  let classes = (won || won === false) ? "ball animate__animated animate__rotateOut" : "ball";
  return (
    <div className={classes} style={ballPos}></div>
  )
} 