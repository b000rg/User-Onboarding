describe('Form', () => {
    beforeEach(() => {
        cy.visit('index.html')
    })

    const form =          () => cy.get('[data-cy=form]');
    const submitButton =  () => cy.get('[data-cy=submit');
    const nameInput =     () => cy.get('[data-cy=name]');
    const emailInput =    () => cy.get('[data-cy=email]');
    const passwordInput = () => cy.get('[data-cy=password]');
    const tosCheckbox =   () => cy.get('[data-cy=tos]');
    
    it('Renders form', () => {
        form()
            .should('exist')

        submitButton()
            .should('be.disabled')

        nameInput()
            .should('have.value', '')

        emailInput()
            .should('have.value', '')

        passwordInput()
            .should('have.value', '')

        tosCheckbox()
            .should('not.be.checked')
    })

    it('Form works', () => {
        nameInput()
            .type('Tiber Septim')
            
        emailInput()
            .type('talos9@tamrielonline.com')

        passwordInput()
            .type('nordsruleelvesdrool')

        tosCheckbox()
            .check()

        submitButton()
            .should('be.enabled')

        form()
            .submit()
        
        cy.get('pre.user')
            .should('exist')
    })
})