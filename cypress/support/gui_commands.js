Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    //Aqui passamos o objeto cache como true para salvar a sessão do usuário e aproveita-la em outros testes
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/users/sign_in')
        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    //Aqui estamos validando se a sessão ainda é válida, e caso não seja, a função de setup (login) será executada pelo comando cy.session novamente.
    const validate = () => {
        //Acessamos a home da aplicação
        cy.visit('/')
        //fazmos uma validação onde pegamos o pathname e validamos se não é igual a user/sign_in, pois se não for ele irá recriar a sessao.
        cy.location('pathname', { timeout: 1000 })
            .should('not.equal', '/users/sign_in')
    }

    //Aqui definimos uma variavel options para compartilhas o cache entre as specs
    const options = {
        cacheAcrossSpecs: true,
        validate
    }

    if (cacheSession) {
        //Aqui passamos o id da sessão que é o user, a função pra criar a seção login(), e a option com o cache para compartilhar 
        //sessão entre as specs e eu quero que execute a validação, pois se alguma coisa invalidou a sessão será necessário 
        //recria-la novamente
        cy.session(user, login, options)
    } else {
        login()
    }
})

Cypress.Commands.add('logout', () => {
    cy.get(".qa-user-avatar").click()
    cy.contains("Sign out").click()
})

Cypress.Commands.add('gui_createProject', project => {
    cy.visit('/projects/new')
    //Abaixo um exemplo para caso quisesse pegar direto o botao de criação do projeto atraves do css selector
    //cy.get('[class^="blank"] [href="/projects/new"]').click()
    //css querySelector document.querySelectorAll('[class^="blank"] [href="/projects/new"]'

    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('#project_initialize_with_readme').check()
    cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.contains('Submit issue').click()
})

