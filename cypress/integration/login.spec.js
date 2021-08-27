/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  const { email, password, handle } = authUser;
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.visit("/");
  });

  // data-cy tags were added to the html as necessary
  it("logs User in successfully", () => {
    cy.get(".FilterComponent")
      .find("[data-cy=open-signnote]")
      .click({ force: true });
    // click on login / anmelden
    cy.get("[data-cy=login]").click();
    // fill email and password
    cy.get("[data-cy=login-email]")
      .click()
      .type(email)
    cy.get("[data-cy=login-password]")
      .click()
      .type(password)
    // submit button
    cy.get("[data-cy=login-user]").click();
    // click the Profile button in Sidebar
    cy.get(".FilterComponent")
      .find("[data-cy=profile-button]")
      .click({ force: true });
    cy.get("[data-cy=hey-user]")
      .should('contain.text', 'Hey ' + handle)
  });
});
