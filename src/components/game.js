import React, {useState, useEffect, useRef} from 'react';

import Ball from './ball';
import Player from './player';
import Brick from './brick';


const BRICKS = [1,1,1,1,1,1,1,1,1,1];

const WIDTH = 200;
const player_velocity = 1;

export default function Game(props) {
  const requestRef = useRef(undefined);
  const gameAreaRef = useRef(undefined);
  const [bricks, setBricks] = useState(BRICKS);

  const [player, setPlayer] = useState({
      x: 90, 
      y: 0, 
      vx: 1, 
      dir: 1
  });
                
  const [ball, setBall] = useState({
    x: 150, y: 50, vx: 3, vy: 3, dir: 1
  });

  const [dir, setDir] = useState(1);
  const [ballDir, setBallDir] = useState(1);

  console.log("main: ball: ", ball);


  const loop = (etime) => {
    requestRef.current = window.requestAnimationFrame(loop);
    
    setPlayer(p => {
        return {
          ...p,
          x: Math.min(Math.max(p.x + p.vx, 0), gameAreaRef.current.offsetWidth-90)       
        }
    });
    
    moveBall();
  }

  // undo comment
  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, []);

  const ballDirYRef = useRef(1);
  const ballDirXRef = useRef(1);
  const moveBall = () => {
    setBall(b => {
      if (b.y > gameAreaRef.current.offsetHeight) {
        ballDirYRef.current = -1;
      } else if (b.y < 10) {
        ballDirYRef.current = 1;
      }

      if (b.x > gameAreaRef.current.offsetWidth) {
        ballDirXRef.current = -1;
      } else if (b.x < 10) {
        ballDirXRef.current = 1;
      }
      return {
        ...b,
        x: b.x + b.vx * ballDirXRef.current,
        y: b.y + b.vy * ballDirYRef.current
      }
    })
  }

  const movePlayer = (dir) => {
    if (dir == 0) {  //top
      setPlayer(p => {
        return {
          ...p,
          vx: 0
        }
      });
    } else if (dir == 1) {
      setPlayer(p => {
          return {
          ...p,
          vx: 3
          }
      });
    } else if (dir == -1) {
      setPlayer(p => {
          return {
          ...p,
          vx: -3
          }
      });
    }
  }

  // not working
  const onKeyDown = (e) => {
    // left-37, up->38, right-39, down->40
    if (e.keyCode == 37) {
      movePlayer(-1);
    } else if (e.keyCode == 39) {
      movePlayer(1);
    } 
  }
    
  return (
    <div className="game-area" ref={gameAreaRef}
      onKeyDown = {onKeyDown}  tabIndex="0" >
      <h2>BRICKS GAME</h2>
      <div className="bricks">
      {
        bricks.map((b,i) => {
          return <Brick key={i} />
        })
      }
      </div>
      <Ball state={ball} />
      <Player state={player} />
    </div>
  )
}