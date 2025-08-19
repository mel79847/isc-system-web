/// <reference types="cypress" />
//login asHeadOfDepartment
Cypress.Commands.add("loginAsHeadOfDepartment", () => {
  const email = Cypress.env("HEAD_OF_DEPARTMENT_EMAIL");
  const password = Cypress.env("HEAD_OF_DEPARTMENT_PASSWORD");

  cy.visit("/login");
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.contains("button", "Login").click();
  cy.url().should("not.include", "/login");
});

// createTeacher
Cypress.Commands.add("createTeacher", (teacher) => {
  cy.get('[data-testid="SupervisorAccountIcon"]').should('be.visible').click();

  cy.contains('Agregar docente').should('be.visible').click();

  cy.get('input[name="name"]').type(teacher.name);
  cy.get('input[name="lastname"]').type(teacher.lastname);
  cy.get('input[name="mothername"]').type(teacher.mothername);
  cy.get('input[name="code"]').type(teacher.code);
  cy.get('#degree').click();
  cy.get('ul[role="listbox"]').contains(`${teacher.degree}`).click();
  cy.get('input[name="email"]').type(teacher.email);
  cy.get('input[name="phone"]').type(teacher.phone);

  cy.contains("button", "GUARDAR").click();
});

// searchTeacher
Cypress.Commands.add("searchTeacher", (code: string) => {
  const searchPage = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy
      .get('[role="rowgroup"] [role="row"]')
      .then($rows => {
        const found = Cypress._.find($rows.toArray(), row =>
          row.innerText.includes(code)
        );
        if (found) {
          return cy.wrap(found);
        }
        return cy
          .get('button[aria-label="Go to next page"]')
          .then($btn => {
            if (!$btn.prop("disabled")) {
              cy.wrap($btn).click();
              cy.wait(300);
              return searchPage();
            }
            throw new Error(`Fila con código ${code} no encontrada.`);
          });
      });
  };

  return searchPage();
});

// editTeacher
Cypress.Commands.add("searchAndEditTeacher", (originalCode, teacher) => {
  cy.get('[data-testid="SupervisorAccountIcon"]').click();

  cy.searchTeacher(originalCode).within(() => {
    cy.get('[data-testid="EditIcon"]').click({ force: true });
  });

  cy.get('form').should('be.visible');
  cy.get('input[name="name"]').clear().type(teacher.name);
  cy.get('input[name="lastname"]').clear().type(teacher.lastname);
  cy.get('input[name="mothername"]').clear().type(teacher.mothername);
  cy.get('#degree').click();
  cy.get("ul[role='listbox']").contains(teacher.degree).click();
  cy.get('input[name="email"]').clear().type(teacher.email);
  cy.get('input[name="phone"]').clear().type(teacher.phone);

  cy.contains("button", "GUARDAR").click();
});