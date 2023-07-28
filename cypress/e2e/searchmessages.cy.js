async function unreg() {
  if (!window.navigator || !navigator.serviceWorker) {
    return null;
  }
  const regs = await navigator.serviceWorker.getRegistrations();
  return Promise.all(regs.map((registration) => {
    return registration.unregister();
  }));
}

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
  

  cy.intercept("GET", 'https://api.boardgameatlas.com/api/search?&min_players=4&client_id=Efb4IXjG2E', {
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

function cleanUp() {
  cy.clearCookies()
}

describe('Search should have an intuitive user experience.', () => {

  it('A helpful message should appear when the user\'s query returns no results.', () => {
    
    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

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
    cleanUp()
  })

  it('A helpful message should appear when the user\'s query returns no results, when the user gets results that message should not appear, or persist.', () => {  
    
    unreg()
    
    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

    .get('input[type="text"]')
    .type('gibberish')
    .clear()
    .type('a')
    cy.get('.game-cards-container')
    .within(()=> {
      cy.get('.search-result')
      .within(()=> {
        cy.contains('Sorry, no matching game was found. Please try a different game name...')
        .should('not.exist')
      })
    })
  }) 
})