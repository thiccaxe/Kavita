/// <reference types="Cypress" />

describe('First time server regestration', () => {

  it('access the server', () => {
    cy.visit('/')
    cy.contains('Kavita')
  })

  it('register', () => {
    cy.visit('/registration/register')

    cy.get('#username').type(Cypress.env('username'))
    cy.get('#email').type(Cypress.env('email'))
    cy.get('#password').type(Cypress.env('password'))
    cy.get('.btn').click()
  })

  it('log in', () => {
    cy.login()
  })
})
