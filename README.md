# Projeto Bulbe · Onboarding Educativo com Simulador de Economia

**Projeto em Ciência de Dados I · Ibmec BH · 2º semestre de 2026**  
**Cliente:** Bulbe Energia · **Turma:** B · **Squad:** 03  
**Professor:** Prof. Cristiano de Macedo Neto, M.Sc  

Protótipo web para celular que acompanha a jornada do cliente da Bulbe Energia. Antes do cadastro, o usuário pode entender como funciona a energia por assinatura e estimar quanto poderia economizar. Após a adesão, pode consultar avisos, confirmar seus dados de contato e acompanhar a economia acumulada.

**[Ponto de entrada do protótipo](pages/login.html) · [Apresentação final interativa](docs/apresentacao/index.html) · [Quadro do Squad 03](https://github.com/users/roddmarc/projects/2/)**

## 1. Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/roddmarc/202602-projeto1-b-03.git
   cd 202602-projeto1-b-03
   ```

2. Abra a **pasta inteira do repositório** no Visual Studio Code e habilite a extensão **Live Server**.
3. Escolha o arquivo que deseja executar, clique nele com o botão direito e selecione **Open with Live Server**.

| Para abrir | Arquivo | Visualização |
| --- | --- | --- |
| Aplicativo desde o login | [`pages/login.html`](pages/login.html) | Tela de referência de **375 × 667 px**. |
| Apresentação final | [`docs/apresentacao/index.html`](docs/apresentacao/index.html) | Janela ampla para visualizar o slide e interagir com o aplicativo à direita. |

O projeto usa HTML, CSS e JavaScript puro e pode ser executado diretamente pelo Live Server. O [`index.html` da raiz](index.html) é o exemplo da disciplina que demonstra a leitura de um arquivo JSON.

## 2. Problema e evidências

Quem chega ao aplicativo pode precisar decidir se vale a pena iniciar um cadastro antes de entender se a assinatura exige obras ou quanto pode economizar. Depois da contratação, a espera pela ativação, os avisos perdidos e a dificuldade para interpretar a primeira cobrança podem comprometer a confiança no serviço.

O MVP foi construído com foco em dois resultados: **reduzir o cancelamento no primeiro mês** e **reduzir a proporção de primeiras faturas não pagas**. Quatro indicadores apresentados na Sprint I orientaram a escolha das histórias.

| Momento da jornada | Evidência apresentada pela Bulbe | Decisão de produto |
| --- | --- | --- |
| Primeiro acesso | Apenas **27,1% dos 32.478 usuários** analisados avançaram além da primeira tela. | Disponibilizar a explicação do serviço e a simulação de economia antes do cadastro. |
| Comunicação após a adesão | Cerca de **20% das mensagens por WhatsApp** falharam na entrega. Houve clientes que ficaram até **20 dias sem comunicação**. | Reunir os avisos no aplicativo e permitir a atualização dos contatos. |
| Primeira cobrança | A inadimplência da primeira fatura chegou a **32,4%** entre setembro de 2025 e julho de 2026. | Explicar quando os descontos começam e facilitar a consulta aos avisos e aos valores economizados. |
| Permanência no serviço | A falta de entendimento do produto foi apontada como motivo de **27,7% dos cancelamentos** desde 2022. | Explicar o funcionamento da assinatura e mostrar a economia ao longo do tempo. |

**Fonte:** apresentação institucional Bulbe & Ibmec, setembro de 2026, e materiais da Etapa 2 da disciplina. Esses indicadores descrevem o cenário que motivou o projeto. Para medir o impacto do MVP, a equipe propõe comparar o cancelamento no primeiro mês e o pagamento da primeira fatura entre clientes que utilizam o novo fluxo e clientes que utilizam o fluxo atual.

## 3. Personas e histórias de usuário

O squad definiu quatro personas fictícias a partir dos momentos de decisão registrados no mapa de jornada. Cada história corresponde a uma tela funcional.

| História | Persona e pergunta que orientou a tela | O que o usuário consegue fazer |
| --- | --- | --- |
| [HU01 · Onboarding Educativo](https://github.com/roddmarc/202602-projeto1-b-03/issues/5) | **Mariana Costa, 27 anos**, analista administrativa em Belo Horizonte, mora de aluguel. *Preciso instalar placas solares ou fazer obras?* | Percorrer três etapas sobre a origem dos créditos, a economia sem instalação de placas e os requisitos de contratação. |
| [HU02 · Central de Comunicações](https://github.com/roddmarc/202602-projeto1-b-03/issues/6) | **Ricardo Almeida, 43 anos**, administra uma loja e nem sempre acompanha o WhatsApp. *Onde encontro um aviso que perdi?* | Abrir comunicados, filtrar por status de leitura, marcar avisos como lidos e editar ou confirmar nome, e-mail e telefone. |
| [HU03 · Simulador de Economia](https://github.com/roddmarc/202602-projeto1-b-03/issues/7) | **Fernanda Oliveira, 35 anos**, professora em Betim, continua recebendo a conta da distribuidora enquanto aguarda a ativação. *Quanto posso economizar e quando começa o desconto?* | Informar o valor médio da conta, consultar a estimativa mensal e anual e entender a relação entre ativação e início da economia. |
| [HU04 · Painel de Economia Acumulada](https://github.com/roddmarc/202602-projeto1-b-03/issues/8) | **Carlos Mendes, 56 anos**, técnico aposentado em Santa Luzia, compara as despesas da casa. *Quanto já economizei desde a adesão?* | Consultar o total acumulado, filtrar o gráfico por período, abrir o histórico mensal e comparar dois meses em reais e em percentual. |

[Mapa de jornada e personas](docs/jornada.md) · [Histórias e critérios de aceite](docs/historias.md) · [Wireframes](docs/wireframes/)

## 4. Como navegar pelo protótipo

### Antes do login

A [tela de login](pages/login.html) oferece três caminhos:

- **Entenda como você economiza** abre o [Onboarding Educativo](pages/onboarding.html). Na primeira etapa, **Voltar** retorna ao login. Nas etapas seguintes, retorna uma etapa. Ao final, **Quero economizar!** também leva ao login.
- **Simulador de Economia** abre o [simulador](pages/simulador.html) com as estimativas em **R$ 0,00**. O usuário pode simular uma conta antes do cadastro. **Voltar** e **Quero economizar** retornam ao login.
- **Entrar** e **Primeiro acesso** abrem a [área de faturas](pages/layout.html). Ambos os acessos são simulados e dispensam credenciais.

### Na área do cliente

A tela de faturas apresenta a instalação, o vencimento, o desconto Bulbe, o valor a pagar e o histórico mensal. Ela serve como base de navegação da área logada. Os controles de PIX, detalhes da fatura e histórico completo são ilustrativos.

Pelo **menu lateral**, o usuário pode acessar as quatro histórias, incluindo a [Central de Comunicações](pages/central.html) e o [Painel de Economia Acumulada](pages/painel.html).

## 5. Como conferir as funcionalidades

| Tela | Ação de teste | Resultado esperado |
| --- | --- | --- |
| Onboarding | Avançar de **Conheça a Bulbe** até a terceira etapa. Usar **Voltar**, avançar novamente e selecionar **Quero economizar!**. | O indicador acompanha a etapa exibida e a ação final retorna ao login. |
| Central | Abrir um comunicado, marcá-lo como lido e aplicar o filtro de leitura. Em **Meus contatos**, tentar salvar um e-mail inválido e depois corrigi-lo. | O status do aviso é atualizado. O formulário sinaliza o erro e permite confirmar os dados após a correção. |
| Simulador | Tentar simular com o campo vazio. Depois, informar **R$ 250,00** e selecionar **Simular minha economia**. | O campo vazio gera uma mensagem de validação. Para R$ 250,00, a economia estimada é de **R$ 30,00 por mês** e **R$ 360,00 por ano**. |
| Painel | Alternar entre três e seis meses, abrir **Ver detalhes de economia** e comparar maio e junho de 2026. | O gráfico acompanha o período. O histórico apresenta **R$ 1.260,72** acumulados em 12 meses, e junho mostra **R$ 7,60 a mais** que maio. |

O simulador aplica uma **regra ilustrativa** de 15% sobre a parcela da conta que excede R$ 50,00. Para uma conta de R$ 250,00, a parcela considerada é de R$ 200,00. O painel usa uma série fictícia de julho de 2025 a junho de 2026 para demonstrar a consulta à economia já acumulada.

## 6. Apresentação final interativa

A [apresentação em HTML](docs/apresentacao/index.html) possui **10 slides numerados** e foi organizada para uma demonstração de até **8 minutos**. As páginas reais do aplicativo são carregadas em um `iframe` que preserva a proporção de **375 × 667 px**.

| Slides | Conteúdo |
| --- | --- |
| **01–03** | Capa, evidências do problema e texto das quatro histórias de usuário. |
| **04–06** | Login, Onboarding Educativo e Simulador de Economia. |
| **07–09** | Área de faturas, Central de Comunicações e Painel de Economia Acumulada. |
| **10** | Encerramento e proposta de avaliação do impacto. |

As setas percorrem o roteiro em sequência. Também é possível navegar pelo próprio aplicativo: ao abrir o simulador pelo login, por exemplo, a apresentação passa do slide **04/10** para o **06/10**. Ao digitar um valor, filtrar avisos ou avançar uma etapa do onboarding, o slide permanece na história em demonstração.

## 7. Tecnologias e organização do código

- **HTML e CSS:** páginas semânticas, estilos compartilhados e estilos específicos de cada tela.
- **JavaScript puro:** navegação, validação dos formulários, cálculo das estimativas, filtros, comparação de meses e sincronização da apresentação.
- **`localStorage`:** persistência local dos avisos lidos e dos dados de contato na Central de Comunicações.
- **JSON e `fetch`:** a página de exemplo da disciplina carrega os clientes fictícios de [`data/clientes.json`](data/clientes.json). Os comunicados da central e a série mensal do painel estão definidos nos respectivos scripts.
- **Git e GitHub:** planejamento no [GitHub Projects](https://github.com/users/roddmarc/projects/2/), critérios de aceite em Issues e revisão das implementações por Pull Requests.

```text
202602-projeto1-b-03/
├── README.md
├── index.html                 # Exemplo de leitura de JSON da disciplina
├── pages/
│   ├── login.html             # Entrada do protótipo
│   ├── layout.html            # Área de faturas e menu lateral
│   ├── onboarding.html        # HU01 · Onboarding Educativo
│   ├── central.html           # HU02 · Central de Comunicações
│   ├── simulador.html         # HU03 · Simulador de Economia
│   ├── painel.html            # HU04 · Painel de Economia Acumulada
│   └── exemplo.html           # Página de exemplo da disciplina
├── assets/
│   ├── css/                   # Estilos compartilhados e de cada tela
│   ├── js/                    # Navegação e lógica das funcionalidades
│   └── img/                   # Logotipos, ícones e ilustrações
├── data/                      # Arquivos JSON com dados fictícios
├── docs/
│   ├── apresentacao/          # Apresentação final em HTML, CSS e JavaScript
│   ├── historias.md           # Histórias de usuário e critérios de aceite
│   ├── jornada.md             # Personas e mapa de jornada
│   ├── wireframes/            # Protótipos visuais
│   └── sprints/               # Orientações para os registros das reviews
└── .github/                   # Modelos de Issues e Pull Requests
```

## 8. Equipe

| Integrante | GitHub | Histórias sob sua responsabilidade |
| --- | --- | --- |
| Arthur Marcelino de Oliveira | [@artmol](https://github.com/artmol) | HU02 · Central de Comunicações e HU03 · Simulador de Economia |
| Rodrigo Marcelino de Oliveira | [@roddmarc](https://github.com/roddmarc) | HU01 · Onboarding Educativo |
| Gustavo Salles Pires | [@Gustavo-Salles](https://github.com/Gustavo-Salles) | HU04 · Painel de Economia Acumulada |

## 9. Entregas

| Entrega | Resultado |
| --- | --- |
| Sprint I | Problema e indicadores definidos, quatro personas, mapa de jornada, histórias com critérios de aceite e wireframes. |
| Implementação das histórias | Quatro funcionalidades implementadas: [Onboarding](https://github.com/roddmarc/202602-projeto1-b-03/pull/11), [Central](https://github.com/roddmarc/202602-projeto1-b-03/pull/9), [Simulador](https://github.com/roddmarc/202602-projeto1-b-03/pull/10) e [Painel](https://github.com/roddmarc/202602-projeto1-b-03/pull/12). |
| Fluxo final do aplicativo | [Tela de login](https://github.com/roddmarc/202602-projeto1-b-03/pull/13), [acesso ao onboarding e ao simulador antes do cadastro](https://github.com/roddmarc/202602-projeto1-b-03/pull/14) e [área inicial de faturas](https://github.com/roddmarc/202602-projeto1-b-03/pull/15). |
| Apresentação final | [Demonstração interativa](docs/apresentacao/index.html) com os indicadores da Sprint I, as quatro histórias e o MVP em funcionamento. |

> Projeto acadêmico desenvolvido para a disciplina Projeto em Ciência de Dados I. As personas, os contatos, as faturas e os valores de economia exibidos no protótipo são fictícios. Os indicadores que fundamentam o problema são dados agregados apresentados pela Bulbe Energia à disciplina.
