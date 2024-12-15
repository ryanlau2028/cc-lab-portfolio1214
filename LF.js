function setup() {
    let canvas = createCanvas(400, 400);
 canvas.parent('p5-container'); 
  }
  
  function draw() {
    background('#D3C5B6');
    noStroke()
    
    //palm
    push()
    fill('#A37A60')
    rect(118,150,150,150,40,70,60,60)
    pop();
    
    
    //arm
     push()
    fill('#A37A60')
    quad(140, 600, 250, 600, 240, 270, 150, 270)
    pop();
    
    //thumb
    push()
    translate(280,142)
    rotate(PI/7.5)
    fill('#A37A60')
    rect(0,0,33,120,40,40,0,0)
    pop();
    
    //little finger
    push()
    fill('#A37A60')
    rect(118,80,27,160,40,40,0,0)
    pop();
    
    //ring finger
    push()
    fill('#A37A60')
    rect(153,30,30,160,40,40,0,0)
    pop();
    
    
    //M finger
    push()
    fill('#A37A60')
    rect(190,10,30,160,40,40,0,0)
    pop();
    
     //ring finger
    push()
    fill('#A37A60')
    rect(228,30,30,160,40,40,0,0)
    pop();
    
    
      //little finger nail
    push()
    blendMode(SCREEN)
    rect(123,85,15,20,40,40,0,0)
    pop();
    
    
      //ring finger nail
    push()
    blendMode(SCREEN)
    rect(158,35,20,25,40,40,0,0)
    pop();
    
    
      //M finger nail
    push()
    blendMode(SCREEN)
    rect(195,15,20,25,40,40,0,0)
    pop();
    
    
      //index finger nail
    push()
    blendMode(SCREEN)
    rect(233,35,20,25,40,40,0,0)
    pop();
    
    
     //thumb nail
    push()
    translate(296,150)
    rotate(PI/7.5)
    fill('#DEBA9C')
    rect(0,0,15,25,40,0,0,0)
    pop();
    
    
    
    //the bracelet
   let numberOfCircles = 20; 
    let radius = 65; 
    let centerX = width / 2.05;
    let centerY = height / 1.5;
    let startAngle = PI / 4; 
    let endAngle = (3 * PI) / 4; 
  
    for (let i = 0; i < numberOfCircles; i++) {
  
      let angle = map(i, 0, numberOfCircles - 1, startAngle, endAngle);
  
      
      let x = centerX + radius * cos(angle);
      let y = centerY + radius * sin(angle);
  
      // outer circle
      fill('#CF9D07')
      ellipse(x, y, 10, 10);
      //inner circlw
      fill('#A37A60')
      ellipse(x, y, 5,5);
      
      
      
      
    
    }
  }