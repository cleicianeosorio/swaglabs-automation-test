import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Inventário', () => {
    it('Deve redirecionar para a tela de inventário após login válido', async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')

    await InventoryPage.titleProducts.waitForDisplayed({ timeout: 5000 })
    await expect(InventoryPage.titleProducts).toHaveText('Products')
    })
})

describe('Ordenação de produtos', () => {

    beforeEach(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await InventoryPage.sortSelect.waitForDisplayed()
    })

    it('Preço: Menor para Maior', async () => {
        await InventoryPage.sortBy('lohi')

        const prices = await InventoryPage.getAllPrices()
        const sorted = [...prices].sort((a, b) => a - b)

        expect(prices).toEqual(sorted)
        expect(prices[0]).toBe(sorted[0])
        expect(prices[prices.length - 1]).toBe(sorted[sorted.length - 1])
    })

    it('Preço: Maior para Menor', async () => {
        await InventoryPage.sortBy('hilo')

        const prices = await InventoryPage.getAllPrices()
        const sorted = [...prices].sort((a, b) => b - a)

        expect(prices).toEqual(sorted)
    })

    it('Nome: Z para A', async () => {
        await InventoryPage.sortBy('za')

        const names = await InventoryPage.getAllNames()
        const sorted = [...names].sort().reverse()

        expect(names).toEqual(sorted)
    })

    it(' Nome: A para Z', async () => {
        await InventoryPage.sortBy('az')

        const names = await InventoryPage.getAllNames()
        const sorted = [...names].sort()

        expect(names).toEqual(sorted)
        expect(names[0]).toBe('Sauce Labs Backpack')
    })
})

