var sensors;
var colorGrid;
var drawBackground = true;

const BLOCK_SIZE = 20

function setup() {
  createCanvas(1000, 500);
  sensors = []
  colorGrid = []
  createGrid();
  createSensors();
  frameRate(60);
}

function createGrid() {
  for (i = 0; i < windowWidth; i+=BLOCK_SIZE) {
    for (j = 0; j < windowHeight; j+=BLOCK_SIZE) {
      var newobj = new TempPoint(i,j,50)
      colorGrid.push(newobj)
    }
  }
}

function createSensors() {
  sensors.push(new Draggable(100,90,60))
  sensors.push(new Draggable(200,180,70))
  sensors.push(new Draggable(300,190,80))
  sensors.push(new Draggable(400,300,90))
}

function draw() {
    background(255);
    colorGrid.forEach(block => {
      let temp = 0
      sensors.forEach(sensor => {
        const xdist = (block.x/BLOCK_SIZE-sensor.x/BLOCK_SIZE)*(block.x/BLOCK_SIZE-sensor.x/BLOCK_SIZE)
        const ydist = (block.y/BLOCK_SIZE-sensor.y/BLOCK_SIZE)*(block.y/BLOCK_SIZE-sensor.y/BLOCK_SIZE)
        const distance = sqrt(xdist+ydist)
        temp += (sensor.value) * Math.pow(1.2, (-distance))
      })
      block.update(temp/4+50);
      block.draw();
    })
  
    sensors.forEach(sensor => {
      sensor.over();
      sensor.update();
      sensor.show();
    })
}

function mousePressed() {
  sensors.forEach(sensor => {
    sensor.pressed()
  })
}

function mouseReleased() {
  sensors.forEach(sensor => {
    sensor.released()
  })
}

function colorMap(value) {
  const hotColor = color(255, 51, 0)
  const coldColor = color(0, 136, 255)
  const minTemp = 50
  const maxTemp = 100
  return lerpColor(coldColor, hotColor, map(value, minTemp, maxTemp, 0, 1));
}
