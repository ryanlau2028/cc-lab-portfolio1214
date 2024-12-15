let numCircles = 30; 
let maxRadius = 200; 
let angleOffset = 0; 
let angleSpeed = 0.05; 
let amplitude = 40; 
let initialAmplitude = 40; 
let targetAmplitude = 20; 
let decreaseSpeed = 0.7; 
let time = 0; 

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('p5-container');
  noFill();
  strokeWeight(2);
}

function draw() {
  background(0);
  
 
  if (mouseIsPressed) {
    amplitude += 0.5; 
  } else {
   
    if (amplitude > targetAmplitude) {
      amplitude -= decreaseSpeed; 
    }
    
    amplitude = max(amplitude, targetAmplitude);
  }

  
  
  // time change
  time += 0.05;

  
  
  // loop ellipse
  for (let i = 0; i < numCircles; i++) {
    let radius = (i + 1) * (maxRadius / numCircles);
    
    
    
    // change position
    let yOffset = sin(angleOffset + i * 0.2) * amplitude;
    
    
    
    // transparency change
    let alpha = map(sin(time - i * 0.3), -1, 1, 50, 255); 
    
    stroke(150, 0, 0, alpha); 
    ellipse(width / 2, height / 2 + yOffset, radius * 2, radius * 1.3);
  }

  
  angleOffset += angleSpeed;
}
