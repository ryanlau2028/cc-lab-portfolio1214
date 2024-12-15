let sneezeData = [
    { day: "Monday", time: "10:00", count: 3, location: "home" },
    { day: "Monday", time: "10:50", count: 1, location: "outside" },
    { day: "Monday", time: "18:10", count: 2, location: "home" },
    { day: "Tuesday", time: "10:30", count: 2, location: "home" },
    { day: "Tuesday", time: "16:00", count: 1, location: "home" },
    { day: "Wednesday", time: "10:20", count: 3, location: "home" },
    { day: "Wednesday", time: "19:00", count: 32, location: "Friend's home" },
    { day: "Wednesday", time: "23:00", count: 7, location: "home" },
    { day: "Thursday", time: "13:00", count: 5, location: "home" },
    { day: "Thursday", time: "15:40", count: 1, location: "home" },
    { day: "Thursday", time: "18:30", count: 2, location: "outside" },
    { day: "Friday", time: "07:00", count: 1, location: "home" },
  ];
  
  let sneezeClouds = [];
  let dayWidth;
  let currentDay = ""; 
  let sneezeQueue = []; 
  let nextSneezeTime = 0; 
  
  function setup() {
    let canvas = createCanvas(600, 600);
 canvas.parent('p5-container');
    
    noStroke();
    dayWidth = (width - 50) / 5; // space for time labels
  
    
    textFont('Hi Melody');
    textSize(20); // 
    
    
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    for (let i = 0; i < days.length; i++) {
      let button = createButton(days[i]);
      button.position(350 + i * dayWidth + dayWidth / 2 - 20, 260); // Centered in each day's column
      button.style("font-family", "Hi Melody"); 
      button.style("font-size", "18px"); 
      button.mousePressed(() => showDay(days[i])); // Set click event
    }
  }
  
  function draw() {
    background('rgb(234,231,229)');
  
   
    drawHourLabels();
  
    
    if (currentDay !== "") {
    
      if (millis() > nextSneezeTime && sneezeQueue.length > 0) {
        let sneeze = sneezeQueue.shift(); // Get the next sneeze from the queue
        sneezeClouds.push(new SneezeCloud(sneeze));
        nextSneezeTime = millis() + random(300, 800); // Set time for next sneeze cloud 
      }
  
      // sneeze clouds
      for (let i = sneezeClouds.length - 1; i >= 0; i--) {
        sneezeClouds[i].display();
        sneezeClouds[i].expand();
        if (sneezeClouds[i].isFaded()) {
          sneezeClouds.splice(i, 1); // Remove faded clouds
        }
      }
    }
  
    //  bottom label
    drawBottomLabel();
  }
  
  
  function showDay(day) {
    currentDay = day;
    sneezeClouds = []; 
    sneezeQueue = []; 
    nextSneezeTime = millis(); 
  
    // Add individual sneezes
    sneezeData.forEach((data) => {
      if (data.day === day) {
        for (let i = 0; i < data.count; i++) {
          sneezeQueue.push(data); 
        }
      }
    });
  }
  
  // hour labels
  function drawHourLabels() {
    textSize(16); 
    textAlign(RIGHT);
    fill(150);
    let hours = [9, 12, 15, 18, 21, 6]; 
    for (let h of hours) {
      let y = map(h, 6, 24, 50, height); 
      text((h === 6 ? "6:00" : h + ":00"), 40, y); 
      line(50, y, width, y); 
    }
  }
  
  // bottom label
  function drawBottomLabel() {
    textSize(24); 
    textAlign(CENTER);
    fill(0);
    text("Weekday Sneezes 🤧", width / 2, height - 10); 
  }
  
  class SneezeCloud {
    constructor(data) {
      // Determine day index for x-position
      let dayIndex = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].indexOf(data.day);
      this.x = 50 + dayIndex * dayWidth + dayWidth / 2; // Adjusted x-position with space for time labels
  
      // Determine y-position based on time
      this.y = mapTimeToY(data.time);
  
      this.size = random(15, 35) + random(0.5, 2) * 10; 
      this.opacity = 200; 
      this.expandRate = random(0.5, 1.5); 
    }
  
    expand() {
      this.size += this.expandRate;
      this.opacity -= 1.5; // fade out
    }
  
    display() {
      fill(100, 100, 255, this.opacity); 
      ellipse(this.x, this.y, this.size);
    }
  
    isFaded() {
      return this.opacity <= 0;
    }
  }
  
  // Map time (HH:MM) to a y-position on the canvas
  function mapTimeToY(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;
    let y = map(totalMinutes, 6 * 60, 24 * 60, 50, height); // Map to canvas height, starting from 6:00 to 24:00
    return y;
  }
  