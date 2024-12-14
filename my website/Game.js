let showStartScreen = true; 
let showSecondScreen = false;  
let showThirdScreen = false; 
let startImage, secondImage, thirdImage, endImage1, endImage2;  
let showEndScreen = false; 
let submitButtonX, submitButtonY, submitButtonWidth, submitButtonHeight;
let recreateButtonX, recreateButtonY, recreateButtonWidth, recreateButtonHeight;

let backgroundImage;
let gifImage;
let gifImage1;
let cupImage;
let heartImage;
let graphics;
let player;
let obstacles = [];
let gravity = 0.8;
let jumpStrength = -12;
let obstacleSpeed = 3;
let gameOver = false;
let buttonX, buttonY, buttonWidth, buttonHeight;

let draggingCup = false;
let showDraggableCup = true;
let cupX = 713;
let cupY = 382;
let cupWidth = 120;
let cupHeight = 160;

let jujuReplacement;
let draggableJuju;
let draggingJuju = false;
let jujuX = -30;
let jujuY = 360;
let jujuWidth = 350;
let jujuHeight = 300;
let showDraggableJuju = true;

let lives = 3;
let score = 0;
let heartReplacement1 = false;
let heartReplacement = false;
let gameStarted = false;

let cakeImage; // Static cake
let draggableCake; 
let draggingCake = false; // Draggable  cake
let cakeStaticX = 580; 
let cakeStaticY = 405;
let cakeX = 580;
let cakeY = 405;
let cakeWidth = 120;
let cakeHeight = 100;
let showDraggableCake = true;
let cakeReplacement;


let plantImage; 
let draggablePlant; 
let draggingPlant = false; 
let plantStaticX = 715; 
let plantStaticY = 40;
let plantX = 715;
let plantY = 40;
let plantWidth = 150;
let plantHeight = 180;
let showDraggablePlant = true;
let plantReplacement;




function preload() {
  backgroundImage = loadImage('assets/game demo.png');
  plantImage = loadImage('assets/plant.png');
  draggablePlant = loadImage('assets/plant.png');
  gifImage = loadImage('assets/lava-lamp-358001.gif');
  gifImage1 = loadImage('assets/juju.gif');
  draggableJuju = loadImage('assets/juju.gif');
  cupImage = loadImage('assets/mc.png');
  heartImage = loadImage('assets/heartp.png');
  jujuReplacement = loadImage('assets/ju.png');
  cakeImage = loadImage('assets/cakereal.png'); 
  draggableCake = loadImage('assets/cakereal.png'); 
  cakeReplacement = loadImage('assets/cake.png'); 
  plantReplacement = loadImage('assets/plantreplace.png');
  startImage = loadImage('assets/assignment.png') 
  secondImage = loadImage('assets/hellyes.png');
  thirdImage = loadImage('assets/brief.png'); 
  endImage1 = loadImage('assets/pxArt.png');
  endImage2 = loadImage('assets/submit.gif');
  
  
}










function setup() {
 let canvas = createCanvas(900, 600);
 canvas.parent('p5-container');  // 将画布附加到 HTML 中的 #p5-container 元素
    
  graphics = createGraphics(275, 195);
  player = new Player();
  
  buttonWidth = 100;
  buttonHeight = 40;
  buttonX = graphics.width / 2 - buttonWidth / 2;
  buttonY = graphics.height / 2 + 30;


  heartReplacement = false;  
  heartReplacement1 = false;  

  // Button dimensions 
  submitButtonWidth = 100;
  submitButtonHeight = 40;
  submitButtonX = width / 2 - submitButtonWidth / 2;
  submitButtonY = height / 2 + 150;

  recreateButtonWidth = 100;
  recreateButtonHeight = 40;
  recreateButtonX = width / 2 - recreateButtonWidth / 2;
  recreateButtonY = height / 2 + 200;
}

