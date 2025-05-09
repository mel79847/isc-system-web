/// <reference types="cypress" />
const InputField = {
  fill: (selector: string, value: string) => {
    cy.get(selector).clear().type(value);
  }
};

export default InputField;