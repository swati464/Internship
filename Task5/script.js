function changeBackground() {
  const colors = ["#f8b400", "#6a2c70", "#b83b5e", "#00b894", "#0984e3", "#d63031"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  document.body.style.backgroundColor = colors[randomIndex];
}
