import { ValidationChecks, ValidationRegistry } from 'langium';
import { BlocksAstType } from './generated/ast';
import type { BlocksServices } from './blocks-module';

/**
 * Registry for validation checks.
 */
export class BlocksValidationRegistry extends ValidationRegistry {
    constructor(services: BlocksServices) {
        super(services);
        const validator = services.validation.BlocksValidator;
        const checks: ValidationChecks<BlocksAstType> = {
            // Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class BlocksValidator {

    // checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
    //     if (person.name) {
    //         const firstChar = person.name.substring(0, 1);
    //         if (firstChar.toUpperCase() !== firstChar) {
    //             accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
    //         }
    //     }
    // }

}
