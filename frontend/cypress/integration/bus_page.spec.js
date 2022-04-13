describe('The bus page', () => {
  it('should be valid link from overview page', () => {
    cy.visit('/overview');
    cy.get('.bus-link').first().click();

    cy.url().should('include', '/bus');
    cy.contains('Bus not found').should('not.exist');
  });

  it('should go back to overview after clicking back button', () => {
    cy.visit('/overview');
    cy.get('.bus-link').first().click();
    cy.get('a').contains('Back').click();
    cy.url().should('include', '/overview');
  });
});
