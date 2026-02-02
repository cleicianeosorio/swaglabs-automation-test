Planejamento de Testes - Projeto Swag Labs

Este documento descreve a estratégia e os casos de teste para a automação do e-commerce Swag Labs. O foco principal é validar a jornada de compra e a segurança do fluxo de login.

Objetivo
Garantir a estabilidade das funcionalidades críticas, como login, gerenciamento de carrinho e finalização de pedido (checkout), assegurando uma experiência sem falhas para o usuário final.

--

Casos de Teste (CTs)

C-001 - Realizar login com sucesso (Stand User) 

Dado que o usuário acessa a URL da loja Swag Labs.
E insere o nome de usuário standard_user no campo "Username".
E insere a senha secret_sauce no campo "Password".
Quando clica no botão "Login".
Então deve ser redirecionado corretamente para a página de inventário (PLP - Product Listing Page)
E validar que ocorreu o direcionamento para a tela correta

C-002 - Login com credenciais inválidas (Senha incorreta) 

Contexto: Validar se o sistema impede o acesso e informa o erro corretamente ao inserir uma senha que não corresponde ao usuário.

Dado que o usuário acessa a página de login.
E insere o nome de usuário correto standard_user.
E insere uma senha incorreta no campo "Password" (ex: senha123).
Quando clica no botão "Login".
Então o sistema não deve permitir o acesso à página de produtos (PLP).
E deve exibir a mensagem de erro: "Epic sadface: Username and password do not match any user in this service".

C-003 - Login com usuário bloqueado (Locked Out User)

Contexto: Garantir que o sistema trate corretamente tentativas de acesso onde somente o dado adicionado no campo password está incorreto

Dado que o usuário acessa a página de login.
E insere o usuário locked_out_user e a senha secret_sauce.
Quando clica no botão "Login".
Então o sistema deve exibir a mensagem de erro: "Epic sadface: Sorry, this user has been locked out.".

C-004 - Login com credenciais inválidas (Usuário e Senha incorretos)

Contexto: Garantir que o sistema trate corretamente tentativas de acesso onde nenhum dos dados fornecidos existe na base.

Dado que o usuário acessa a página de login do Swag Labs. 
E insere um nome de usuário inexistente no campo "Username" (ex: usuario_fake). 
E insere uma senha qualquer no campo "Password" (ex: senha123). 
Quando clica no botão "Login".
Então o sistema deve impedir o redirecionamento para a página de inventário. 
E deve exibir a mensagem de erro: "Epic sadface: Username and password do not match any user in this service"

C-005 - Validar fechamento da mensagem de erro de login 

Contexto: Garantir que o usuário consiga limpar a interface de avisos de erro após uma tentativa falha

Dado que o usuário está na página de login do Swag Labs.
E uma mensagem de erro de autenticação está sendo exibida (após uma tentativa inválida).
Quando o usuário clica no botão "X" localizado no canto da mensagem de alerta.
Então o componente de mensagem de erro deve desaparecer da tela.

C-006 - Validar Ordenação de Produtos

Contexto: Garantir que o usuário Marina Santos consiga filtrar os produtos para encontrar rapidamente o que deseja por preço ou ordem alfabética.

Cenário 1 (Preço: Menor para Maior):
Dado que o usuário está na página de inventário.
Quando seleciona a opção de ordenação "Price (low to high)" no menu suspenso.
Então o primeiro produto da lista deve exibir o menor preço disponível (ex: $7.99).
E o último produto da lista deve exibir o maior preço disponível.

Cenário 2 (Preço: Maior para Menor)
Dado que o usuário está na página de inventário.
Quando seleciona a opção de ordenação "Price (high to low)".
Então o primeiro produto deve ser o de maior valor.
E o último produto da lista deve exibir o menor preço disponível.

Cenário 3 (Nome: Z para A)
Dado que o usuário está na página de inventário.
Quando seleciona a opção de ordenação "Name (Z to A)".
Então os produtos devem ser reorganizados em ordem alfabética decrescente.

Cenário 4 (Nome: A para Z):
Dado que o usuário está na página de inventário. 
E a lista de produtos está em uma ordem diferente (ex: Preço decrescente). 
Quando seleciona a opção de ordenação "Name (A to Z)" no menu suspenso. 
Então os produtos devem ser reorganizados em ordem alfabética crescente. 
E o primeiro item exibido deve ser o "Sauce Labs Backpack".

CT-007: Validar redirecionamento e detalhes da Página de Produto

Contexto: Garantir que, ao selecionar um item, o usuário veja as informações detalhadas e corretas do produto específico.

