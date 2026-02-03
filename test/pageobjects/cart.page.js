class CartPage {
    get tituloPagina() { return $('[data-test="title"]'); } 
    get itensNoCarrinho() { return $$('[data-test="inventory-item"]'); }
    get btnContinueShopping() { return $('#continue-shopping'); }
    get btnCheckout() { return $('#checkout'); }
    get badgeCarrinho() { return $('[data-test="shopping-cart-badge"]'); }

    async obterDadosProduto(nome) {  

        const itens = await this.itensNoCarrinho;
        for (const item of itens) {
            const nomeTexto = await item.$('[data-test="inventory-item-name"]').getText();
            if (nomeTexto === nome) {
                return {
                    nome: nomeTexto,
                    descricao: await item.$('[data-test="inventory-item-desc"]').getText(),
                    preco: await item.$('[data-test="inventory-item-price"]').getText()
                };
            }
        }
        return null;
    }

    get btnRemoveBikeLight() { 
        return $('button[id^="remove-"]')
    }
}

export default new CartPage();