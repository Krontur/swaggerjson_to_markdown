import path from "node:path";
import { parseArgs, getUsageText } from "./args-parser.mjs";
import { UserError } from "../shared/user-error.mjs";
import { WarningCollector } from "../shared/warnings.mjs";
import { loadJsonFile } from "../io/json-loader.mjs";
import { writeMarkdownFile } from "../io/markdown-writer.mjs";
import { validateOpenApiDocument, validateFilterCombination } from "../core/openapi-validator.mjs";
import { generateMarkdown } from "../renderer/markdown-generator.mjs";

export async function runCli(argv) {
  try {
    const options = parseArgs(argv);
    if (options.help) { console.log(getUsageText()); return; }
    if (!options.input || !options.output) { console.log(getUsageText()); throw new UserError("Missing required arguments: <input.json> and <output.md>."); }
    const inputPath = path.resolve(options.input);
    const outputPath = path.resolve(options.output);
    const warnings = new WarningCollector();
    const spec = loadJsonFile(inputPath);
    validateOpenApiDocument(spec, warnings);
    validateFilterCombination(options, warnings);
    const markdown = generateMarkdown(spec, options, warnings);
    if (!markdown || !markdown.trim()) throw new UserError("No Markdown content was generated.");
    writeMarkdownFile(outputPath, markdown);
    warnings.print();
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    printError(error);
    process.exitCode = 1;
  }
}
function printError(error) {
  const prefix = error instanceof UserError ? "Input error" : "Unexpected error";
  console.error(`\n${prefix}: ${error.message}`);
  if (error.details) console.error(error.details);
  if (!(error instanceof UserError)) { console.error("\nStack trace:"); console.error(error.stack); }
}
