import React from 'react';
export default function Player({state, collide}) {
  let style= {
    left: state.x + "px",
    width: state.width + "px",
    height: state.height + "px",
    top: state.y + "px"
  }

  //animate__rubberBand
  let classes = collide ? "player animate__animated animate__bounce" : "player";
  return (
    <div className={classes} style={style}></div>
  )
}
