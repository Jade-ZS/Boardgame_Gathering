beforeEach(() => {
  cy.intercept("GET", 'https://api.boardgameatlas.com/api/search?&order_by=rank&ascending=false&pretty=true&client_id=Efb4IXjG2E', {
    statusCode: 200,
    fixture: 'games.json'
  })
  .as('games')
  

  cy.intercept("GET", 'https://api.boardgameatlas.com/api/search?&gt_year_published=2021&client_id=Efb4IXjG2E', {
    statusCode: 200,
    fixture: 'new.json'
  })
  .as('new')
  

  cy.intercept("GET", 'https://api.boardgameatlas.com/api/search?&min_age=14&min_players=7&client_id=Efb4IXjG2E', {
    statusCode: 200,
    fixture: 'party.json'
  })
  .as('party')
 

  cy.intercept("GET", 'https://api.boardgameatlas.com/api/search?&min_age=6&client_id=Efb4IXjG2E', {
    statusCode: 200,
    fixture: 'kids.json'
  })
  .as('kids')
  
})



// npx cypress run --browser chrome



describe('Search should have an intuitive user experience.', () => {
  it('Should contain proper elements', () => {
    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')
    .type('a')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('div')
      .should('have.attr', 'class')
      .should('include', 'search-result')  
    })
  })
  it('A helpful message should appear when the users query returns no results, when the user gets results that message should not appear.', () => {
    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')
    .type('gibberish')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('div')
      .within(()=> {
        cy.get('p')
        .contains('Sorry, no matching game was found. Please try a different game name...')
      })
    })
    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')
    .type('a')
    cy.get('.game-cards-container')
      .within(()=> {
      cy.get('div')
      .each(()=> {
        cy.contains('Sorry, no matching game was found. Please try a different game name...')
        .should('not.exist')
      })
    })
  })
})