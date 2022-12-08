import { DefaultNameProvider } from "langium";
import { AstNode, CstNode } from "langium";
// import { findNodeForProperty } from 'langium';
// import { isBooks, isCards, isTools, isUANItem } from "./generated/ast";

export class BlocksNameProvider extends DefaultNameProvider {
  override getName(node: AstNode): string | undefined {
      return super.getName(node);
  }

  override getNameNode(node: AstNode): CstNode | undefined {
    return super.getNameNode(node);
  }
}
