/* eslint-disable no-undef */
describe('user can click on the scream card', () => {

  before(() => {
    cy.visit('/', {
      onBeforeLoad() {
        cy.setCookie("Cookie_settings", "all");
      }
    })
  });
  
});