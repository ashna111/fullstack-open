describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Ashna',
            username: 'ashna111',
            password: 'fullstack'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get("#username").type("ashna111")
            cy.get("#password").type("fullstack")
            cy.get("#login-button").click()
            cy.contains("Ashna is logged in")
        })

        it('fails with wrong credentials', function () {
            cy.get("#username").type("ashna111")
            cy.get("#password").type("fullstack1")
            cy.get("#login-button").click()
            cy.contains("Wrong credentials")
        })
    })
})