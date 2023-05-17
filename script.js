class BallCollisionGame {
  constructor(id, x, y, dx, dy) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  generateRandomNumber = (maxLimit = 200) => {
    let xRandom = Math.floor(Math.random() * maxLimit);
    let yRandom = Math.floor(Math.random() * maxLimit);
    return { xRandom, yRandom };
  };

  drawBall = (x, y, dx, dy) => {
    const mainContainer = document.getElementById("container");
    const oneBall = document.createDocumentFragment();
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball");
    ballElement.setAttribute("id", this.id);
    ballElement.style.left = x + "px";
    ballElement.style.top = y + "px";

    oneBall.appendChild(ballElement);
    mainContainer.appendChild(oneBall);
  };

  moveBall = () => {
    const mainContainer = document.getElementById("container");
    // const ball = document.querySelector("#ball");
    const ball = document.getElementById(this.id);
    // mainContainer.removeChild(document.querySelector(".ball"));
    ball.remove();
    const containerWidth = mainContainer.offsetWidth;
    const containerHeight = mainContainer.offsetHeight;
    if (this.x + this.dx + 40 > containerWidth || this.x < 0) {
      this.dx = this.dx * -1;
    }

    if (this.y + this.dy + 40 > containerHeight || this.y < 0) {
      this.dy = this.dy * -1;
    }
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    this.drawBall(this.x, this.y);
  };

  init = () => {
    this.drawBall(this.x, this.y);
    setInterval(() => {
      this.moveBall();
    }, 100);
  };
}

const ball1 = new BallCollisionGame(1, 50, 50, 7, 5);
const ball2 = new BallCollisionGame(2, 250, 400, 4, 8);
const ball3 = new BallCollisionGame(3, 20, 200, 1, 4);
const ball4 = new BallCollisionGame(4, 60, 90, 9, 2);
ball1.init();
ball2.init();
ball3.init();
ball4.init();

// requestAnimationFrame(() => {
//   this.moveBall();
// });
