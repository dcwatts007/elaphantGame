//import * as PIXI from PIXI.js

//variables
let app = new PIXI.Application({ width: 840, height: 840 }); //creates a web app for the game
const Bob = PIXI.Sprite.from("images/bunny.png"); // creates the main character
document.body.appendChild(app.view); //adds the app to the webpage html
app.stage.addChild(Bob); //adds the player to the app
let level = 1; //level tracker
//variables to track player movement
let right = false;
let left = false;
let jump = false;
let velocityX = 0.0;
let velocityY = 0.0;
//creating the ground
const container = new PIXI.Container();
container.x = 0;
container.y = 0;
app.stage.addChild(container);
const ground = [];
let parent = container;
// for (let i = 0; i < 3; i++) {
//   let child = PIXI.Sprite.from("images/ground.png");
//   child.anchor.set(0.5);
//   parent.addChild(child);
//   ground.push(child);
//   parent = child;
// }
let createGround = (x, y) => {
  let child = PIXI.Sprite.from("images/ground.png");
  child.anchor.set(0.5);
  child.x = x;
  child.y = y;
  parent.addChild(child);
  ground.push(child);
  // parent = child;
};
createGround(50, 800);
createGround(200, 800);
createGround(500, 800);
app.render();
//functions
let move = (event) => {
  // console.log(event.key);
  // console.log(event.code);
  // console.log(event.target);
  //console.log("this code ran");
  if (event.key == "d" || event.key == "D") {
    //console.log("in the loop");
    right = true;
  } else if (event.key == "a" || event.key == "A") {
    right = false;
    left = true;
  } else if (event.key == "w" || event.key == "W") {
    jump = true;
  }
};
let stop = (event) => {
  if (event.key == "d" || event.key == "D") {
    right = false;
  }
  if (event.key == "a" || event.key == "A") {
    left = false;
  }
};
//events
document.addEventListener("keydown", move);

document.addEventListener("keyup", stop);

//update loop
app.ticker.add(() => {
  if (right && velocityX < 5) {
    velocityX += 0.5;
  } else if (left && velocityX > -5) {
    velocityX -= 0.5;
  } else if (velocityX > 0) {
    velocityX -= 0.25;
  } else if (velocityX < 0) {
    velocityX += 0.25;
  }
  velocityY -= 0.25;
  Bob.x += velocityX;
  for (let i = 0; i < ground.length; i++) {
    let groundBlock = ground[i];

    // Check for collision between Bob and the ground block
    if (
      Bob.x < groundBlock.x + groundBlock.width / 2 &&
      Bob.x + Bob.width > groundBlock.x - groundBlock.width / 2 &&
      Bob.y < groundBlock.y + groundBlock.height / 4 &&
      Bob.y + Bob.height > groundBlock.y - groundBlock.height / 2
    ) {
      // Collision detected, prevent Bob from falling through the ground
      // by setting his y-coordinate to the top of the ground block
      Bob.y = groundBlock.y - groundBlock.height / 2 - Bob.height;

      if (jump) {
        velocityY += 7;
        jump = false;
      } else {
        velocityY = 0;
      }
    }
  }
  if(Bob.x>=800)
  {
    console.log("You Won!");
  }
  Bob.y -= velocityY;
  if (Bob.y > 800) {
    Bob.x = 0;
    Bob.Y = 0;
    Bob.velocityX = 0;
    Bob.velocityY = 0;
  }
});
