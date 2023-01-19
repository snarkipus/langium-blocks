import { AstNode, CstNode, DefaultDocumentSymbolProvider, LangiumDocument } from "langium";
import { DocumentSymbol, SymbolKind } from "vscode-languageserver";
import { BlocksServices } from "./blocks-module";
import { isSDBBlock, isUANBlock } from "./generated/ast";

export class BlocksDocumentSymbolProvider extends DefaultDocumentSymbolProvider {

    constructor(services: BlocksServices) {
        super(services);
    }

    protected override getSymbol(document: LangiumDocument, astNode: AstNode): DocumentSymbol[] {
        const node = astNode.$cstNode; 
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

    protected override getSymbolKind(type: string): SymbolKind {
        switch(type) {
            case 'UANBlock':
            case 'SDBBlock':    return SymbolKind.Field;
            case 'ToolUsageBlock':
            case 'BookUsageBlock':
            case 'CardUsageBlock': 
            case 'Tools':
            case 'Books':
            case 'Cards':       return SymbolKind.Class;
            case 'UANTool':
            case 'UANBook':
            case 'UANCard':    
            case 'UANItem':     return SymbolKind.Variable;
            default: throw new Error(`getSymbolKind() called with unknown type: ${type}`);
        }
    }

    protected nameText(node: AstNode, nameNode: CstNode): string {
        if ( isSDBBlock(node) ) {
            return 'SDB';
        } else if ( isUANBlock(node) ) {
            return 'UAN';
        }
        let name = this.nameProvider.getName(node);
        return name ?? nameNode.text;
    }
}
