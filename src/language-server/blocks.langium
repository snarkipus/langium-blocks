grammar Blocks

import "./common"
import "./names"
import "./names2"

entry ExecuteBlock:
    'EXECUTE'
     uan=UANBlock
     sdb=SDBBlock
     sdb2=SDBBlock2
    'END-INSTRUCTIONS'
;

UANBlock:
    name='UAN-DEFINITION'
    categories+=UANCategory*
    categories2+=UANCategory2*
    'END' 'UAN'
;

SDBBlock:
    name=SDBBlockHeader
    'RANDOM-NUMBER-SEED:' seed=INT
    toolUsage=ToolUsageBlock?
    bookUsage=BookUsageBlock?
    cardUsage=CardUsageBlock?
    'END' 'SCENARIO'
;

SDBBlock2:
    name=SDB2BlockHeader
    'RANDOM-NUMBER-SEED:' seed=INT
    toolUsage=ToolUsageBlock2?
    bookUsage=BookUsageBlock2?
    cardUsage=CardUsageBlock2?
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

ToolUsageBlock2:
    name='TOOL-USAGE:'
    ('DESC:' tool=[UANTool2] 'QTY' qty=INT)*
;

BookUsageBlock2:
    name='BOOK-USAGE:'
    ('DESC:' book=[UANBook2] 'QTY' qty=INT)*
;

CardUsageBlock2:
    name='CARD-USAGE:'
    ('DESC:' card=[UANCard2] 'QTY' qty=INT)*
;