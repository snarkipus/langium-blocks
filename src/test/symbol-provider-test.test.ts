import { BlocksServices, createBlocksServices } from '../language-server/blocks-module';
import { AstNode, EmptyFileSystem, LangiumDocument, LangiumServices } from 'langium';
import { parseHelper } from "langium/test";
import { DocumentSymbol, TextDocumentIdentifier, SymbolKind } from 'vscode-languageserver';
import { BigBlock } from '../language-server/generated/ast';

function textDocumentParams(document: LangiumDocument): { textDocument: TextDocumentIdentifier } {
  return { textDocument: { uri: document.textDocument.uri } };
}

export interface SymbolProviderResult<T extends AstNode = AstNode> {
  symbols?: DocumentSymbol[];
  document: LangiumDocument<T>;
}

export function symbolProviderHelper<T extends AstNode = AstNode>(services: LangiumServices): (input: string) => Promise<SymbolProviderResult> {
  const parse = parseHelper<T>(services);
  return async (input) => {
      const document = await parse(input);
      return { document, symbols: await services.lsp.DocumentSymbolProvider?.getSymbols(document, textDocumentParams(document)) };
  };
}

describe('Document Symbol Provider', () => {
  let services : BlocksServices;
  let text : string;
  let symbolizer : (input: string) => Promise<SymbolProviderResult>;
  let result: SymbolProviderResult;

  beforeAll(() => {
    services = createBlocksServices(EmptyFileSystem).Blocks;
    symbolizer = symbolProviderHelper<BigBlock>(services);
    text = `
    BigBlock
      BlockA
        comment text line 1
        comment text line 2
        comment text line n
        SpecialProp someName
        Property propA
        Property propB
      EndBlockA

      BlockB
        comment text line 1
        comment text line 2
        comment text line n
        SpecialProp anotherName
        Property propC
        Property propD
      EndBlockB
  
    EndBigBlock
    `.trim();
  })

  beforeEach( async () => {
    result = await symbolizer(text);
  })

  it('generates the correct symbols for BigBlock', async () => {
    // BigBlock => Class Symbol
    expect(result.symbols?.[0].kind).toEqual(SymbolKind.Class);
    console.log(result.document.parseResult.value);
  });
    
  it('generates the correct symbols for Blocks', async () => {
    // BlockA => Field Symbol
    // BlockB => Field Symbol
    expect(result.symbols?.[0]
            .children?.map(blocks => {
              blocks.kind
            })
          ).toEqual([SymbolKind.Field,SymbolKind.Field]);
  });
  
  it('generates the correct symbols for BigBlock', async () => {
    // propA => Method Symbol
    // propB => Method Symbol
    // propC => Method Symbol
    // propD => Method Symbol
    expect(result.symbols?.[0]
            .children?.map(blocks => {
              blocks.children?.map(properties => {
                properties.kind
              })
            })
          ).toEqual([
            [SymbolKind.Method,SymbolKind.Method],
            [SymbolKind.Method,SymbolKind.Method]
          ]);
  });
});