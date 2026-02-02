import { $ } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {
    get inputUsername () { return $('#user-name');}
    get inputPassword () { return $('#password');}
    get btnSubmit () { return $('#login-button');}
    
    get btnFecharErro () { return $('[data-test="error-button"]'); }
    get containerErro () { return $('.error-message-container'); }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () { return super.open(''); }
}

export default new LoginPage();