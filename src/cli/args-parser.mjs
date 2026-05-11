import { UserError } from "../shared/user-error.mjs";
import { SUPPORTED_MODES } from "../shared/constants.mjs";

export function parseArgs(argv) {
  const result = {
    input: argv[0],
    output: argv[1],
    mode: "full",
    tag: null,
    operationId: null,
    method: null,
    path: null,
    help: false,
    useHeadings: true,
    headingOffset: null
  };

  if (argv.includes("--help") || argv.includes("-h")) {
    return { ...result, help: true };
  }

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--mode") {
      result.mode = requireOptionValue(argv, ++i, "--mode");
    } else if (arg === "--tag") {
      result.tag = requireOptionValue(argv, ++i, "--tag");
    } else if (arg === "--operation-id") {
      result.operationId = requireOptionValue(argv, ++i, "--operation-id");
    } else if (arg === "--method") {
      result.method = requireOptionValue(argv, ++i, "--method").toUpperCase();
    } else if (arg === "--path") {
      result.path = requireOptionValue(argv, ++i, "--path");
    } else if (arg === "--headings") {
      result.useHeadings = true;
    } else if (arg === "--no-headings") {
      result.useHeadings = false;
    } else if (arg === "--heading-offset") {
      result.headingOffset = parseHeadingOffset(requireOptionValue(argv, ++i, "--heading-offset"));
    } else {
      throw new UserError(`Unknown option: ${arg}`);
    }
  }

  if (result.mode && !SUPPORTED_MODES.includes(result.mode)) {
    throw new UserError(`Invalid mode: ${result.mode}. Allowed values: ${SUPPORTED_MODES.join(", ")}.`);
  }

  if (result.headingOffset === null) {
    result.headingOffset = result.mode === "fragment" ? 2 : 0;
  }

  return result;
}

function requireOptionValue(argv, index, optionName) {
  const value = argv[index];

  if (!value || value.startsWith("--")) {
    throw new UserError(`Missing value for option ${optionName}.`);
  }

  return value;
}

function parseHeadingOffset(value) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) {
    throw new UserError(`Invalid value for --heading-offset: ${value}. Allowed values: 1 to 5.`);
  }

  return parsed;
}

export function getUsageText() {
  return `
Usage:
  node ./scripts/openapi-swagger-like-md.mjs <input.json> <output.md> [options]

Options:
  --mode full|fragment          Output mode. Default: full
  --tag <tagName>               Generate only operations with this tag
  --operation-id <operationId>  Generate only one operation by operationId
  --method <HTTP_METHOD>        Filter by HTTP method: GET, POST, PUT, DELETE, PATCH...
  --path <apiPath>              Filter by API path, for example /pet/{petId}
  --headings                    Generate Markdown headings for PDF bookmarks. Default: enabled
  --no-headings                 Disable Markdown headings and use HTML title blocks only
  --heading-offset <1..5>       Base heading level for fragments. Default: 2
  --help, -h                    Show help

Examples:
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.md --mode full
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./pet.md --mode fragment --tag pet
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./receive.md --mode fragment --method POST --path /pet
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet --heading-offset 3
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet --no-headings
`;
}