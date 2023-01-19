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
    'END' 'UAN'
;

UANCategory:
      {infer Books} name='BOOKS' (books+=UANBook)+
    | {infer Cards} name='CARDS' (cards+=UANCard)+
    | {infer Tools} name='TOOLS' (tools+=UANTool)+
;

type UANItem = UANBook | UANCard | UANTool;

UANBook:
    name=ID
;

UANCard:
    name=ID
;

UANTool:
    name=ID
;

SDBBlock:
    name=SDBBlockHeader
    'RANDOM-NUMBER-SEED:' seed=INT
    toolUsage=ToolUsageBlock?
    bookUsage=BookUsageBlock?
    cardUsage=CardUsageBlock?
    'END' 'SCENARIO'
;

ToolUsageBlock:
    name='TOOL-USAGE:'
    ('DESC:' tool=[UANTool] 'QTY' qty=INT)*
;

BookUsageBlock:
    name='BOOK-USAGE:'
    ('DESC:' book=[UANBook] 'QTY' qty=INT)*
;

CardUsageBlock:
    name='CARD-USAGE:'
    ('DESC:' card=[UANCard] 'QTY' qty=INT)*
;

hidden terminal COMMENT: /\/\/.*/;
hidden terminal WS: /\s+/;
terminal SDBBlockHeader: /(SDB)([\s\S]*?)(?=(RANDOM-NUMBER-SEED))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
// terminal STRING: /"[^"]*"|'[^']*'/;