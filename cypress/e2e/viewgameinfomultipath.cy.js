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
  cy.clearAllCookies()
}


describe('Testing for user pathing to game info page.', () => {

  it('User should be able to select a game from search results, view game info, and return home', () => {
    
    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])


    cy.get('input[type="text"]')         
    .type('Backgammon')
    cy.get('.search-result')
    .within(() =>{
      cy.get('a')
      .click()
    })
    cy.url()
    .should('include', '/YBJODy05aF')
    cy.get('.home-button')
    .within(() => {
      cy.get('a').click({ force: true })
    })
    cy.url()
    .should('not.include', '/YBJODy05aF')
    cy.url()
    .should('include', 'http://localhost:3000/')

    cleanUp() 
  })

  it('User should be able to select a game from new release carousel, view game info, and return home', () => {

    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

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
    cy.url()
    .should('not.include', '/J1vBFiqdHG')
    cy.url()
    .should('include', 'http://localhost:3000/')

    cleanUp()
  })

  it('User should be able to select a game from party games carousel, view game info, and return home', () => {

    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

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
    cy.url()
    .should('not.include', '/OTIkviy9XZ')
    cy.url()
    .should('include', 'http://localhost:3000/')

    cleanUp()
    
  })

  it('User should be able to select a game from kid friendly carousel, view game info, and return home', () => {

    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

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
    cy.url()
    .should('not.include', '/3hnL2wtWnM')
    cy.url()
    .should('include', 'http://localhost:3000/')
    cleanUp()
  })

  it('User should be able to select a game from filter, view game info, and come home.', () => {

    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])
    cy.get('.filter')
    .click()
    cy.get('.pop-out-menu')
    .should('exist')
    cy.get('.filter-ul')
    .should('not.exist')
    cy.get('.menu-item')
    .first()
    .within(()=>{
      cy.get('li')
      .eq(1)
      .click()
    })
    cy.get('.game-link')
    .first()
    .click()
    cy.url()
    .should('include', '/OO9EJFWOcI')
    cy.get('.home-button')
    .within(() => {
      cy.get('a').click({ force: true })
    })
    cy.url()
    .should('not.include', '/OO9EJFWOcI')
    cy.url()
    .should('include', 'http://localhost:3000/')

    cleanUp()
  })
  
})




