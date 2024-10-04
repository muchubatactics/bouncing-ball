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

function animate(time, lastTime) {
  let diff = 0;
  if (lastTime !== null) {
    diff = (time - lastTime) * 0.1;
  }

  let top = Number(ball.style.top.slice(0, -2)) + diff;
  let left = Number(ball.style.left.slice(0, -2)) + diff;

  if (top > container.offsetHeight - ball.offsetHeight) top = 0;
  if (left > container.offsetWidth - ball.offsetWidth) left = 0;

  console.log(top, left)

  ball.style.top = `${top}px`;
  ball.style.left = `${left}px`;


  requestAnimationFrame((newTime) => { animate(newTime, time)});
}

requestAnimationFrame(animate);