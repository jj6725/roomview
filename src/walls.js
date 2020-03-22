// Walls
let ax = [0,100,200,305,405,615,715,820,820,795,795,835,835,940,940,765,765,470,470,330,330,65,65,65,55,45,15,35,20,510,35,55,145,145,375,435,590,590,685,685,510,510,510,645,685,680,680,540,510,470,330,330,45,150]
let ay = [190,160,130,105,80,35,15,0,75,75,340,340,615,615,725,725,795,795,885,885,915,915,795,700,600,505,345,345,285,60,345,600,600,660,660,550,330,280,280,435,480,480,440,440,525,790,685,610,595,795,885,750,505,505]
let bx = [100,200,305,405,615,715,820,820,795,795,835,835,940,940,765,765,470,470,330,330,65,65,65,55,45,15,35,20,0,510,155,145,145,375,435,385,590,790,685,685,735,510,550,685,830,680,615,505,470,470,330,400,150,150]
let by = [160,130,105,80,35,15,0,75,75,340,340,615,615,725,725,795,795,885,885,915,915,795,700,600,505,345,345,285,190,360,345,600,660,660,550,525,280,280,355,580,610,440,440,440,525,685,650,590,670,770,750,750,505,345]

// Pis
let PI_X = [25,480,565,785,320,110,305,810]
let PI_Y = [205,125,130,65,340,720,800,700]
let PI_IPS = ["12","80","236","166","216","242","224","6"]

// Colors
let BLUE, RED;

// OtherConsts
let MIN_TEMP = 15
let MAX_TEMP = 35
let MIN_HUMIDITY = 0
let MAX_HUMIDITY = 100

let scaleFactor = 1;
let PADDING = 50;

let tempArr = [], humidityArr = [];

function setup() {
  frameRate(1)
  colorMode(RGB)
  createCanvas(windowWidth, windowHeight);
  let ratioX = (windowWidth-PADDING)/max(ax);
  let ratioY = (windowHeight-PADDING)/max(ay);
  scaleFactor = ratioX > ratioY ? ratioY : ratioX;

  for (var i = PI_IPS.length - 1; i >= 0; i--) {
    tempArr.push(random(MIN_TEMP,MAX_TEMP))
    humidityArr.push(random(MIN_HUMIDITY,MAX_HUMIDITY))
  }

  BLUE = color(52, 52, 235)
  RED = color(230, 64, 39)
}

function draw() {
  background(255);
  drawSetLines();

  for (var i = tempArr.length - 1; i >= 0; i--) {
    let val = (tempArr[i]-MIN_TEMP)/(MAX_TEMP-MIN_TEMP);
    drawGradient(PI_X[i], PI_Y[i], val);
  }

}

function drawGradient(x, y, value) {
  let radius = 300
  for (let r = 1; r < radius; r++) {
    lerpedColor = lerpColor(BLUE,RED,value);
    lerpedColor.setAlpha(255*(1/r));
    noStroke();
    fill(lerpedColor);
    circle(x, y, r);
  }
}

function drawSetLines() {
  for (var i = ax.length - 1; i >= 0; i--) {
    stroke(252, 173, 3);
    strokeWeight(5);
    line(ax[i]*scaleFactor, ay[i]*scaleFactor, bx[i]*scaleFactor, by[i]*scaleFactor);
  }
}

function mousePressed() {
  // console.log(round5(mouseX), round5(mouseY));
}

function keyPressed() {
  if(key=='f'){
    fetchAll()
  }
}

function fetchAll() {
  tempArr = []
  for (var i = PI_IPS.length - 1; i >= 0; i--) {
    let tempUrl = `http://10.0.0.${PI_IPS[i]}:6725/temp`
    let humidityUrl = `http://10.0.0.${PI_IPS[i]}:6725/humidity`
    fetchData(tempUrl, tempArr)
    // fetchData(humidityUrl, humidityArr)
  }
}

function fetchData(url, dataArr) {
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    if(data["temperature"]) {
      console.log(data["temperature"])
      dataArr.push(data["temperature"])
    }
  })
}

function round5(number) {
  return round(number/5)*5;
}
