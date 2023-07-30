
async function unreg() {
  if (!window.navigator || !navigator.serviceWorker) {
    return null;
  }
  const registrations = await navigator.serviceWorker.getRegistrations();
  return Promise.all(registrations.map(registration => registration.unregister()));
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

describe('template spec', () => {
  it('passes', () => {
    
    cy.intercept("GET", 'https://api.boardgameatlas.com/api/search?&min_age=6&client_id=Efb4IXjG2E', {
      statusCode: 404,
      fixture: 'kids.json'
    })
    .as('kids404')

    cy.visit('http://localhost:3000/')
    // cy.wait(['@games','@new','@party','@kids'])
    cy.wait(['@kids404'])


  })
})