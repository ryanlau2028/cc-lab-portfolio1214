let w,h,rad,rad1;
let r,g,b;
let r1,g1,b1;
let r2, g2,b2;
let cornerRadius,cornerRadius1,cornerRadius2;
let circleDiameter, circleDiameter1;



function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('p5-container');
 
  noCursor();

  
  cornerRadius = 0;
  
  cornerRadius1 = 0;
  
  w = 40;
  h = 20;
  rad = 30;
  rad1=15
  
  r = g = 255
  b = 255
  r1 = g1 = 0
  b1 = 1
  
}




function draw() {
  background(r1,g1,b1);
  
  strokeWeight(3);
  
  noCursor();
  
 
  
  
  
  rad = (mouseX+mouseY)/5
 rad1 = (mouseX+mouseY)/10
  cornerRadius = map(mouseX + mouseY, 0, width + height, 0, rad / 0.5);
  cornerRadius1 = map(mouseX + mouseY, 0, width + height, 0, rad / 0.5);
  cornerRadius2 = map(mouseX + mouseY, 0, width + height, 0, rad / 15);
  circleDiameter = min(rad, rad1) * 0.4;
   circleDiameter1 = min(rad, rad1) * 0.2;
 
  
  
  push();
  fill(r,g,b)
  

  
  rectMode(CENTER)
  
  
  //fin
  push();
  fill(r2,g2,b2)
  rect(mouseX + rad1*0.9 , mouseY + rad1 * 0.5,rad * 0.1,rad1 * 0.4,cornerRadius,cornerRadius1,cornerRadius1,cornerRadius);
  
  
     //tail
  
rect(mouseX - rad1,mouseY + rad *0.1,rad * 0.3,rad1*0.6,cornerRadius2,cornerRadius,cornerRadius1,cornerRadius1);
  pop();
  
  
  //body
rect(mouseX,mouseY,rad,rad1*1.6,cornerRadius,cornerRadius1,cornerRadius1,cornerRadius);
  
  
  // speckles
 push();
  
  blendMode(SCREEN)
   
  ellipse(mouseX-rad* 0.3 , mouseY, circleDiameter1*0.7, circleDiameter1*0.7); 
 
  ellipse(mouseX-rad* 0.2 , mouseY - rad * 0.2, circleDiameter1*0.7, circleDiameter1*0.7); 
  ellipse(mouseX , mouseY - rad * 0.2, circleDiameter1*0.7, circleDiameter1*0.7); 
  ellipse(mouseX-rad* 0.1 , mouseY, circleDiameter1*0.7, circleDiameter1*0.7); 
   ellipse(mouseX+rad* 0.1 , mouseY, circleDiameter1*0.7, circleDiameter1*0.7); 
    ellipse(mouseX+rad* 0.3 , mouseY, circleDiameter1*0.7, circleDiameter1*0.7); 
   ellipse(mouseX+rad* 0.2 , mouseY - rad * 0.2, circleDiameter1*0.7, circleDiameter1*0.7); 
    ellipse(mouseX+rad* 0.1 , mouseY - rad * 0.35, circleDiameter1*0.7, circleDiameter1*0.7); 
  ellipse(mouseX-rad* 0.1 , mouseY - rad * 0.35, circleDiameter1*0.7, circleDiameter1*0.7); 
  pop();
  
  
  

  
  //fin
  push();
  
  fill(r2,g2,b2)
  rect(mouseX, mouseY + rad1 * 0.5,rad * 0.1,rad1 * 0.4,cornerRadius,cornerRadius1,cornerRadius1,cornerRadius);
  
  pop();
  

  
  
  
  
  //left eye
   fill('white'); 
  ellipse(mouseX + rad * 0.4, mouseY - rad1 * 0.1, circleDiameter, circleDiameter); 
   fill(0)
   ellipse(mouseX + rad * 0.4, mouseY - rad1 * 0.1, circleDiameter1, circleDiameter1); 
  
  
  //right eye
   fill('white'); 
  ellipse(mouseX + rad * 0.1, mouseY - rad1 * 0.1, circleDiameter, circleDiameter); 
   fill(0)
   ellipse(mouseX + rad * 0.1, mouseY - rad1 * 0.1, circleDiameter1, circleDiameter1); 
  
  
  
  
  //mouth
  push();
  
  fill('white')
  arc(mouseX+ rad * 0.25, mouseY+ rad1 * 0.15, circleDiameter / 1.5, circleDiameter/ 1.5, 0, PI);
  
  pop();

  
  
  
  fill('rgb(13,13,13)');
  
  
  fill('white')
  textFont('Courier New');
  textSize(20);
  text('click',170,100);
  
 pop();
  
  
  fill('rgb(255,205,3)')
  
  
}

 

function mouseClicked(){
r = random(0,255);
  g = random(0,255)
  b = random(0,255)
  r1 = random(0,255);
  g1 = random(0,255)
  b1 = random(0,255)
   r2 = random(0,255);
  g2 = random(0,255)
  b2 = random(0,255)
}
  

 function mousePressed() {
  
  rad += 100;  
  rad1 += 500;  
  cornerRadius += 205;  
}


