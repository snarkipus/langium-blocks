// import chalk from 'chalk';
// import { Command } from 'commander';
// import { Model } from '../language-server/generated/ast';
// import { BlocksLanguageMetaData } from '../language-server/generated/module';
// import { createBlocksServices } from '../language-server/blocks-module';
// import { extractAstNode } from './cli-util';
// import { generateJavaScript } from './generator';
// import { NodeFileSystem } from 'langium/node';

// export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
//     const services = createBlocksServices(NodeFileSystem).Blocks;
//     // const model = await extractAstNode<Model>(fileName, services);
//     // const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
//     console.log(chalk.green(`JavaScript code generated successfully: ${generatedFilePath}`));
// };

// export type GenerateOptions = {
//     destination?: string;
// }

// export default function(): void {
//     const program = new Command();

//     program
//         // eslint-disable-next-line @typescript-eslint/no-var-requires
//         .version(require('../../package.json').version);

//     const fileExtensions = BlocksLanguageMetaData.fileExtensions.join(', ');
//     program
//         .command('generate')
//         .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
//         .option('-d, --destination <dir>', 'destination directory of generating')
//         .description('generates JavaScript code that prints "Hello, {name}!" for each greeting in a source file')
//         .action(generateAction);

//     program.parse(process.argv);
// }
