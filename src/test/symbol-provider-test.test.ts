import { BlocksServices, createBlocksServices } from "../language-server/blocks-module";
import { AstNode, EmptyFileSystem, LangiumDocument, LangiumServices }  from "langium";
import { parseHelper } from "langium/test";
import { DocumentSymbol, SymbolKind, TextDocumentIdentifier } from "vscode-languageserver";
import { ExecuteBlock } from "../language-server/generated/ast";

function textDocumentParams(document: LangiumDocument): {
  textDocument: TextDocumentIdentifier;
} {
  return { textDocument: { uri: document.textDocument.uri } };
}

export interface SymbolProviderResult<T extends AstNode = AstNode> {
  symbols?: DocumentSymbol[];
  document: LangiumDocument<T>;
}

export function symbolProviderHelper<T extends AstNode = AstNode>(
  services: LangiumServices
): (input: string) => Promise<SymbolProviderResult> {
  const parse = parseHelper<T>(services);
  return async (input) => {
    const document = await parse(input);
    return {
      document,
      symbols: await services.lsp.DocumentSymbolProvider?.getSymbols(
        document,
        textDocumentParams(document)
      ),
    };
  };
}

describe("Document Symbol Provider", () => {
  let services: BlocksServices;
  let text: string;
  let symbolizer: (input: string) => Promise<SymbolProviderResult>;
  let result: SymbolProviderResult;

  beforeAll(() => {
    services = createBlocksServices(EmptyFileSystem).Blocks;
    symbolizer = symbolProviderHelper<ExecuteBlock>(services);
    text = `
    EXECUTE

    UAN-DEFINITION
      TOOLS
        hammer
        screwdriver
      BOOKS
        book1
        book2
      CARDS
        ace
        queen
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
  });

  beforeEach(async () => {
    result = await symbolizer(text);
  });


  it('generates the correct symbols for UAN and SDB Blocks', async () => {
    // UAN-DEFINITION => Field Symbol: UAN
    // SDB            => Field Symbol: SDB
    expect(result.symbols?.map((blocks) => blocks.kind)).toEqual([SymbolKind.Field,SymbolKind.Field]);
  });

  it('generates the correct symbols for Category Blocks', async () => {
    // TOOLS        => Class Symbol
    // BOOKS        => Class Symbol
    // CARDS        => Class Symbol
    // TOOLS-USAGE: => Class Symbol
    expect(result.symbols?.flatMap((blocks) => blocks.children?.map((category) => category.kind)))
      .toEqual([SymbolKind.Class,SymbolKind.Class,SymbolKind.Class,SymbolKind.Class]);
  });
});

