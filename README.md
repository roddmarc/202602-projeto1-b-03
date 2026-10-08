# Onboarding Educativo com Simulador de Economia

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026
> Cliente: **Bulbe Energia** · Turma **B** · Squad **03**

Fluxo educativo integrado ao aplicativo da Bulbe que explica o funcionamento do produto e simula a economia na conta de luz para novos usuários antes do cadastro e para clientes já cadastrados, ajudando a aumentar a conversão e reduzir a inadimplência da primeira fatura e o churn por falta de entendimento do produto.

---

## 1. Problema

Fluxo de onboarding educativo que explica o funcionamento da Bulbe e simula a economia na conta de luz antes de solicitar o cadastro, ajudando novos usuários a entender o produto e tomar uma decisão mais consciente.

- **Dor escolhida:** Falta de entendimento do produto antes da adesão, com foco na redução do abandono de cadastro no aplicativo e na prevenção da inadimplência da primeira fatura.
- **Evidência:** Segundo a apresentação da Bulbe Energia de setembro de 2026, 27,7% dos cancelamentos desde 2022 foram motivados pela falta de entendimento do produto, principal motivo de churn identificado. Além disso, a inadimplência da primeira fatura chegou a 32,4% no acumulado de setembro de 2025 a julho de 2026.
- **Indicador que a solução pretende mover:** Principal: taxa de conclusão do cadastro no aplicativo. Secundários: inadimplência da primeira fatura e churn relacionado à falta de entendimento do produto.

## 2. Persona e jornada

- **Persona:** [nome fictício, idade, contexto em uma linha]
- **Mapa de jornada:** [docs/jornada.md](docs/jornada.md)

## 3. Solução

[Descrição curta da solução e das principais telas.]

| Tela | O que faz | História relacionada |
| --- | --- | --- |
| [Início] | [ ] | [HU01] |
| [ ] | [ ] | [ ] |

- **Histórias de usuário:** [docs/historias.md](docs/historias.md)
- **Wireframes:** [docs/wireframes/](docs/wireframes/)

## 4. Tecnologias

- HTML, CSS e JavaScript puro (vanilla)
- Dados fictícios em JSON, lidos com `fetch` (pasta [`data/`](data/))
- Git e GitHub (Issues, Projects e Pull Requests)

## 5. Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/[usuario]/202602-projeto1-[turma]-[squad].git
   ```
2. Abra a pasta no VS Code.
3. Instale a extensão **Live Server** (o VS Code vai sugerir automaticamente).
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

> Abrir o `index.html` direto no navegador (duplo clique) não funciona: o `fetch` dos arquivos JSON exige um servidor.

## 6. Estrutura do repositório

```
├── index.html            # Página inicial
├── pages/                # Demais telas da solução
├── assets/
│   ├── css/style.css     # Estilos
│   ├── js/main.js        # Lógica da página inicial
│   ├── js/api.js         # Leitura dos dados (fetch)
│   └── img/              # Imagens e ícones
├── data/                 # Dados fictícios em JSON
├── docs/                 # Jornada, histórias, wireframes e sprints
└── .github/              # Modelos de Issue e de Pull Request
```

## 7. Quadro do projeto

- **GitHub Projects:** https://github.com/users/roddmarc/projects/2/

## 8. Equipe

| Integrante | GitHub | Papel principal |
| --- | --- | --- |
| Arthur Marcelino de Oliveira | [@artmol](https://github.com/artmol) | [ex.: Scrum Master, front-end, dados, documentação] |
| Rodrigo Marcelino de Oliveira| [@roddmarc](https://github.com/usuario) | [ ] |
| Gustavo Salles Pires | [@Gustavo-Salles](https://github.com/Gustavo-Salles) | [ ] |

## 9. Entregas

| Marco | Aula | Status |
| --- | --- | --- |
| Mapa de jornada | 19 | [ ] |
| Histórias de usuário | 20 | [ ] |
| Wireframes | 21–23 | [ ] |
| Sprint Review I | 24 | [ ] |
| Implementação | 25–28 | [ ] |
| Sprint Review II | 29 | [ ] |
| Versão final | 30 | [ ] |

---

> Todos os dados deste repositório são fictícios. Nenhum dado real de cliente da Bulbe Energia é utilizado.
