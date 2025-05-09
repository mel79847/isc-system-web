/// <reference types="cypress" />
const Button = {
  click: (text: string) => {
    cy.contains('button', text).click();
  }
};

export default Button;