function draw() {
  // Show different screens
  if (showStartScreen) {
    drawStartScreen();  
  } else if (showSecondScreen) {
    drawSecondScreen();  
  } else if (showThirdScreen) {
    drawThirdScreen();  
  } else if (showEndScreen) {
    drawEndScreen();  
  } else {
    // Main game logic only runs if the game is started
    image(backgroundImage, 0, 0, width, height);
    image(plantImage, plantStaticX, plantStaticY, plantWidth, plantHeight);
    image(gifImage, -20, 160, 330, 330);
    image(gifImage1, -30, 360, 350, 300);
    image(cakeImage, cakeStaticX, cakeStaticY, cakeWidth, cakeHeight); // Static cake image on the main canvas

    graphics.background(0);

    // Display "Press SPACE to start"
    if (!gameStarted) {
      graphics.fill(255);
      graphics.textSize(16);
      graphics.textAlign(CENTER, CENTER);
      graphics.textFont('Silkscreen');
      graphics.text("Press SPACE to start", graphics.width / 2, graphics.height / 2);
    }

    player.display();
    for (let obstacle of obstacles) {
      obstacle.display();
    }

    drawGameElements();

    //submit button
    if (gameOver) {
      fill('white');
      rect(submitButtonX, submitButtonY, submitButtonWidth, submitButtonHeight, 0);  // Submit button
      fill(0);
      textSize(15);
      text("Submit", width / 2, submitButtonY + 25);  // "Submit" button text

      if (mouseX > submitButtonX && mouseX < submitButtonX + submitButtonWidth && mouseY > submitButtonY && mouseY < submitButtonY + submitButtonHeight) {
        cursor(HAND);  
      } else {
        cursor(ARROW);  
      }
    }

    if (gameStarted && !gameOver) {
      player.update();
      if (frameCount % 60 === 0) {
        obstacles.push(new Obstacle());
      }
      for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        if (obstacles[i].hits(player)) {
          lives--;
          obstacles.splice(i, 1);
          if (lives <= 0) gameOver = true;
        }
        if (obstacles[i].offscreen()) {
          obstacles.splice(i, 1);
          score++;
        }
      }
    } else if (gameOver) {
      displayGameOver();
    }

    image(graphics, 386, 100);
    handleDraggableObjects();

    // Check if mouse is over any draggable object 
    changeCursorForDraggableObjects();
  }

  
  
function changeCursorForDraggableObjects() {
  //  change cursor when over objects
  if (
    mouseX > cupX && mouseX < cupX + cupWidth && mouseY > cupY && mouseY < cupY + cupHeight ||
    mouseX > jujuX && mouseX < jujuX + jujuWidth && mouseY > jujuY && mouseY < jujuY + jujuHeight ||
    mouseX > plantStaticX && mouseX < plantStaticX + plantWidth && mouseY > plantStaticY && mouseY < plantStaticY + plantHeight ||
    mouseX > cakeStaticX && mouseX < cakeStaticX + cakeWidth && mouseY > cakeStaticY && mouseY < cakeStaticY + cakeHeight
  ) {
    cursor(HAND);  
  } else {
    cursor(ARROW);  
  }
}


function drawGameElements() {
  for (let i = 0; i < lives; i++) {
    let heartImg;

    
    if (heartReplacement && jujuReplacement instanceof p5.Image) {
      heartImg = jujuReplacement;  
    } else if (heartReplacement1 && plantReplacement instanceof p5.Image) {
      heartImg = plantReplacement; 
    } else {
      heartImg = heartImage; // Default to the original heartImage
    }

    
    if (heartImg instanceof p5.Image) {
      graphics.image(heartImg, graphics.width - 30 - i * 30, 10, 20, 28);
    } else {
      console.error("Invalid heartImg image:", heartImg);
    }
  }

  graphics.fill(255);
  graphics.textSize(16);
  graphics.textAlign(LEFT, TOP);
  graphics.textFont('Silkscreen');
  graphics.text(score, 10, 10);
}
}

function displayGameOver() {
  graphics.fill(255, 0, 0);
  graphics.textSize(24);
  graphics.textAlign(CENTER);
  graphics.text("Game Over!", graphics.width / 2, graphics.height / 2 - 20);
  graphics.fill(200);
  graphics.rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
  graphics.fill(0);
  graphics.textSize(16);
  graphics.text("Restart", graphics.width / 2, buttonY + buttonHeight / 2 - 6);
}


function handleDraggableObjects() {
  // Update positions while dragging
  if (draggingCup) {
    cupX = mouseX - cupWidth / 2;
    cupY = mouseY - cupHeight / 2;
  }
  if (draggingJuju) {
    jujuX = mouseX - jujuWidth / 2;
    jujuY = mouseY - jujuHeight / 2;
  }
  if (draggingPlant) {
    plantX = mouseX - plantWidth / 2;
    plantY = mouseY - plantHeight / 2;
  }
  if (draggingCake) {
    cakeX = mouseX - cakeWidth / 2;
    cakeY = mouseY - cakeHeight / 2;
  }
  
  // Display objects
  if (showDraggableJuju) image(draggableJuju, jujuX, jujuY, jujuWidth, jujuHeight);
  if (showDraggablePlant) image(draggablePlant, plantX, plantY, plantWidth, plantHeight);
  if (showDraggableCake) image(draggableCake, cakeX, cakeY, cakeWidth, cakeHeight);
  if (showDraggableCup) image(cupImage, cupX, cupY, cupWidth, cupHeight);
  
}


