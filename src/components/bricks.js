import React from 'react';
import Brick from './brick';

export default function Bricks({state}) {
  return <div className="bricks">
      {
        state.map((b,i) => {
          return <Brick key={i} />
        })
      }
  </div>
}