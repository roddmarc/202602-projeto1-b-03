// Funções de acesso aos dados. Toda leitura de JSON passa por aqui.
// Importante: fetch só funciona com o projeto aberto por um servidor (Live Server),
// e não abrindo o arquivo direto no navegador (file://).

const BASE = new URL('../../data/', import.meta.url);

async function lerJSON(arquivo) {
  const resposta = await fetch(new URL(arquivo, BASE));
  if (!resposta.ok) {
    throw new Error(`Erro ao carregar ${arquivo}: ${resposta.status}`);
  }
  return resposta.json();
}

export function buscarClientes() {
  return lerJSON('clientes.json');
}

export function buscarFaturas() {
  return lerJSON('faturas.json');
}

export async function buscarFaturasDoCliente(clienteId) {
  const faturas = await buscarFaturas();
  return faturas.filter((fatura) => fatura.clienteId === clienteId);
}
