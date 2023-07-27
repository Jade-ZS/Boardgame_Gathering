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
      cy.get('.search-result')
      .should('have.attr', 'class')
      .should('include', 'search-result')  
    })
  })

  it('A helpful message should appear when the user\'s query returns no results, when the user gets results that message should not appear, or persist.', () => {
    
    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')
    .type('gibberish')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('.search-result')
      .within(()=> {
        cy.get('p')
        .contains('Sorry, no matching game was found. Please try a different game name...')
      })
    })

    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')
    .type('gibberish')
    .clear()
    .type('a')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('.search-result')
      .each(()=> {
        cy.contains('Sorry, no matching game was found. Please try a different game name...')
        .should('not.exist')
      })
    })
  })

  it('User should get result matching based on partial text, and nothing else', () => {
      
    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')
    .type('Ca')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('.search-result')
      .each(()=> {
        cy.get('a')
        .should("have.length", 2)
        cy.get('a')
        .first()
        .should('have.attr', 'href')
        .should('include', '/OIXt3DmJU0')
        cy.get('img')
        .first()
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324722072.jpg')
        cy.get('p')
        .first()
        .contains('Catan')
        cy.get('a')
        .last()
        .should('have.attr', 'href')
        .should('include', '/c7ncqL5AX6')
        cy.get('img')
        .last()
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559257497048-519-B02BO03L.jpg')
        cy.get('p')
        .last()
        .contains('PitchCar Mini')         
      })
    })
  })

  it('User should be able to type out the full name of a game and get a result', () => {

    cy.visit('http://localhost:3000/')
    .get('input[type="text"]')         
    .type('Backgammon')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('.search-result')
      .each(()=> {
        cy.get('a')
        .should("have.length", 1)
        cy.get('a')
        .eq(0)
        .should('have.attr', 'href')
        .should('include', '/YBJODy05aF')
        cy.get('img')
        .eq(0)
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1626789069947')
        cy.get('p')
        .eq(0)
        .contains('Backgammon')
      })
    })
  })
})



// add testing for text up above
