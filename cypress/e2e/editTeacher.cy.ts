describe("Módulo Docentes - Edición", () => {
  beforeEach(() => {
    cy.loginAsHeadOfDepartment();
  });

  it("Debe editar un docente existente correctamente", () => {
    cy.fixture("teachers").then(({ updatedTeacher }) => {
      cy.searchAndEditTeacher(updatedTeacher.code, updatedTeacher);

      cy.contains("Docente actualizado con éxito", { timeout: 10000 })
        .should("be.visible");
      
      cy.get('body').type('{esc}');
      cy.searchTeacher(updatedTeacher.code).then(($row) => {
        // verificar datos
        cy.wrap($row).should('contain', updatedTeacher.code);
        cy.wrap($row).should('contain', updatedTeacher.degree);
        cy.wrap($row).should('contain', updatedTeacher.name);
        cy.wrap($row).should('contain', updatedTeacher.lastname);
        cy.wrap($row).should('contain', updatedTeacher.phone);
      });
    });
  });
});