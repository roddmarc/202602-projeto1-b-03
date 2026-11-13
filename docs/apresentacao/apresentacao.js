const slides = [...document.querySelectorAll(".slide")];
const palco = document.querySelector("main");
const celular = document.querySelector("#celular");
const aplicativo = celular.querySelector("iframe");
const contador = document.querySelector("#contador");
const progresso = document.querySelector("progress");
const anterior = document.querySelector("#anterior");
const proximo = document.querySelector("#proximo");
let atual = 0;

function mostrar(indice, abrirPagina = true) {
  if (indice < 0 || indice >= slides.length) return;
  slides[atual].hidden = true;
  atual = indice;
  const slide = slides[atual];
  slide.hidden = false;
  const pagina = slide.dataset.pagina;
  celular.hidden = !pagina;
  palco.classList.toggle("com-celular", Boolean(pagina));
  contador.textContent = String(atual + 1).padStart(2, "0") + " / " + slides.length;
  progresso.max = slides.length;
  progresso.value = atual + 1;
  anterior.disabled = atual === 0;
  proximo.disabled = atual === slides.length - 1;
  if (pagina && abrirPagina) aplicativo.src = "../../pages/" + pagina;
  window.scrollTo(0, 0);
}

function navegarComTeclado(evento) {
  if (evento.altKey || evento.ctrlKey || evento.metaKey || evento.shiftKey ||
      evento.defaultPrevented || evento.target.closest("input, textarea, select, button, a, dialog, [contenteditable]")) return;
  const passo = { ArrowLeft: -1, ArrowRight: 1 }[evento.key];
  if (passo) {
    evento.preventDefault();
    mostrar(atual + passo);
  }
}

// Ao navegar pelo app, atualiza apenas o texto e o contador: a tela mantém seu estado.
aplicativo.addEventListener("load", () => {
  const documento = aplicativo.contentDocument;
  if (!documento || celular.hidden) return;
  const pagina = documento.URL.split(/[?#]/)[0].split("/").pop();
  const indice = slides.findIndex(slide => slide.dataset.pagina === pagina);
  if (indice >= 0) {
    mostrar(indice, false);
    documento.addEventListener("keydown", navegarComTeclado);
  }
});

new ResizeObserver(([entrada]) => {
  aplicativo.style.transform = "scale(" + entrada.contentRect.width / 375 + ")";
}).observe(celular);

anterior.addEventListener("click", () => mostrar(atual - 1));
proximo.addEventListener("click", () => mostrar(atual + 1));
document.addEventListener("keydown", navegarComTeclado);
mostrar(0);
