let delay = 5000;





let capture;
let img1 = 0;
let img2 = 0;

let boxH = 20;

let addMillis = 0;

let cnv;

this.focus();

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  document.body.style.overflow = 'hidden'
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
}

function draw() {

  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture.get(0, 0, width, height), 0, 0);
  pop();

  stroke(255, 0, 0)
  line(width / 2, 0, width / 2, height)

  if (img1 == 0) {
    fill(0, 255, 255);
    rect(0, 0, width, boxH)

    fill(255, 255, 0);
    beginShape();
    vertex(0, 0);
    vertex(width, boxH / 2);
    vertex(0, boxH);
    endShape(CLOSE);
  }
  if (img1 != 0 && img2 == 0) {
    fill(0, 255, 255);
    rect(0, 0, width, boxH)

    fill(255, 255, 0);
    beginShape();
    vertex(0, boxH / 2);
    vertex(width, 0);
    vertex(width, boxH);
    endShape(CLOSE);
  }

  push();
  translate(width, 0);
  scale(-1, 1);
  if (img1 != 0)
    image(img1, 0, 0);

  if (img2 != 0)
    image(img2, width / 2, 0);
  pop();

  if (millis() > delay + addMillis && img1 == 0) {
    img1 = capture.get(0, 0, width / 2, height);
    filter(INVERT);
  }
  if (millis() > delay * 2 + addMillis && img2 == 0) {
    img2 = capture.get(width / 2, 0, width, height);
    filter(INVERT);
  }
}

function keyPressed() {
  saveCanvas(cnv, '' + millis(), 'png');
}

function mousePressed() {
  img1=0;
  img2=0;
  addMillis=millis();
}