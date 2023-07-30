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

describe('Filter should have correct elements, pathing, and selections.', () => {
  it('Filter pop out should have proper handling for filter returning no data.', () => {
    unreg()

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
      .first()
      .click()
    })

    cy.get('.pop-out-menu')
    .within(()=>{
      cy.get('.filtered')
      .within(()=>{
        cy.get('.filter-ul')
        .within(()=>{
          cy.get('p')
          .eq(1)
          .contains('Sorry No Games For This Catagory')
        })
      })
    })



    // cleanUp()
  })

  it('Filter pop out should have proper elements.', () => {
    unreg()

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
      .first()
      .click()
    })

    cleanUp()
  })

  it('Filter pop out should be able to open and close, and extension pop-out should be able to open and close by selecting a filter and by clearing filters.', () => {
    unreg()

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
      .first()
      .click()
    })
    cy.get('.filter-ul')
    .should('exist')
    cy.get('.menu-item')
    .first()
    .within(()=>{
      cy.get('button')
      .click()
    })
    cy.get('.pop-out-menu')
    .should('not.exist')
    cy.get('.filter-ul')
    .should('not.exist')
    
    cleanUp()
  })
  
})