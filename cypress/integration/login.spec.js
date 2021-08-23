/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  const { email, password, handle } = authUser;
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.visit("/");
  });

  it("logs User in successfully", () => {
    cy.get(".FilterComponent")
      .find("[data-cy=open-signnote]")
      .click({ force: true });
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=login-email]")
      .click()
      .type(email)
    cy.get("[data-cy=login-password]")
      .click()
      .type(password)
    cy.get("[data-cy=login-user]").click();
    cy.get(".FilterComponent")
      .find("[data-cy=profile-button]")
      .click({ force: true });
    cy.get("[data-cy=hey-user]")
      .should('contain.text', 'Hey ' + handle)
  });
});
