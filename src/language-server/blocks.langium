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
    name=BlockHeaderA
    'EndCommentTokenA' param=ID
    props+=Property*
    'EndBlockA'
;

BlockB:
    name=BlockHeaderB
    'EndCommentTokenB' param=ID
    props+=Property*
    'EndBlockB'
;

Property:
    'Property' name=ID
;

hidden terminal WS: /\s+/;
terminal BlockHeaderA: /(BlockA)([\s\S]*?)(?=(EndCommentTokenA))/;
terminal BlockHeaderB: /(BlockB)([\s\S]*?)(?=(EndCommentTokenB))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;