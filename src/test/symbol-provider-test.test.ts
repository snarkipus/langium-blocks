import { BlocksServices, createBlocksServices } from '../language-server/blocks-module';
import { AstNode, EmptyFileSystem, LangiumDocument, LangiumServices } from 'langium';
import { parseHelper } from "langium/test";
import { DocumentSymbol, TextDocumentIdentifier } from 'vscode-languageserver';
import { BigBlock } from '../language-server/generated/ast';

function textDocumentParams(document: LangiumDocument): { textDocument: TextDocumentIdentifier } {
  return { textDocument: { uri: document.textDocument.uri } };
}

export interface symbolProviderResult<T extends AstNode = AstNode> {
  symbols: DocumentSymbol[] | undefined;
  document: LangiumDocument<T>;
}

export function symbolProviderHelper<T extends AstNode = AstNode>(services: LangiumServices): (input: string) => Promise<symbolProviderResult> {
  const parse = parseHelper<T>(services);
  return async (input) => {
      const document = await parse(input);
      return { document, symbols: await services.lsp.DocumentSymbolProvider?.getSymbols(document, textDocumentParams(document)) };
  };
}

describe('Document Symbol Provider', () => {
  let services : BlocksServices;
  let text : string;
  let symbolizer : (input: string) => Promise<symbolProviderResult>;

  beforeAll(() => {
    services = createBlocksServices(EmptyFileSystem).Blocks;
    symbolizer = symbolProviderHelper<BigBlock>(services);
    text = `
    BigBlock
      BlockA
        comment text line 1
        comment text line 2
        comment text line n
        EndCommentTokenA someName
        Property propA
        Property propB
      EndBlockA

      BlockB
        comment text line 1
        comment text line 2
        comment text line n
        EndCommentTokenB anotherName
        Property propC
        Property propD
      EndBlockB
  
    EndBigBlock
    `;
  })

  it('does a thing', async () => {
    const { document/*? */, symbols } = await symbolizer(text);
    expect(symbols).toBeDefined();
    console.log(document.parseResult.value);
  });
});