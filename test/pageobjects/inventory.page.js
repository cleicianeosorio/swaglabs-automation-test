import { $ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage {
    get titleProducts() {
    return $('//span[@class="title" and text()="Products"]')
    }

    get sortSelect() {
    return $('[data-test="product-sort-container"]') }

    async sortBy(value) {
    await this.sortSelect.selectByAttribute('value', value)
    }

    async getAllPrices() {
    const elements = await $$('.inventory_item_price')

    const prices = []
        for (const el of elements) {
        const text = await el.getText()
        prices.push(parseFloat(text.replace('$', '')))
    }

    return prices
    }

    async getAllNames() {
    const elements = await $$('.inventory_item_name')

    const names = []
    for (const el of elements) {
    names.push(await el.getText())
    }

    return names
    }

    get backpackProduct() {
        return $('#item_4_title_link')
    }

    async openBackpackProduct() {
    await this.backpackProduct.click()
    }

    get addBackpackButton() {
    return $('#add-to-cart-sauce-labs-backpack')
    }

    get removeBackpackButton() {
    return $('#remove-sauce-labs-backpack')
    }

    // Badge do carrinho (serve pra todas as telas)
    get cartBadge() {
    return $('[data-test="shopping-cart-badge"]')
    }

    get addBikeLightButton() {
    return $('#add-to-cart-sauce-labs-bike-light')
    }

    get addBoltTShirtButton() {
    return $('#add-to-cart-sauce-labs-bolt-t-shirt')
    }
}

export default new InventoryPage()
