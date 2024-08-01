document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const triangle = document.querySelector(".triangle");
  const container = document.querySelector(".fireworks-container");
  const land = document.querySelector(".landOne");
  const backgroundMusic = document.getElementById("backgroundMusic");

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("night");
    updateTriangleColor();

    if (body.classList.contains("night")) {
      startFireworks();
      land.classList.add("night-mode");
      backgroundMusic.play();
    } else {
      stopFireworks();
      land.classList.remove("night-mode");
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }
  });

  function updateTriangleColor() {
    if (body.classList.contains("night")) {
      triangle.style.borderLeftColor = "#2c3e50"; // night color
    } else {
      triangle.style.borderLeftColor = "#87CEEB"; // day color
    }
  }
  updateTriangleColor();

  let fireworksInterval;

  function startFireworks() {
    container.style.display = "block";
    createFirework();
    fireworksInterval = setInterval(createFirework, Math.random() * 1000 + 500);
  }

  function stopFireworks() {
    clearInterval(fireworksInterval);
    container.innerHTML = "";
    container.style.display = "none";
  }

  function createFirework() {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = `${Math.random() * 100}vw`;

    firework.addEventListener("animationend", () => {
      createExplosion(firework.style.left, firework.style.bottom);
      container.removeChild(firework);
    });

    container.appendChild(firework);
  }

  function createExplosion(left, bottom) {
    for (let i = 0; i < 30; i++) {
      const explosion = document.createElement("div");
      explosion.className = "explosion";
      explosion.style.left = left;
      explosion.style.bottom = bottom;
      explosion.style.backgroundColor = randomColor();

      explosion.addEventListener("animationend", () => {
        container.removeChild(explosion);
      });

      container.appendChild(explosion);
    }
  }

  function randomColor() {
    const colors = ["#ff4b4b", "#ffcf4b", "#4bffa5", "#4b8fff", "#ff4bcc"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
