class BallCollisionGame {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

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

  moveBall = (x, y, dx, dy) => {
    const mainContainer = document.getElementById("container");
    const ball = document.querySelector("#ball");
    mainContainer.removeChild(document.querySelector(".ball"));
    const containerWidth = mainContainer.offsetWidth;
    const containerHeight = mainContainer.offsetHeight;
    if (x + dx + 40 > containerWidth || x < 0) {
      dx *= -1;
    }

    if (y + dy + 40 > containerHeight || y < 0) {
      dy *= -1;
    }
    this.x = x + dx;
    this.y = y + dy;
    this.drawBall(this.x, this.y);
  };

  init = () => {
    this.drawBall(this.x, this.y);
    setInterval(() => {
      this.moveBall(this.x, this.y, this.dx, this.dy);
    }, 10);
  };
}

const ball = new BallCollisionGame(50, 50, 1, 1);
ball.init();
