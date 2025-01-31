import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: 'api/questions/random'
        },
        {
            fixture: 'questions.json',
            statusCode: 200
        }
        ).as('getRandomQuestion')
    });

    it('starts the quiz and displays the first question', () => {
        cy.mount(<Quiz />); 
        cy.get('button').contains('Start Quiz').click();
        cy.get('.card').should('not.be.empty');
        cy.get('h2').should('not.be.empty');
    });

    it('answers questions and completes the quiz', () => {
        cy.mount(<Quiz />); 
        cy.get('button').contains('Start Quiz').click();

        cy.get('button').contains('1').click();

        cy.get('.alert-success').should('be.visible').and('contain', 'Your score');
    });

    it('restarts the quiz after completion', () => {
        cy.mount(<Quiz />); 
        cy.get('button').contains('Start Quiz').click();

        cy.get('button').contains('1').click();

        cy.get('button').contains('Take New Quiz').click();

        cy.get('.card').should('be.visible');
        cy.get('h2').should('not.be.empty');
    });
    
});