let ax = [0,100,200,305,405,615,715,820,820,795,795,835,835,940,940,765,765,470,470,330,330,65,65,65,55,45,15,35,20,510,35,55,145,145,375,435,590,590,685,685,510,510,510,645,685,680,680,540,510,470,330,330,45,150]
let ay = [190,160,130,105,80,35,15,0,75,75,340,340,615,615,725,725,795,795,885,885,915,915,795,700,600,505,345,345,285,60,345,600,600,660,660,550,330,280,280,435,480,480,440,440,525,790,685,610,595,795,885,750,505,505]
let bx = [100,200,305,405,615,715,820,820,795,795,835,835,940,940,765,765,470,470,330,330,65,65,65,55,45,15,35,20,0,510,155,145,145,375,435,385,590,790,685,685,735,510,550,685,830,680,615,505,470,470,330,400,150,150]
let by = [160,130,105,80,35,15,0,75,75,340,340,615,615,725,725,795,795,885,885,915,915,795,700,600,505,345,345,285,190,360,345,600,660,660,550,525,280,280,355,580,610,440,440,440,525,685,650,590,670,770,750,750,505,345]

let scaleFactor = 1;
let padding = 50;

let temp = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let ratioX = (windowWidth-padding)/max(ax);
  let ratioY = (windowHeight-padding)/max(ay);

  console.log(ratioX, ratioY);

  scaleFactor = ratioX > ratioY ? ratioY : ratioX;
}

function draw() {
  drawSetLines();
}

function drawSetLines() {
  for (var i = ax.length - 1; i >= 0; i--) {
    stroke(252, 173, 3);
    strokeWeight(5);
    line(ax[i]*scaleFactor, ay[i]*scaleFactor, bx[i]*scaleFactor, by[i]*scaleFactor);
  }
}

function keyPressed() {
  if(key=='f'){
    fetchData();
  }
}

function fetchData() {
  fetch('http://10.0.0.166:6725/temp')
  .then((response) => {
    response.json()
  })
  .then((data) => {
    console.log(data)
    temp = data
  })
}