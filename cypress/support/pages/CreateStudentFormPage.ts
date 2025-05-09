/// <reference types="cypress" />
import InputField from '../components/InputField'
import SelectDropdown from '../components/SelectDropdown'
import Button from '../components/Button'

export default class CreateStudentFormPage {
  abrirFormulario() {
    cy.contains('Crear Becario').click()
  }

  llenarFormularioDeGraduacion(data: any): void {
    // Campos obligatorios del estudiante
    InputField.fill('input[name="name"]', data.nombres)
    InputField.fill('input[name="lastname"]', data.apellidoPaterno)
    InputField.fill('input[name="mothername"]', data.apellidoMaterno)
    InputField.fill('input[name="code"]', data.codigoEstudiante)
    InputField.fill('input[name="email"]', data.correo)
    InputField.fill('input[name="phone"]', data.telefono)

    // Activar switch de becario + seleccionar horas
    if (data.becario === "Sí") {
  cy.contains('Becarios')
    .parent()
    .find('input[type="checkbox"]')
    .check({ force: true })

  if (data.horasBecario) {
    cy.get('#total_hours').should('be.visible')
    InputField.fill('#total_hours', data.horasBecario)
  }
}
    // Enviar formulario
    Button.click('GUARDAR')
  }

  verificarCreacionExitosa() {
    cy.contains('¡Estudiante Creado!').should('be.visible')
  }
}