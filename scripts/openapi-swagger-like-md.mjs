#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

class UserError extends Error {
  constructor(message, details = null) {
    super(message);
    this.name = "UserError";
    this.details = details;
  }
}

const warnings = [];
let spec = null;
let specBaseDir = process.cwd();
const md = [];

main().catch((error) => {
  printError(error);
  process.exit(1);
});

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printUsage();
    return;
  }

  if (!args.input || !args.output) {
    printUsage();
    throw new UserError("Missing required arguments: <input.json> and <output.md>.");
  }

  const inputPath = path.resolve(args.input);
  const outputPath = path.resolve(args.output);
  const mode = args.mode ?? "full";

  if (!["full", "fragment"].includes(mode)) {
    throw new UserError(`Invalid mode: ${mode}. Allowed values: full, fragment.`);
  }

  if (!fs.existsSync(inputPath)) {
    throw new UserError(`Input file not found: ${inputPath}`);
  }

  specBaseDir = path.dirname(inputPath);
  spec = readJsonFile(inputPath);
  validateSpec(spec);
  validateFilterCombination(args);

  if (mode === "full") {
    renderFullDocument(args);
  } else {
    renderFragmentDocument(args);
  }

  if (!md.length) {
    throw new UserError("No Markdown content was generated.");
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, md.join("\n"), "utf8");

  printWarnings();
  console.log(`Generated: ${outputPath}`);
}

/* ========================================================================
   CLI / errors
   ======================================================================== */

function parseArgs(argv) {
  const result = {
    input: argv[0],
    output: argv[1],
    mode: "full",
    tag: null,
    operationId: null,
    method: null,
    path: null,
    help: false
  };

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      result.help = true;
    } else if (arg === "--mode") {
      result.mode = requireOptionValue(argv, ++i, "--mode");
    } else if (arg === "--tag") {
      result.tag = requireOptionValue(argv, ++i, "--tag");
    } else if (arg === "--operation-id") {
      result.operationId = requireOptionValue(argv, ++i, "--operation-id");
    } else if (arg === "--method") {
      result.method = requireOptionValue(argv, ++i, "--method").toUpperCase();
    } else if (arg === "--path") {
      result.path = requireOptionValue(argv, ++i, "--path");
    } else {
      throw new UserError(`Unknown option: ${arg}`);
    }
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

function printUsage() {
  console.log(`
Usage:
  node ./scripts/openapi-swagger-like-md.mjs <input.json> <output.md> [options]

Options:
  --mode full|fragment          Output mode. Default: full
  --tag <tagName>               Generate only operations with this tag
  --operation-id <operationId>  Generate only one operation by operationId
  --method <HTTP_METHOD>        Filter by HTTP method: GET, POST, PUT, DELETE, PATCH...
  --path <apiPath>              Filter by API path, for example /pet/{petId}
  --help, -h                    Show help

Examples:
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.md --mode full
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./pet.md --mode fragment --tag pet
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./receive.md --mode fragment --method POST --path /pet
`);
}

function printError(error) {
  const prefix = error instanceof UserError ? "Input error" : "Unexpected error";
  console.error(`\n${prefix}: ${error.message}`);

  if (error.details) {
    console.error(error.details);
  }

  if (!(error instanceof UserError)) {
    console.error("\nStack trace:");
    console.error(error.stack);
  }
}

function warn(message) {
  warnings.push(message);
}

function printWarnings() {
  if (!warnings.length) {
    return;
  }

  console.warn("\nWarnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

function readJsonFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new UserError(`Invalid JSON file: ${filePath}`, error.message);
    }

    throw new UserError(`Cannot read input file: ${filePath}`, error.message);
  }
}

