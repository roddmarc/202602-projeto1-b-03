(() => {
  const etapas = [...document.querySelectorAll('.onboarding-etapa')];
  const conteudo = document.querySelector('#etapas');
  const progresso = document.querySelector('#progresso');
  const contador = document.querySelector('#etapa-atual');
  const avancar = document.querySelector('#avancar');
  const voltar = document.querySelector('#voltar');
  const rotulos = ['Entenda a Economia', 'Veja como contratar', 'Quero economizar!'];
  let etapaAtual = 0;

  function mostrarEtapa(indice) {
    etapaAtual = indice;
    etapas.forEach((etapa, posicao) => {
      etapa.hidden = posicao !== etapaAtual;
    });
    progresso.value = etapaAtual + 1;
    contador.textContent = `${etapaAtual + 1} de ${etapas.length}`;
    avancar.textContent = rotulos[etapaAtual];

    etapas[etapaAtual].querySelector('h1').focus({ preventScroll: true });
    conteudo.scrollTop = 0;
  }

  avancar.addEventListener('click', () => {
    if (etapaAtual < etapas.length - 1) {
      mostrarEtapa(etapaAtual + 1);
    } else {
      window.location.assign('login.html');
    }
  });

  voltar.addEventListener('click', () => {
    if (etapaAtual > 0) {
      mostrarEtapa(etapaAtual - 1);
    } else {
      window.location.assign('login.html');
    }
  });
})();
