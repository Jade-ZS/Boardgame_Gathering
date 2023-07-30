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
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
}

describe('Invalid url paths should return a helpful message to user.', () => {
  it('Invalid path prompt has proper elements and message.', () => {
    unreg()

    cy.visit('http://localhost:3000/mi')
    cy.wait(['@games','@new','@party','@kids'])
    .url()
    .should('include', 'mi')
    cy.get('.error-container')
    .within(()=>{
      cy.get('.home-button')
      .within(()=>{
        cy.get('a')
        .should('have.attr', 'href')
        .should('include', '/')
        cy.get('a')
        .within(()=>{
          cy.get('p')
          .contains('⌂')
        })
      })
      cy.get('img')
      .should('have.attr', 'src')
      .should('include', 'https://em-content.zobj.net/source/skype/289/loudly-crying-face_1f62d.png')
      cy.get('img')
      .should('have.attr', 'alt')
      .should('include', 'crying face')
      cy.get('h1')
      .contains('Oopsy!')
      cy.get('p')
      .contains('Page not found! Please check your url...')
    })
    cleanUp()
  })

  it('Invalid path prompt allows you to return back to homepage.', () => {
    unreg()

    cy.visit('http://localhost:3000/')
    cy.wait(['@games','@new','@party','@kids'])
    cy.visit('http://localhost:3000/aa')
    .url()
    .should('include', 'aa')
    cy.get('.error-container')
    cy.get('.home-button')
    .click()
    .url()
    .should('include', 'http://localhost:3000/')

    cleanUp()
  })
})