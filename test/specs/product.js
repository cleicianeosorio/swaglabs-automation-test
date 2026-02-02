import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import ProductPage from '../pageobjects/product.page.js'

describe('Detalhes do produto', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.openBackpackProduct()
    })

    it('Deve abrir a página do produto Sauce Labs Backpack corretamente', async () => {

        await ProductPage.productName.waitForDisplayed()
        await expect(ProductPage.productName)
        .toHaveText('Sauce Labs Backpack')

    
        await expect(ProductPage.productImage)
        .toBeDisplayed()

        const desc = await ProductPage.productDescription.getText()
        expect(desc).toContain('carry.allTheThings')

    
        await expect(ProductPage.productPrice)
            .toBeDisplayed()
        await expect(ProductPage.productPrice)
            .toHaveText('$29.99')
    })

    it('Deve voltar para a página de inventário ao clicar em Back to products', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')

        const backpack = await $('a*=Sauce Labs Backpack')
        await backpack.click()

        await ProductPage.productName.waitForDisplayed()
        await expect(ProductPage.productName)
            .toHaveText('Sauce Labs Backpack')

        await ProductPage.backToProductsButton.click()

        await InventoryPage.titleProducts.waitForDisplayed()
        await expect(InventoryPage.titleProducts)
            .toHaveText('Products')
    })

})
