const canvas = document.getElementById("binaryCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 12;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

// Cria uma matriz para os números e suas cores
const matrix = Array.from({ length: columns }, () =>
  Array.from({ length: rows }, () => ({
    value: Math.random() > 0.5 ? "1" : "0",
    grayLevel: Math.floor(240 + Math.random() * 40), // Tons claros de cinza
  }))
);

// Coordenadas do mouse
let mouseX = -100;
let mouseY = -100;

function randomGray(lightOnly = true) {
  const grayMin = lightOnly ? 200 : 150;
  const grayValue = Math.floor(grayMin + Math.random() * (255 - grayMin));
  return grayValue;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px monospace`;

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const cell = matrix[x][y];

      // Muda valor e tom de cinza periodicamente
      if (Math.random() > 0.99) {
        cell.value = cell.value === "0" ? "1" : "0"; // Alterna entre '0' e '1'
      }
      if (Math.random() > 0.99) {
        cell.grayLevel = randomGray(); // Muda o tom de cinza ocasionalmente
      }

      // Revela "HCODE" sutilmente quando o mouse ou dedo passa por perto
      const dx = x * fontSize - mouseX;
      const dy = y * fontSize - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 30) {
        // Reduzido o raio de detecção
        const hcode = "HCODE";
        if (y < rows && x < columns && hcode[x % hcode.length]) {
          cell.value = hcode[x % hcode.length];
          cell.grayLevel = 200; // Mais claro para destacar a palavra
        }
      }

      ctx.fillStyle = `rgb(${cell.grayLevel}, ${cell.grayLevel}, ${cell.grayLevel})`;
      ctx.fillText(cell.value, x * fontSize, y * fontSize);
    }
  }

  requestAnimationFrame(draw);
}

draw();

// Atualiza as coordenadas do mouse ao mover
canvas.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Atualiza as coordenadas do toque
canvas.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  mouseX = touch.clientX;
  mouseY = touch.clientY;
});

// Reseta as coordenadas quando o mouse ou dedo sai da tela
canvas.addEventListener("mouseout", () => {
  mouseX = -100;
  mouseY = -100;
});
canvas.addEventListener("touchend", () => {
  mouseX = -100;
  mouseY = -100;
});

// Ajusta o canvas ao redimensionar a janela
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
