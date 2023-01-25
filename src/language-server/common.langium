hidden terminal COMMENT: /\/\/.*/;
hidden terminal WS: /\s+/;
terminal SDBBlockHeader: /(SDB)([\s\S]*?)(?=(RANDOM-NUMBER-SEED))/;
terminal SDB2BlockHeader: /(SDB2)([\s\S]*?)(?=(RANDOM-NUMBER-SEED))/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
// terminal STRING: /"[^"]*"|'[^']*'/;