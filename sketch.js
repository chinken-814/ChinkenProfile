var circles = [];
var MAX_CIRCLES = 30;
var MIN_DIST_FROM_MOUSE = 150;
var CIRCLE_SPEED = 2;
var spacing = 10;
var circleCounter = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}

function draw() {
    background(17, 207, 28);
    stroke(255, 100);
    strokeWeight(3);
    line(pmouseX,pmouseY, mouseX, mouseY);
    stroke(84, 55, 9);
    fill(224, 144, 18, 200);
    rect(mouseX,mouseY,10,85);
    strokeWeight(2);
    fill(43, 61, 43);
    textFont('Impact');
    textSize(100);
    text("FROGS!", 100, 300);
    strokeWeight(5);

    for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    
    for (var j = 0; j < circles.length; j++) {
      if (i === j) continue;
      var other = circles[j];
      var d = dist(c.x, c.y, other.x, other.y);
      var minDistance = c.size / 2 + other.size / 2;
      
      if (d < minDistance) {
        var angle = atan2(other.y - c.y, other.x - c.x);
        var overlap = minDistance - d;
        c.x -= cos(angle) * (overlap / 2);
        c.y -= sin(angle) * (overlap / 2);
        other.x += cos(angle) * (overlap / 2);
        other.y += sin(angle) * (overlap / 2);
      }
    }
    
    var d = dist(c.x, c.y, mouseX, mouseY);
    if (d > MIN_DIST_FROM_MOUSE) {
      var angle = atan2(mouseY - c.y, mouseX - c.x);
      c.x += cos(angle) * CIRCLE_SPEED;
      c.y += sin(angle) * CIRCLE_SPEED;
    }
    
    var r = map(mouseX, 0, width, 0, 255);
    var g = map(mouseY, 0, height, 0, 255);
    var b = 150;
    c.color = color(r, g, b);

    strokeWeight(2);
    fill(c.color);
    ellipse(c.x, c.y, c.size, c.size);
  }
}

function mousePressed() {
  if (circles.length >= MAX_CIRCLES) {
    circles.shift();
  }
  
  var circleSize = random(30, 50);
  
  var x = random(circleSize, width - circleSize);
  var y = random(circleSize, height - circleSize);
  
  var newCircle = {
    x: x,
    y: y,
    size: circleSize,
    color: color(0)
  };
  circles.push(newCircle);
  
  circleCounter++;
}