import { buscarClientes } from './api.js';

const STATUS = {
  aguardando_qualificacao: 'Aguardando qualificação',
  em_conexao: 'Em conexão',
  conectado: 'Conectado'
};

async function iniciar() {
  const lista = document.querySelector('#lista-clientes');
  try {
    const clientes = await buscarClientes();
    lista.innerHTML = clientes
      .map((c) => `<li><strong>${c.nome}</strong> · ${c.cidade} · ${STATUS[c.status] ?? c.status}</li>`)
      .join('');
  } catch (erro) {
    lista.innerHTML = '<li>Não foi possível carregar os dados. O projeto está aberto pelo Live Server?</li>';
    console.error(erro);
  }
}

iniciar();
