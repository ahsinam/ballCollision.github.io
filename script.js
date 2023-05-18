const generateRandomNumber = (maxLimit = 200) => {
  let xRandom = Math.floor(Math.random() * maxLimit);
  let yRandom = Math.floor(Math.random() * maxLimit);
  return { xRandom, yRandom };
};

const getDistance = (x1, y1, x2, y2) => {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  const distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  return distance;
};

const rotate = (velocityX, velocityY, angle) => {
  const rotatedVelocities = {
    x: velocityX * Math.cos(angle) - velocityY * Math.sin(angle),
    y: velocityX * Math.sin(angle) + velocityY * Math.cos(angle),
  };

  return rotatedVelocities;
};

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.dx - otherParticle.dx;
  const yVelocityDiff = particle.dy - otherParticle.dy;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.dx, particle.dy, angle);
    const u2 = rotate(otherParticle.dx, otherParticle.dy, angle);

    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.dx = vFinal1.x;
    particle.dy = vFinal1.y;

    otherParticle.dx = vFinal2.x;
    otherParticle.dy = vFinal2.y;
  }
}

const balls = [
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 3,
    dy: 2,
    mass: 1,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 2,
    dy: 4,
    mass: 2,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 1,
    dy: 4,
    mass: 3,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 6,
    dy: 2,
    mass: 4,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 2,
    dy: 8,
    mass: 5,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 2,
    dy: 1,
    mass: 6,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 6,
    dy: 7,
    mass: 7,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 3,
    dy: 6,
    mass: 8,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 2,
    dy: 4,
    mass: 9,
  },
  {
    x: generateRandomNumber().xRandom,
    y: generateRandomNumber().yRandom,
    dx: 1,
    dy: 4,
    mass: 10,
  },
];
// const balls = [
//   {
//     x: generateRandomNumber().xRandom,
//     y: generateRandomNumber().yRandom,
//     dx: 3,
//     dy: 2,
//     mass: 1,
//   },
//   {
//     x: generateRandomNumber().xRandom,
//     y: generateRandomNumber().yRandom,
//     dx: 2,
//     dy: 4,
//     mass: 2,
//   },
// ];
const ballInstances = [];

class BallCollisionGame {
  constructor(id, x, y, dx, dy, mass) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.mass = mass;
  }

  generateRandomNumber = (maxLimit = 200) => {
    let xRandom = Math.floor(Math.random() * maxLimit);
    let yRandom = Math.floor(Math.random() * maxLimit);
    return { xRandom, yRandom };
  };

  drawBall = (x, y) => {
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
  resolveCollision = (particle, otherParticle) => {
    const xVelocityDiff = this.dx - otherParticle.dx;
    const yVelocityDiff = this.dy - otherParticle.dy;

    const xDist = otherParticle.x - this.x;
    const yDist = otherParticle.y - this.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      // Grab angle between the two colliding particles
      const angle = -Math.atan2(
        otherParticle.y - this.y,
        otherParticle.x - this.x
      );

      // Store mass in var for better readability in collision equation
      const m1 = this.mass;
      const m2 = otherParticle.mass;

      // Velocity before equation
      const u1 = rotate(this.dx, this.dy, angle);
      const u2 = rotate(otherParticle.dx, otherParticle.dy, angle);

      const v1 = {
        x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
        y: u1.y,
      };
      const v2 = {
        x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
        y: u2.y,
      };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1.x, v1.y, -angle);

      const vFinal2 = rotate(v2.x, v2.y, -angle);

      // Swap particle velocities for realistic bounce effect
      console.log(vFinal1, vFinal2);
      this.dx = vFinal1.x;
      this.dy = vFinal1.y;

      otherParticle.dx = vFinal2.x;
      otherParticle.dy = vFinal2.y;

      // particle.x += otherParticle.x;
      // particle.y += otherParticle.y;

      // otherParticle.x += otherParticle.dx;
      // otherParticle.y += otherParticle.dy;
      // console.log(otherParticle, particle);
    }
  };

  moveBall = () => {
    const mainContainer = document.getElementById("container");
    // const ball = document.getElementById(this.id);
    const ball = document.querySelector("#ball");

    mainContainer.removeChild(document.querySelector(".ball"));
    // ball.remove();
    const containerWidth = mainContainer.offsetWidth;
    const containerHeight = mainContainer.offsetHeight;

    //Collision detection with wall of container
    if (this.x + this.dx + 40 > containerWidth || this.x < 0) {
      this.dx = this.dx * -1;
    }

    if (this.y + this.dy + 40 > containerHeight || this.y < 0) {
      this.dy = this.dy * -1;
    }

    //Collision Detection with othe balls
    ballInstances.forEach((ball) => {
      if (this.id !== ball.id) {
        if (getDistance(this.x, this.y, ball.x, ball.y) <= 40) {
          this.resolveCollision(this, ball);
        }
      }
    });

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

balls.forEach((v, index) => {
  const ball = new BallCollisionGame(index, v.x, v.y, v.dx, v.dy, v.mass);
  ballInstances.push(ball);
  ball.init();
});

// const ball1 = new BallCollisionGame(1, 50, 50, 7, 5);
// const ball2 = new BallCollisionGame(2, 250, 400, 4, 8);
// const ball3 = new BallCollisionGame(3, 20, 200, 1, 4);
// const ball4 = new BallCollisionGame(4, 60, 90, 9, 2);
// ball1.init();
// ball2.init();
// ball3.init();
// ball4.init();

// requestAnimationFrame(() => {
//   this.moveBall();
// });