function drawStartScreen() {
  background("rgb(174,192,211)"); 
  fill(255);
  textFont('Silkscreen');
  textSize(32);
  textAlign(CENTER, CENTER);

  
  image(startImage, width / 4, height / 4, width / 2, height / 2); 
  
  if (showSecondScreen) {
    image(secondImage, width / 4 + 50, height / 4 - 50, width / 2, height / 2);  

    // Back button 
    fill('white');
    rect(width / 2 + 120 , height / 2 + 20 , 100, 30, 0);  
    fill(0);
    textSize(15);
    text("Back", width / 2 + 170, height / 2 + 35);  
  } else if (showThirdScreen) {
    
    
    image(thirdImage, width / 4 + 50, height / 4 - 50, width / 2, height / 2);  

    // "Start" button 
    fill('white');
    rect(width / 2 + 120 , height / 2 + 20 , 100, 30, 0);  
    fill(0);
    textSize(15);
    text("Start", width / 2 + 170, height / 2 + 35);  
  } else {
    
    //"Accept" button
    fill('white');
    rect(width / 2 + 70 , height / 2 + 70 , 100, 30, 0); // Button shape
    fill(0);
    textSize(15);
    text("Accept", width / 2 + 120, height / 2 + 85); // Button text
  
    //  "No" button
    fill('white');
    rect(width / 2 -70 , height / 2 + 70 , 100, 30, 0); // Button shape
    fill(0);
    textSize(15);
    text("No", width / 2 -20, height / 2 + 85); // Button 2 text Button 2 text
  }
}

function drawThirdScreen() {
  background("rgb(174,192,211)"); 
  textFont('Silkscreen');
  textSize(32);
  textAlign(CENTER, CENTER);

  // Display the third image
  image(thirdImage, 0, 0, width, height);

  //  "Start" button
  fill('white');
  rect(width / 2 - 50  , height / 2 + 150 , 100, 30, 0); 
  fill(0);
  textSize(15);
  text("Start", width / 2, height / 2 + 165);  
}



function drawEndScreen() {
  background("white");  
  fill(255);
  textFont('Silkscreen');
  textSize(32);
  textAlign(CENTER, CENTER);

  // Display the end image
  image(endImage1, 0,0,width , height );
  image(endImage2, 400, 200,width / 9, height / 6)// This will fill the screen with the end image

  //  "Recreate" button
  fill('white');
  rect(recreateButtonX, recreateButtonY, recreateButtonWidth, recreateButtonHeight, 0);  // Recreate button
  fill(0);
  textSize(15);
  text("Recreate", width / 2, height / 2 + 215);  // "Recreate" button text, centered
}


function mousePressed() {
  if (showSecondScreen) {
    if (mouseX > width / 2 + 120 && mouseX < width / 2 + 220 && mouseY > height / 2 + 20 && mouseY < height / 2 + 50) {
      showSecondScreen = false;  // Return to start screen
    }
  } else if (showThirdScreen) {
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 150 && mouseY < height / 2 + 180) {
      showThirdScreen = false;  // Hide third screen
    }
  } else if (showEndScreen) {
    if (mouseX > recreateButtonX && mouseX < recreateButtonX + recreateButtonWidth && mouseY > recreateButtonY && mouseY < recreateButtonY + recreateButtonHeight) {
      resetGame();  // Reset the entire game and start over
    }
  } else if (showStartScreen) {
    if (mouseX > width / 2 + 70 && mouseX < width / 2 + 170 && mouseY > height / 2 + 70 && mouseY < height / 2 + 100) {
      showStartScreen = false;  
      showThirdScreen = true;   
    }
    if (mouseX > width / 2 - 70 && mouseX < width / 2 + 30 && mouseY > height / 2 + 70 && mouseY < height / 2 + 100) {
      showSecondScreen = true;  
    }
  } else {
    if (mouseX > submitButtonX && mouseX < submitButtonX + submitButtonWidth && mouseY > submitButtonY && mouseY < submitButtonY + submitButtonHeight) {
      showEndScreen = true;  // Show end screen when submit button is clicked
    }

    // Main Game logic 
    if (mouseX > cupX && mouseX < cupX + cupWidth && mouseY > cupY && mouseY < cupY + cupHeight) {
      draggingCup = true;
    }
    if (mouseX > jujuX && mouseX < jujuX + jujuWidth && mouseY > jujuY && mouseY < jujuY + jujuHeight) {
      draggingJuju = true;
    }
    if (mouseX > cakeStaticX && mouseX < cakeStaticX + cakeWidth && mouseY > cakeStaticY && mouseY < cakeStaticY + cakeHeight) {
      draggingCake = true;
    }
    if (mouseX > plantStaticX && mouseX < plantStaticX + plantWidth && mouseY > plantStaticY && mouseY < plantStaticY + plantHeight) {
      draggingPlant = true;
    }

    // Check for restart button after game over
    if (
      gameOver &&
      mouseX > 386 + buttonX &&
      mouseX < 386 + buttonX + buttonWidth &&
      mouseY > 100 + buttonY &&
      mouseY < 100 + buttonY + buttonHeight
    ) {
      restartGame();
    }
  }
}


