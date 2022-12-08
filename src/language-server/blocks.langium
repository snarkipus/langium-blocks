grammar Blocks

entry ExecuteBlock:
    'EXECUTE'
     uan=UANBlock
     sdb=SDBBlock
    'END-INSTRUCTIONS'
;

UANBlock:
    name='UAN-DEFINITION'
    categories+=UANCategory*
    innerRefs+=CategoryRef+
    'END' 'UAN'
;

UANCategory:
      {infer Books} name='BOOKS' (items+=UANItem ('ref:' ref=[UANItem])?)+ 
    | {infer Cards} name='CARDS' (items+=UANItem ('ref:' ref=[UANItem])?)+ 
    | {infer Tools} name='TOOLS' (items+=UANItem ('ref:' ref=[UANItem])?)+
;

CategoryRef:
    'category-ref' catRef=[UANCategory] ('item-ref' itemRef=[UANItem])?
;

UANItem:
    name=ID
;

SDBBlock:
    name=SDBBlockHeader
    'RANDOM-NUMBER-SEED:' seed=INT
    toolUsage=ToolUsageBlock?
    'END' 'SCENARIO'
;

ToolUsageBlock:
    name='TOOL-USAGE:'
    tools+=ToolUsage+
;

ToolUsage:
    'DESC:' tool=[UANItem] 'QTY' qty=INT
;

hidden terminal WS: /\s+/;
terminal SDBBlockHeader: /(SDB)([\s\S]*?)(?=(RANDOM-NUMBER-SEED))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;