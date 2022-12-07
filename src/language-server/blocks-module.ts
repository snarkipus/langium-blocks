import {
    createDefaultModule, createDefaultSharedModule, DefaultSharedModuleContext, inject,
    LangiumServices, LangiumSharedServices, Module, PartialLangiumServices
} from 'langium';
import { BlocksGeneratedModule, BlocksGeneratedSharedModule } from './generated/module';
import { BlocksValidationRegistry, BlocksValidator } from './blocks-validator';
import { BlocksDocumentSymbolProvider } from './blocks-symbol-provider';
import { BlocksNameProvider } from './blocks-name-provider';
// import { BlocksValueConverter } from './blocks-value-converter';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type BlocksAddedServices = {
    validation: {
        BlocksValidator: BlocksValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type BlocksServices = LangiumServices & BlocksAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const BlocksModule: Module<BlocksServices, PartialLangiumServices & BlocksAddedServices> = {
    parser: {
        // ValueConverter: () => new BlocksValueConverter(),
    },
    validation: {
        ValidationRegistry: (services) => new BlocksValidationRegistry(services),
        BlocksValidator: () => new BlocksValidator()
    },
    lsp: {
        DocumentSymbolProvider: (services) => new BlocksDocumentSymbolProvider(services),
    },
    references: {
        NameProvider: () => new BlocksNameProvider()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createBlocksServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    Blocks: BlocksServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        BlocksGeneratedSharedModule
    );
    const Blocks = inject(
        createDefaultModule({ shared }),
        BlocksGeneratedModule,
        BlocksModule
    );
    shared.ServiceRegistry.register(Blocks);
    return { shared, Blocks };
}
