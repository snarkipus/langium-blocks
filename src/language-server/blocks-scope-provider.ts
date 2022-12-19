import {
  AstNodeDescription,
  DefaultScopeComputation,
  LangiumDocument,
  LangiumServices,
  streamAllContents,
} from "langium";
import { isUANItem } from "./generated/ast";

export class BlocksScopeComputation extends DefaultScopeComputation {
  constructor(services: LangiumServices) {
    super(services);
  }

  /**
   * Exports UANItems
   */
  override async computeExports(document: LangiumDocument): Promise<AstNodeDescription[]> {
    const exportedDescriptions: AstNodeDescription[] = [];
    for (const node of streamAllContents(document.parseResult.value)) {
      if (isUANItem(node)) {
        exportedDescriptions.push(this.descriptions.createDescription(node, node.name, document));
      }
    }
    return exportedDescriptions;
  }
}
