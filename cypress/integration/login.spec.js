/** @format */

const authUser = require("../fixtures/auth-user.json");

describe("The Login Page", () => {
  const { email, password } = authUser;
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    // cy.intercept("**/api/projects", { fixture: "projects.json" });
    // cy.intercept("**/api/screamsFrontend", { fixture: "screams.json" });
    cy.visit("/");
  });

  it("replace with real test", () => {
    cy.get("body");
    cy.get("[data-cy=open-signnote]").click();
    // click on login / anmelden
    // add data-cy to the html
    cy.get("[data-cy=login]").click();
    // fill email and password
    cy.get("[data-cy=login-email]").fill(authUser.email);
    cy.get("[data-cy=login-password]").fill(authUser.password);
    // submit button
    cy.get("[data-cy=login-user]").click();
  });
});