function mouseReleased() {
  // Check if cup is dropped inside game area
  if (draggingCup && mouseX > 386 && mouseX < 386 + graphics.width && mouseY > 100 && mouseY < 100 + graphics.height) {
    player.setImage(cupImage);
    cupX = 713; // Reset position
    cupY = 382;
  }
  
  // Check if cake is dropped inside game area
  if (draggingCake && mouseX > 386 && mouseX < 386 + graphics.width && mouseY > 100 && mouseY < 100 + graphics.height) {
    player.setImage(cakeReplacement); 
    cakeX = cakeStaticX; // Reset position
    cakeY = cakeStaticY;
  }
  
  // Check if juju is dropped inside game area
  if (draggingJuju && mouseX > 386 && mouseX < 386 + graphics.width && mouseY > 100 && mouseY < 100 + graphics.height) {
    heartReplacement = true; 
    jujuX = -30; // Reset position
    jujuY = 360;
    heartReplacement1 = false; 
  }
  
  // Check if plant is dropped inside game area
  if (draggingPlant && mouseX > 386 && mouseX < 386 + graphics.width && mouseY > 100 && mouseY < 100 + graphics.height) {
    heartReplacement1 = true; 
    plantX = 715; 
    plantY = 40;
    heartReplacement = false; 
  }
  
  // Stop dragging
  draggingCup = false;
  draggingJuju = false;
  draggingCake = false;
  draggingPlant = false;
}

function resetGame() {
 
  showEndScreen = false;  // Hide end screen
  showStartScreen = true;  // Show the start screen
  
  // Reset the game variables
  gameOver = false;
  lives = 3;
  score = 0;
  obstacles = [];
  player = new Player();  // Reset player
  cupX = 713;
  cupY = 382;
  jujuX = -30;
  jujuY = 360;
  heartReplacement = false;
  heartReplacement1 = false;
  gameStarted = false;
  // Reset all draggable objects 
  cupImage = loadImage('assets/mc.png');
  player.setImage(null);
  
}



function restartGame() {
  // Reset game state
  gameOver = false;
  lives = 3;
  score = 0;
  obstacles = [];
  player = new Player();  // Reset player
  cupX = 713;
  cupY = 382;
  jujuX = -30;
  jujuY = 360;
  heartReplacement = false;
  heartReplacement1 = false;
  gameStarted = false;
  // Reset all draggable objects to their initial state
  cupImage = loadImage('assets/mc.png');
  player.setImage(null);
}




function keyPressed() {
  if (key === ' ' && !gameStarted) {
    gameStarted = true;
  } else if (key === ' ' && !gameOver) {
    player.jump();
  }
}




class Player {
  constructor() {
    this.size = 20; 
    this.x = 50; 
    this.y = graphics.height - this.size; 
    this.yVelocity = 0; 
    this.img = null; 
  }

  jump() {
    if (this.y === graphics.height - this.size) this.yVelocity = jumpStrength;
  }

  update() {
    this.yVelocity += gravity;
    this.y += this.yVelocity;
    if (this.y > graphics.height - this.size) {
      this.y = graphics.height - this.size;
      this.yVelocity = 0;
    }
  }

  setImage(img) {
    this.img = img;
  }

  display() {
    if (this.img) {
      
      graphics.image(
        this.img,
        this.x - this.size / 2, 
        this.y - this.size,    
        this.size *1.2,            
        this.size * 1.6        
      );
    } else {
      graphics.fill(255);
      graphics.ellipse(this.x, this.y, this.size);
    }
  }
}

class Obstacle {
  constructor() {
    this.width = 20;
    this.height = random(20, 40);
    this.x = graphics.width;
    this.y = graphics.height - this.height;
  }
  
  update() {
    this.x -= obstacleSpeed;
  }
  
  display() {
    graphics.fill(150, 50, 50);
    graphics.rect(this.x, this.y, this.width, this.height);
  }
  
  hits(player) {
    return (
      player.y + player.size > this.y &&
      player.x + player.size > this.x &&
      player.x < this.x + this.width
    );
  }
  
  offscreen() {
    return this.x < -this.width;
  }
}