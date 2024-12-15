let minutes = 0;
let texts = [];
let maxTexts = 60;  // Limit the number of "MISSISSIPPI" texts
let canvasWidth = 600;
let canvasHeight = 400;
let leftWidth = 200;
let timePassed = 0;
let lastMinute = 0;
let fonts = ['sans-serif', 'serif', 'monospace', 'Georgia', 'Verdana', 'Luckiest Guy', 'Raleway', 'Anton', 'Matemasie', 'Black Ops One'];
let img;  // Image storage
let state = "start";  // State control
let scaleSize = 1;
let startTime = 0;  // Start time for the timer



// Load the image
function preload() {
  img = loadImage('assets/mississippi b.png');  
}

function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
 canvas.parent('p5-container');
  textAlign(CENTER, CENTER);
  textSize(36);
}

function draw() {
  if (state === "start") {
    drawStartScreen();
  } else if (state === "main") {
    drawMainScreen();
  }
}



// Start screen
function drawStartScreen() {
  background(0);
 
  
  // Scale image every half-second
  if (frameCount % 60 < 30) {
    scaleSize = 0.95;
  } else {
    scaleSize = 1;
  }

  let imgWidth = canvasWidth * scaleSize;
  let imgHeight = canvasHeight * scaleSize;
  let imgX = (canvasWidth - imgWidth) / 2;
  let imgY = (canvasHeight - imgHeight) / 2;

  image(img, imgX, imgY, imgWidth, imgHeight);

  // Display "Click to Start"
  fill(255);
  textSize(24);
  textFont('Shadows Into Light');
  text("Click to Start", canvasWidth / 2, canvasHeight - 350);
}



// Switch to the main screen on mouse click
function mousePressed() {
  if (state === "start") {
    state = "main";
    startTime = millis();  
  }
}



// Main screen
function drawMainScreen() {
  background(255);

  
  
  // Calculate elapsed time in minutes
  let elapsedTime = millis() - startTime;
  minutes = Math.floor(elapsedTime / 60000);

  
  
  // Right side background
  fill('rgb(247,247,247)');
  rect(leftWidth, 0, canvasWidth - leftWidth, height);

  let currentSecond = second();

  
  
  // Add new "MISSISSIPPI" text every second
  if (currentSecond !== timePassed) {
    timePassed = currentSecond;
    let newText = {
      text: "MISSISSIPPI",
      size: random(20, 100),
      x: random(leftWidth + 20, canvasWidth - 50),
      y: random(50, canvasHeight - 50),
      angle: random(-PI, PI),
      alpha: 255,
      font: random(fonts),
      outline: random([true, false]),
      time: millis()
    };
    texts.push(newText);
    if (texts.length > maxTexts) {
      texts.shift();
    }
  }

  // "MISSISSIPPI" texts
  for (let i = 0; i < texts.length; i++) {
    let t = texts[i];
    let timeElapsed = millis() - t.time;

    t.alpha = map(timeElapsed, 0, 8000, 255, 0);
    if (t.alpha < 0) t.alpha = 0;

    push();
    translate(t.x, t.y);
    rotate(t.angle);

    if (t.outline) {
      noFill();
      stroke(0, t.alpha);
      strokeWeight(0.5);
    } else {
      fill(0, t.alpha);
      noStroke();
    }

    textFont(t.font);
    textSize(t.size);
    textStyle(BOLD);
    text(t.text, 0, 0);
    pop();
  }

  
  
  // Draw the left black panel and display minutes
  fill(0);
  rect(0, 0, leftWidth, height);
  fill(255);
  textSize(96);
  textFont('Shadows Into Light');
  text(minutes, leftWidth / 2, height / 2);
}
