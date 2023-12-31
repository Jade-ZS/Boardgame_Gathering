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

describe('Filter should have correct elements, pathing, and selections.', () => {
  it('Filter pop out should have proper handling for filter returning no data by category.', () => {
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



    cleanUp()
  })

  it('Filter pop out should have proper handling for filter returning no data by year.', () => {
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
    .last()
    .within(()=>{
      cy.get('li')
      .last()
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
          .contains('Sorry No Games For This Year')
        })
      })
    })

    cleanUp()
  })

  it('Filter pop out Options section should have proper elements and atrributes.', () => {
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
      .eq(1)
      .click()
    })

    cy.get('.filtered')
    .within(()=>{
      cy.get('.filter-ul')
      .within(()=>{
        cy.get('button')
        .contains('Clear Filters')
        cy.get('p')
        .first()
        .contains('Your Options')
        cy.get('a')
        .should('have.attr','href')
        .should('include', '/OO9EJFWOcI')
        cy.get('a')
        .within(()=>{
          cy.get('.option')
          .within(()=>{
            cy.get('p')
            .contains('👾')
            cy.get('li')
            .first()
            .contains('first rat')
          })
        })
      })
    })

    cleanUp()
  })

  it('Filter pop out Game Type section should have proper elements and attributes.', () => {
    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])
    cy.get('.filter')
    .click()
    cy.get('.pop-out-menu')
    .should('exist')
    //////
    cy.get('.menu-item')
    .eq(0)
    .within(()=>{
      cy.get('div')
      .first()
      .within(()=>{
        cy.get('button')
        .contains('Close')
        cy.get('p')
        .contains('Game Type')
        cy.get('.drop-down-menu')
        .within(()=>{
          cy.get('ul')
          .within(()=>{
            cy.get('li')
            .first()
            .should('have.attr','id')
            .should('include', 'nuHYRFmMjU')
            cy.get('li')
            .first()
            .should('have.attr','class')
            .should('not.include', 'selected')
            cy.get('li')
            .first()
            .contains('Renaissance')
            cy.get('li')
            .last()
            .should('have.attr','id')
            .should('include', 'JwHcKqxh33')
            cy.get('li')
            .last()
            .should('have.attr','class')
            .should('not.include', 'selected')
            cy.get('li')
            .last()
            .contains('Trains')
            cy.get('li')
            .last()
            .click()    
            .should('have.attr','class')
            .should('include', 'selected')
          })
        })
      })
      cy.get('.menu-item')
      .within(()=>{
        cy.get('p')
        .contains('Featured Year The 90\'s')
        cy.get('.drop-down-menu')
        .within(()=>{
          cy.get('li')
          .first()
          .should('have.attr','id')
          .should('include', '1995')
          cy.get('li')
          .first()
          .should('have.attr','class')
          .should('not.include', 'selected')
          cy.get('li')
          .first()
          .contains('1995')
          cy.get('li')
          .last()
          .should('have.attr','id')
          .should('include', '1999')
          cy.get('li')
          .last()
          .should('have.attr','class')
          .should('not.include', 'selected')
          cy.get('li')
          .last()
          .contains('1999')
          cy.get('li')
          .last()
          .click()    
          .should('have.attr','class')
          .should('include', 'selected')
        })
      })
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