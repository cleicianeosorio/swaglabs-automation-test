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

describe('Navegação e Cancelamento', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.linkCarrinho.waitForDisplayed();

        await InventoryPage.adicionarAoCarrinho('sauce-labs-onesie');
        await InventoryPage.linkCarrinho.click();

        await CartPage.btnCheckout.waitForDisplayed();
        await CartPage.btnCheckout.click();

        await CheckoutPage.titleYourInformation.waitForDisplayed();
    })

    it('Deve retornar ao carrinho e manter o produto ao clicar em Cancel', async () => {
        await CheckoutPage.btnCancel.click();
        await expect(browser).toHaveUrl(expect.stringContaining('cart.html'));

        const produtoNoCarrinho = await $('.inventory_item_name=Sauce Labs Onesie');
        await expect(produtoNoCarrinho).toBeDisplayed();
    })

})

describe('Validação do resumo do pedido', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.adicionarAoCarrinho('sauce-labs-bolt-t-shirt');
        await InventoryPage.linkCarrinho.click();
        await CartPage.btnCheckout.click();

        await CheckoutPage.preencherDadosEContinuar(massaCheckout.usuarioValido);
    })

    it('Deve validar a exibição dos dados no Checkout: Overview', async () => {
        await expect(CheckoutPage.titleOverview).toHaveText('Checkout: Overview');

        await expect(CheckoutPage.labelPaymentInfo).toBeDisplayed();
        await expect(CheckoutPage.labelShippingInfo).toBeDisplayed();
        await expect(CheckoutPage.labelTotalPrice).toBeDisplayed();

        await expect(CheckoutPage.btnFinish).toBeEnabled();
    })
})

describe('Checkout: Overview - Cálculo e Cancelamento', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await browser.execute(() => { window.localStorage.clear(); });
        await browser.refresh();

        await InventoryPage.adicionarAoCarrinho('sauce-labs-bolt-t-shirt');
        await InventoryPage.adicionarAoCarrinho('sauce-labs-fleece-jacket');

        await InventoryPage.linkCarrinho.click();
        await CartPage.btnCheckout.click();

        await CheckoutPage.preencherDadosEContinuar(massaCheckout.usuarioValido);
        await CheckoutPage.titleOverview.waitForDisplayed();
    })

    it('Deve validar a soma do subtotal, taxa e total geral', async () => {
        await expect(CheckoutPage.labelSubtotal).toHaveText(expect.stringContaining('65.98'));
        await expect(CheckoutPage.labelTax).toHaveText(expect.stringContaining('5.28'));
        await expect(CheckoutPage.labelTotal).toHaveText(expect.stringContaining('71.26'));
    })

    it('Deve retornar ao inventário ao clicar em Cancel e manter 2 itens no badge', async () => {
        await CheckoutPage.btnCancel.click()
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
        await expect(InventoryPage.badgeCarrinho).toBeDisplayed();
        await expect(InventoryPage.badgeCarrinho).toHaveText('2');
    })

})

describe('Finalizar compra e validar retorno ao início', () => {
    
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        
        await InventoryPage.adicionarAoCarrinho('sauce-labs-onesie'); 
        await InventoryPage.linkCarrinho.click();
        await CartPage.btnCheckout.click();
        
        await CheckoutPage.preencherDadosEContinuar(massaCheckout.usuarioValido);
        await CheckoutPage.titleOverview.waitForDisplayed();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-two.html'),
            { timeout: 10000, timeoutMsg: 'Página Overview não carregou a tempo' }
        );
        await CheckoutPage.titleOverview.waitForDisplayed({ timeout: 5000 });
    });

    it('Deve concluir o pedido e validar o badge somente após o retorno à home', async () => {
        await CheckoutPage.btnFinish.click();

        await expect(browser).toHaveUrl(expect.stringContaining('checkout-complete.html'));
        await expect(CheckoutPage.headerThankYou).toHaveText('Thank you for your order!');

        await CheckoutPage.btnBackHome.click();

        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
        
        const badgeExiste = await InventoryPage.badgeCarrinho.isExisting();
        await expect(badgeExiste).toBe(false); 
    });
});