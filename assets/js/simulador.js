(() => {
  const formulario = document.querySelector('#formulario-simulador');
  const campo = document.querySelector('#valor-conta');
  const erro = document.querySelector('#erro-valor');
  const anual = document.querySelector('#economia-anual');
  const mensal = document.querySelector('#economia-mensal');
  const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  function lerValor(texto) {
    const valor = texto.trim().replace(/^R\$\s*/, '');
    // Aceita reais com vírgula, agrupamento brasileiro e ponto decimal.
    if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(valor)) {
      return Number(valor.replaceAll('.', '').replace(',', '.'));
    }
    if (/^\d+([,.]\d{1,2})?$/.test(valor)) {
      return Number(valor.replace(',', '.'));
    }
    return NaN;
  }

  campo.addEventListener('input', () => {
    campo.removeAttribute('aria-invalid');
    erro.hidden = true;
    anual.textContent = 'R$ 0,00';
    mensal.textContent = 'R$ 0,00';
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const valor = lerValor(campo.value);
    if (!Number.isFinite(valor) || valor <= 0) {
      erro.textContent = 'Informe um valor mensal maior que zero, como 250,00.';
      erro.hidden = false;
      campo.setAttribute('aria-invalid', 'true');
      campo.focus();
      return;
    }

    // A parcela de disponibilidade não recebe desconto. Contas até R$ 50
    // não têm parcela elegível, portanto a estimativa nunca fica negativa.
    const economiaMensal = Math.max(0, valor - 50) * 0.15;
    anual.textContent = moeda.format(economiaMensal * 12);
    mensal.textContent = moeda.format(economiaMensal);
    campo.value = valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    campo.removeAttribute('aria-invalid');
    erro.hidden = true;
    document.querySelector('.simulador-resultado').scrollIntoView({ block: 'nearest' });
  });

  document.querySelector('#quero-economizar').addEventListener('click', (evento) => {
    evento.preventDefault();
    campo.focus();
    campo.scrollIntoView({ block: 'center' });
  });
})();
