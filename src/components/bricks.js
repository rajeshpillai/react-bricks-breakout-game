import React from 'react';
import Brick from './brick';

export default function Bricks({state}) {
  const ui = () => {
    return state.map((b,i) => {
      return <Brick key={i} brick={b} />
    })

  }
  return <div className="bricks">
      { ui ()}
  </div>
}