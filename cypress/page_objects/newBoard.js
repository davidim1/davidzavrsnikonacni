class NewBoard {
    get newBoardHover () {
       return cy.get('div[class="vs-c-list__btn vs-c-list-btn--add-new el-tooltip"]').eq(0)
    }

    get newBoardLink () {
        return cy.get('span').contains('Add Board')
    }

    get boardTitle () {
        return cy.get('input').eq(1)
    }

    get nextBtn () {
        return cy.get('button[name="next_btn"]')
    }

    get kanbanBtn () {
        return cy.get('span[name="type_kanban"]')
    }

    get scrumBtn () {
        return cy.get('span[name="type_scrum"]')
    }

    get configureBtn () {
        return cy.get('a[class="vs-c-site-logo"]').last()
    }

    get yesBtn () {
        return cy.get('button[name="save-btn"]')
    }

    

    newBoardCreation (title) {
        this.boardTitle.type(title);
        this.nextBtn.click();
        this.kanbanBtn.click();
        this.nextBtn.click();
        this.nextBtn.click();
        this.nextBtn.click();
    }

    newBoardCreationScrum (title) {
        this.boardTitle.type(title);
        this.nextBtn.click();
        this.scrumBtn.click();
        this.nextBtn.click();
        this.nextBtn.click();
        this.nextBtn.click();
        this.nextBtn.click();
    }

    deleteBoard () {
        this.configureBtn.click();
        cy.get('.vs-c-btn--warning').scrollIntoView().click();
        this.yesBtn.click();
    }
}



export const newBoard = new NewBoard
