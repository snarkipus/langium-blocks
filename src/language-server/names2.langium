import "./common"

UANCategory2:
      {infer Books2} name='BOOKS' (books+=UANBook2)+
    | {infer Cards2} name='CARDS' (cards+=UANCard2)+
    | {infer Tools2} name='TOOLS' (tools+=UANTool2)+
;

type UANItem = UANBook2 | UANCard2 | UANTool2;

UANBook2: name=ID;

UANCard2: name=ID;

UANTool2: name=ID;