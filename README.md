# Onboarding Educativo com Simulador de Economia

> Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026  
> Cliente: **Bulbe Energia** · Turma **B** · Squad **03**

Protótipo para celular que acompanha o cliente da Bulbe desde o primeiro contato com a energia por assinatura até a consulta da economia acumulada. O projeto reúne quatro telas: **Onboarding Educativo**, **Central de Comunicações**, **Simulador de Economia** e **Painel de Economia Acumulada**.

---

## 1. Problema

Quem chega ao aplicativo da Bulbe pode ter dúvidas antes mesmo do cadastro: precisa instalar placas solares? Pode contratar morando de aluguel? Depois da adesão, surgem outras perguntas: qual conta pagar, quando começam os descontos e quanto o serviço já economizou?

- **Dor escolhida:** dificuldade de compreender a energia por assinatura e acompanhar seus benefícios antes do cadastro, durante a ativação e após o início dos descontos.
- **Evidência:** segundo os dados da Bulbe apresentados na Sprint I, apenas **27,1% dos 32.478 usuários** analisados avançaram da primeira tela do aplicativo. Após a contratação, cerca de **20% das mensagens por WhatsApp** falharam na entrega, e houve clientes que ficaram até **20 dias sem comunicação**. A inadimplência da primeira fatura chegou a **32,4%** entre setembro de 2025 e julho de 2026. A falta de entendimento do produto também foi apontada como motivo de **27,7% dos cancelamentos** desde 2022.
- **Indicador que a solução pretende mover:** a taxa de conclusão do cadastro, acompanhando o avanço da primeira tela como indicador intermediário. Nas etapas seguintes, a central busca melhorar a entregabilidade das comunicações, o simulador busca favorecer o pagamento da primeira fatura e o painel busca reduzir o cancelamento nos primeiros meses.

*Fonte dos indicadores: apresentação institucional Bulbe & Ibmec, setembro de 2026, e materiais da Etapa 2 da disciplina. Os percentuais descrevem o cenário que motivou o projeto.*

## 2. Persona e jornada

O squad definiu quatro personas fictícias, uma para cada momento da jornada.

| Persona | Contexto e necessidade |
| --- | --- |
| **Mariana Costa, 27 anos** | Analista administrativa em Belo Horizonte, mora de aluguel. Antes de fornecer seus dados, quer entender como a energia por assinatura funciona e se precisará fazer obras no imóvel. |
| **Ricardo Almeida, 43 anos** | Administra uma loja e nem sempre consegue acompanhar o WhatsApp. Após contratar, precisa de um lugar para consultar os avisos sobre a ativação e a primeira fatura. |
| **Fernanda Oliveira, 35 anos** | Professora em Betim, continua recebendo a conta da distribuidora enquanto aguarda a ativação. Quer saber quando os descontos começam e quanto poderá economizar. |
| **Carlos Mendes, 56 anos** | Técnico aposentado em Santa Luzia, compara as despesas da casa mês a mês. Quer consultar o histórico e o total economizado para decidir se vale a pena continuar com o serviço. |

**Mapa de jornada:** [consultar as personas e o mapa completo](docs/jornada.md).

## 3. Solução

As quatro telas do MVP compartilham um menu lateral. Cada tela responde a uma pergunta do cliente e está vinculada à história de usuário que orientou sua implementação.

