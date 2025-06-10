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
