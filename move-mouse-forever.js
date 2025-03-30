const robot = require('robotjs');

const x = 500;
const y = 300;


function mover(va ) {
  robot.moveMouse(va ? x : y, va ? y : x);
  robot.mouseClick();
}

function main () {
  let ignore_first_position = true;
  let range = true;

  const interval = setInterval(() => {
    range = !range;
    mover(range);
  
    if (ignore_first_position) {
      ignore_first_position = false;
    } else {
      const currentPos = robot.getMousePos();
      if (!(currentPos.x == x || currentPos.x == y)) clearInterval(interval);
    }
  
  }, 2000);
}

main()