import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.login()
        cy.gui_createProject(issue.project)
    })


    it('Create a issue sucessfully', () => {

        cy.gui_createIssue(issue)
        cy.get('.issue-details')
            .should('contain', issue.title)
            .and('contain', issue.description)

    })

})