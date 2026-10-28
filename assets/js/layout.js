const botaoMenu = document.querySelector('.botao-menu');
const menuLateral = document.querySelector('#menu-lateral');
const botaoFecharMenu = menuLateral.querySelector('.menu-fechar');

botaoMenu.addEventListener('click', () => {
  menuLateral.showModal();
  botaoMenu.setAttribute('aria-expanded', 'true');
});

botaoFecharMenu.addEventListener('click', () => {
  menuLateral.close();
});

menuLateral.addEventListener('click', (evento) => {
  if (evento.target === menuLateral) {
    menuLateral.close();
  }
});

// O evento close também é disparado ao fechar o diálogo com a tecla Esc.
menuLateral.addEventListener('close', () => {
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.focus();
});