function validateSpec(document) {
  if (!document || typeof document !== "object" || Array.isArray(document)) {
    throw new UserError("The input document must be a JSON object.");
  }

  if (!document.openapi && !document.swagger) {
    throw new UserError("The document is neither OpenAPI nor Swagger. Missing 'openapi' or 'swagger' field.");
  }

  if (document.openapi && !String(document.openapi).startsWith("3.")) {
    warn(`OpenAPI version '${document.openapi}' detected. The generator is mainly tested with OpenAPI 3.x.`);
  }

  if (document.swagger && String(document.swagger) !== "2.0") {
    warn(`Swagger version '${document.swagger}' detected. The generator is mainly tested with Swagger 2.0.`);
  }

  if (!document.info || typeof document.info !== "object") {
    throw new UserError("Missing required 'info' object.");
  }

  if (!document.paths || typeof document.paths !== "object" || Array.isArray(document.paths)) {
    throw new UserError("Missing or invalid required 'paths' object.");
  }

  const operations = collectOperations(document);
  if (!operations.length) {
    throw new UserError("No operations found under 'paths'.");
  }
}

function validateFilterCombination(args) {
  if ((args.method && !args.path) || (!args.method && args.path)) {
    warn("Using --method without --path, or --path without --method, may match more or fewer operations than expected.");
  }
}

function collectOperations(document) {
  const result = [];

  for (const [apiPath, pathItem] of Object.entries(document.paths ?? {})) {
    for (const method of ["get", "post", "put", "delete", "patch", "options", "head"]) {
      if (pathItem?.[method]) {
        result.push({
          method: method.toUpperCase(),
          path: apiPath,
          operation: pathItem[method],
          pathParameters: pathItem.parameters ?? []
        });
      }
    }
  }

  return result;
}

/* ========================================================================
   Full / fragment modes
   ======================================================================== */

function renderFrontmatter() {
  md.push("---");
  md.push("cssclasses:");
  md.push("  - swagger-api-doc");
  md.push("---");
  md.push("");
}

function renderFullDocument(args) {
  renderFrontmatter();
  md.push(`<div class="api-full-document">`);
  md.push("");

  renderDocumentHeader();
  renderServers();
  renderOperationsByTags("full", args);
  renderSchemas("full");

  md.push(`</div>`);
  md.push("");
}

function renderFragmentDocument(args) {
  renderFrontmatter();
  md.push(`<!-- Generated API fragment. Insert this file in an Obsidian note that also uses cssclasses: swagger-api-doc. -->`);
  md.push("");
  md.push(`<div class="api-fragment">`);
  md.push("");

  renderOperationsByTags("fragment", args);

  md.push(`</div>`);
  md.push("");
}

/* ========================================================================
   Document sections
   ======================================================================== */

function renderDocumentHeader() {
  md.push(`<div class="api-document-title">${escapeHtml(spec.info?.title ?? "API Documentation")}</div>`);
  md.push("");

  md.push(`<div class="api-info-card">`);

  if (spec.openapi) {
    md.push(`  <div class="api-info-item"><span>OpenAPI Version</span><code>${escapeHtml(spec.openapi)}</code></div>`);
  }

  if (spec.swagger) {
    md.push(`  <div class="api-info-item"><span>Swagger Version</span><code>${escapeHtml(spec.swagger)}</code></div>`);
  }

  if (spec.info?.version) {
    md.push(`  <div class="api-info-item"><span>API Version</span><code>${escapeHtml(spec.info.version)}</code></div>`);
  }

  md.push(`</div>`);
  md.push("");

  if (spec.info?.description) {
    md.push(`<div class="api-description">`);
    md.push(escapeHtml(spec.info.description));
    md.push(`</div>`);
    md.push("");
  }
}

