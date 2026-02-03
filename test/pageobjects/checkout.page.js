import Page from './page.js';

class CheckoutPage extends Page { 
    get inputFirstName() { return $('#first-name'); }
    get inputLastName() { return $('#last-name'); }
    get inputPostalCode() { return $('#postal-code'); }
    get btnContinue() { return $('#continue'); }
    get errorMessage() { return $('[data-test="error"]'); }
    get titleYourInformation() { 
        return $('//span[@class="title" and text()="Checkout: Your Information"]'); 
    }

    get titleOverview() { 
        return $('//span[@data-test="title" and text()="Checkout: Overview"]'); 
    }

    async preencherDadosEContinuar({ nome = '', sobrenome = '', cep = '' }) {
        await this.inputFirstName.waitForDisplayed(); 
        await this.inputFirstName.setValue(nome);
        await this.inputLastName.setValue(sobrenome);
        await this.inputPostalCode.setValue(cep);
        await this.btnContinue.click();
    }

}
export default new CheckoutPage();