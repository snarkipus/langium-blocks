grammar Blocks

entry BigBlock:
    name='BigBlock'
    innerBlocks+=InnerBlock+
    'EndBigBlock'
;

InnerBlock:
    BlockA+ | BlockB+
;

BlockA:
    BlockHeaderA
    special=SpecialProp
    props+=Property*
    'EndBlockA'
;

BlockB:
    BlockHeaderB
    special=SpecialProp
    props+=Property*
    'EndBlockB'
;

SpecialProp:
    'SpecialProp' param=ID
;

Property:
    'Property' name=ID
;

hidden terminal WS: /\s+/;
terminal BlockHeaderA: /(BlockA)([\s\S]*?)(?=(SpecialProp))/;
terminal BlockHeaderB: /(BlockB)([\s\S]*?)(?=(SpecialProp))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;