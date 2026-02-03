import { $ } from '@wdio/globals'
import Page from './page.js';

class InventoryPage extends Page {
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

    get cartBadge() {
    return $('[data-test="shopping-cart-badge"]')
    }

    get addBikeLightButton() {
    return $('#add-to-cart-sauce-labs-bike-light')
    }

    get addBoltTShirtButton() {
    return $('#add-to-cart-sauce-labs-bolt-t-shirt')
    }

    get carrinhoContainer() { 
        return $('#shopping_cart_container'); 
    }

    get badgeCarrinho() { 
        return $('[data-test="shopping-cart-badge"]'); 
    }

    get linkCarrinho() { 
        return $('[data-test="shopping-cart-link"]'); 
    }

    get produtos() { 
        return $$('.inventory_item'); 
    }

    async produtoPorNome(nomeProduto) {
        for (const p of await this.produtos) {
            const nome = await p.$('.inventory_item_name').getText();
            if (nome === nomeProduto) return p;
        }
        return null;
    }

    async getBotaoDoProduto(nomeProduto) {
        const produto = await this.produtoPorNome(nomeProduto);
        return produto.$('button');
    }

    async getBadgeCount() {
        const badge = await this.badgeCarrinho;
        if (await badge.isExisting() && await badge.isDisplayed()) {
        const texto = await badge.getText();
        return parseInt(texto);
    }
    return 0;
    }

    async isBadgeVisivel() {
        return await this.badgeCarrinho.isDisplayed();
    }

    async addProdutoPorNome(nomeProduto) {
        const itemContainer = await $(`//div[@data-test="inventory-item"][descendant::div[text()="${nomeProduto}"]]`);
        const btnAdd = await itemContainer.$('button[id^="add-to-cart"]');

        await btnAdd.waitForDisplayed();
        await btnAdd.scrollIntoView({ block: 'center' });
        await btnAdd.click();
    }

    async removeProdutoPorNome(nomeProduto) {
        const produto = await this.produtoPorNome(nomeProduto);
        const botao = await produto.$('button');
        if ((await botao.getText()) === 'Remove') {
            await botao.click();
        }
    }

    async abrirDetalhesDoProduto(nomeProduto) {
        const produto = await this.produtoPorNome(nomeProduto);
        if (produto) {
            const link = await produto.$('.inventory_item_name');
            await link.click();
        }
    }

    async adicionarAoCarrinho(produtoId) {
        const btnAdd = await $(`[data-test="add-to-cart-${produtoId}"]`);
        
        await btnAdd.waitForDisplayed();
        await btnAdd.click();
    }

    get btnCart() { return $('.shopping_cart_link'); }


}

export default new InventoryPage()
