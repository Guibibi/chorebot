/*Variables */

var doorImage1 = document.getElementById("door1");
var doorImage2 = document.getElementById("door2");
var doorImage3 = document.getElementById("door3");
const startButton = document.getElementById("start");

let playerScore = 0;
let totalGame = 0;
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
var currentlyPlaying = true;

const beachDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";

const spaceDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";

const botDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";

const closedDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

/*Variables End*/

function isBot(door) {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

//If the door has the closed door image, then return not clicked, else evaluate as true.
function isClicked(door) {
  if (door === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

//Reduce the score of opened door, and evaluate if all the doors are closed.
function playDoor(door) {
  numClosedDoors -= 1;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver();
  }
}

//Evaluate if the door is closed, else open it.
doorImage1.onclick = () => {
  if (!isClicked(doorImage1.src) && currentlyPlaying === true) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

//Evaluate if the door is closed, else open it.
doorImage2.onclick = () => {
  if (!isClicked(doorImage2.src) && currentlyPlaying === true) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

//Evaluate if the door is closed, else open it.
doorImage3.onclick = () => {
  if (!isClicked(doorImage3.src) && currentlyPlaying === true) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
};

function startRound() {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good luck!";
  randomChoreDoorGenerator();
}

function gameOver(status) {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    playerScore += 1;
    totalGame += 1;
    document.getElementById(
      "playerscore"
    ).innerHTML = `Your score:${playerScore}`;
    document.getElementById(
      "totalscore"
    ).innerHTML = `Total games:${totalGame}`;
  } else {
    startButton.innerHTML = "You lost! Play again?";
    totalGame += 1;
    document.getElementById(
      "totalscore"
    ).innerHTML = `Total games:${totalGame}`;
  }
  currentlyPlaying = false;
}

// Give a random number and depending on the output, it will arrange the door in a certain order
let randomChoreDoorGenerator = () => {
  var choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 2) {
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = botDoorPath;
  }
};

//Call the Door generator

startRound();
