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
      height: 25,
      x: 0,
      y: 0,
      show: true
    });
  }
  return bricks;
}
export default function Game(props) {
  const requestRef = useRef(undefined);
  const gameAreaRef = useRef(undefined);
  const ballDirYRef = useRef(1);
  const ballDirXRef = useRef(1);

  const [bricks, setBricks] = useState(() => loadBricks());
  const [pause, togglePause] = useState(false);
  const [score, setScore] = useState(0);

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
    y: 40, 
    vx: 3, 
    vy: 3, 
    width: 25, 
    height: 25
  });

  const [dir, setDir] = useState(1);
  const [ballDir, setBallDir] = useState(1);

   // one time
   useEffect(() => {
    let x = 0;
    let updatedBricks = bricks.map((b,i) => {
      b.x = x;
      x+= b.width;
      x+= 2; //margin
      return b;
    });
    setBricks(updatedBricks);
  },[]);

  // For animation frame
  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, [pause]);

   // Ball to brick collision
   useEffect(() => {
    let b = checkBallToBrickCollision();
    console.log("target: ", b);
    if (b === false) return;
    const updateIndex = b.index;
    const updateItem = b.target;
    updateItem.show = false;

    let updated = [
      ...bricks.slice(0, updateIndex),
      {...updateItem},
      ...bricks.slice(updateIndex + 1)
    ];

    ballDirYRef.current = ballDirYRef.current * -1;

    setBricks(updated);
    setScore(s => s + 1);
  },[ball])

  const loop = (etime) => {
    if (pause) {
      requestRef.current = window.requestAnimationFrame(loop);
      return;
    }
    requestRef.current = window.requestAnimationFrame(loop);
      
    setPlayer(p => {
        return {
          ...p,
          x: Math.min(Math.max(p.x + p.vx, 0), gameAreaRef.current.offsetWidth-90)       
        }
    });
    moveBall();
  }

 

  const intersect = (src, other) =>{
    if (other == undefined) return false;
    // console.log("src:other:", src, other);
    return src.y + src.height > other.y &&
      src.y < other.y + other.height &&
      src.x + src.width > other.x &&
      src.x < other.x + other.width;
  }

  const checkBallToBrickCollision = () => {
    for(let i = 0; i < bricks.length; i++) {
      if (!bricks[i].show) continue;
      let collide = intersect(bricks[i], ball);
      if (collide) {
        console.log("collide: ", collide);
        return {
          index: i, 
          target: bricks[i]
        }
      }
    }
    return false;
  }

 
 

  const moveBall = () => {
    setBall(b => {
      if (b.y > gameAreaRef.current.offsetHeight) {
        ballDirYRef.current = -1;
      } else if (b.y < 2) {
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
    });

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
    console.log("key: ",e.keyCode);
    if (e.keyCode == 37) {
      movePlayer(-1);
    } else if (e.keyCode == 39) {
      movePlayer(1);
    } else if (e.keyCode ==80) {  // 'p' key
      togglePause(p => !p);
    }
  }
    
  return (
    <div className="game-area" ref={gameAreaRef}
      onKeyDown = {onKeyDown}  tabIndex="0" >
      <h2>BRICKS GAME</h2>
      <h2>{score}</h2>
      <Bricks state={bricks} />
      <Ball state={ball} />
      <Player state={player} />
    </div>
  )

}