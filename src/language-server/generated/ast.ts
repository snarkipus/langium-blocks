/******************************************************************************
 * This file was generated by langium-cli 0.5.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import { AstNode, AbstractAstReflection, Reference, ReferenceInfo, TypeMetaData } from 'langium';

export type UANCategory = Books | Cards | Tools;

export const UANCategory = 'UANCategory';

export function isUANCategory(item: unknown): item is UANCategory {
    return reflection.isInstance(item, UANCategory);
}

export type UANItem = UANBook | UANCard | UANTool;

export const UANItem = 'UANItem';

export function isUANItem(item: unknown): item is UANItem {
    return reflection.isInstance(item, UANItem);
}

export interface Books extends AstNode {
    books: Array<UANBook>
    name: 'BOOKS'
}

export const Books = 'Books';

export function isBooks(item: unknown): item is Books {
    return reflection.isInstance(item, Books);
}

export interface BookUsageBlock extends AstNode {
    readonly $container: SDBBlock;
    book?: Reference<UANBook>
    name: 'BOOK-USAGE:'
    qty?: number
}

export const BookUsageBlock = 'BookUsageBlock';

export function isBookUsageBlock(item: unknown): item is BookUsageBlock {
    return reflection.isInstance(item, BookUsageBlock);
}

export interface Cards extends AstNode {
    cards: Array<UANCard>
    name: 'CARDS'
}

export const Cards = 'Cards';

export function isCards(item: unknown): item is Cards {
    return reflection.isInstance(item, Cards);
}

export interface CardUsageBlock extends AstNode {
    readonly $container: SDBBlock;
    card?: Reference<UANCard>
    name: 'CARD-USAGE:'
    qty?: number
}

export const CardUsageBlock = 'CardUsageBlock';

export function isCardUsageBlock(item: unknown): item is CardUsageBlock {
    return reflection.isInstance(item, CardUsageBlock);
}

export interface ExecuteBlock extends AstNode {
    sdb: SDBBlock
    uan: UANBlock
}

export const ExecuteBlock = 'ExecuteBlock';

export function isExecuteBlock(item: unknown): item is ExecuteBlock {
    return reflection.isInstance(item, ExecuteBlock);
}

export interface SDBBlock extends AstNode {
    readonly $container: ExecuteBlock;
    bookUsage?: BookUsageBlock
    cardUsage?: CardUsageBlock
    name: string
    seed: number
    toolUsage?: ToolUsageBlock
}

export const SDBBlock = 'SDBBlock';

export function isSDBBlock(item: unknown): item is SDBBlock {
    return reflection.isInstance(item, SDBBlock);
}

export interface Tools extends AstNode {
    name: 'TOOLS'
    tools: Array<UANTool>
}

export const Tools = 'Tools';

export function isTools(item: unknown): item is Tools {
    return reflection.isInstance(item, Tools);
}

export interface ToolUsageBlock extends AstNode {
    readonly $container: SDBBlock;
    name: 'TOOL-USAGE:'
    qty?: number
    tool?: Reference<UANTool>
}

export const ToolUsageBlock = 'ToolUsageBlock';

export function isToolUsageBlock(item: unknown): item is ToolUsageBlock {
    return reflection.isInstance(item, ToolUsageBlock);
}

export interface UANBlock extends AstNode {
    readonly $container: ExecuteBlock;
    categories: Array<UANCategory>
    name: 'UAN-DEFINITION'
}

export const UANBlock = 'UANBlock';

export function isUANBlock(item: unknown): item is UANBlock {
    return reflection.isInstance(item, UANBlock);
}

export interface UANBook extends AstNode {
    readonly $container: Books;
    name: string
}

export const UANBook = 'UANBook';

export function isUANBook(item: unknown): item is UANBook {
    return reflection.isInstance(item, UANBook);
}

export interface UANCard extends AstNode {
    readonly $container: Cards;
    name: string
}

export const UANCard = 'UANCard';

export function isUANCard(item: unknown): item is UANCard {
    return reflection.isInstance(item, UANCard);
}

export interface UANTool extends AstNode {
    readonly $container: Tools;
    name: string
}

export const UANTool = 'UANTool';

export function isUANTool(item: unknown): item is UANTool {
    return reflection.isInstance(item, UANTool);
}

export interface BlocksAstType {
    BookUsageBlock: BookUsageBlock
    Books: Books
    CardUsageBlock: CardUsageBlock
    Cards: Cards
    ExecuteBlock: ExecuteBlock
    SDBBlock: SDBBlock
    ToolUsageBlock: ToolUsageBlock
    Tools: Tools
    UANBlock: UANBlock
    UANBook: UANBook
    UANCard: UANCard
    UANCategory: UANCategory
    UANItem: UANItem
    UANTool: UANTool
}

export class BlocksAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return ['BookUsageBlock', 'Books', 'CardUsageBlock', 'Cards', 'ExecuteBlock', 'SDBBlock', 'ToolUsageBlock', 'Tools', 'UANBlock', 'UANBook', 'UANCard', 'UANCategory', 'UANItem', 'UANTool'];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        switch (subtype) {
            case Books:
            case Cards:
            case Tools: {
                return this.isSubtype(UANCategory, supertype);
            }
            case UANBook:
            case UANCard:
            case UANTool: {
                return this.isSubtype(UANItem, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'BookUsageBlock:book': {
                return UANBook;
            }
            case 'CardUsageBlock:card': {
                return UANCard;
            }
            case 'ToolUsageBlock:tool': {
                return UANTool;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'Books': {
                return {
                    name: 'Books',
                    mandatory: [
                        { name: 'books', type: 'array' }
                    ]
                };
            }
            case 'Cards': {
                return {
                    name: 'Cards',
                    mandatory: [
                        { name: 'cards', type: 'array' }
                    ]
                };
            }
            case 'Tools': {
                return {
                    name: 'Tools',
                    mandatory: [
                        { name: 'tools', type: 'array' }
                    ]
                };
            }
            case 'UANBlock': {
                return {
                    name: 'UANBlock',
                    mandatory: [
                        { name: 'categories', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}

export const reflection = new BlocksAstReflection();
