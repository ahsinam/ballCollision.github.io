class BallCollisionGame {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  generateRandomNumber = (maxLimit = 600) => {
    let xRandom = Math.floor(Math.random() * maxLimit);
    let yRandom = Math.floor(Math.random() * maxLimit);
    return { xRandom, yRandom };
  };

  drawBall = (x, y) => {
    const mainContainer = document.getElementById("container");
    const oneBall = document.createDocumentFragment();
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball");
    ballElement.style.left = x + "px";
    ballElement.style.top = y + "px";
    oneBall.appendChild(ballElement);
    mainContainer.appendChild(oneBall);
  };

  moveBall = () => {
    const mainContainer = document.getElementById("container");
    const ball = document.querySelector("#ball");
    mainContainer.removeChild(document.querySelector(".ball"));
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
      //   this.moveBall(this.x, this.y, this.dx, this.dy);
      this.generateRandomNumber();
      this.moveBall();
    }, 100);
  };
}

const ball = new BallCollisionGame(50, 50, 5, 5);
ball.init();
