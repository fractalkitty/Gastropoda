//wccchallenge - slugs
let type;
function setup() {
  noStroke();
  c = 0.9 * min(700, min(windowWidth, windowHeight));
  createCanvas(c, c);
  // let sketch = document.querySelector("#sketch");
  // let canvas0 = document.querySelector("#p5-info");
  sketch.after(canvas0);
  angleMode(DEGREES);
  slugCircles = [];
  for (let i = 0; i < int(random(3, 8)); i++) {
    slugCircles[i] = {
      r: floor(random(3, 15)),
      t: floor(random(4, 8))
    };
  }
  type = floor(random(0, 2.9999));
}
function draw() {
  t = frameCount;
  background(255, 255, 255);
  fill(0);
  translate(width / 2, height / 2);
  if (type === 0) {
    slugRotate();
  } else if (type === 1) {
    slugSpiral();
  } else {
    slugSymmetry();
  }
}

function slugSymmetry() {
  i = 0;
  s();
  scale(-1, 1);
  s();
  scale(1, -1);
  s();
  scale(-1, 1);
  s();
  function s() {
    for (let j = 0; j < 100; j += 2) {
      a = 360 / (slugCircles[i].r + 5);
      push();
      scale(1 / (j + 1));
      rotate((360 / slugCircles[i].r) * j);
      slug(70, 70 + a, t / slugCircles[i].t);
      pop();
    }
  }
}
function slugSpiral() {
  // circle(0,0,10)
  for (let k = 0; k < slugCircles.length - 1; k++) {
    push();
    rotate((360 / slugCircles.length) * k + (k * t) / 50);
    i = 0;
    s();
    pop();
  }

  function s() {
    for (let j = 0; j < 100; j += 2) {
      a = 360 / (slugCircles[i].r + 5);
      push();
      scale(3.5 / (j + 1));
      rotate((360 / slugCircles[i].r) * j);
      slug(70, 70 + a, t / slugCircles[i].t);
      pop();
    }
  }
}
function slugRotate() {
  for (let i = 0; i < slugCircles.length; i++) {
    for (let j = 0; j < slugCircles[i].r; j++) {
      a = 360 / (slugCircles[i].r + 5);
      push();
      if (i % 2 === 0) {
        scale(1.2 / (i * i + 1));
      } else {
        scale(1.2 / (i * i + 1), -1.2 / (i * i + 1));
      }

      rotate((360 / slugCircles[i].r) * j);
      slug(70, 70 + a, t / slugCircles[i].t);
      pop();
    }
  }
}
function slug(start, stop, t1) {
  for (let i = start; i < stop; i++) {
    x = (width / 3) * cos(i + t1);
    y = (width / 3) * sin(i + t1);
    circle(
      x,
      y,
      min((stop - start) / 1.5, i - start) +
      (min((stop - start) / 1.5, i - start) / 10) * sin((i - start) * 10 + t)
    ) +
      5 * cos(i);
  }
  push();

  translate(x, y);
  // rotate(t1)
  scale(0.3);
  translate(-stop / 8, stop / 12);

  for (let i = 0; i < (stop - start) * 2; i += 6) {
    x = -i;
    y = 20 * sin(i * 2.5) * cos(t1 * 2);
    circle(x, y, i / 5 + 5);
  }
  translate(0, -stop / 6);

  for (let i = 0; i < (stop - start) * 2.3; i += 6) {
    x = -i;
    y = 20 * sin(-i * 2) * cos(t1) * cos(t1 * 2);
    circle(x, y, i / 5 + 5);
  }

  pop();
}

function mousePressed() {
  setup();
  draw();
}
