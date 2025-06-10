/// <reference types="cypress" />

describe("Módulo Docentes - Edición", () => {
  beforeEach(() => {
    // 1) Login con credenciales desde Cypress.env()
    cy.loginAsHeadOfDepartment();
  });

  it("Debe editar un docente que puede estar en cualquier página", () => {
    // 2) Cargar datos de fixtures
    cy.fixture("teachers").then(({ validTeacher, updatedTeacher }) => {

      // 4) Ejecutar el comando que busca la fila (iterando páginas) y abre el modal de edición
      cy.editTeacher(validTeacher.code, updatedTeacher);

      // 5) Verificar el mensaje de éxito
      cy.contains("Docente actualizado con éxito").should("be.visible");

      // 6) Cerrar el modal (botón de cerrar con aria-label="close")
      cy.get('button[aria-label="close"]').click();

      // 7) Volver a buscar la fila y comprobar los datos actualizados
      cy.findTeacherRow(validTeacher.code).within(() => {
        cy.contains(updatedTeacher.email).should("exist");
        cy.contains(updatedTeacher.phone).should("exist");
      });
    });
  });
});