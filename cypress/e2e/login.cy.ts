/// <reference types="cypress" />

describe('Login Admin Test', () => {
  const email = 'paulwilkerlf@gmail.com';
  const password = '123456';
  const url = 'http://localhost:5173/login';

  it('Should log in successfully', () => {
    cy.visit(url);

    // Insert data
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.contains('Login').click();

    // Verifity successful login
    cy.get('Login').should('not.exist');
  });
});
