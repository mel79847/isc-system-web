/// <reference types="cypress" />

const email = 'paulwilkerlf@gmail.com'
const password = '123456'

Cypress.Commands.add('login', (email, password) => {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings')
  }

  cy.visit('http://localhost:5173/login')
  cy.get('input[name=email]').type(email)
  cy.get('input[name=password]').type(password)
  cy.contains('Login').click()
})

describe('Create new graduation process', () => {
  const code = Math.floor(Math.random() * 100000)
  const name = `${code}`
  const lastname = `Teacher${code}`
  const testEmail = `testEmail${code}@gmail.com`
  const title = `Title${code}`
  const time = 500

  beforeEach(() => {
    cy.login(email, password)
  })

  it('Create new graduation process with the thesis project modality."', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click()
    cy.get('[data-testid="ChecklistOutlinedIcon"]').should('be.visible').click()
    cy.get('.btn').contains('Crear Proceso de Graduación').click()
    // insert data
    cy.get('.MuiAutocomplete-endAdornment button').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('div#\\:r9\\:').click()
    // Select "Proyecto de Grado"
    cy.contains('li.MuiMenuItem-root', 'Proyecto de Grado').should('be.visible').click()
    cy.get('input#\\:rd\\:')
      .clear()
      .type('PG' + title)
    cy.get('div#\\:rf\\:').should('be.visible').click()
    cy.get('li.MuiMenuItem-root[data-value="Segundo2024"]').click()
    // Save
    cy.get('button.MuiButton-containedPrimary').contains('GUARDAR').click()

    cy.wait(time)

    // insert date and tutor
    cy.get('[data-testid="ModeEditIcon"]').click()
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('[type="checkbox"]').check()
    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    cy.wait(time)

    // inser reviewer
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('[type="checkbox"]').check()
    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    //internal defense
    cy.get('#president').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#firstJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#secondJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()

    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    cy.wait(time)

    //external defense
    cy.get('#president').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#firstJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#secondJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()

    // accept
    cy.get('button.MuiButton-containedPrimary').contains('Finalizar').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()
  })

  it('Create new graduation process with the directed work modality."', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click()
    cy.get('[data-testid="ChecklistOutlinedIcon"]').should('be.visible').click()
    cy.get('.btn').contains('Crear Proceso de Graduación').click()
    // insert data
    cy.get('.MuiAutocomplete-endAdornment button').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('div#\\:r9\\:').click()
    // Select "Trabajo Dirigido"
    cy.get('li.MuiMenuItem-root[data-value="2"]').click()
    cy.get('input#\\:rd\\:')
      .clear()
      .type('TD' + title)
    cy.get('div#\\:rf\\:').should('be.visible').click()
    cy.get('li.MuiMenuItem-root[data-value="Segundo2024"]').click()
    // Save
    cy.get('button.MuiButton-containedPrimary').contains('GUARDAR').click()

    cy.wait(time)

    // insert date and tutor
    cy.get('[data-testid="ModeEditIcon"]').click()
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('[type="checkbox"]').check()
    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    cy.wait(time)

    // inser reviewer
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('[type="checkbox"]').check()
    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    //internal defense
    cy.get('#president').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#firstJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#secondJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()

    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    cy.wait(time)

    //external defense
    cy.get('#president').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#firstJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#secondJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()

    // accept
    cy.get('button.MuiButton-containedPrimary').contains('Finalizar').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()
  })

  it('Create new graduation process with the directed work modality."', () => {
    cy.get('[data-testid="MenuIcon"]').should('be.visible').click()
    cy.get('[data-testid="ChecklistOutlinedIcon"]').should('be.visible').click()
    cy.get('.btn').contains('Crear Proceso de Graduación').click()
    // insert data
    cy.get('.MuiAutocomplete-endAdornment button').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('div#\\:r9\\:').click()
    // Select "Tesis"
    cy.get('li.MuiMenuItem-root[data-value="3"]').click()
    cy.get('input#\\:rd\\:')
      .clear()
      .type('T' + title)
    cy.get('div#\\:rf\\:').should('be.visible').click()
    cy.get('li.MuiMenuItem-root[data-value="Segundo2024"]').click()
    // Save
    cy.get('button.MuiButton-containedPrimary').contains('GUARDAR').click()

    cy.wait(time)

    // insert date and tutor
    cy.get('[data-testid="ModeEditIcon"]').click()
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('[type="checkbox"]').check()
    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    cy.wait(time)

    // inser reviewer
    cy.get('[data-testid="ArrowDropDownIcon"]').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('[type="checkbox"]').check()
    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    //internal defense
    cy.get('#president').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#firstJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#secondJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()

    // accept
    cy.get('.MuiButton-containedPrimary').contains('Aprobar Etapa').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()

    cy.wait(time)

    //external defense
    cy.get('#president').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#firstJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()
    cy.get('#secondJuror').click()
    cy.get('li.MuiAutocomplete-option').first().click()

    // accept
    cy.get('button.MuiButton-containedPrimary').contains('Finalizar').click()
    cy.contains('button.btn', 'Continuar').should('be.visible').click()
  })
})
