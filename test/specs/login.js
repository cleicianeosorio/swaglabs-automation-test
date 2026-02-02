import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import massadados from '../utils/users.json' with { type: 'json' }


describe('Login', () => {
    it('Realizar login com sucesso', async () => {
        LoginPage.open()

        await $('#user-name').setValue(massadados.usuarios.valido.usuario)
        await $('#password').setValue(massadados.usuarios.valido.senha)
        await $('#login-button').click()
        
    })

    it('Login com senha incorreta', async () => {
        LoginPage.open()

        await $('#user-name').setValue(massadados.usuarios.senhaIncorreta.usuario)
        await $('#password').setValue(massadados.usuarios.senhaIncorreta.senha)
        await $('#login-button').click()
        
        const erroComponente = $('.error-message-container');
        await expect(erroComponente).toHaveText(
        expect.stringContaining('Username and password do not match'))
        
    })
    it('Login com usuário incorreto', async () => {
        LoginPage.open()

        await $('#user-name').setValue(massadados.usuarios.usuarioIncorreto.usuario)
        await $('#password').setValue(massadados.usuarios.usuarioIncorreto.senha)
        await $('#login-button').click()
        
        const erroComponente = $('.error-message-container');
        await expect(erroComponente).toHaveText(
        expect.stringContaining('Epic sadface: Username and password do not match any user in this service'))
    })

    it('Login com usuário e senha incorretos', async () => {
        LoginPage.open()

        await $('#user-name').setValue(massadados.usuarios.ambosIncorretos.usuario)
        await $('#password').setValue(massadados.usuarios.ambosIncorretos.senha)
        await $('#login-button').click()
        
        const erroComponente = $('.error-message-container');
        await expect(erroComponente).toHaveText(
        expect.stringContaining('Username and password do not match'))
    })

    it('Validar fechamento da mensagem de erro de login', async () => {
        it('Validar fechamento da mensagem de erro de login', async () => {
    await LoginPage.open()

    await LoginPage.login(
        massadados.usuarios.valido.usuario,
        'senha_errada'
    )

    const botaoX = await LoginPage.btnFecharErro
    await botaoX.waitForDisplayed({ timeout: 5000 })
    await botaoX.click()

    await LoginPage.containerErro.waitForDisplayed({
        reverse: true,
        timeout: 5000
    })

    await expect(LoginPage.containerErro).not.toBeDisplayed()
    })

    })

})