Dado que o usuário está logado e na página de inventário
Quando clica no nome ou na imagem do produto "Sauce Labs Backpack".
Então deve ser redirecionado para a página de detalhes do produto.
E deve validar que o nome exibido é "Sauce Labs Backpack".
E deve verificar se a imagem, a descrição e o preço estão visíveis e condizentes com o item selecionado.

CT-008: Validar navegação de retorno (Back to products)

Contexto: Garantir que o link de retorno na página de detalhes do produto (PDP) funciona corretamente, mantendo a navegabilidade do sistema.

Dado que o usuário está na página de detalhes de qualquer produto (ex: "Sauce Labs Backpack"). 
Quando clica no link de texto "Back to products". 
Então o sistema deve redirecionar o usuário imediatamente para a página de inventário (PLP). 

CT-009: Adição de Itens ao Carrinho e Validação do Badge

Contexto: Validar a funcionalidade crítica de adicionar itens por diferentes caminhos e a atualização correta do contador do carrinho (badge)

Cenário 1 (Adição de produto no carrinho):
Dado que o usuário está na página de inventário ou de detalhes do produto
Quando clica no botão "Add to cart" do produto.
Então o ícone do carrinho deve exibir o badge com o número "1".
E o botão do "Add to cart" deve mudar o texto para "Remove"
E o ícone do carrinho deve estar visível em toda a navegação.

Cenário 2 (Validação de Quantidade):
Dado que o usuário adicionou 3 produtos distintos.
Então o badge do carrinho deve exibir exatamente o número "3".

CT-010: Remoção de Itens do Carrinho e Atualização do Badge 

Contexto: Garantir que o usuário consiga desistir de uma compra e que o sistema atualize o status do produto e o contador do carrinho em tempo real.

Dado que o usuário possui um produto adicionado ao carrinho (Badge exibindo "1").
Quando clica no botão "remove" do produto, na tela de inventário ou em detalhes do produto. 
Então o texto do botão deve mudar para "Add to cart"
E o badge do carrinho deve desaparecer (caso seja o único item) ou diminuir o número (ex: de "2" para "1").

CT-011: Validar Navegação e Integridade dos Produtos no Carrinho

Contexto: Garantir que o ícone do carrinho funcione como um link de acesso e que os dados dos produtos selecionados sejam preservados.

Dado que o usuário adicionou os produtos "Sauce Labs Backpack" e "Sauce Labs Bike Light" ao carrinho.
Quando clica no ícone do carrinho de compras (shopping cart).
Então o sistema deve redirecionar o usuário para a página de carrinho (/cart.html).
E o título da página deve ser "Your Cart".
E deve validar que os nomes dos produtos exibidos são exatamente os que foram selecionados.
E o preço unitário de cada item deve corresponder ao valor visualizado anteriormente na vitrine.
E a quantidade exibida para cada item deve estar correta (ex: Qty: 1)

CT-012: Validar botões de ação na página do Carrinho (Cart)

Cenário 1 (Botão Continue Shopping):
Dado que o usuário está na página do carrinho (/cart.html).
Quando clica no botão "Continue Shopping".
Então o sistema deve redirecionar o usuário de volta para a página de inventário (/inventory.html).
E a lista de produtos deve estar visível para novas seleções.

Cenário 2 (Botão Remove dentro do Carrinho):
Dado que o usuário possui produtos listados na página do carrinho.
Quando clica no botão "Remove" de um item específico.
Então o item deve ser removido imediatamente da lista do carrinho.
E o badge do carrinho deve ser atualizado subtraindo a quantidade removida.

Cenário 3 (Botão Checkout):
Dado que o usuário está na página do carrinho com pelo menos um item adicionado.
Quando clica no botão "Checkout".
Então o sistema deve direcionar o usuário para a primeira etapa do checkou

CT-013: Tentativa de Checkout com Carrinho Vazio (Cenário de Exceção)

Contexto: Verificar o comportamento do sistema quando a Marina Santos tenta finalizar uma compra sem ter selecionado nenhum produto.

Dado que o usuário está na página de inventário e garante que o badge do carrinho não está visível (carrinho vazio).
E acessa a página do carrinho (/cart.html).
Quando clica no botão "Checkout".
Então o sistema redireciona para a página de informações do cliente (/checkout-step-one.html).
E [Observação de QA]: O sistema permite o avanço mesmo sem itens, o que deve ser reportado como uma melhoria de regra de negócio.

CT-014:Validar Finalização do Formulário de Checkout (Caminho Feliz)

Contexto: Garantir que o sistema aceite dados válidos e direcione o usuário para a revisão final do pedido.

