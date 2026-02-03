import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import massaCheckout from '../utils/checkout.json' with { type: 'json' };

describe('Fluxo de Checkout - Finalização de Compra', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        
        await expect(browser).toHaveUrl(/inventory.html/); 

        await InventoryPage.adicionarAoCarrinho('sauce-labs-backpack');
        await InventoryPage.linkCarrinho.click();
        
        await CartPage.btnCheckout.waitForDisplayed();
        await CartPage.btnCheckout.click();
        
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
        
        await browser.url('https://www.saucedemo.com/checkout-step-one.html');
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
