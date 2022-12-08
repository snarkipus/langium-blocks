import { BlocksServices, createBlocksServices } from "../language-server/blocks-module";
import { DocumentState, EmptyFileSystem, IndexManager, LangiumDocument } from "langium";
import { URI } from "vscode-uri";
import { ExecuteBlock } from "../language-server/generated/ast";

describe("Blocks Playground", () => {
  let services: BlocksServices;
  let text: string;
  let document: LangiumDocument<ExecuteBlock>;
  let indexManager: IndexManager;
  let uri: URI;

  beforeAll(() => {
    text = `
    EXECUTE
      UAN-DEFINITION
        TOOLS
          hammer      
          screwdriver ref: hammer
          pliers      ref: screwdriver
        BOOKS
          book1 
          book2 ref: book1
        CARDS
          ace
          queen ref: ace
        category-ref BOOKS item-ref book1
      END UAN
      SDB
        comment text line 1
        comment text line 2
        comment text line n
        RANDOM-NUMBER-SEED: 12345
        TOOL-USAGE:
          DESC: hammer QTY 2
      END SCENARIO
    END-INSTRUCTIONS
    `.trim();

    services = createBlocksServices(EmptyFileSystem).Blocks;
    const metaData = services.LanguageMetaData;
    const randomNumber = Math.floor(Math.random() * 10000000) + 1000000;
    uri = URI.parse(`file:///${randomNumber}${metaData.fileExtensions[0]}`);
    indexManager = services.shared.workspace.IndexManager;
  });

  describe("Document State 1: Parsed", () => {
    beforeEach(() => {
      document = services.shared.workspace.LangiumDocumentFactory.fromString<ExecuteBlock>(text, uri);
    });

    it("should reach the Parsed State (1)", () => {
      expect(document.state).toBe(DocumentState.Parsed);
    });

    afterEach(() => {
      indexManager.remove([uri]);
    });
  });

  describe("Document State 2: Indexed", () => {
    beforeEach(async () => {
      document = services.shared.workspace.LangiumDocumentFactory.fromString<ExecuteBlock>(text, uri);
      await indexManager.updateContent(document); //? indexManager.allElements().toArray()
    });

    it("should reach the IndexedContent State (2)", () => {
      expect(document.state).toBe(DocumentState.IndexedContent);
    });

    afterEach(() => {
      indexManager.remove([uri]);
    });
  });

  describe("Document State 3: Computed Scopes", () => {
    beforeEach(async () => {
      document = services.shared.workspace.LangiumDocumentFactory.fromString<ExecuteBlock>(text, uri);
      await indexManager.updateContent(document);
      const scopeComputation = services.shared.ServiceRegistry.getServices(uri).references.ScopeComputation;
      document.precomputedScopes = await scopeComputation.computeLocalScopes(document);
      document.state = DocumentState.ComputedScopes;
    });

    it("should reach the ComputedScopes State (3)", () => {
      expect(document.state).toBe(DocumentState.ComputedScopes);
    });

    afterEach(() => {
      indexManager.remove([uri]);
    });
  });

  describe("Document State 4: Linked", () => {
    beforeEach(async () => {
      document = services.shared.workspace.LangiumDocumentFactory.fromString<ExecuteBlock>(text, uri);
      await indexManager.updateContent(document);
      const scopeComputation = services.shared.ServiceRegistry.getServices(uri).references.ScopeComputation;
      document.precomputedScopes = await scopeComputation.computeLocalScopes(document);
      document.state = DocumentState.ComputedScopes;
      await services.shared.ServiceRegistry.getServices(uri).references.Linker.link(document);
    });

    it("should reach the Linked State (4)", () => {
      expect(document.state).toBe(DocumentState.Linked);
    });

    afterEach(() => {
      indexManager.remove([uri]);
    });
  });

  describe("Document State 5: Indexed References", () => {
    beforeEach(async () => {
      document = services.shared.workspace.LangiumDocumentFactory.fromString<ExecuteBlock>(text, uri);
      await indexManager.updateContent(document);
      const scopeComputation = services.shared.ServiceRegistry.getServices(uri).references.ScopeComputation;
      document.precomputedScopes = await scopeComputation.computeLocalScopes(document);
      document.state = DocumentState.ComputedScopes;
      await services.shared.ServiceRegistry.getServices(uri).references.Linker.link(document);
      await indexManager.updateReferences(document);
    });

    it("should reach the IndexedReferences State (5)", () => {
      expect(document.state).toBe(DocumentState.IndexedReferences);
    });

    afterEach(() => {
      indexManager.remove([uri]);
    });
  });

  describe("Document State 6: Validated", () => {
    beforeEach(async () => {
      document = services.shared.workspace.LangiumDocumentFactory.fromString<ExecuteBlock>(text, uri);
      await indexManager.updateContent(document);
      const scopeComputation = services.shared.ServiceRegistry.getServices(uri).references.ScopeComputation;
      document.precomputedScopes = await scopeComputation.computeLocalScopes(document);
      document.state = DocumentState.ComputedScopes;
      await services.shared.ServiceRegistry.getServices(uri).references.Linker.link(document);
      await indexManager.updateReferences(document);
      const validator = services.shared.ServiceRegistry.getServices(uri).validation.DocumentValidator;
      const diagnostics = await validator.validateDocument(document);
      document.diagnostics = diagnostics; //?
      document.state = DocumentState.Validated;
    });

    it("should reach the Validated State (6)", () => {
      expect(document.state).toBe(DocumentState.Validated);
    });

    afterEach(() => {
      indexManager.remove([uri]);
    });
  });
});