Dado que o usuário está na página "Checkout: Your Information" (/checkout-step-one.html).
E insere um nome válido no campo "First Name".
E insere um sobrenome válido no campo "Last Name".
E insere um código postal válido no campo "Zip/Postal Code".
Quando clica no botão "Continue".
Então o sistema deve redirecionar o usuário para a página de resumo (/checkout-step-two.html).
E deve validar que o título da página é "Checkout: Overview".
E deve verificar se os botões "Cancel" e "Finish" estão visíveis na tela.

CT-015: Validar campos obrigatórios no Checkout (Caminho Triste) 

Contexto: Garantir que o sistema impeça o avanço do checkout caso existam campos obrigatórios vazios, exibindo as mensagens de erro apropriadas.

Cenário 1 (First Name vazio):
Dado que o usuário está na página "Checkout: Your Information".
E deixa o campo "First Name" vazio.
E preenche os campos "Last Name" e "Zip/Postal Code" com dados válidos.
Quando clica no botão "Continue".
Então o sistema deve exibir a mensagem de erro: "Error: First Name is required".

Cenário 2 (Last Name vazio)
Dado que o usuário preenche o "First Name" e "Zip/Postal Code", mas deixa o "Last Name" vazio.
Quando clica no botão "Continue".
Então o sistema deve exibir a mensagem de erro: "Error: Last Name is required".

Cenário 3 (Zip/Postal Code vazio)
Dado que o usuário preenche o "First Name" e "Last Name", mas deixa o "Zip/Postal Code" vazio.
Quando clica no botão "Continue".
Então o sistema deve exibir a mensagem de erro: "Error: Postal Code is required".
E a mensagem deve estar visualmente destacada em um componente de alerta vermelho.

CT - 016: Validar botão de cancelamento no Checkout

Contexto: Garantir que o usuário consiga interromper o fluxo de checkout e retornar com segurança à etapa anterior.

Dado que o usuário está na página "Checkout: Your Information" (/checkout-step-one.html).
Quando clica no botão "Cancel".
Então o sistema deve redirecionar o usuário de volta para a página do carrinho (/cart.html).
E deve validar que os itens previamente adicionados ainda estão presentes no carrinho.

CT-017: Validar redirecionamento para o Resumo do Pedido (Checkout: Overview)

Contexto: Confirmar que, após o preenchimento dos dados de envio, o sistema apresenta a tela de revisão final com os botões de ação corretos.

Dado que o usuário preencheu todos os campos obrigatórios na página "Checkout: Your Information".
Quando clica no botão "Continue".
Então o sistema deve redirecionar o usuário para a tela Checkout: Overview
E o título central da página deve exibir o texto: "Checkout: Overview".
E os elementos de resumo (Payment Information, Shipping Information, Price Total) devem estar visíveis na tela.
E o botão "Finish" deve estar habilitado para finalizar a compra

CT-018: Validar Resumo Financeiro e Cancelamento no Overview

Contexto: Garantir a precisão dos cálculos do pedido e a funcionalidade de desistência na última etapa antes da compra.

Cenário 1 (Cálculos de Valores):
Dado que o usuário está na página "Checkout: Overview" (/checkout-step-two.html).
Quando visualiza a seção de valores.
Então o valor exibido no "Item total" (Subtotal) deve ser a soma exata dos preços dos produtos escolhidos.
E o valor da "Tax" (Taxa) deve estar visível e calculado sobre o subtotal.
E o "Total" deve exibir a soma correta do Subtotal + Taxa.

Cenário 2 (Botão Cancel):
Dado que o usuário está na página "Checkout: Overview".
Quando clica no botão "Cancel".
Então o sistema deve cancelar o fluxo de checkout e redirecionar o usuário para a página de inventário (/inventory.html).
E os produtos ainda devem permanecer no carrinho (caso o usuário deseje reiniciar o checkout).

CT-019: Finalizar Compra e Validar Retorno ao Início

Contexto: Garantir que o pedido seja concluído com sucesso e que o fluxo de navegação permita o retorno à vitrine principal.

Dado que o usuário está na página "Checkout: Overview" com todos os dados revisados.
Quando clica no botão "Finish".
Então o sistema deve redirecionar para a página final (/checkout-complete.html).
E deve exibir a mensagem de agradecimento: "Thank you for your order!".
E o ícone de sucesso (Pony Express) deve estar visível na tela.
E o badge do carrinho deve estar vazio/inexistente (indicando que a compra foi processada).
Quando o usuário clica no botão "Back Home".
Então o sistema deve redirecionar o usuário de volta para a página de inventário (/inventory.html).
