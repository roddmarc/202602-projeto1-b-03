(() => {
  // Dados inteiramente fictícios. Valores em centavos evitam erros de arredondamento.
  const valores = [9500, 9800, 10000, 10200, 10500, 10982, 9500, 10000, 10350, 11000, 11740, 12500];
  const meses = ['Jul/2025', 'Ago/2025', 'Set/2025', 'Out/2025', 'Nov/2025', 'Dez/2025', 'Jan/2026', 'Fev/2026', 'Mar/2026', 'Abr/2026', 'Mai/2026', 'Jun/2026'];
  const moeda = valor => (valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const percentual = valor => valor.toLocaleString('pt-BR', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const soma = lista => lista.reduce((total, valor) => total + valor, 0);
  const acumulados = valores.map((_, indice) => soma(valores.slice(0, indice + 1)));
  const ultimosTres = soma(valores.slice(-3));
  const anteriores = soma(valores.slice(-6, -3));
  const texto = (id, valor) => { document.getElementById(id).textContent = valor; };
  const total = document.querySelector('#total-economia');
  const simbolo = document.createElement('small');
  simbolo.textContent = 'R$ ';
  total.append(simbolo, moeda(soma(valores)).replace(/^R\$\s*/, ''));
  texto('total-tres', moeda(ultimosTres));
  texto('total-seis', moeda(soma(valores.slice(-6))));
  texto('comparativo-atual', moeda(ultimosTres));
  texto('comparativo-anterior', moeda(anteriores));
  texto('comparativo-percentual', `${percentual((ultimosTres / anteriores - 1) * 100)}% mais economia`);

  const grupo = document.querySelector('#grafico-dados');
  const svgNS = 'http://www.w3.org/2000/svg';
  function elemento(nome, atributos, conteudo) {
    const el = document.createElementNS(svgNS, nome);
    Object.entries(atributos).forEach(([chave, valor]) => el.setAttribute(chave, valor));
    if (conteudo) el.textContent = conteudo;
    return el;
  }
  function selecionarPonto(indice) {
    grupo.querySelectorAll('[data-mes]').forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.mes) === indice)));
    texto('leitura-grafico', `${meses[indice]} · No mês: ${moeda(valores[indice])} · Acumulado: ${moeda(acumulados[indice])}`);
  }
  function desenharGrafico(quantidade) {
    grupo.replaceChildren();
    const inicio = valores.length - quantidade;
    const minimo = acumulados[inicio - 1] || 0;
    const maximo = acumulados.at(-1);
    const pontos = acumulados.slice(inicio).map((valor, i) => [36 + i * 262 / (quantidade - 1), 122 - (valor - minimo) / (maximo - minimo) * 105]);
    // Grade e proporções seguem assets/img/grafico.svg; curva e pontos refletem os dados.
    grupo.append(elemento('path', {d: `M36 122 L${pontos.map(p => p.join(' ')).join(' L')} L298 122 Z`, fill: '#23c987', 'fill-opacity': '.12'}));
    grupo.append(elemento('polyline', {points: pontos.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#26d07c', 'stroke-width': 3, 'stroke-linejoin': 'round'}));
    pontos.forEach(([x, y], i) => {
      const indice = inicio + i;
      const botao = elemento('g', {class: 'painel-ponto', role: 'button', tabindex: 0, 'data-mes': indice, 'aria-pressed': 'false', 'aria-label': `${meses[indice]}: economia ${moeda(valores[indice])}, acumulado ${moeda(acumulados[indice])}`});
      botao.append(elemento('circle', {cx: x, cy: y, r: 13, fill: 'transparent'}), elemento('circle', {cx: x, cy: y, r: 4.5, class: 'ponto-visivel'}));
      botao.addEventListener('click', () => selecionarPonto(indice));
      botao.addEventListener('keydown', evento => {
        if (evento.key === 'Enter' || evento.key === ' ') { evento.preventDefault(); selecionarPonto(indice); }
      });
      grupo.append(botao, elemento('text', {x, y: 140, 'text-anchor': 'middle'}, meses[indice].slice(0, 3)));
    });
    texto('intervalo-grafico', `${meses[inicio]} a ${meses.at(-1)} · Acumulado desde a adesão`);
    selecionarPonto(valores.length - 1);
  }
  document.querySelectorAll('[data-periodo]').forEach(botao => {
    botao.addEventListener('click', () => {
      document.querySelectorAll('[data-periodo]').forEach(item => item.setAttribute('aria-pressed', String(item === botao)));
      desenharGrafico(Number(botao.dataset.periodo));
    });
  });
  desenharGrafico(6);

  const referencia = document.querySelector('#mes-referencia');
  const comparado = document.querySelector('#mes-comparado');
  const historico = document.querySelector('#historico-mensal');
  meses.forEach((mes, i) => {
    referencia.add(new Option(mes, i));
    comparado.add(new Option(mes, i));
    const linha = document.createElement('tr');
    const titulo = document.createElement('th');
    titulo.scope = 'row'; titulo.textContent = mes; linha.append(titulo);
    [valores[i], acumulados[i]].forEach(valor => {
      const celula = document.createElement('td'); celula.textContent = moeda(valor); linha.append(celula);
    });
    historico.append(linha);
  });
  texto('total-historico', moeda(soma(valores)));
  referencia.value = '10'; comparado.value = '11';
  function comparar() {
    const a = Number(referencia.value), b = Number(comparado.value);
    const diferenca = valores[b] - valores[a];
    const resumo = `${meses[b]}: ${moeda(valores[b])}. ${meses[a]}: ${moeda(valores[a])}. `;
    texto('resultado-comparacao', a === b ? `${resumo}Você selecionou o mesmo mês; a diferença é ${moeda(0)}.` : diferenca === 0 ? `${resumo}Os dois meses têm a mesma economia.` : `${resumo}${moeda(Math.abs(diferenca))} ${diferenca > 0 ? 'a mais' : 'a menos'} (${percentual(Math.abs(diferenca / valores[a] * 100))}%) no mês comparado.`);
  }
  referencia.addEventListener('change', comparar);
  comparado.addEventListener('change', comparar);
  comparar();
  const dialogo = document.querySelector('#detalhes-economia');
  const abrir = document.querySelector('#abrir-detalhes');
  abrir.addEventListener('click', () => dialogo.showModal());
  document.querySelector('#fechar-detalhes').addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('click', evento => {
    const caixa = dialogo.getBoundingClientRect();
    if (evento.target === dialogo && (evento.clientX < caixa.left || evento.clientX > caixa.right || evento.clientY < caixa.top || evento.clientY > caixa.bottom)) dialogo.close();
  });
  dialogo.addEventListener('close', () => abrir.focus());
})();
