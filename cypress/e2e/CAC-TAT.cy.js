describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 20);
    cy.get("#firstName").type("Paulo");
    cy.get("#lastName").type("Germano");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Paulo");
    cy.get("#lastName").type("Germano");
    cy.get("#email").type("teste@teste..com");
    cy.get("#open-text-area").type("a");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("campo de telefone aceita apenas números", () => {
    cy.get("#phone").type("qwerty").should("have.value", "");
  });

  it.only("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Paulo");
    cy.get("#lastName").type("Germano");
    cy.get("#email").type("teste@teste..com");
    cy.get("#open-text-area").type("a");
    cy.get("#phone-checkbox").click();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Paulo")
      .should("have.value", "Paulo")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Germano")
      .should("have.value", "Germano")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("123123")
      .should("have.value", "123123")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Paulos",
      lastName: "Germano",
      email: "test@test.com",
      phone: "123",
    };

    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });
});
