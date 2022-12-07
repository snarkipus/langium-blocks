import { CstNode } from "langium";
import { DefaultValueConverter, ValueType, getCrossReferenceTerminal } from "langium";
import { AbstractElement, isCrossReference, isRuleCall } from "langium/lib/grammar/generated/ast";

export class BlocksValueConverter extends DefaultValueConverter {

  override convert(input: string, cstNode: CstNode): ValueType {
    let feature: AbstractElement | undefined = cstNode.feature;
    if (isCrossReference(feature)) {
        feature = getCrossReferenceTerminal(feature);
    }
    if (isRuleCall(feature)) {
        const rule = feature.rule.ref;
        if (!rule) {
            throw new Error('This cst node was not parsed by a rule.');
        }
        if (rule.name.toUpperCase() === 'SDBBLOCKHEADER' || rule.name.toUpperCase() === 'TDBBLOCKHEADER') {
            return convertBlockHeader(input);
        } else {
          return super.runConverter(rule, input, cstNode);
        }
    }
    return input;
  }
}

export function convertBlockHeader(input: string): string {
  return input.slice(0, 3);
}