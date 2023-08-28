describe('log in page', () => {
  beforeEach(() => {
    cy.visit('/');
    });

  it('correct username and password', () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("not correct username", () => {
    cy.login("bropet@mail.com", "123");
    cy.contains("Неправильая почта или пароль").should("be.visible");
  });

  it("not password", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
})

describe("library open", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("add book to library", () => {
    cy.contains('Add new').click();
    cy.addBook("Здравствуй, грусть!", "Интеллектуальный бестселлер","Франcуаза Саган");
    cy.get('#fileCover').selectFile('cypress/fixtures/fs.jpg');
    cy.get('#fileBook').selectFile('cypress/fixtures/textSagan.txt');
    cy.contains("Submit").click();
    cy.get('.card-title').contains('.card-title', 'Здравствуй, грусть!');
  });

  it("Add book without tittle", () => {
    cy.contains('Add new').click();
    cy.addBook(null, "Интеллектуальный бестселлер", "Франcуаза Саган");
    cy.contains("Submit").click();
    cy.get("#title").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it.only("add book to favorites and downloand", () => {
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
    cy.get('.font-weight-bold').click();
    cy.contains('.card-title', "Здравствуй, грусть!").click();
    cy.contains("Dowload book").click();
  });

})