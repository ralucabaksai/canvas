function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = getRndColor();
  this.radius = radius;
  this.minRadius = radius;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();

    c.font = "48px serif";
    c.fillText("Hello I'm Raluca", canvas.width / 2, canvas.height / 2);
    // c.stroke();
  };

  this.update = function () {
    if (this.x > innerWidth + this.radius || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    if (this.y > innerHeight + this.radius || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;
    //interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50 &&
      this.radius < maxRadius
    ) {
      this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius += -1;
    }
    this.draw();
  };
}
function getRndColor() {
  var colorArray = ["#040DBF", "#809DF2", "#C2CEF2", "#3071F2"];
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function init() {
  circleArray = [];
  for (i = 0; i < 800; i++) {
    var radius = Math.random() * 1 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var dy = Math.random() - 0.5;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
var canvas = document.querySelector("canvas");

var c = canvas.getContext("2d");
var mouse = {
  x: undefined,
  y: undefined,
};
var circleArray = [];
var maxRadius = 10;
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

init();
animate();
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});
canvas.addEventListener("resize", function (e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
