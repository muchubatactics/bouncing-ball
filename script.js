// let cat = document.querySelector("img");
// let angle = Math.PI / 2;
// function animate(time, lastTime) {
// if (lastTime != null) {
// angle += (time - lastTime) * 0.001;
// }
// cat.style.top = (Math.sin(angle) * 20) + "px";
// cat.style.left = (Math.cos(angle) * 200) + "px";
// requestAnimationFrame(newTime => animate(newTime, time));
// }
// requestAnimationFrame(animate);


const ball = document.getElementById('ball');
const container = document.getElementById('container');

console.log(container.offsetHeight, container.offsetWidth);



// requestAnimationFrame(animate);

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
  let speed = 1;
  let position = midPoint;

  ballDOMref.style.top = `${midPoint.y}px`;
  ballDOMref.style.left = `${midPoint.x}px`;

  function animate(time, lastTime) {
    let diff = 0;
    if (lastTime !== null) {
      diff = (time - lastTime) * 0.1;
    }

    let newpos = position.add(direction.scalarM(diff * speed));
  
    let top = newpos.x;
    let left = newpos.y;
  
    if (top > container.offsetHeight - ball.offsetHeight) top = 0;
    if (left > container.offsetWidth - ball.offsetWidth) left = 0;
    
    ball.style.top = `${top}px`;
    ball.style.left = `${left}px`;

    position = newpos;
  
    requestAnimationFrame((newTime) => { animate(newTime, time)});
  }

  console.log(ballDOMref.style);
  requestAnimationFrame(animate);
})();