import { AstNode, CstNode, DefaultDocumentSymbolProvider, LangiumDocument } from "langium";
import { DocumentSymbol, SymbolKind } from "vscode-languageserver";

import { BlocksServices } from "./blocks-module";
import { isBlockA, isBlockB } from "./generated/ast";

export class BlocksDocumentSymbolProvider extends DefaultDocumentSymbolProvider {

    constructor(services: BlocksServices) {
        super(services);
    }

    protected override getSymbol(document: LangiumDocument, astNode: AstNode): DocumentSymbol[] {
        const node = astNode.$cstNode;//?
        const nameNode = this.nameProvider.getNameNode(astNode);
        if (nameNode && node) {
            return [{
                kind: this.getSymbolKind(astNode.$type ?? SymbolKind.Field),
                name: this.nameText(astNode,nameNode),
                range: node.range,
                selectionRange: nameNode.range,
                children: this.getChildSymbols(document, astNode)
            }];
        } else {
            return this.getChildSymbols(document, astNode) || [];
        }
    }

    protected getSymbolKind(type: string): SymbolKind {
        switch(type) {
            case 'Property':  return SymbolKind.Method;
            case 'BlockA':
            case 'BlockB':    return SymbolKind.Field;
            case 'BigBlock':  return SymbolKind.Class;
            default: throw new Error(`getSymbolKind() called with unknown type: ${type}`);
        }
    }

    protected nameText(node: AstNode, nameNode: CstNode): string {
        let name = this.nameProvider.getName(node);
        if (isBlockA(node)) {
            name = 'BlockA';
        } else if (isBlockB(node)) {
            name = 'BlockB';
        } 
        return name ?? nameNode.text;
    }
}