function renderServers() {
  const servers = spec.servers ?? [];

  if (servers.length) {
    md.push(`<div class="api-main-section-title">Servers</div>`);
    md.push("");
    md.push(`<div class="api-servers">`);

    for (const server of servers) {
      md.push(`  <div class="api-server">`);
      md.push(`    <code>${escapeHtml(server.url)}</code>`);

      if (server.description) {
        md.push(`    <span>${escapeHtml(server.description)}</span>`);
      }

      md.push(`  </div>`);
    }

    md.push(`</div>`);
    md.push("");
    return;
  }

  if (spec.host) {
    const schemes = spec.schemes?.length ? spec.schemes : ["https"];
    const basePath = spec.basePath ?? "";

    md.push(`<div class="api-main-section-title">Servers</div>`);
    md.push("");
    md.push(`<div class="api-servers">`);

    for (const scheme of schemes) {
      md.push(`  <div class="api-server">`);
      md.push(`    <code>${escapeHtml(`${scheme}://${spec.host}${basePath}`)}</code>`);
      md.push(`  </div>`);
    }

    md.push(`</div>`);
    md.push("");
  }
}

/* ========================================================================
   Operations
   ======================================================================== */

function renderOperationsByTags(renderMode, args) {
  const operationsByTag = new Map();

  for (const item of collectOperations(spec)) {
    if (!operationMatchesFilters(item, args)) {
      continue;
    }

    const tags = item.operation.tags?.length ? item.operation.tags : ["default"];

    for (const tag of tags) {
      if (args.tag && tag !== args.tag) {
        continue;
      }

      if (!operationsByTag.has(tag)) {
        operationsByTag.set(tag, []);
      }

      operationsByTag.get(tag).push(item);
    }
  }

  if (!operationsByTag.size) {
    throw new UserError("No operations matched the provided filters.", describeFilters(args));
  }

  for (const [tagName, operations] of operationsByTag.entries()) {
    renderTag(tagName, renderMode);

    for (const item of operations) {
      renderOperation(item);
    }
  }
}

function operationMatchesFilters({ method, path: apiPath, operation }, args) {
  if (args.operationId && operation.operationId !== args.operationId) {
    return false;
  }

  if (args.method && method !== args.method) {
    return false;
  }

  if (args.path && apiPath !== args.path) {
    return false;
  }

  return true;
}

function describeFilters(args) {
  return [
    args.tag ? `--tag ${args.tag}` : null,
    args.operationId ? `--operation-id ${args.operationId}` : null,
    args.method ? `--method ${args.method}` : null,
    args.path ? `--path ${args.path}` : null
  ].filter(Boolean).join("\n") || "No filters provided.";
}

function renderTag(tagName, renderMode) {
  const tag = spec.tags?.find((item) => item.name === tagName);
  const className = renderMode === "full"
    ? "api-tag-title api-tag-title-full"
    : "api-tag-title api-tag-title-fragment";

  md.push(`<div class="${className}">${escapeHtml(tagName)}</div>`);
  md.push("");

  if (tag?.description) {
    md.push(`<div class="api-tag-description">`);
    md.push(escapeHtml(tag.description));
    md.push(`</div>`);
    md.push("");
  }

  if (tag?.externalDocs?.url) {
    const label = tag.externalDocs.description ?? "Find out more";
    md.push(`<a class="api-external-doc" href="${escapeHtml(tag.externalDocs.url)}">${escapeHtml(label)}</a>`);
    md.push("");
  }
}

function renderOperation({ method, path: apiPath, operation, pathParameters }) {
  const methodClass = method.toLowerCase();
  const summary = operation.summary ?? operation.operationId ?? `${method} ${apiPath}`;

  md.push(`<div class="api-operation api-${methodClass}">`);
  md.push(`  <span class="api-method">${method}</span>`);
  md.push(`  <code class="api-path">${escapeHtml(apiPath)}</code>`);
  md.push(`</div>`);
  md.push("");

  md.push(`<div class="api-operation-title">${escapeHtml(summary)}</div>`);
  md.push("");

  if (operation.deprecated) {
    md.push(`<div class="api-deprecated">`);
    md.push(`  <strong>Deprecated</strong>`);
    md.push(`  <span>This operation is deprecated.</span>`);
    md.push(`</div>`);
    md.push("");
  }

  if (operation.description) {
    md.push(`<div class="api-operation-description">`);
    md.push(escapeHtml(operation.description));
    md.push(`</div>`);
    md.push("");
  }

  renderParameters(pathParameters, operation);
  renderRequestBody(operation);
  renderResponses(operation);

  md.push(`<div class="api-operation-separator"></div>`);
  md.push("");
}

/* ========================================================================
   Parameters
   ======================================================================== */

function renderParameters(pathParameters, operation) {
  const parameters = [
    ...normalizeParameters(pathParameters),
    ...normalizeParameters(operation.parameters ?? [])
  ];

  const uniqueParameters = deduplicateParameters(parameters);

  if (!uniqueParameters.length) {
    return;
  }

  md.push(`<div class="api-section api-section-parameters">Parameters</div>`);
  md.push("");
  md.push(`<table class="api-table api-parameters-table">`);
  md.push(`  <thead><tr><th>Name</th><th>Description</th></tr></thead>`);
  md.push(`  <tbody>`);

  for (const parameter of uniqueParameters) {
    const name = parameter.name ?? "body";
    const required = parameter.required ? ` <strong class="api-required">required</strong>` : "";
    const location = parameter.in ? `(${parameter.in})` : "";
    const type = formatParameterType(parameter);
    const description = parameter.description ?? "none";

    md.push(`    <tr>`);
    md.push(`      <td><code>${escapeHtml(name)}</code>${required}<br><code>${escapeHtml(type)}</code><br>${location ? `<code>${escapeHtml(location)}</code>` : ""}</td>`);
    md.push(`      <td>${escapeHtml(description)}</td>`);
    md.push(`    </tr>`);
  }

  md.push(`  </tbody>`);
  md.push(`</table>`);
  md.push("");
}

function normalizeParameters(parameters) {
  return parameters.map(resolveRef).filter(Boolean);
}

function deduplicateParameters(parameters) {
  const seen = new Set();
  const result = [];

  for (const parameter of parameters) {
    const key = `${parameter.in ?? "unknown"}:${parameter.name ?? "unknown"}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(parameter);
  }

  return result;
}

function formatParameterType(parameter) {
  if (parameter.type === "file") {
    return "file";
  }

  if (parameter.schema) {
    return formatSchemaType(parameter.schema);
  }

  if (parameter.content) {
    const firstMediaType = Object.values(parameter.content)[0];
    return formatSchemaType(firstMediaType?.schema ?? {});
  }

  const type = parameter.type ?? "object";
  const format = parameter.format ? `($${parameter.format})` : "";

  if (parameter.type === "array" && parameter.items) {
    return `array[${formatSchemaType(parameter.items)}]`;
  }

  return `${type}${format}`;
}

/* ========================================================================
   Request body
   ======================================================================== */

function renderRequestBody(operation) {
  if (operation.requestBody) {
    const requestBody = resolveRef(operation.requestBody);

    if (!requestBody.content) {
      warn(`requestBody found without content in operation '${operation.operationId ?? operation.summary ?? "unknown"}'.`);
      return;
    }

    md.push(`<div class="api-section api-section-request">Request Body</div>`);
    md.push("");

    if (requestBody.description) {
      md.push(`<div class="api-operation-description">${escapeHtml(requestBody.description)}</div>`);
      md.push("");
    }

    for (const [contentType, mediaType] of Object.entries(requestBody.content ?? {})) {
      renderContentType("Content-Type", contentType);
      renderSchemaPropertiesTable(mediaType.schema);

      const example = getMediaTypeExample(mediaType);

      if (example !== undefined) {
        renderExampleBlock("Example Value", example, contentType);
      }
    }

    md.push("");
    return;
  }

  const bodyParameter = operation.parameters
    ?.map(resolveRef)
    .find((parameter) => parameter.in === "body");

  if (bodyParameter?.schema) {
    md.push(`<div class="api-section api-section-request">Request Body</div>`);
    md.push("");

    if (bodyParameter.description) {
      md.push(`<div class="api-operation-description">${escapeHtml(bodyParameter.description)}</div>`);
      md.push("");
    }

    const consumes = operation.consumes ?? spec.consumes ?? ["application/json"];

    for (const contentType of consumes) {
      renderContentType("Content-Type", contentType);
      renderSchemaPropertiesTable(bodyParameter.schema);
      renderExampleBlock("Example Value", buildExample(bodyParameter.schema), contentType);
    }

    md.push("");
  }
}

/* ========================================================================
   Responses
   ======================================================================== */

function renderResponses(operation) {
  const responses = operation.responses ?? {};

  if (!Object.keys(responses).length) {
    return;
  }

  md.push(`<div class="api-section api-section-responses">Responses</div>`);
  md.push("");

  const responseContentType = getFirstResponseContentType(operation);

  if (responseContentType) {
    renderContentType("Response content type", responseContentType);
  }

  md.push(`<table class="api-table api-responses-table">`);
  md.push(`  <thead><tr><th>Code</th><th>Description</th></tr></thead>`);
  md.push(`  <tbody>`);

  for (const [statusCode, response] of Object.entries(responses)) {
    const resolvedResponse = resolveRef(response);

    md.push(`    <tr><td><code>${escapeHtml(statusCode)}</code></td><td>${escapeHtml(resolvedResponse.description ?? "none")}</td></tr>`);
  }

  md.push(`  </tbody>`);
  md.push(`</table>`);
  md.push("");

  const firstResponse = findFirstResponseWithSchema(responses);

  if (firstResponse) {
    const { statusCode, contentType, schema, mediaType } = firstResponse;
    const example = getMediaTypeExample(mediaType) ?? buildExample(schema);

    renderExampleBlock(`Example Value - Status ${statusCode}`, example, contentType ?? "application/json");

    md.push(`<div class="api-model-title">Model</div>`);
    md.push("");
    renderSchemaPropertiesTable(schema);
    md.push("");
  }
}

function getFirstResponseContentType(operation) {
  for (const response of Object.values(operation.responses ?? {})) {
    const resolvedResponse = resolveRef(response);

    if (resolvedResponse.content) {
      return Object.keys(resolvedResponse.content)[0];
    }
  }

  const produces = operation.produces ?? spec.produces;

  return produces?.length ? produces[0] : null;
}

function findFirstResponseWithSchema(responses) {
  for (const [statusCode, response] of Object.entries(responses)) {
    const resolvedResponse = resolveRef(response);

    if (resolvedResponse.schema) {
      return {
        statusCode,
        contentType: (spec.produces ?? ["application/json"])[0],
        schema: resolvedResponse.schema,
        mediaType: null
      };
    }

    if (resolvedResponse.content) {
      for (const [contentType, mediaType] of Object.entries(resolvedResponse.content)) {
        if (mediaType?.schema) {
          return {
            statusCode,
            contentType,
            schema: mediaType.schema,
            mediaType
          };
        }
      }
    }
  }

  return null;
}

/* ========================================================================
   Schemas
   ======================================================================== */

function renderSchemas(renderMode) {
  const schemas = getSchemas();

  if (!Object.keys(schemas).length) {
    return;
  }

  md.push(renderMode === "full"
    ? `<div class="api-main-section-title">Schemas</div>`
    : `<div class="api-tag-title api-tag-title-fragment">Schemas</div>`);
  md.push("");

  for (const [schemaName, schema] of Object.entries(schemas)) {
    const resolvedSchema = resolveRef(schema);

    md.push(`<div class="api-schema-title">${escapeHtml(schemaName)}</div>`);
    md.push("");
    md.push(`<div class="api-schema-card">`);

    if (resolvedSchema.description) {
      md.push(`<div class="api-description">${escapeHtml(resolvedSchema.description)}</div>`);
    }

    md.push(`<div class="api-content-type">Type: <code>${escapeHtml(getSchemaDisplayType(resolvedSchema))}</code></div>`);
    md.push("");

    renderSchemaPropertiesTable(resolvedSchema);

    const example = buildExample(resolvedSchema);

    if (example !== undefined) {
      renderExampleBlock("Example Value", example, "application/json");
    }

    md.push(`</div>`);
    md.push("");
  }
}

function renderSchemaPropertiesTable(schema) {
  const resolvedSchema = normalizeComposedSchema(resolveRef(schema));

  if (!resolvedSchema) {
    return;
  }

  if (resolvedSchema.type === "array") {
    md.push(`<div class="api-array-label">Array of:</div>`);
    md.push("");
    renderSchemaPropertiesTable(resolvedSchema.items ?? {});
    return;
  }

  const properties = resolvedSchema.properties ?? {};
  const required = new Set(resolvedSchema.required ?? []);

  if (!Object.keys(properties).length) {
    md.push(`<div class="api-primitive-schema"><code>${escapeHtml(formatSchemaType(resolvedSchema))}</code></div>`);
    md.push("");
    return;
  }

  md.push(`<table class="api-table api-schema-table">`);
  md.push(`  <thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>`);
  md.push(`  <tbody>`);

  for (const [propertyName, propertySchema] of Object.entries(properties)) {
    const resolvedProperty = normalizeComposedSchema(resolveRef(propertySchema));

    md.push(`    <tr>`);
    md.push(`      <td><code>${escapeHtml(propertyName)}</code></td>`);
    md.push(`      <td><code>${escapeHtml(formatSchemaType(propertySchema))}</code></td>`);
    md.push(`      <td>${required.has(propertyName) ? `<span class="api-required">yes</span>` : "no"}</td>`);
    md.push(`      <td>${escapeHtml(resolvedProperty.description ?? "none")}</td>`);
    md.push(`    </tr>`);
  }

  md.push(`  </tbody>`);
  md.push(`</table>`);
  md.push("");
}

function getSchemas() {
  return spec.components?.schemas ?? spec.definitions ?? {};
}

/* ========================================================================
   Examples and schema formatting
   ======================================================================== */

function renderContentType(label, contentType) {
  md.push(`<div class="api-content-type">${escapeHtml(label)}: <code>${escapeHtml(contentType)}</code></div>`);
  md.push("");
}

function renderExampleBlock(title, example, contentType) {
  md.push(`<div class="api-example">`);
  md.push(`  <div class="api-example-title">${escapeHtml(title)}</div>`);
  md.push(`  <pre><code class="language-${contentType?.includes("xml") ? "xml" : "json"}">${escapeHtml(formatExample(example, contentType))}</code></pre>`);
  md.push(`</div>`);
  md.push("");
}

function formatExample(example, contentType) {
  if (contentType?.includes("xml")) {
    return typeof example === "string" ? example : "<!-- XML example not generated -->";
  }

  return JSON.stringify(example, null, 2);
}

function getMediaTypeExample(mediaType) {
  if (!mediaType) {
    return undefined;
  }

  if (mediaType.example !== undefined) {
    return mediaType.example;
  }

  if (mediaType.examples) {
    const firstExample = Object.values(mediaType.examples)[0];
    const resolvedExample = resolveRef(firstExample);

    if (resolvedExample?.value !== undefined) {
      return resolvedExample.value;
    }
  }

  if (mediaType.schema) {
    return buildExample(mediaType.schema);
  }

  return undefined;
}

function buildExample(schema) {
  const resolved = normalizeComposedSchema(resolveRef(schema));

  if (!resolved) {
    return undefined;
  }

  if (resolved.example !== undefined) {
    return resolved.example;
  }

  if (resolved.default !== undefined) {
    return resolved.default;
  }

  if (resolved.enum?.length) {
    return resolved.enum[0];
  }

  if (resolved.oneOf?.length) {
    return buildExample(resolved.oneOf[0]);
  }

  if (resolved.anyOf?.length) {
    return buildExample(resolved.anyOf[0]);
  }

  const type = getSchemaDisplayType(resolved);

  if (resolved.type === "array") {
    return [buildExample(resolved.items ?? {})];
  }

  if (resolved.type === "object" || resolved.properties || resolved.additionalProperties) {
    const result = {};

    for (const [propertyName, propertySchema] of Object.entries(resolved.properties ?? {})) {
      result[propertyName] = buildExample(propertySchema);
    }

    if (!Object.keys(result).length && resolved.additionalProperties) {
      result.additionalProperty = buildExample(resolved.additionalProperties === true
        ? { type: "string" }
        : resolved.additionalProperties);
    }

    return result;
  }

  if (type.startsWith("integer") || type.startsWith("number")) {
    return 0;
  }

  if (resolved.type === "boolean") {
    return true;
  }

  if (resolved.type === "string") {
    if (resolved.format === "date-time") {
      return "2026-01-01T00:00:00Z";
    }

    if (resolved.format === "date") {
      return "2026-01-01";
    }

    if (resolved.format === "binary") {
      return "file";
    }

    return "string";
  }

  return {};
}

function mergeExamples(examples) {
  const result = {};

  for (const example of examples) {
    if (example && typeof example === "object" && !Array.isArray(example)) {
      Object.assign(result, example);
    }
  }

  return result;
}

function normalizeComposedSchema(schema) {
  const resolved = resolveRef(schema);

  if (!resolved) {
    return resolved;
  }

  if (resolved.allOf?.length) {
    const merged = {
      ...resolved,
      allOf: undefined,
      properties: {},
      required: []
    };

    for (const item of resolved.allOf) {
      const normalizedItem = normalizeComposedSchema(item);

      Object.assign(merged.properties, normalizedItem.properties ?? {});
      merged.required.push(...(normalizedItem.required ?? []));

      if (!merged.type && normalizedItem.type) {
        merged.type = normalizedItem.type;
      }

      if (!merged.description && normalizedItem.description) {
        merged.description = normalizedItem.description;
      }
    }

    merged.required = [...new Set(merged.required)];
    return merged;
  }

  return resolved;
}

function formatSchemaType(schema) {
  if (schema?.$ref) {
    return extractRefName(schema.$ref);
  }

  const resolved = normalizeComposedSchema(resolveRef(schema));

  if (!resolved) {
    return "object";
  }

  if (resolved.type === "array") {
    return `array[${formatSchemaType(resolved.items ?? {})}]`;
  }

  if (resolved.oneOf?.length) {
    return resolved.oneOf.map((item) => formatSchemaType(item)).join(" | ");
  }

  if (resolved.anyOf?.length) {
    return resolved.anyOf.map((item) => formatSchemaType(item)).join(" | ");
  }

  if (resolved.additionalProperties && !resolved.properties) {
    return `map[string, ${formatSchemaType(resolved.additionalProperties === true
      ? { type: "string" }
      : resolved.additionalProperties)}]`;
  }

  if (resolved.format) {
    return `${resolved.type}($${resolved.format})`;
  }

  return resolved.type ?? "object";
}

function getSchemaDisplayType(schema) {
  const resolved = normalizeComposedSchema(schema);

  return resolved?.type ?? (resolved?.properties ? "object" : "object");
}

/* ========================================================================
   $ref resolution
   ======================================================================== */

function resolveRef(value) {
  if (!value?.$ref) {
    return value;
  }

  const ref = value.$ref;

  if (!ref.startsWith("#/") && !ref.startsWith("./") && !ref.startsWith("../")) {
    warn(`External or remote $ref is not resolved: ${ref}`);
    return value;
  }

  if (ref.startsWith("./") || ref.startsWith("../")) {
    warn(`External file $ref is not resolved: ${ref}`);
    return value;
  }

  const parts = ref.replace(/^#\//, "").split("/").map(decodeURIComponent);
  let current = spec;

  for (const part of parts) {
    current = current?.[part];

    if (current === undefined) {
      warn(`Unresolved internal $ref: ${ref}`);
      return value;
    }
  }

  return current;
}

function extractRefName(ref) {
  return decodeURIComponent(ref.split("/").pop() ?? ref);
}

/* ========================================================================
   Escaping
   ======================================================================== */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}