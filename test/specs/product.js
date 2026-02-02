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

    // Nome
    await expect(ProductPage.productName)
        .toHaveText('Sauce Labs Backpack')

    // Imagem
    await expect(ProductPage.productImage)
        .toBeDisplayed()

    // Descrição
    const desc = await ProductPage.productDescription.getText()
    expect(desc).toContain('carry.allTheThings')

    // Preço
    await expect(ProductPage.productPrice)
        .toBeDisplayed()
    await expect(ProductPage.productPrice)
        .toHaveText('$29.99')
    })

    it('Deve voltar para a página de inventário ao clicar em Back to products', async () => {

    // Login
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')

    // Clica no produto
    const backpack = await $('a*=Sauce Labs Backpack')
    await backpack.click()

    // Garante que está na página do produto
    await ProductPage.productName.waitForDisplayed()
    await expect(ProductPage.productName)
        .toHaveText('Sauce Labs Backpack')

    // Clica no botão Back
    await ProductPage.backToProductsButton.click()

    // Valida redirecionamento para inventário
    await InventoryPage.titleProducts.waitForDisplayed()
    await expect(InventoryPage.titleProducts)
        .toHaveText('Products')
    })

})
