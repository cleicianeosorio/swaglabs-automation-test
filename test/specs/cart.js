import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import ProductPage from '../pageobjects/product.page.js'

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


