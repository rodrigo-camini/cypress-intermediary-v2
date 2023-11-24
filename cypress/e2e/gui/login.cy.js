const cypress = require("cypress")

describe('Login', () => {
  it('successfully', () => {
    const user = cypress.env('user_name')
    const password = cypress.env('user_password')
    //Abaixo é definido o cache da sessão como falso pois não queremos que armazene o cache da sessao para o teste de login
    //Queremos que ele sempre seja executado pela interface grafica do usuário e nunca por cache
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})