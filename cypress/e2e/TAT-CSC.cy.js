beforeEach(() => {
  cy.visit('./src/index.html')
  cy.title().should('eq', 'TAT Customer Service Center')
})

describe('template spec', () => {
it('passes', () => {
  cy.visit('https://example.cypress.io')
})

//Cypress._.times(5, () => {
it('fills in the required fields and submits the form', () => {
cy.clock()
  cy.get('#firstName').type('Bill')
  cy.get('#lastName').type('Pokes')
  cy.get('#email').type('billpokes@gravityhurts.com')
  cy.contains('Praise').click()
  cy.get('#open-text-area').type('Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!Good job everyone, keep it up!!', {delay:0})
  cy.contains('Send').click()
  
cy.get('[class*="success"]').should('be.visible')
cy.tick(3000)
cy.get('[class*="success"]').should('not.be.visible')
})
//})
it('displays an error message when submitting the form with an email with invalid formatting', () => {
cy.clock()
cy.get('#firstName').type('Bill')
cy.get('#lastName').type('Pokes')
cy.get('#email').type('billpokesgravityhurts.com')
cy.contains('Praise').click()
cy.get('#open-text-area').type('Good job everyone')
cy.contains('Send').click()
  
cy.get('[class*="error"]').should('be.visible')
cy.tick(3000)
cy.get('[class*="success"]').should('not.be.visible')
})

it('checks telephone number field is blank when other than a number', () => {

cy.get('#phone').type('abcdefg').should('not.have.text')
cy.get('#phone').type('01111111111')
cy.get('#phone').should('have.length', 1)
})

it('displays an error message when the phone becomes required but is not filled in before the form submission', () => {
cy.clock() 
cy.get('#firstName').type('Bill')
cy.get('#lastName').type('Pokes')
cy.get('#email').type('billpokes@gravityhurts.com')
cy.get('input[type="radio"]').check('praise').should('be.checked')
cy.get('#check input[type="checkbox"]').last().check()
cy.contains('Send').click()
  
cy.get('[class*="error"]').should('be.visible')
cy.tick(3000)
cy.get('[class*="success"]').should('not.be.visible')
})

it('//fills and clears the first name, last name, email, and phone fields', () => {
cy.get('#firstName').type('Bill').should('have.value', 'Bill')
cy.get('#lastName').type('Pokes').should('have.value', 'Pokes')
cy.get('#email').type('billpokes@gravityhurts.com').should('have.value', 'billpokes@gravityhurts.com')
cy.get('#phone').type('01111111111').should('have.value', '01111111111')
cy.get('#firstName').clear().should('have.value', '')
cy.get('#lastName').clear().should('have.value', '')
cy.get('#email').clear().should('have.value', '')
cy.get('#phone').clear().should('have.value', '')
})

it('displays an error message when submitting the form without filling the required fields' , () => {
cy.clock() 
cy.contains('Send').click()
cy.get('[class*="error"]').should('be.visible')
cy.tick(3000)
cy.get('[class*="success"]').should('not.be.visible')
})

it(`successfully submits the form using a custom command.`, () => {
cy.clock()
cy.fillMandatoryFieldsAndSubmit()

cy.get('.success').should('be.visible')
cy.tick(3000)
cy.get('[class*="success"]').should('not.be.visible')
})

it('selects a product (YouTube) by its content', () => {
cy.get('select').select('YouTube').should('have.value', 'youtube')
})

it('selects a product (Mentorship) by its value)', () => {
cy.get('select').select('mentorship').should('have.value', 'mentorship')
})

it('selects a product (Blog) by its index)', () => {
cy.get('select').select(1).should('have.value', 'blog')
})

it(`checks the type of service "Feedback"`, () => {
cy.get('input[type="radio"]').check('feedback').should('be.checked')
})

it(`checks each type of service`, () => {
cy.get('#support-type')
  .find('input[type="radio"]')
  .each(typeOfService => {
  cy.wrap(typeOfService)
    .check()
    .should('be.checked')
  })
})

it(`checks both checkboxes, then unchecks the last one`, () => {
  cy.get('#check input[type="checkbox"]')
  .as('checkboxes')
  .check()

  cy.get('@checkboxes')
  .each(checkbox => {
    expect(checkbox[0].checked).to.equal(true)
  })

  cy.get('@checkboxes').last().uncheck().should('not.be.checked')
  cy.get('@checkboxes').first()
    .should('be.checked')
})

it(`selects a file from the fixtures folder`, () => {
  cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
  .should(input => {
   expect(input[0].files[0].name).to.equal('example.json')
  })  
})

it(`selects a file simulating a drag-and-drop`, () => {
  cy.get('input[type="file"]').selectFile('cypress/fixtures/example2.json', { action: 'drag-drop' })
  .should(input => {
   expect(input[0].files[0].name).to.equal('example2.json')
  })  
})


it(`selects a file using a fixture to which an alias was given`, () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
  .selectFile('@sampleFile')
  .should(input => {
   expect(input[0].files[0].name).to.equal('example.json')
  })  
})


it('verifies that the privacy policy page opens in another tab without the need for a click', () => {
cy.contains('a', 'Privacy Policy')
.should('have.attr', 'target', '_blank')
})

it('access the privacy policy page by removing the target, then clicking on the link', () => {
  cy.contains('a', 'Privacy Policy')
    .invoke('removeAttr', 'target')
    .click()
})

it('independently test the privacy policy page', () => {
  cy.contains('a', 'Privacy Policy')
    .invoke('removeAttr', 'target')
    .click()

 cy.contains('h1', 'TAT CSC - Privacy Policy').should('be.visible')
 cy.contains('p'[0], 'We do not save data submitted in the TAT CSC application form.').should('be.visible')
 cy.contains('p' [1], 'We use HTML, CSS and JavaScript technologies to simulate a real application.').should('be.visible')
 cy.contains('p' [2], 'However, the application is an example, without any data persistence, and used for teaching purposes.').should('be.visible')
 cy.contains('p' [3], 'Talking About Testing').should('be.visible')

})

it('displays and hides the success and error messages using .invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Message successfully sent.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Validate the required fields!')
    .invoke('hide')
    .should('not.be.visible')
})

it('fills in the text area field using the invoke command', () => {
  cy.get('#open-text-area').invoke('val', 'some text').should('have.value', 'some text')
})

it.only('makes an HTTP request', () => {
  cy.request('https://tat-csc.s3.sa-east-1.amazonaws.com/index.html').then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK')
      expect(response.body).contains('TAT CSC')
  })
})

it.only('find the cat', () => {
  cy.get('#cat')
  .should('not.be.visible')
  .invoke('show')
  .should('be.visible')
})
})

