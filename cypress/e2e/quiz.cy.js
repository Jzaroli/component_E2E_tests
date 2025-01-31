describe('Quiz Component', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('starts the quiz and displays the first question', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('.card').should('not.be.empty');
        cy.get('h2').should('not.be.empty');
    });

    it('answers questions and completes the quiz', () => {
        cy.get('button').contains('Start Quiz').click();

        for (let i = 0; i < 10; i++) {
        cy.get('button').contains('1').click();
        }

        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    });

    it('restarts the quiz after completion', () => {
        cy.get('button').contains('Start Quiz').click();
        for (let i = 0; i <10; i++) {
        cy.get('button').contains('1').click();
        }
        
        cy.get('button').contains('Take New Quiz').click();

        cy.get('.card').should('not.be.empty');
        cy.get('h2').should('not.be.empty');
    });

});