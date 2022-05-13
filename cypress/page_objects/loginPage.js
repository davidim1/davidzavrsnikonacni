/// <reference types="Cypress" />

class LoginPage {
    get emailInput() {
        return cy.get('input').eq(0)
    }

    get passwordInput() {
        return cy.get('input').eq(1)
    }

    get submitBtn()  {
        return cy.get(':submit').eq(0)
    }

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.submitBtn.click()
    }
}

export const loginPage = new LoginPage