| Tela | O que faz | História relacionada |
| --- | --- | --- |
| [Onboarding Educativo](pages/onboarding.html) | Apresenta, em três etapas, a geração de créditos de energia, a possibilidade de economizar sem instalar placas solares e os requisitos para contratar. | [HU01 · Issue #5](https://github.com/roddmarc/202602-projeto1-b-03/issues/5) |
| [Central de Comunicações](pages/central.html) | Reúne avisos sobre contratação e fatura. Permite abrir comunicados, filtrar por status de leitura e conferir, editar e confirmar nome, e-mail e telefone. | [HU02 · Issue #6](https://github.com/roddmarc/202602-projeto1-b-03/issues/6) |
| [Simulador de Economia](pages/simulador.html) | Recebe o valor médio mensal da conta de luz e estima a economia mensal e anual. Explica a parcela sem desconto e mostra as etapas até a ativação. | [HU03 · Issue #7](https://github.com/roddmarc/202602-projeto1-b-03/issues/7) |
| [Painel de Economia Acumulada](pages/painel.html) | Mostra a economia desde a adesão, um gráfico com filtros de três e seis meses e uma tabela com o histórico mensal. Permite comparar dois meses em reais e em percentual. | [HU04 · Issue #8](https://github.com/roddmarc/202602-projeto1-b-03/issues/8) |

O **simulador** responde “quanto posso economizar?”. Na regra ilustrativa do projeto, para uma conta de **R$ 250,00**, o desconto de 15% incide sobre os R$ 200,00 que excedem o custo estimado de R$ 50,00 da distribuidora. O resultado é uma estimativa de **R$ 30,00 por mês** e **R$ 360,00 por ano**.

O **painel** responde “quanto economizei ao longo do tempo?”. Ele usa um histórico fictício de julho de 2025 a junho de 2026, com **R$ 1.260,72** de economia acumulada em 12 meses.

No protótipo, o cadastro ao final do onboarding está indicado como indisponível. O atendimento da central e o status de ativação do simulador são demonstrativos.

- **Histórias de usuário:** [descrições e critérios de aceite](docs/historias.md).
- **Wireframes:** [desenhos das telas do MVP](docs/wireframes/).

## 4. Tecnologias

- **HTML, CSS e JavaScript puro (Vanilla):** estrutura das páginas, layout para celular, navegação, validação dos contatos, cálculo das estimativas e interação com o gráfico.
- **JSON e `fetch`:** a página de exemplo [`index.html`](index.html) carrega clientes fictícios de [`data/clientes.json`](data/clientes.json). Na versão atual das histórias, os avisos da central e o histórico mensal do painel estão definidos nos respectivos arquivos JavaScript.
- **`localStorage`:** a central mantém, no navegador utilizado, os avisos marcados como lidos e os dados de contato confirmados.
- **Git e GitHub:** histórias e critérios de aceite em Issues, planejamento no GitHub Projects e integração das funcionalidades na `main` por Pull Requests.

## 5. Como executar

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone https://github.com/roddmarc/202602-projeto1-b-03.git
   cd 202602-projeto1-b-03
   ```

2. Abra a pasta no **Visual Studio Code**.
3. Instale ou habilite a extensão **Live Server**.
4. Clique com o botão direito em [`pages/layout.html`](pages/layout.html) e selecione **Open with Live Server**.
5. No navegador, abra o **menu lateral** e escolha uma das quatro histórias. Para reproduzir as dimensões do protótipo, visualize a aplicação em **375 × 667 pixels**.

Para testar o exemplo de leitura de arquivos JSON, abra [`index.html`](index.html) pelo Live Server.

## 6. Estrutura do repositório

```text
202602-projeto1-b-03/
├── README.md                  # Apresentação e instruções do projeto
├── index.html                 # Exemplo de leitura de clientes fictícios
├── pages/
│   ├── layout.html            # Layout compartilhado e entrada para a demonstração
│   ├── onboarding.html        # HU01 — Onboarding educativo
│   ├── central.html           # HU02 — Central de comunicações
│   ├── simulador.html         # HU03 — Simulador de economia
│   ├── painel.html            # HU04 — Painel de economia acumulada
│   └── exemplo.html           # Página da estrutura-base da disciplina
├── assets/
│   ├── css/                   # Estilos do layout e de cada tela
│   ├── js/                    # Navegação, leitura de dados e lógica das histórias
│   └── img/                   # Logotipos, ícones e ilustrações
├── data/
│   ├── clientes.json          # Clientes fictícios
│   └── faturas.json           # Faturas fictícias
├── docs/
│   ├── jornada.md             # Personas e mapa de jornada
│   ├── historias.md           # Histórias de usuário e critérios de aceite
│   ├── wireframes/            # Representações visuais da jornada e das telas
│   └── sprints/               # Documentação das Sprint Reviews
└── .github/                   # Modelos de Issues e Pull Requests
```

## 7. Quadro do projeto

**GitHub Projects:** [abrir o quadro do Squad 03](https://github.com/users/roddmarc/projects/2/).

O quadro organiza o trabalho do squad. As Issues registram o que cada história precisa atender, e os Pull Requests mostram a implementação integrada à `main`.

## 8. Equipe

| Integrante | GitHub | Papel principal |
| --- | --- | --- |
| Arthur Marcelino de Oliveira | [@artmol](https://github.com/artmol) | Implementação da **HU02 — Central de Comunicações** e da **HU03 — Simulador de Economia**. |
| Rodrigo Marcelino de Oliveira | [@roddmarc](https://github.com/roddmarc) | Implementação da **HU01 — Onboarding Educativo**. |
| Gustavo Salles Pires | [@Gustavo-Salles](https://github.com/Gustavo-Salles) | Implementação da **HU04 — Painel de Economia Acumulada**. |

## 9. Entregas

*Situação em 05/11/2026, antes da Sprint Review II da Turma B.*

| Marco | Aula | Status |
| --- | --- | --- |
| Mapa de jornada | 19 | Elaborado com quatro personas e seus momentos de decisão. [Consultar a jornada](docs/jornada.md). |
| Histórias de usuário | 20 | Quatro histórias documentadas com critérios de aceite e registradas nas Issues #5 a #8. [Consultar as histórias](docs/historias.md). |
| Wireframes | 21–23 | Telas das quatro histórias desenhadas para celular. [Consultar os wireframes](docs/wireframes/). |
| Sprint Review I | 24 | Apresentados o problema, as personas, as quatro histórias, os wireframes e o planejamento da Sprint II. |
| Implementação | 25–28 | Quatro telas integradas à `main`: [HU01](https://github.com/roddmarc/202602-projeto1-b-03/pull/11), [HU02](https://github.com/roddmarc/202602-projeto1-b-03/pull/9), [HU03](https://github.com/roddmarc/202602-projeto1-b-03/pull/10) e [HU04](https://github.com/roddmarc/202602-projeto1-b-03/pull/12). |
| Sprint Review II | 29 | Prevista para **06/11/2026**, com demonstração do MVP e registro do feedback recebido. |
| Versão final | 30 | Pendente dos ajustes definidos na Sprint Review II. Prazo da Turma B para congelamento da versão na `main`: **12/11/2026**. |

---

> Os dados de clientes, contatos, faturas e economia exibidos no protótipo são fictícios. Os indicadores usados para justificar o problema são dados agregados apresentados pela Bulbe Energia à disciplina.
