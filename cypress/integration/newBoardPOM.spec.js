import { newBoard } from '../page_objects/newBoard';
import { faker } from '@faker-js/faker';

describe ('New board POM', () => {
    let boardId
    let boardData = {
        boardTitle: faker.random.word()
    }


    beforeEach('Be logged in and get to the new board pop up window', () => {
        cy.loginViaBackend();
        cy.visit('/');
        cy.url().should('include','/');
    })


    it ('Create Kanban organization without photo', () => {
        newBoard.newBoardHover.click();
        newBoard.newBoardLink.click();
        newBoard.boardTitle.should('be.visible');
        newBoard.newBoardCreation(
            boardData.boardTitle
        );        
    })

    it ('Create Scrum organization without photo', () => {
        newBoard.newBoardHover.click();
        newBoard.newBoardLink.click();
        newBoard.boardTitle.should('be.visible');

        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards'
        }).as('createBoard');


        newBoard.newBoardCreationScrum(
            boardData.boardTitle
        );   
        
        cy.wait('@createBoard').then(interception => {
            boardId = interception.response.body.id;
            expect(interception.response.statusCode).eq(201)
        });


        cy.url().should('include','/boards/');
    })

    it('Delete existing board', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
        }).as('deleteBoard');

        cy.visit(`/boards/${boardId}`);
        newBoard.deleteBoard();

        cy.wait('@deleteBoard').then(interception => {
            expect(interception.response.statusCode).eq(200)
        })


    })

   
})

