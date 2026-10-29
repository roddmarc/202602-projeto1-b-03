(() => {
  'use strict';

  // Dados fictícios da HU02. Nenhuma informação é enviada a um servidor.
  const comunicados = [
    {
      id: 'contratacao', categoria: 'Contratação', titulo: 'Acompanhe sua contratação',
      data: '2026-10-27', icone: 'acompanhe.svg', resumo: 'Entenda as etapas até a conexão.',
      conteudo: 'Recebemos sua contratação! Agora vamos conferir os dados e acompanhar a solicitação de conexão junto à distribuidora.\n\nApós a análise, você receberá um comunicado com as próximas etapas. Os descontos começam depois da conclusão da ativação do serviço.\n\nEnquanto aguarda, mantenha seus dados de contato atualizados para receber nossas orientações.'
    },
    {
      id: 'fatura', categoria: 'Fatura', titulo: 'Qual conta devo pagar?',
      data: '2026-10-26', icone: 'qual_conta.svg', resumo: 'Confira a orientação para a transição.',
      conteudo: 'Durante a espera pela ativação, continue pagando normalmente a conta da sua distribuidora de energia.\n\nQuando o serviço estiver ativo, enviaremos orientações sobre a primeira fatura Bulbe e sobre os valores que continuam sendo cobrados pela distribuidora. Confira as datas de vencimento e os dados das cobranças recebidas.\n\nSe tiver dúvidas sobre uma fatura, procure o atendimento antes do vencimento.'
    },
    {
      id: 'contatos', categoria: 'Seus contatos', titulo: 'Mantenha seu WhatsApp atualizado',
      data: '2026-10-25', icone: 'mantenha.svg', resumo: 'Confira seu telefone e seu e-mail.',
      conteudo: 'Seus dados de contato ajudam a garantir que os avisos sobre a contratação, a ativação e a primeira fatura cheguem até você.\n\nNa aba Meus contatos, confira seu nome, e-mail e telefone. Para corrigir uma informação, toque no ícone de edição ao lado dela. Depois, selecione Validar e salvar para confirmar seus dados.'
    }
  ];
  const chave = 'bulbe.hu02.central.v1';
  const campos = {
    nome: { titulo: 'Altere o seu nome', descricao: 'Informe o seu nome completo', rotulo: 'Nome completo', placeholder: 'Nome e sobrenome', tipo: 'text', autocomplete: 'name', limite: 100 },
    email: { titulo: 'Altere o seu e-mail', descricao: 'Informe o seu e-mail de contato', rotulo: 'E-mail', placeholder: 'exemplo@email.com', tipo: 'email', autocomplete: 'email', limite: 254 },
    telefone: { titulo: 'Altere o seu telefone', descricao: 'Informe o seu telefone de contato', rotulo: 'Telefone', placeholder: '(31) 98765-4321', tipo: 'tel', autocomplete: 'tel', limite: 22 }
  };
  const estado = {
    lidos: [],
    contatos: { nome: 'João Silva', email: 'teste.bulbe@bulbe.com.br', telefone: '+55 (31) 98765-4321' },
    confirmados: { nome: false, email: false, telefone: false }
  };
  const selecionar = (seletor) => document.querySelector(seletor);
  const lista = selecionar('#lista-comunicados');
  const feedback = selecionar('#central-feedback');
  const dialogoEditar = selecionar('#dialogo-editar');
  const dialogoMensagem = selecionar('#dialogo-comunicado');
  const campoEdicao = selecionar('#editar-valor');
  const erroEdicao = selecionar('#editar-erro');
  let filtro = 'todos';
  let editando = null;
  let mensagemAberta = null;

  function digitosTelefone(valor) {
    const digitos = valor.replace(/\D/g, '');
    return digitos.length > 11 && digitos.startsWith('55') ? digitos.slice(2) : digitos;
  }

  function validar(campo, valor) {
    if (typeof valor !== 'string' || !valor.trim()) return 'Preencha este campo para continuar.';
    if (valor.length > campos[campo].limite) return 'O valor informado é muito longo.';
    if (campo === 'nome' && !/^[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*(?:\s+[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*)+$/u.test(valor.trim())) {
      return 'Informe seu nome e sobrenome, usando apenas letras.';
    }
    if (campo === 'email' && !/^[^\s@<>]+@[^\s@<>.]+(?:\.[^\s@<>.]+)+$/.test(valor.trim())) {
      return 'Informe um e-mail válido, como nome@exemplo.com.';
    }
    if (campo === 'telefone') {
      const numero = digitosTelefone(valor);
      if (!/^\+?[\d\s().-]+$/.test(valor.trim()) || !/^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(numero)) {
        return 'Informe um telefone com DDD: (31) 98765-4321.';
      }
    }
    return '';
  }

  function normalizar(campo, valor) {
    if (campo === 'telefone') {
      const numero = digitosTelefone(valor);
      return `+55 (${numero.slice(0, 2)}) ${numero.slice(2, -4)}-${numero.slice(-4)}`;
    }
    return valor.trim().replace(/\s+/g, ' ');
  }

  // O armazenamento é opcional: a página também funciona se estiver bloqueado.
  try {
    const salvo = JSON.parse(localStorage.getItem(chave));
    if (salvo && typeof salvo === 'object') {
      if (Array.isArray(salvo.lidos)) estado.lidos = salvo.lidos.filter(id => comunicados.some(item => item.id === id));
      for (const campo of Object.keys(campos)) {
        if (salvo.contatos && !validar(campo, salvo.contatos[campo])) {
          estado.contatos[campo] = normalizar(campo, salvo.contatos[campo]);
          estado.confirmados[campo] = salvo.confirmados?.[campo] === true;
        }
      }
    }
  } catch { /* Mantém os dados iniciais se não houver um estado válido. */ }

  function salvar() {
    try {
      localStorage.setItem(chave, JSON.stringify(estado));
      return true;
    } catch {
      return false;
    }
  }

  function formatarData(data) {
    return data.split('-').reverse().join('/');
  }

  function renderizarAvisos() {
    lista.replaceChildren();
    const visiveis = comunicados.filter(item => filtro === 'todos' || estado.lidos.includes(item.id) === (filtro === 'lidos'));
    for (const item of visiveis) {
      const lido = estado.lidos.includes(item.id);
      const li = document.createElement('li');
      li.className = 'central-comunicado';
      li.dataset.lido = String(lido);
      // Este modelo contém somente textos e caminhos fictícios definidos acima.
      li.innerHTML = `
        <div class="central-comunicado-cabecalho">
          <img src="../assets/img/${item.icone}" width="26" height="26" alt="">
          <div class="central-comunicado-texto">
            <div class="central-comunicado-meta"><span>${item.categoria}</span><time datetime="${item.data}">${formatarData(item.data)}</time></div>
            <h2>${!lido ? '<span class="central-indicador" aria-label="Não lido" role="img"></span>' : ''}${item.titulo}</h2>
            <p class="central-resumo">${item.resumo}</p>
          </div>
        </div>
        <div class="central-acoes-aviso">
          <button type="button" class="central-ver" data-abrir="${item.id}" aria-label="Ver comunicado: ${item.titulo}">Ver comunicado</button>
          <button type="button" class="central-marcar" data-marcar="${item.id}" ${lido ? 'disabled' : ''} aria-label="${lido ? 'Comunicado lido' : `Marcar como lido: ${item.titulo}`}">${lido ? '✓ Lido' : 'Marcar como lido'}</button>
        </div>`;
      lista.append(li);
    }
    selecionar('#avisos-vazios').hidden = visiveis.length > 0;
  }

  function renderizarContatos() {
    for (const campo of Object.keys(campos)) {
      selecionar(`#contato-${campo}`).textContent = estado.contatos[campo];
      const status = selecionar(`#status-${campo}`);
      status.textContent = estado.confirmados[campo] ? 'Dados confirmados' : 'Aguardando confirmação';
      status.dataset.confirmado = String(estado.confirmados[campo]);
    }
  }

  function marcarLido(id) {
    if (!estado.lidos.includes(id)) estado.lidos.push(id);
    const persistiu = salvar();
    renderizarAvisos();
    feedback.textContent = persistiu ? 'Comunicado marcado como lido.' : 'Comunicado marcado como lido nesta visita. Não foi possível salvar para a próxima visita.';
  }

  const abas = [...document.querySelectorAll('[role="tab"]')];
  function ativarAba(aba) {
    for (const item of abas) {
      const ativa = item === aba;
      item.setAttribute('aria-selected', String(ativa));
      item.tabIndex = ativa ? 0 : -1;
      selecionar(`#${item.getAttribute('aria-controls')}`).hidden = !ativa;
    }
  }
  abas.forEach((aba, indice) => {
    aba.addEventListener('click', () => ativarAba(aba));
    aba.addEventListener('keydown', evento => {
      let proxima;
      if (evento.key === 'ArrowRight') proxima = abas[(indice + 1) % abas.length];
      if (evento.key === 'ArrowLeft') proxima = abas[(indice + abas.length - 1) % abas.length];
      if (evento.key === 'Home') proxima = abas[0];
      if (evento.key === 'End') proxima = abas[abas.length - 1];
      if (proxima) { evento.preventDefault(); ativarAba(proxima); proxima.focus(); }
    });
  });

  document.querySelectorAll('[data-filtro]').forEach(botao => botao.addEventListener('click', () => {
    filtro = botao.dataset.filtro;
    document.querySelectorAll('[data-filtro]').forEach(item => item.setAttribute('aria-pressed', String(item === botao)));
    renderizarAvisos();
  }));

  lista.addEventListener('click', evento => {
    const abrir = evento.target.closest('[data-abrir]');
    const marcar = evento.target.closest('[data-marcar]');
    if (marcar) {
      const id = marcar.dataset.marcar;
      marcarLido(id);
      (selecionar(`[data-abrir="${id}"]`) || selecionar('[data-filtro][aria-pressed="true"]')).focus();
    }
    if (abrir) {
      mensagemAberta = comunicados.find(item => item.id === abrir.dataset.abrir);
      selecionar('#mensagem-titulo').textContent = mensagemAberta.titulo;
      selecionar('#mensagem-categoria').textContent = mensagemAberta.categoria;
      selecionar('#mensagem-data').textContent = formatarData(mensagemAberta.data);
      selecionar('#mensagem-data').dateTime = mensagemAberta.data;
      selecionar('#mensagem-conteudo').textContent = mensagemAberta.conteudo;
      selecionar('#mensagem-marcar').textContent = estado.lidos.includes(mensagemAberta.id) ? 'Fechar comunicado' : 'Marcar como lido';
      dialogoMensagem.showModal();
    }
  });

  selecionar('#mensagem-marcar').addEventListener('click', () => {
    const id = mensagemAberta.id;
    marcarLido(id);
    dialogoMensagem.close();
    (selecionar(`[data-abrir="${id}"]`) || selecionar('[data-filtro][aria-pressed="true"]')).focus();
  });

  function abrirEdicao(campo) {
    editando = campo;
    const config = campos[campo];
    selecionar('#editar-titulo').textContent = config.titulo;
    selecionar('#editar-descricao').textContent = config.descricao;
    selecionar('#editar-rotulo').textContent = config.rotulo;
    campoEdicao.type = config.tipo;
    campoEdicao.autocomplete = config.autocomplete;
    campoEdicao.maxLength = config.limite;
    campoEdicao.placeholder = config.placeholder;
    campoEdicao.value = estado.contatos[campo];
    campoEdicao.removeAttribute('aria-invalid');
    erroEdicao.hidden = true;
    dialogoEditar.showModal();
    campoEdicao.focus();
    campoEdicao.select();
  }

  document.querySelectorAll('[data-editar]').forEach(botao => botao.addEventListener('click', () => abrirEdicao(botao.dataset.editar)));
  campoEdicao.addEventListener('input', () => {
    campoEdicao.removeAttribute('aria-invalid');
    erroEdicao.hidden = true;
  });
  selecionar('#form-editar').addEventListener('submit', evento => {
    evento.preventDefault();
    const erro = validar(editando, campoEdicao.value);
    if (erro) {
      erroEdicao.textContent = erro;
      erroEdicao.hidden = false;
      campoEdicao.setAttribute('aria-invalid', 'true');
      campoEdicao.focus();
      return;
    }
    const valor = normalizar(editando, campoEdicao.value);
    if (valor !== estado.contatos[editando]) {
      estado.contatos[editando] = valor;
      estado.confirmados[editando] = false;
    }
    salvar();
    renderizarContatos();
    selecionar('#contatos-retorno').hidden = true;
    dialogoEditar.close();
    selecionar(`[data-editar="${editando}"]`).focus();
    feedback.textContent = 'Informação atualizada. Confira os dados e selecione Validar e salvar.';
  });

  selecionar('#form-contatos').addEventListener('submit', evento => {
    evento.preventDefault();
    for (const campo of Object.keys(campos)) {
      if (validar(campo, estado.contatos[campo])) { abrirEdicao(campo); return; }
    }
    for (const campo of Object.keys(campos)) estado.confirmados[campo] = true;
    const persistiu = salvar();
    renderizarContatos();
    const retorno = selecionar('#contatos-retorno');
    retorno.hidden = false;
    retorno.textContent = persistiu ? 'Dados confirmados e salvos neste navegador.' : 'Dados confirmados nesta visita. Não foi possível salvá-los para a próxima visita.';
  });

  document.querySelectorAll('[data-atendimento]').forEach(botao => botao.addEventListener('click', () => selecionar('#dialogo-atendimento').showModal()));
  document.querySelectorAll('.central-dialogo').forEach(dialogo => {
    dialogo.querySelectorAll('[data-fechar]').forEach(botao => botao.addEventListener('click', () => dialogo.close()));
    dialogo.addEventListener('click', evento => { if (evento.target === dialogo) dialogo.close(); });
  });

  renderizarAvisos();
  renderizarContatos();
})();
