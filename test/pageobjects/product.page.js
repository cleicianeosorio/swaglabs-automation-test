class ProductPage {

    get productName() {
        return $('[data-test="inventory-item-name"]')
    }

    get productImage() {
        return $('[data-test="item-sauce-labs-backpack-img"]')
    }

    get productDescription() {
        return $('[data-test="inventory-item-desc"]')
    }

    get productPrice() {
        return $('[data-test="inventory-item-price"]')
    }

    get backToProductsButton() {
    return $('#back-to-products')}

    get addToCartButton() {
    return $('[data-test="add-to-cart"]');
    }

    get removeButton() {
    return $('[data-test="remove"]')
    }

    get cartBadge() {
    return $('[data-test="shopping-cart-badge"]')
    }
}

export default new ProductPage()
