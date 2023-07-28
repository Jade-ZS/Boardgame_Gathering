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

function cleanUp() {
  cy.clearCookies()
}

describe('Testing for user viewing game info.', () => {
  it('Home button should be present, and have correct contents.', () => {

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
    .within(()=>{
      cy.get('p')
      .within(()=>{
      cy.get('span')
      .contains('⌂')
      })
    })
    cleanUp()
  })
  
  it('Game details should be present, have correct contents, and correct elements.', () => {

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
    
    cy.get('.game-details')
    .within(()=>{
      cy.get('.thumbnail')
      .within(()=>{
        cy.get('img')
        .should('have.attr', 'src')
        .should('include', 'https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1634312724849') 
        cy.get('img')
        .should('have.attr', 'alt')
        .should('include', 'mafia-vendetta thumbnail') 
        
      })
    cy.get('.details')
    .each(()=>{
      cy.get('h4')
      .eq(0)
      .contains('12.95')
      .should('have.attr', 'style')
      .should('include', 'lightgreen')
      cy.get('h4')
      .eq(1)
      .contains('7-17 Players')
      .should('have.attr', 'style')
      .should('include', 'lightblue')
      cy.get('h4')
      .eq(2)
      .contains('Ages 14+')
      .should('have.attr', 'style')
      .should('include', 'red')
      cy.get('h4')
      .eq(3)
      .contains('3.00 ⭐️')
      .should('have.attr', 'style')
      .should('include', 'yellow')
      })
    })
    cleanUp()
  })

  it('Game info nav and info should be present, have correct contents, and correct elements.', () => {
    
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
      
    cy.get('.links')
    .within(()=>{
      cy.get('.game-nav')
      .each(()=>{
        cy.get('a')
        .eq(0)
        .should('have.attr', 'href' )
        .should('include', '/OTIkviy9XZ')
        cy.get('a')
        .eq(1)
        .should('have.attr', 'href')
        .should('include', '/OTIkviy9XZ/locations')
        cy.get('a')
        .eq(2)
        .should('have.attr', 'href')
        .should('include', '/OTIkviy9XZ/artists')
      })
    })

    cy.get('.links')
    .within(()=>{
      cy.get('.game-nav')
      .each(()=>{
        cy.get('a')
        .eq(0)
        .click()
      })
    })
    cy.get('.about-container')
    .within(()=>{
      cy.get('.about')
      .within(()=>{
        cy.get('p')
        .contains('No matter what your role, play it convincingly')
      })
    })

    cy.get('.links')
    .within(()=>{
      cy.get('.game-nav')
      .each(()=>{
        cy.get('a')
        .eq(1)
        .click()
      })
    })
    cy.get('.location-container')
    .each(()=>{
      cy.get('.retail-location')
      .first()
      .within(()=>{
        cy.get('p')
        .contains('BoardGameBliss Inc')
      })
      cy.get('.retail-location')
      .last()
      .within(()=>{
        cy.get('p')
        .contains('Noble Knight Games')
      })
    })

    cy.get('.links')
    .within(()=>{
      cy.get('.game-nav')
      .each(()=>{
        cy.get('a')
        .eq(2)
        .click()
      })
    })
    cy.get('.artist-container')
    .within(()=>{
      cy.get('.artist')
      .within(()=>{
        cy.get('p')
        .contains('Ilya Komarov')
      })
    })
  })
})
