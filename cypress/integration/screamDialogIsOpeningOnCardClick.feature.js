/* eslint-disable no-undef */
describe("user can click on the scream card", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.intercept("**/api/projects", { fixture: "projects.json" });
    cy.intercept("**/api/screamsFrontend", { fixture: "screams.json" });
    cy.visit("/");
  });

  it("is expected to show scream title", () => {
    cy.get("body").should("contain.text", "This IS the fixture");
  });
});
