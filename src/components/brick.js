import React from 'react';

export default function Brick({brick}) {
  const style = {
    left: brick.x,
    top: brick.y,
    width: brick.width,
    height: brick.height,
    position: "absolute",
    backgroundColor: brick.show ? "yellow" : "inherit"
  }

  return (
    <div className="brick" style={style}>
    </div>
  )
} 