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

describe('Conditional rendering should make missing data not apparent user interfacing.', () => {
  it('Games like chess that are missing parts but not all of the additional info section should have that selectively! Conditionally rendered out.', () => {
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
      cy.get('.links')
      .within(()=>{
        cy.get('.game-nav')
        .within(()=>{
          cy.get('a')
          .eq(2)
          .should('not.exist')
      })
    })
    cleanUp()
  })

  it('Games that are missing large chunks of data, removing the need for things like a nav section should have that conditionally rendered out.', () => {
    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])

    cy.get('.game-row')
    .eq(1)
    .within(() => {
      cy.get('img')
      .eq(3)
      .click()
      })
    cy.get('.links')
    .within(()=>{
      cy.get('.game-nav')
      .should('not.be.visible')
    })
    cy.get('.about-container')
    .should('not.be.visible')
    cy.get('.details')
    .within(()=>{
      cy.get('h4')
      .eq(2)
      .should('not.exist')
    })
    cleanUp()
  })
})