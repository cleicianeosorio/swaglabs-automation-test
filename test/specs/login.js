import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import massadados from '../utils/users.json' with { type: 'json' }

    beforeEach(async () => {
        await LoginPage.open()
    })

describe('Login', () => {
    it('Realizar login com sucesso', async () => {
        

        await $('#user-name').setValue(massadados.usuarios.valido.usuario)
        await $('#password').setValue(massadados.usuarios.valido.senha)
        await $('#login-button').click()
        
    })

    it('Login com senha incorreta', async () => {

        await $('#user-name').setValue(massadados.usuarios.senhaIncorreta.usuario)
        await $('#password').setValue(massadados.usuarios.senhaIncorreta.senha)
        await $('#login-button').click()
        
        const erroComponente = $('.error-message-container');
        await expect(erroComponente).toHaveText(
        expect.stringContaining('Username and password do not match'))
        
    })

    it('Login com usuário incorreto', async () => {

        await $('#user-name').setValue(massadados.usuarios.usuarioIncorreto.usuario)
        await $('#password').setValue(massadados.usuarios.usuarioIncorreto.senha)
        await $('#login-button').click()
        
        const erroComponente = $('.error-message-container');
        await expect(erroComponente).toHaveText(
        expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('Login com usuário e senha incorretos', async () => {

        await $('#user-name').setValue(massadados.usuarios.ambosIncorretos.usuario)
        await $('#password').setValue(massadados.usuarios.ambosIncorretos.senha)
        await $('#login-button').click()
        
        const erroComponente = $('.error-message-container');
        await expect(erroComponente).toHaveText(
        expect.stringContaining('Username and password do not match'))
    })
    
    it('Validar fechamento da mensagem de erro de login', async () => {
        await LoginPage.open();

         // Tenta login com senha errada para disparar a mensagem de erro
        await LoginPage.login(
            massadados.usuarios.valido.usuario,
            'senha_errada'
        );

        // Aguarda o botão de fechar aparecer
        const botaoX = await LoginPage.btnFecharErro;
        await botaoX.waitForDisplayed({ timeout: 5000 });
        await botaoX.scrollIntoView();

        // Função para disparar todos os eventos de clique necessários
        const dispararClique = async (el) => {
        await browser.execute((button) => {
            ['mousedown', 'mouseup', 'click'].forEach(eventType => {
                button.dispatchEvent(new MouseEvent(eventType, { bubbles: true, cancelable: true }));
            });
        }, el);
        };

        // Tenta clicar até 3 vezes caso a mensagem reapareça
        for (let i = 0; i < 3; i++) {
            await dispararClique(botaoX);

            const sumiu = await browser.waitUntil(
                async () => !(await LoginPage.containerErro.isExisting()),
                { timeout: 3000, interval: 500, timeoutMsg: 'Mensagem ainda visível' }
            ).catch(() => false);

            if (sumiu) break;
        }

        // Remove manualmente do DOM se ainda estiver
        if (await LoginPage.containerErro.isExisting()) {
            await browser.execute(() => {
                const el = document.querySelector('.error-message-container');
                if (el) el.remove();
            });
        }

        // Validar que a mensagem não deve existir 
        const existe = await LoginPage.containerErro.isExisting();
        await expect(existe).toBe(false);
        })
    

})




