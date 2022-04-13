describe('The overview page', () => {
  it('should go to the bus page', () => {
    cy.visit('/overview');
    cy.get('.bus-link')
      .should('have.length.greaterThan', 2)
      .should('have.attr', 'href')
      .and('include', '/bus/');
  });

  it('should be sorted in chronological order', () => {
    cy.visit('/overview');
    cy.get('.bus-link > p').each(($el, index, $list) => {
      expect($list.length).to.be.greaterThan(2);
      if (index > 0) {
        const previous = $list[index - 1];
        const current = $el[0];
        const previousTime = Number(previous.innerText.replace(/[^0-9]/g, ''));
        const currentTime = Number(current.innerText.replace(/[^0-9]/g, ''));
        expect(currentTime).to.be.at.least(previousTime);
      }
    });
  });
});
