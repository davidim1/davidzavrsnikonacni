import { loginPage } from "../page_objects/loginPage";

describe('Login POM', () => {
    it ('login with valid data', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        }).as('successfullogin');

        cy.visit('/login');
        cy.url().should('contains', '/login');
        loginPage.emailInput.should('be.visible');
        loginPage.passwordInput.should('be.visible');
        loginPage.login('davidm@gmail.com', '12345678');

        cy.wait('@successfullogin').then(interception => {
            console.log('RESPONSE', interception)
            expect(interception.response.statusCode).eq(200)
        })


        cy.visit('/my-organizations');
    })
})