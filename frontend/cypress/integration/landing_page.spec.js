describe('The landing page', () => {
  it('should have a link to the overview page', () => {
    cy.visit('/');
    cy.get('a').click();
    cy.url().should('include', '/overview');
  });
});
