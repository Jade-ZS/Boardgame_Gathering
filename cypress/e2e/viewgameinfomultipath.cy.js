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


describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })



  it('User should be able to select a game from search results, view game info, and return home', () => {

    cy.visit('http://localhost:3000/')
      cy.get('input[type="text"]')         
      .type('Backgammon')
      cy.get('.search-result')
      .within(() =>{
        cy.get('a')
        .click()
      })
      cy.url()
      .should('include', 'http://localhost:3000/YBJODy05aF')
      cy.get('.home-button')
      .within(() => {
        cy.get('a').click({ force: true })
      }) 
  })

  it('User should be able to select a game from new release carousel, view game info, and return home', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.game-row')
    .eq(0)
    .within(() => {
      cy.get('img')
      .first()
      .click()
      })
    cy.url()
    .should('include', '/J1vBFiqdHG')
    cy.get('.home-button')
    .within(() => {
      cy.get('a').click({ force: true })

    })
  })

  it('User should be able to select a game from party games carousel, view game info, and return home', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.game-row')
    .eq(1)
    .within(() => {
      cy.get('img')
      .first()
      .click()
      })
    cy.url()
    .should('include', '/OTIkviy9XZ')
    cy.get('.home-button')
    .within(() => {
      cy.get('a').click({ force: true })

    })
  })

  it('User should be able to select a game from kid friendly carousel, view game info, and return home', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.game-row')
    .eq(2)
    .within(() => {
      cy.get('img')
      .first()
      .click()
      })
    cy.url()
    .should('include', '/3hnL2wtWnM')
    cy.get('.home-button')
    .within(() => {
      cy.get('a').click({ force: true })

    })
  })

  it('Home button should be present, and have correct contents.', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.game-row')
    .eq(2)
    .within(() => {
      cy.get('img')
      .first()
      .click()
      })
    cy.url()
    .should('include', '/3hnL2wtWnM')
    
    cy.get('.home-button')
    .within(()=>{
      cy.get('p')
      .within(()=>{
      cy.get('span')
      .contains('⌂')
      })
    })
  })
  
  it('Game details should be present, and have correct contents.', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.game-row')
    .eq(2)
    .within(() => {
      cy.get('img')
      .first()
      .click()
      })
    cy.url()
    .should('include', '/3hnL2wtWnM')
    
    cy.get('.game-details')
    .within(()=>{
      cy.get('.thumbnail')
      .within(()=>{
        cy.get('img')
        .should('have.attr', 'src')
        .should('include', 'https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1594689503033') 
        cy.get('img')
        .should('have.attr', 'alt')
        .should('include', 'chess thumbnail') 
        
      })
      cy.get('.details')
        .each(()=>{
          cy.get('h4')
          .eq(0)
          .contains('14.95')
          .should('have.attr', 'style')
          .should('include', 'lightgreen')
          cy.get('h4')
          .eq(1)
          .contains('2 Players')
          .should('have.attr', 'style')
          .should('include', 'lightblue')
          cy.get('h4')
          .eq(2)
          .contains('Ages 6+')
          .should('have.attr', 'style')
          .should('include', 'red')
          cy.get('h4')
          .eq(3)
          .contains('3.32 ⭐️')
          .should('have.attr', 'style')
          .should('include', 'yellow')
        })
      })
    

  })

})