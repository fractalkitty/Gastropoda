//inspired by NAGASAWA ROSETSU's slug piece

let sluggly = [];
let paperDots = [];
let trail = [];
let playBool = false;
let cnv;
let t = 0;
function setup() {
  w = min(windowWidth * 0.9, 400);
  createCanvas(w, w);
  background(224, 202, 141);
  paper();
  slug();
  noCursor();
  tC = 0;
  textAlign(CENTER);
}
function draw() {
  if (!playBool && frameCount < 2) {
    fill(0);
    triangle(width / 2 - 10, height / 2 - 10, width / 2 - 10, height / 2 + 10, width / 2 + 10, height / 2);
  }

  if (playBool) {
    background(224, 202, 141);
    t = frameCount / 50;
    translate(width / 2, height / 2);
    strokeWeight(3);
    for (let i = 0; i < paperDots.length; i++) {
      stroke(paperDots[i].r, paperDots[i].g, paperDots[i].b, 20);
      point(paperDots[i].x, paperDots[i].y);
    }
    if (tC < 2000) {
      trail[tC] = createVector(
        mouseX - width / 2 + sluggly[sluggly.length - 1].x,
        mouseY - height / 2 + sluggly[sluggly.length - 1].y,
        6 + 3 * sin(t)
      );
      tC++;
    } else {
      trail.splice(0, 1);
      trail[tC - 1] = createVector(
        mouseX - width / 2 + sluggly[sluggly.length - 1].x,
        mouseY - height / 2 + sluggly[sluggly.length - 1].y,
        6 + 3 * sin(t)
      );
    }

    drawTrail(0, 0, 0, 10);
    push();
    translate(mouseX - width / 2, mouseY - height / 2);
    drawSlug();
    pop();
  }
}
function drawTrail(r1, g1, b1, a1) {
  fill(r1, g1, b1, a1);
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    circle(trail[i].x, trail[i].y, trail[i].z);
  }
}

function paper() {
  for (let i = 0; i < 2000; i++) {
    c = random(-50, 50);
    paperDots[i] = {
      x: random(-width / 2, width, 2),
      y: random(-height / 2, height / 2),
      r: 224 + c,
      g: 202 + c,
      b: 141 + c
    };
  }
}

function slug() {
  r = random(50, 100);
  cnt = 0;
  for (let i = 0; i < 1; i += 0.01) {
    x = -r + r * cos(i);
    y = r * sin(i);
    sluggly[cnt] = createVector(x, y, r);
    cnt++;
  }
}

function drawSlug(r1, g1, b1) {
  beginShape();
  noStroke();

  for (let i = 0; i < sluggly.length; i++) {
    fill(r1, g1, b1, 5);
    circle(
      sluggly[i].x + 2 * sin(t - i / 11),
      sluggly[i].y,
      5 + 6 * abs(cos(i / 50 - t / 20) * sin(t / 2))
    );
    fill(r1, g1, b1, 40);
    circle(
      sluggly[i].x + 1 * sin(t - i / 10),
      sluggly[i].y,
      5 + 5 * abs(cos(i / 20))
    );
    fill(r1, g1, b1, 20);
    circle(
      sluggly[i].x + 2 * sin(t - i / 11),
      sluggly[i].y,
      3 + 3 * abs(cos(i / 40))
    );
  }
  push();
  translate(sluggly[0].x + 1 * sin(t), sluggly[0].y);
  scale(0.2);
  translate(
    -sluggly[sluggly.length - 1].x + 1 * sin(t),
    -sluggly[sluggly.length - 1].y
  );
  fill(r1, g1, b1, 50);
  for (let i = 0; i < sluggly.length; i++) {
    circle(
      sluggly[i].x + 1 * sin(t - i / 10),
      sluggly[i].y,
      4 + 4 * abs(cos(i / 20))
    );
    circle(
      2 * sluggly[sluggly.length - 1].x - sluggly[i].x - 1 * sin(t - i / 10),
      sluggly[i].y,
      4 + 4 * abs(cos(i / 20))
    );
  }
  pop();
}

function mousePressed() {
  if (playBool) {
    seal();
  }
  playBool = !playBool;
}

function seal() {
  push();
  translate(width / 2 - 80, height / 2 - 50);

  scale(0.4);
  noFill();
  stroke(150, 0, 0, 200);
  circle(0, sluggly[0].z / 2, 100);
  noStroke();
  drawSlug(100, 0, 0);
  scale(0.2);
  push();
  rotate(PI / 3);
  scale(1.2);
  drawTrail(150, 0, 0, 90);
  pop();
  pop();
  push();
  translate(width / 2 - 30, height / 2 - 20);
  rotate(PI / 2);
  scale(0.3);
  rotate(random(0, PI / 5));
  drawSlug(0, 0, 0);
  translate(-50 + random(5), 50);
  scale(-0.8, 1);
  rotate(random(0, PI / 5));
  drawSlug(0, 0, 0);
  translate(50, -50 + random(-20, 0));
  scale(1, 0.8);
  rotate(random(0, PI / 5));
  drawSlug(0, 0, 0);
  pop();
}

function keyPressed() {

  if (keyCode === 83) {
    save(cnv, "slug", "jpg");
  } else {
    trail = [];
    tC = 0;
  }
}
