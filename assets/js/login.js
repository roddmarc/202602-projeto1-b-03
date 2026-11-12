// Textura decorativa do cabeçalho do protótipo.
const textura = document.querySelector(".login-padrao");
const pincel = textura.getContext("2d");

if (pincel) {
  pincel.strokeStyle = "#fff";
  pincel.lineWidth = 2;

  for (let y = 22; y < textura.height; y += 30) {
    for (let x = 26; x < textura.width; x += 29) {
      pincel.strokeRect(x, y, 4, 5);
    }
  }

  for (const x of [55, 142, 318]) {
    const inicio = x === 318 ? Math.PI : 0;
    for (const raio of [30, 34]) {
      pincel.beginPath();
      pincel.arc(x === 318 ? x + 34 : x, x === 318 ? 86 : 52, raio, inicio, inicio + Math.PI / 2);
      pincel.stroke();
    }
  }
}
