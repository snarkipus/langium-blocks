import { DefaultNameProvider } from 'langium';
import { AstNode, CstNode } from 'langium';
// import { findNodeForProperty } from 'langium';
import { isBooks, isCards, isSDBBlock, isTools, isUANBlock } from './generated/ast';

export class BlocksNameProvider extends DefaultNameProvider {

    override getName(node: AstNode): string | undefined {
        if (isSDBBlock(node)) {
            return 'SDB';
        } else if (isUANBlock(node)) {
            return 'UAN';
        } else if (isTools(node)) {
            return 'Tools';
        } else if (isBooks(node)) {
            return 'Books';
        } else if (isCards(node)) {
            return 'Cards';
        } else {
            return super.getName(node);
        }
    }

    override getNameNode(node: AstNode): CstNode | undefined {
        if (isSDBBlock(node) || isUANBlock(node) || isTools(node) || isBooks(node) || isCards(node)) {
            return node.$cstNode;
        } else {
            return super.getNameNode(node);
        }
    }

}