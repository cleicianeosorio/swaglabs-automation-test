import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import massaCheckout from '../utils/checkout.json' with { type: 'json' };

describe('Fluxo de Checkout - Finalização de Compra', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // Validação de segurança: o login funcionou?
        // O termo correto no WebdriverIO moderno é toHaveUrl com a opção 'containing'
        await expect(browser).toHaveUrl(/inventory.html/); // Usando expressão regular

        await InventoryPage.adicionarAoCarrinho('sauce-labs-backpack');
        await InventoryPage.linkCarrinho.click();
        
        // Aguarda o botão de checkout estar pronto
        await CartPage.btnCheckout.waitForDisplayed();
        await CartPage.btnCheckout.click();
        
        // Garante que estamos na tela de dados antes de qualquer 'it'
        await CheckoutPage.titleYourInformation.waitForDisplayed();
    });

    it('Deve direcionar para o resumo ao inserir dados validos', async () => {
        await CheckoutPage.preencherDadosEContinuar(massaCheckout.usuarioValido);
        await expect(CheckoutPage.titleOverview).toBeDisplayed();
    })
})

describe('Validação de Campos Obrigatórios', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // 2. VAI DIRETO PARA A URL DO CHECKOUT (Pula a etapa de clicar no carrinho)
        // Isso evita o erro do botão 'Add to cart' que não aparece
        await browser.url('https://www.saucedemo.com/checkout-step-one.html');
        
        // 3. Garante que o formulário carregou antes de o 'it' tentar preencher
        await CheckoutPage.titleYourInformation.waitForDisplayed();
    })

        it('Erro quando First Name está vazio', async () => {
            const cenario = massaCheckout.erros[0];
            await CheckoutPage.preencherDadosEContinuar(cenario.dados);
            await expect(CheckoutPage.errorMessage).toHaveText(cenario.mensagem);
        });

        it('Erro quando Last Name está vazio', async () => {
            const cenario = massaCheckout.erros[1];
            await CheckoutPage.preencherDadosEContinuar(cenario.dados);
            await expect(CheckoutPage.errorMessage).toHaveText(cenario.mensagem);
        });

        it('Erro quando Zip/Postal Code está vazio', async () => {
            const cenario = massaCheckout.erros[2];
            await CheckoutPage.preencherDadosEContinuar(cenario.dados);
            await expect(CheckoutPage.errorMessage).toHaveText(cenario.mensagem);
        });
});
