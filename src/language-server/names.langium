import "./common"

UANCategory:
      {infer Books} name='BOOKS' (books+=UANBook)+
    | {infer Cards} name='CARDS' (cards+=UANCard)+
    | {infer Tools} name='TOOLS' (tools+=UANTool)+
;

type UANItem = UANBook | UANCard | UANTool;

UANBook: name=ID;

UANCard: name=ID;

UANTool: name=ID;