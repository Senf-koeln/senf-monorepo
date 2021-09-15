/** @format */

import { MenuItem } from "../../../src/components/layout/MenuItem";

describe("Testing the insights page", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    cy.visit("/");
  });

  it("inspecting if the insights page is working fine", () => {
    //Click in sidebar on the Insights tab
    cy.get(".sideBar").within(() => {
      cy.get("[data-cy=insights]").click();
    });
    //Check if the data is loading correctly (Ideas, Votes, Comments)
    // cy.

    //Check if you can click on the first card
    //cy.
    //Check if the card displays a graph
    //cy.
    //Check if you can click on the second card
    //cy.
    //Check if the card displays a graph
    //cy.
    //Check if the topic-filter is working
    //cy.
    //Check if you can click on the third card
    //cy.
    //Check if the card displays a graph
    //cy.
    //Check if the topic-filter is working
    //cy.
  });
});
