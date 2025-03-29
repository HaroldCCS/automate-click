//LIBRARIES
const robot = require('robotjs');
const readline = require('readline');

//PARAMETERS
let counter = 0;
const CICLES = 1000;
const CLICK_DELAY_MS = 1500;
const CLICKS_ORDER = [
  { x: 224, y: 224 },
  { x: 333, y: 224 },
]


/**
 * Moves the mouse to the given coordinates and clicks
 * @param {*} param0 
 */
const doClick = ({ x, y }) => {
  robot.moveMouse(x, y);
  robot.mouseClick();
}


/**
 * Do the cicles of clicks
 */
async function doCicle() {
  if (counter > CICLES) process.exit();

  for (const _currentClick of CLICKS_ORDER) {
    await new Promise((resolve) => {
      setTimeout(() => {
        doClick(_currentClick);
        resolve();
      }, CLICK_DELAY_MS);
    });
  }

  counter++;
  doCicle();
}


//Detect CTRL+C to exit
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nScript detenido');
        process.exit();
    }
});


//Start the cicles
doCicle();