import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import ProductPage from '../pageobjects/product.page.js'
import massadados from '../utils/users.json' with { type: 'json' }


describe('Carrinho de compras', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.titleProducts.waitForDisplayed()

        const removeButtons = await $$('[id^="remove-"]')
        for (const btn of removeButtons) {
        await btn.click()
    }
    })

    it('Cenário 1 - Adicionar produto no carrinho pelo inventário', async () => {
        await InventoryPage.addBackpackButton.click()
        await expect(InventoryPage.cartBadge).toHaveText('1')
        await expect(InventoryPage.removeBackpackButton).toHaveText('Remove')
    })

    it('Cenário 2- Adicionar produto no carrinho pela tela do produto', async () => {
        
        const backpack = await $('a*=Sauce Labs Backpack')
        await backpack.click()

        await ProductPage.addToCartButton.waitForDisplayed()
        await ProductPage.addToCartButton.click()

        await expect(ProductPage.cartBadge).toHaveText('1')
        await expect(ProductPage.removeButton).toHaveText('Remove')
    })

    it('Cenário 3- Badge deve mostrar 3 produtos', async () => {
        await InventoryPage.addBackpackButton.click()
        await InventoryPage.addBikeLightButton.click()
        await InventoryPage.addBoltTShirtButton.click()

        await expect(InventoryPage.cartBadge).toHaveText('3')
    })

    
})

describe('Remoção de itens do carrinho e atualização do badge', ()=>{
    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.titleProducts.waitForDisplayed()

        const removeButtons = await $$('[id^="remove-"]')
        for (const btn of removeButtons) {
        await btn.click()}
    })

        const listaProdutos = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt'
        ];
        const produtoNome = listaProdutos[0];
        
        it('Deve remover o produto na tela de inventário e atualizar botão e badge', async () => { 
            if (await InventoryPage.getBadgeCount() === 0) {
                await InventoryPage.addProdutoPorNome(produtoNome);
            }

            await InventoryPage.removeProdutoPorNome(produtoNome);

            const botao = await InventoryPage.getBotaoDoProduto(produtoNome);
            await browser.waitUntil(async () => (await botao.getText()) === 'Add to cart', {
                timeout: 5000,
                timeoutMsg: 'O botão não mudou para Add to cart'
            })  
            await expect(await InventoryPage.isBadgeVisivel()).toBe(false);
        });

        it('Remover item pela tela de detalhe do produto', async () => {
            if (await InventoryPage.getBadgeCount() === 0) {
                await InventoryPage.addProdutoPorNome(produtoNome);
            }

            await InventoryPage.abrirDetalhesDoProduto(produtoNome);
            
            const btnRemover = await ProductPage.removeButton;
            await btnRemover.waitForClickable();
            await btnRemover.click();

            await ProductPage.addToCartButton.waitForDisplayed({ timeout: 5000 });
            await expect(await InventoryPage.isBadgeVisivel()).toBe(false);

        })


        it('Remover 3 produtos e validar decremento do badge', async () => {
            for (const nome of listaProdutos) {
                await InventoryPage.addProdutoPorNome(nome);
            }

            for (let i = 0; i < listaProdutos.length; i++) {
            const nomeDoMomento = listaProdutos[i];
            const valorEsperadoAntes = 3 - i;

            await InventoryPage.removeProdutoPorNome(nomeDoMomento);

            if (valorEsperadoAntes > 1) {
                await browser.waitUntil(async () => 
                    (await InventoryPage.getBadgeCount()) === (valorEsperadoAntes - 1), {
                    timeout: 5000
                });
                const atual = await InventoryPage.getBadgeCount();
                await expect(atual).toBe(valorEsperadoAntes - 1);
                } else {
                    await InventoryPage.badgeCarrinho.waitForDisplayed({ reverse: true, timeout: 5000 });
                    await expect(await InventoryPage.isBadgeVisivel()).toBe(false);
                }
            }
        })
})

