/* eslint-disable no-undef */
describe("user can click on the scream card", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.intercept("**/api/projects", { fixture: "projects.json" });
    cy.intercept("**/api/screamsFrontend", { fixture: "screams.json" });
    cy.visit("/");
  });

  it("replace with real test", () => {
    cy.get("body");
  });
});
