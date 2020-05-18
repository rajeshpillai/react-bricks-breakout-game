import React, {useState, useEffect, useRef} from 'react';

import Ball from './ball';
import Player from './player';
import Bricks from './bricks';

const WIDTH = 200;
const player_velocity = 1;

const loadBricks = () => {
  let bricks = [];
  for(let i =0; i < 10; i++) {
    bricks.push({
      id: i,
      value: 1,
      width: 90,
      height: 25
    });
  }
  return bricks;
}
export default function Game(props) {
  const requestRef = useRef(undefined);
  const gameAreaRef = useRef(undefined);
  const [bricks, setBricks] = useState(() => loadBricks());

  const [player, setPlayer] = useState({
      x: 90, 
      y: 0, 
      vx: 1, 
      dir: 1,
      height: 90,
      width: 25
  });
                
  const [ball, setBall] = useState({
    x: 150, 
    y: 50, 
    vx: 3, 
    vy: 3, 
    width: 25, 
    height: 25
  });

  const [dir, setDir] = useState(1);
  const [ballDir, setBallDir] = useState(1);


  const loop = (etime) => {
    requestRef.current = window.requestAnimationFrame(loop);
    
    setPlayer(p => {
        return {
          ...p,
          x: Math.min(Math.max(p.x + p.vx, 0), gameAreaRef.current.offsetWidth-90)       
        }
    });
    
    moveBall();
    checkCollision();
  }

  const intersect = (src, other) =>{
    if (other == undefined) return false;
    return src.y + src.height > other.y &&
      src.y < other.y + other.height &&
      src.x + src.width > other.x &&
      src.x < other.x + other.width;
  }

  const checkCollision = () => {
    for(let i = 0; i < bricks.length; i++) {
      let collide = intersect(bricks[i], ball);
      console.log("collide: ", collide);
      if (collide) {
        return true;
      }
    }
    return false;
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

      if (b.x > gameAreaRef.current.offsetWidth-10) {
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
      <Bricks state={bricks} />
      <Ball state={ball} />
      <Player state={player} />
    </div>
  )

}