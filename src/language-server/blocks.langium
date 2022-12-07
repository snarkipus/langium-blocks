grammar Blocks

entry ExecuteBlock:
    'EXECUTE'
     uan=UANBlock?
     sdb=SDBBlock?
    'END-INSTRUCTIONS'
;

UANBlock:
    name='UAN-DEFINITION'
    categories+=UANCategory+
    'END' 'UAN'
;

UANCategory:
      {infer Tools} name='TOOLS' items+=UANItem+
    | {infer Books} name='BOOKS' items+=UANItem+
    | {infer Cards} name='CARDS' items+=UANItem+
;

UANItem returns string:
    ID
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
    'DESC:' tool=[Tools:UANItem] 'QTY' qty=INT
;

Property:
    'Property' name=ID
;

hidden terminal WS: /\s+/;
terminal SDBBlockHeader: /(SDB)([\s\S]*?)(?=(RANDOM-NUMBER-SEED))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;