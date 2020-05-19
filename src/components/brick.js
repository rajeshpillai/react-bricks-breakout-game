import React, {useEffect, useRef} from 'react';

export default function Brick({brick}) {
  const useBrickRef = useRef();
  const style = {
    left: brick.x,
    top: brick.y,
    width: brick.width,
    height: brick.height,
    position: "absolute",
    backgroundColor: brick.show ? "sandybrown" : "inherit",
    border: "2px solid red",
    // display: brick.show ? "block" : "none"
    // visibility: brick.show ? "visible" : "hidden"
  }

  const classes = brick.show ? "brick" : "brick animate__animated  animate__rollOut";

  useEffect(() => {
    useBrickRef.current.addEventListener('animationend', () => {
      useBrickRef.current.classList.add("hidden");
    });
  });

  return (
    <div className={classes} style={style} ref={useBrickRef}>
    </div>
  )
} 