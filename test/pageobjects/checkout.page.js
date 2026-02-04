import Page from './page.js';

class CheckoutPage extends Page { 
    get inputFirstName() { return $('#first-name'); }
    get inputLastName() { return $('#last-name'); }
    get inputPostalCode() { return $('#postal-code'); }
    get btnContinue() { return $('#continue'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get btnCancel() { return $('#cancel'); }
    get btnFinish() { return $('#finish'); }

    get labelPaymentInfo() { return $('[data-test="payment-info-label"]'); }
    get labelShippingInfo() { return $('[data-test="shipping-info-label"]'); }
    get labelTotalPrice() { return $('[data-test="total-label"]'); }

    get headerThankYou() { return $('.complete-header'); }
    get ponyExpressImage() { return $('.pony_express'); }
    get btnBackHome() { return $('#back-to-products'); }

    get labelSubtotal() { return $('.summary_subtotal_label'); }
    get labelTax() { return $('.summary_tax_label'); }
    get labelTotal() { return $('.summary_total_label'); }

    get titleYourInformation() { 
        return $('//span[@class="title" and text()="Checkout: Your Information"]'); 
    }

    get titleOverview() { 
        return $('//span[@class="title" and text()="Checkout: Overview"]');
    }

    get titleComplete() { return $('//span[@class="title" and text()="Checkout: Complete!"]'); }

    async preencherDadosEContinuar({ nome = '', sobrenome = '', cep = '' }) {
        await this.inputFirstName.waitForDisplayed({ timeout: 5000 });

        await this.inputFirstName.waitForDisplayed(); 
        await this.inputFirstName.setValue(nome);
        await this.inputLastName.setValue(sobrenome);
        await this.inputPostalCode.setValue(cep);
        await this.btnContinue.click();

    }


}
export default new CheckoutPage();