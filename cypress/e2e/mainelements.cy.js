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

describe('template spec', () => {
  it('passes', () => {
    // cy.wait('@kids', '@party', '@new', '@games')
    
    // cy.visit("http://localhost:3000/")

    cy.visit('http://localhost:3000/')
    cy.get('h1').contains('h1','Boardgame')
    cy.get('img').first().should('have.attr', 'src').should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324599426.jpg')
    // .should('be.visible').contains('src=https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324599426.jpg')
  })
})