/// <reference types="cypress" />

const email = 'paulwilkerlf@gmail.com';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings');
  }

  cy.visit('http://localhost:5173/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.contains('Login').click();
});

describe('Create new graduation process', () => {
  const code = Math.floor(Math.random() * 100000);
  const name = `Teacher${code}`;
  const lastname = `Teacher${code}`;
  const testEmail = `testEmail${code}@gmail.com`;

  beforeEach(() => {
    cy.login(email, password);
  });

  it('Should create a new teacher with the position of a licensed successfully', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
    cy.get('[data-testid="SupervisorAccountIcon"]').should('be.visible').click();
    cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root')
      .should('be.visible')
      .click();
    // insert data
    cy.get('#name')
      .should('be.visible')
      .type(name + 'licensed');
    cy.get('#lastname')
      .should('be.visible')
      .type(lastname + 'licensed');
    cy.get('#code')
      .should('be.visible')
      .type(code + '1');
    cy.get('#degree').should('be.visible').click();
    cy.get('[data-value="licenciado"]').should('be.visible').click();
    cy.get('#email')
      .should('be.visible')
      .type('licensed' + testEmail);
    cy.get('#phone')
      .should('be.visible')
      .type(code + '1');
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary')
      .should('be.visible')
      .click();
    cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Profesor creado con éxito');
  });

  it('Should create a new teacher with the position of a maestrer successfully', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
    cy.get('[data-testid="SupervisorAccountIcon"]').should('be.visible').click();
    cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root')
      .should('be.visible')
      .click();
    // insert data
    cy.get('#name')
      .should('be.visible')
      .type(name + 'master');
    cy.get('#lastname')
      .should('be.visible')
      .type(lastname + 'master');
    cy.get('#code')
      .should('be.visible')
      .type(code + '2');
    cy.get('#degree').should('be.visible').click();
    cy.get('[data-value="maestro"]').should('be.visible').click();
    cy.get('#email')
      .should('be.visible')
      .type('master' + testEmail);
    cy.get('#phone')
      .should('be.visible')
      .type(code + '2');
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary')
      .should('be.visible')
      .click();
    cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Profesor creado con éxito');
  });

  it('Should create a new teacher with the position of a PhD successfully', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
    cy.get('[data-testid="SupervisorAccountIcon"]').should('be.visible').click();
    cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root')
      .should('be.visible')
      .click();
    // insert data
    cy.get('#name')
      .should('be.visible')
      .type(name + 'PhD');
    cy.get('#lastname')
      .should('be.visible')
      .type(lastname + 'PhD');
    cy.get('#code')
      .should('be.visible')
      .type(code + '3');
    cy.get('#degree').should('be.visible').click();
    cy.get('[data-value="maestro"]').should('be.visible').click();
    cy.get('#email')
      .should('be.visible')
      .type('PhD' + testEmail);
    cy.get('#phone')
      .should('be.visible')
      .type(code + '3');
    cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary')
      .should('be.visible')
      .click();
    cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message')
      .should('be.visible')
      .and('contain', 'Profesor creado con éxito');
  });
});
