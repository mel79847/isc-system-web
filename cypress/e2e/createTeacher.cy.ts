describe("Módulo Docentes", () => {
  beforeEach(() => {
    cy.loginAsHeadOfDepartment();
  });

  it("Se debe crear un docente correctamente", () => {
    cy.fixture("teachers").then(({ validTeacher }) => {
      cy.createTeacher(validTeacher);
      
      cy.contains('Docente Creado!', { timeout: 15000 }).should('be.visible');
      
      // cerrar mensaje de exito y formulario
      cy.get('body').type('{esc}');
      cy.get('body').type('{esc}');
      cy.get('body').type('{esc}');

      cy.wait(3000); //esperar para actualizacion de tabla

      cy.searchTeacher(validTeacher.code);
    });
  });
});
