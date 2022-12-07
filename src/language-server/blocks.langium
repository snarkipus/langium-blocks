grammar Blocks

entry ExecuteBlock:
    'EXECUTE'
     uan=UANBlock?
     sdb=SDBBlock?
    'END-INSTRUCTIONS'
;

UANBlock:
    'UAN-DEFINITION'
    categories+=UANCategory+
    'END' 'UAN'
;

UANCategory:
      {infer Tools} 'TOOLS' items+=UANItem+
    | {infer Books} 'BOOKS' items+=UANItem+
    | {infer Cards} 'CARDS' items+=UANItem+
;

UANItem returns string:
    ID
;

SDBBlock:
    SDBBlockHeader
    'RANDOM-NUMBER-SEED:' seed=INT
    toolUsage=ToolUsageBlock?
    'END' 'SCENARIO'
;

ToolUsageBlock:
    'TOOL-USAGE:'
    tools+=ToolUsage+
;

ToolUsage:
    'DESC:' tool=[Tools:UANItem] 'QTY' qty=INT
;

Property:
    'Property' value=ID
;

hidden terminal WS: /\s+/;
terminal SDBBlockHeader: /(SDB)([\s\S]*?)(?=(RANDOM-NUMBER-SEED))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;