Desafio de Automação: Sauce Demo com WebdriverIO
Bem-vindo(a) ao meu projeto de automação! Aqui, o objetivo não foi apenas "fazer o teste passar", mas sim construir uma estrutura confiável que simule o comportamento real de um usuário no site Sauce Demo.

Tecnologias e Padrões
Framework: WebdriverIO com JavaScript.
Design Pattern: Page Object Model (POM) para manter a lógica de interação separada dos scripts de teste.
Data-Driven: Dados de teste centralizados em arquivos JSON, tornando os scripts dinâmicos e fáceis de escalar.

Desafios e Aprendizados.
Nem tudo foi "passar de primeira". Durante o desenvolvimento, percebi que o teste às vezes falhava na transição para a tela de revisão (Overview). O código era tão rápido que tentava interagir com a página antes mesmo de ela carregar completamente.
Para resolver, implementei uma estratégia de sincronismo, o codigo agora espera a URL mudar para o destino correto e confirma se o título da página está visível antes de qualquer clique.

Setup e Execução
1. Instalação das Dependências
Utilizo o npm para gerenciar as bibliotecas do core do WebdriverIO, reporters e drivers. Execute o comando abaixo na raiz do projeto:

Bash
npm install

2. Execução dos Testes
Para rodar a suíte completa de testes  configurada no arquivo wdio.conf.js, utilize o comando padrão:

Bash
npx wdio run ./wdio.conf.js