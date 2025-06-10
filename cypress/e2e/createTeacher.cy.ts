describe("Módulo Docentes", () => {
  beforeEach(() => {
    cy.loginAsHeadOfDepartment();
  });

  it("Se debe crear un docente correctamente", () => {
    cy.fixture("teachers").then(({ validTeacher }) => {
      cy.createTeacher(validTeacher);

      cy.contains('Docente Creado!').should('be.visible');
      cy.contains('El docente ha sido creado con éxito.').should('be.visible');
    });
  });
});
