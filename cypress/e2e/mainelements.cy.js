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

describe('Main page should display all elements', () => {
  it('Proper headers should exist and contain proper text.', () => {

    cy.visit('http://localhost:3000/')

    cy.get('.banner')
    .within(()=> {
    cy.get('h1')
    .contains('h1','Boardgame')
    })

    cy.get('.heading-container')
    .eq(0)
    .within(() => {
    cy.get('h1')  
    .contains('h1','New Release')
    })

    cy.get('.heading-container')
    .eq(1)
    .within(() => {
    cy.get('h1')
    .contains('h1','Party Games')
    })

    cy.get('.heading-container')
    .eq(2)
    .within(() => {
    cy.get('h1')
    .contains('h1','Kid Friendly')
    })

  })
  it('Carousels should display proper elements.', () => {

    cy.visit('http://localhost:3000/')
    
    cy.get('.game-row')
    .eq(0)
    .within(() => {
      cy.get('h1')
      .contains('h1','New Release')   
      cy.get('p')
      .first()
      .contains('show all')
      cy.get('a')
      .first()
      .should('have.attr', 'href')
      .should('include', '/J1vBFiqdHG')
      cy.get('a')
      .first()
      .within(() => {
        cy.get('img')
        .first()
        
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1629324599426.jpg')
        cy.get('p')
        .first()
        .contains('Atlantis Rising')
      })
    })

    cy.get('.game-row')
    .eq(0)
    .within(() => {
      cy.get('a')
      .last()
      .should('have.attr', 'href')
      .should('include', '/OO9EJFWOcI')
      cy.get('a')
      .last()
      .within(() => {
        cy.get('img')
        .last()
        
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1633738017899')
        cy.get('p')
        .last()
        .contains('First Rat')
      })
    })

    cy.get('.game-row')
    .eq(1)
    .within(() => {
      cy.get('h1')
      .contains('h1','Party Games')
      cy.get('p')
      .first()
      .contains('show all')
      cy.get('a')
      .first()
      .should('have.attr', 'href')
      .should('include', '/OTIkviy9XZ')
      cy.get('a')
      .first()
      .within(() => {
        cy.get('img')
        .first()
        
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1634312724849')
        cy.get('p')
        .first()
        .contains('Mafia: Vendetta')
      })
    })

    cy.get('.game-row')
    .eq(1)
    .within(() => {
      cy.get('a')
      .last()
      .should('have.attr', 'href')
      .should('include', '/ODojES1ouJ')
      cy.get('a')
      .last()
      .within(() => {
        cy.get('img')
        .last()
        
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1671926936810')
        cy.get('p')
        .last()
        .contains('Complete Murder Mystery Night')
      })
    })

    cy.get('.game-row')
    .eq(2)
    .within(() => {
      cy.get('h1')
      .contains('h1','Kid Friendly')
      cy.get('p')
      .first()
      .contains('show all')
      cy.get('a')
      .first()
      .should('have.attr', 'href')
      .should('include', '/3hnL2wtWnM')
      cy.get('a')
      .first()
      .within(() => {
        cy.get('img')
        .first()
        
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1594689503033')
        cy.get('p')
        .first()
        .contains('Chess')
      })
    })

    cy.get('.game-row')
    .eq(2)
    .within(() => {
      cy.get('a')
      .last()
      .should('have.attr', 'href')
      .should('include', '/c7ncqL5AX6')
      cy.get('a')
      .last()
      .within(() => {
        cy.get('img')
        .last()
        
        .should('have.attr', 'src')
        .should('include', 'https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559257497048-519-B02BO03L.jpg')
        cy.get('p')
        .last()
        .contains('PitchCar')
      })
    })

  })

  it('Other interactable elements should be present in banner and menu bar.', () => {

    cy.visit('http://localhost:3000/')
    cy.get('.banner')
    .within(()=> {
      cy.get('.filter')
      .within(()=>{
        cy.get('h2')
        .contains('Filter')
      }
      )
    }
    )

    cy.get('.menu-bar')
    .within(()=>{
      cy.get('.to-my-favorites-button')
      .within(()=>{
        cy.get('p')
        .contains('My Favorites')
      }

      )

      cy.get('.discover-button')
      .within(()=>{
        cy.get('p')
        .contains('Discover')
      }
      )

      cy.get('.search-bar')
      .within(()=>{
        cy.get('a')
        .should('have.attr', 'href')
        .should('include', '/')
        cy.get('a')
        .within(()=>{
          cy.get('button')
          .contains('Clear')
          .should('have.attr', 'class')
          .should('include', 'clear-button')
        })
        cy.get('input')
        .should('have.attr', 'type')
        .should('include', 'text')
        cy.get('input')
        .should('have.attr', 'placeholder')
        .should('include', 'game name')

      })
    })

  
  })
  
})

