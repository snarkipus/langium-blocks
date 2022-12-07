/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

 import { AstNode, AstNodeDescription, DefaultScopeComputation, interruptAndCheck, LangiumDocument, LangiumServices, MultiMap, PrecomputedScopes, streamAllContents } from 'langium';
 import { CancellationToken } from 'vscode-jsonrpc';
//  import { BlocksNameProvider } from './blocks-name-provider';
 import { ExecuteBlock, isUANCategory } from './generated/ast';
 
 export class BlocksScopeComputation extends DefaultScopeComputation {
 
     constructor(services: LangiumServices) {
         super(services);
     }
 
     /**
      * Exports only types (`DataType or `Entity`) with their qualified names.
      */
     override async computeExports(document: LangiumDocument, cancelToken = CancellationToken.None): Promise<AstNodeDescription[]> {
         const descr: AstNodeDescription[] = [];
         for (const modelNode of streamAllContents(document.parseResult.value)) {
             await interruptAndCheck(cancelToken);
             if (isUANCategory(modelNode)) {
                 let name = this.nameProvider.getName(modelNode);
                 if (name) {
                     descr.push(this.descriptions.createDescription(modelNode, name, document));
                 }
             }
         }
         return descr;
     }
 
     override async computeLocalScopes(document: LangiumDocument, cancelToken = CancellationToken.None): Promise<PrecomputedScopes> {
         const model = document.parseResult.value as ExecuteBlock;
         const scopes = new MultiMap<AstNode, AstNodeDescription>();
         await this.processContainer(model, scopes, document, cancelToken);
         return scopes;
     }
 
     protected async processContainer(container: ExecuteBlock, scopes: PrecomputedScopes, document: LangiumDocument, cancelToken: CancellationToken): Promise<AstNodeDescription[]> {
         const localDescriptions: AstNodeDescription[] = [];
        //  for (const element of container.elements) {
        //      await interruptAndCheck(cancelToken);
        //      if (isUANCategory(element)) {
        //          const description = this.descriptions.createDescription(element, element.item, document);
        //          localDescriptions.push(description);
        //      } else if (isPackageDeclaration(element)) {
        //          const nestedDescriptions = await this.processContainer(element, scopes, document, cancelToken);
        //          for (const description of nestedDescriptions) {
        //              // Add qualified names to the container
        //              const qualified = this.createQualifiedDescription(element, description, document);
        //              localDescriptions.push(qualified);
        //          }
        //      }
        //  }
         scopes.addAll(container, localDescriptions);
         return localDescriptions;
     } 
 }
 