import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const massaProdutos = require('../utils/products.json');

describe('Validação de Navegação e Integridade do Carrinho', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        const removeButtons = await $$('[id^="remove-"]');
        for (const btn of removeButtons) {
            await btn.click();
        }
    });

    it('Deve validar a integridade dos produtos ao navegar para o carrinho', async () => {
        await InventoryPage.addProdutoPorNome(massaProdutos.backpack.nome);
        await InventoryPage.addProdutoPorNome(massaProdutos.bikeLight.nome);

        await InventoryPage.linkCarrinho.click();

        await expect(CartPage.tituloPagina).toBeDisplayed();
        await expect(CartPage.tituloPagina).toHaveText('Your Cart');

        const item1 = await CartPage.obterDadosProduto(massaProdutos.backpack.nome);
        expect(item1.nome).toBe(massaProdutos.backpack.nome);
        expect(item1.descricao).toBe(massaProdutos.backpack.desc);
        expect(item1.preco).toBe(massaProdutos.backpack.preco);

        const item2 = await CartPage.obterDadosProduto(massaProdutos.bikeLight.nome);
        expect(item2.nome).toBe(massaProdutos.bikeLight.nome);
        expect(item2.descricao).toBe(massaProdutos.bikeLight.desc);
        expect(item2.preco).toBe(massaProdutos.bikeLight.preco);
    })

})
