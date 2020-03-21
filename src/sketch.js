let img;
let x_off = 200;
let y_off = 50;
let fVec = [];
let sVec = [];
let firstClick = true;
let firstVector;
let secondVector;

function setup() {
  createCanvas(windowWidth, windowHeight);
  firstVector = createVector(0,0);
  secondVector = createVector(0,0);
  img = loadImage('floorplan.jpg')
}

function draw() {
  image(img, x_off, y_off, img.width*2, img.height*2);
  drawLine();
  drawGrid();
  drawSetLines();
}

function drawGrid() {
  for (let x = 0; x < windowWidth; x+=10){
    for (let y = 0; y < windowHeight; y+=10){
      strokeWeight(1);
      stroke(0);
      point(x,y);
    }
  }
}

function drawLine() {
  if (!firstClick ) {
    stroke(25, 224, 214);
    strokeWeight(3);
    line(firstVector.x, firstVector.y, mouseX, mouseY);
  }
}

function drawSetLines() {
  for (var i = fVec.length - 1; i >= 0; i--) {
    stroke(252, 173, 3);
    fill(252, 173, 3);
    strokeWeight(2);
    line(fVec[i].x, fVec[i].y, sVec[i].x, sVec[i].y);
    circle(fVec[i].x, fVec[i].y, 5)
    circle(sVec[i].x, sVec[i].y, 5)
  }
}

function mousePressed() {
  if (firstClick) {
    let roundX = round5(mouseX);
    let roundY = round5(mouseY);
    firstVector = createVector(roundX, roundY);
    fill(25, 224, 214);
    circle(roundX, roundY, 5)
    firstClick = false;
  } else {
    let roundX = round5(mouseX);
    let roundY = round5(mouseY);
    secondVector = createVector(roundX, roundY);
    fVec.push(firstVector);
    sVec.push(secondVector);
    console.log(firstVector, secondVector);
    firstClick = true;
  }
}

function keyPressed() {
  if(keyCode==ESCAPE) {
    firstClick = true;
  }

  if(key=='u'){
    fVec.pop()
    sVec.pop()
  }

  if(key=='s'){
    let lastPoint = sVec[sVec.length-1];
    firstVector = lastPoint;
    firstClick = false;
    fill(25, 224, 214);
    circle(lastPoint.x, lastPoint.y, 5)
  }

  if(key=='p'){
    console.log("========================")
    for (var i = 0; i < fVec.length; i++) {
      console.log(fVec[i].x, fVec[i].y, sVec[i].x, sVec[i].y)
    }
    console.log("========================")
  }
}

function round5(number) {
  return round(number/5)*5;
}