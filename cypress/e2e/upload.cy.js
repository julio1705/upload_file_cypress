describe("Testes de Upload de Arquivo", () => {
  const validFilePath = "cypress/fixtures/sample.txt";
  const invalidFilePath = "cypress/fixtures/invalid-file.exe";
  const nonExistentFilePath = "cypress/fixtures/non-existent.txt";

  beforeEach(() => {
    cy.visit("/upload");
  });

  it("Deve fazer o upload de um arquivo válido com sucesso", () => {
    cy.get('input[type="file"]').selectFile(validFilePath);
    cy.get("#upload-button").click();
    cy.contains("Upload realizado com sucesso").should("be.visible");
  });

  it("Deve exibir um erro para tipo de arquivo não suportado", () => {
    cy.get('input[type="file"]').selectFile(invalidFilePath);
    cy.get("#upload-button").click();
    cy.contains("Tipo de arquivo não suportado").should("be.visible");
  });

  it("Deve lidar corretamente com erro de arquivo inexistente", () => {
    cy.task("verifyFileExists", nonExistentFilePath).then((fileExists) => {
      if (!fileExists) {
        cy.contains("O arquivo não existe").should("be.visible");
      } else {
        cy.get('input[type="file"]').selectFile(nonExistentFilePath);
        cy.get("#upload-button").click();
      }
    });
  });
});