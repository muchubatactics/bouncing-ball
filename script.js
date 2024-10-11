/**
 * is it really worth it?
 * 
 */

const Vec = (xx, yy)=> {
  let x = xx ? xx : 0;
  let y = yy ? yy : 0;

  function add(vec) {
    return Vec(x + vec.x, y + vec.y);
  }

  function scalarM(scalar) {
    return Vec(scalar * x, scalar * y);
  }

  return {x , y, add, scalarM};
}

const Ball = (function() {
  const ballDOMref = document.getElementById('ball');
  const containerDOMref = document.getElementById('container');

  const midPoint = Vec((containerDOMref.offsetWidth / 2) - ballDOMref.offsetWidth / 2, (containerDOMref.offsetHeight / 2) - ballDOMref.offsetHeight / 2);

  let direction = Vec(1, 1);
  let speed = 2;
  let position = midPoint;

  ballDOMref.style.top = `${position.y}px`;
  ballDOMref.style.left = `${position.x}px`;

  function handleCollision(newpos) {
    if (newpos.y >= (containerDOMref.offsetHeight - ballDOMref.offsetHeight)) {
      direction = Vec(direction.x, -1 * direction.y);
      newpos.y = (containerDOMref.offsetHeight - ballDOMref.offsetHeight) - (newpos.y - (containerDOMref.offsetHeight - ballDOMref.offsetHeight));
    }

    if (newpos.y <= 0) {
      direction = Vec(direction.x, -1 * direction.y);
      newpos.y = -1 * newpos.y;
    }

    if (newpos.x >= (containerDOMref.offsetWidth - ballDOMref.offsetWidth)) {
      direction = Vec(-1 * direction.x, direction.y);
      newpos.x = (containerDOMref.offsetWidth - ballDOMref.offsetWidth) - (newpos.x - (containerDOMref.offsetWidth - ballDOMref.offsetWidth));
    }

    if (newpos.x <= 0) {
      direction = Vec(-1 * direction.x, direction.y);
      newpos.x = -1 * newpos.x;
    }

    return newpos;
  }


  function animate(time, lastTime) {
    let diff = 0;
    if (lastTime !== null) {
      diff = (time - lastTime) * 0.1;
    }

    let newpos = position.add(direction.scalarM(diff * speed));
  
    newpos = handleCollision(newpos);

    let top = newpos.y;
    let left = newpos.x;
  
    ballDOMref.style.top = `${top}px`;
    ballDOMref.style.left = `${left}px`;

    position = newpos;
    
    requestAnimationFrame((newTime) => { animate(newTime, time)});

  }

  requestAnimationFrame(animate);
})();