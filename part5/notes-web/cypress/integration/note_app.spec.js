// https://mochajs.org/#arrow-functions

const user = { name: "test", username: "test", password: "test" };

describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2021"
    );
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get('input[name="username"]').type("test");
    cy.get('input[name="password"]').type("test");
    cy.get('button[type="submit"]').click();
    cy.contains("Logged in as test");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input[data-testid='noteInput']").type(
        "a note created by cypress"
      );
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    it("a note can be made important", function () {
      cy.createNote({
        content: "another note created by cypress",
        important: false,
      });
      cy.contains("another note created by cypress")
        .parent()
        .find("button")
        .as("importanceButton");
      cy.get("@importanceButton").click();
      cy.get("@importanceButton").should("contain", "make not important");
    });

    it("one out of several notes can be made important", function () {
      cy.createNote({ content: "first note", important: false });
      cy.createNote({ content: "second note", important: false });
      cy.createNote({ content: "third note", important: false });
      cy.contains("second note").parent().find("button").as("importanceButton");
      cy.get("@importanceButton").click();
      cy.get("@importanceButton").should("contain", "make not important");
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get('input[name="username"]').type("test");
    cy.get('input[name="password"]').type("wrong");
    cy.get('button[type="submit"]').click();
    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Logged in as test");
  });
});
