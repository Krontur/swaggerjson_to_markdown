#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const [, , inputArg, outputArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error(`
Usage:
  node ./scripts/openapi-swagger-like-md.mjs <input.json> <output.md>

Example:
  node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.swagger-like.md
`);
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

let spec;

try {
  const raw = fs.readFileSync(inputPath, "utf8");
  spec = JSON.parse(raw);
} catch (error) {
  console.error(`Error reading or parsing JSON file: ${inputPath}`);
  console.error(error.message);
  process.exit(1);
}

const md = [];

renderDocumentHeader();
renderServers();
renderOperationsByTags();
renderSchemas();

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, md.join("\n"), "utf8");

console.log(`Generated: ${outputPath}`);

/* ==========================================================================
   Document sections
   ========================================================================== */

function renderDocumentHeader() {
  md.push(`# ${spec.info?.title ?? "API Documentation"}`);
  md.push("");

  if (spec.openapi) {
    md.push(`- **OpenAPI Version:** \`${spec.openapi}\``);
  }

  if (spec.swagger) {
    md.push(`- **Swagger Version:** \`${spec.swagger}\``);
  }

  if (spec.info?.version) {
    md.push(`- **API Version:** \`${spec.info.version}\``);
  }

  md.push("");

  if (spec.info?.description) {
    md.push(spec.info.description);
    md.push("");
  }
}

function renderServers() {
  const servers = spec.servers ?? [];

  if (servers.length) {
    md.push("## Servers");
    md.push("");

    for (const server of servers) {
      md.push(`- \`${server.url}\``);

      if (server.description) {
        md.push(`  - ${server.description}`);
      }
    }

    md.push("");
    return;
  }

  // Swagger 2.0 support
  if (spec.host) {
    const schemes = spec.schemes?.length ? spec.schemes : ["https"];
    const basePath = spec.basePath ?? "";

    md.push("## Servers");
    md.push("");

    for (const scheme of schemes) {
      md.push(`- \`${scheme}://${spec.host}${basePath}\``);
    }

    md.push("");
  }
}

function renderOperationsByTags() {
  const operationsByTag = new Map();

  for (const [apiPath, pathItem] of Object.entries(spec.paths ?? {})) {
    for (const method of ["get", "post", "put", "delete", "patch", "options", "head"]) {
      const operation = pathItem?.[method];

      if (!operation) {
        continue;
      }

      const tags = operation.tags?.length ? operation.tags : ["default"];

      for (const tag of tags) {
        if (!operationsByTag.has(tag)) {
          operationsByTag.set(tag, []);
        }

        operationsByTag.get(tag).push({
          method: method.toUpperCase(),
          path: apiPath,
          operation,
          pathParameters: pathItem.parameters ?? []
        });
      }
    }
  }

  for (const [tagName, operations] of operationsByTag.entries()) {
    renderTag(tagName);

    for (const item of operations) {
      renderOperation(item);
    }
  }
}

function renderTag(tagName) {
  const tag = spec.tags?.find((item) => item.name === tagName);

  md.push(`# ${tagName}`);
  md.push("");

  if (tag?.description) {
    md.push(tag.description);
    md.push("");
  }

  if (tag?.externalDocs?.url) {
    const label = tag.externalDocs.description ?? "Find out more";
    md.push(`[${label}](${tag.externalDocs.url})`);
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

  md.push(`## ${summary}`);
  md.push("");

  if (operation.deprecated) {
    md.push("> [!warning]");
    md.push("> This operation is deprecated.");
    md.push("");
  }

  if (operation.description) {
    md.push(operation.description);
    md.push("");
  }

  renderParameters(pathParameters, operation);
  renderRequestBody(operation);
  renderResponses(operation);

  md.push("---");
  md.push("");
}

/* ==========================================================================
   Parameters
   ========================================================================== */

function renderParameters(pathParameters, operation) {
  const parameters = [
    ...normalizeParameters(pathParameters),
    ...normalizeParameters(operation.parameters ?? [])
  ];

  const uniqueParameters = deduplicateParameters(parameters);

  if (!uniqueParameters.length) {
    return;
  }

  md.push("### Parameters");
  md.push("");
  md.push("| Name | Description |");
  md.push("|---|---|");

  for (const parameter of uniqueParameters) {
    const name = parameter.name ?? "body";
    const required = parameter.required ? " *required*" : "";
    const location = parameter.in ? `(${parameter.in})` : "";
    const type = formatParameterType(parameter);
    const description = parameter.description ?? "none";

    const left = [
      `\`${escapePipes(name)}\`${required}`,
      type,
      location ? `\`${location}\`` : ""
    ].filter(Boolean).join("<br>");

    md.push(`| ${left} | ${escapePipes(description)} |`);
  }

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
    return "`file`";
  }

  if (parameter.schema) {
    return `\`${formatSchemaType(resolveRef(parameter.schema))}\``;
  }

  if (parameter.content) {
    const firstMediaType = Object.values(parameter.content)[0];
    return `\`${formatSchemaType(resolveRef(firstMediaType?.schema ?? {}))}\``;
  }

  const type = parameter.type ?? "object";
  const format = parameter.format ? `($${parameter.format})` : "";

  if (parameter.type === "array" && parameter.items) {
    return `\`array[${formatSchemaType(resolveRef(parameter.items))}]\``;
  }

  return `\`${type}${format}\``;
}

/* ==========================================================================
   Request body
   ========================================================================== */

function renderRequestBody(operation) {
  // OpenAPI 3.x requestBody
  if (operation.requestBody?.content) {
    const requestBody = resolveRef(operation.requestBody);

    md.push("### Request Body");
    md.push("");

    if (requestBody.description) {
      md.push(requestBody.description);
      md.push("");
    }

    for (const [contentType, mediaType] of Object.entries(requestBody.content ?? {})) {
      md.push(`**Content-Type:** \`${contentType}\``);
      md.push("");

      renderSchemaPropertiesTable(mediaType.schema);

      const example = getMediaTypeExample(mediaType);

      if (example !== undefined) {
        md.push("#### Example Value");
        md.push("");
        renderExample(example, contentType);
        md.push("");
      }
    }

    md.push("");
    return;
  }

  // Swagger 2.0 body parameter
  const bodyParameter = operation.parameters
    ?.map(resolveRef)
    .find((parameter) => parameter.in === "body");

  if (bodyParameter?.schema) {
    md.push("### Request Body");
    md.push("");

    if (bodyParameter.description) {
      md.push(bodyParameter.description);
      md.push("");
    }

    const consumes = operation.consumes ?? spec.consumes ?? ["application/json"];

    for (const contentType of consumes) {
      md.push(`**Content-Type:** \`${contentType}\``);
      md.push("");

      renderSchemaPropertiesTable(bodyParameter.schema);

      const example = buildExample(resolveRef(bodyParameter.schema));
      md.push("#### Example Value");
      md.push("");
      renderExample(example, contentType);
      md.push("");
    }

    md.push("");
  }
}

/* ==========================================================================
   Responses
   ========================================================================== */

function renderResponses(operation) {
  const responses = operation.responses ?? {};

  if (!Object.keys(responses).length) {
    return;
  }

  md.push("### Responses");
  md.push("");

  const responseContentType = getFirstResponseContentType(operation);

  if (responseContentType) {
    md.push(`**Response content type:** \`${responseContentType}\``);
    md.push("");
  }

  md.push("| Code | Description |");
  md.push("|---|---|");

  for (const [statusCode, response] of Object.entries(responses)) {
    const resolvedResponse = resolveRef(response);
    md.push(`| \`${statusCode}\` | ${escapePipes(resolvedResponse.description ?? "none")} |`);
  }

  md.push("");

  const firstResponse = findFirstResponseWithSchema(responses);

  if (firstResponse) {
    const { statusCode, contentType, schema, mediaType } = firstResponse;

    md.push(`#### Example Value`);
    md.push("");
    md.push(`Status Code: \`${statusCode}\``);
    md.push("");

    const example = getMediaTypeExample(mediaType) ?? buildExample(resolveRef(schema));
    renderExample(example, contentType ?? "application/json");
    md.push("");

    md.push("#### Model");
    md.push("");
    renderSchemaPropertiesTable(schema);
    md.push("");
  }
}

function getFirstResponseContentType(operation) {
  // OpenAPI 3.x
  for (const response of Object.values(operation.responses ?? {})) {
    const resolvedResponse = resolveRef(response);

    if (resolvedResponse.content) {
      return Object.keys(resolvedResponse.content)[0];
    }
  }

  // Swagger 2.0
  const produces = operation.produces ?? spec.produces;

  if (produces?.length) {
    return produces[0];
  }

  return null;
}

function findFirstResponseWithSchema(responses) {
  for (const [statusCode, response] of Object.entries(responses)) {
    const resolvedResponse = resolveRef(response);

    // Swagger 2.0
    if (resolvedResponse.schema) {
      return {
        statusCode,
        contentType: (spec.produces ?? ["application/json"])[0],
        schema: resolvedResponse.schema,
        mediaType: null
      };
    }

    // OpenAPI 3.x
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

/* ==========================================================================
   Schemas
   ========================================================================== */

function renderSchemas() {
  const schemas = getSchemas();

  if (!Object.keys(schemas).length) {
    return;
  }

  md.push("# Schemas");
  md.push("");

  for (const [schemaName, schema] of Object.entries(schemas)) {
    const resolvedSchema = resolveRef(schema);

    md.push(`## ${schemaName}`);
    md.push("");

    if (resolvedSchema.description) {
      md.push(resolvedSchema.description);
      md.push("");
    }

    md.push(`- **Type:** \`${resolvedSchema.type ?? "object"}\``);
    md.push("");

    renderSchemaPropertiesTable(resolvedSchema);

    const example = buildExample(resolvedSchema);

    if (example !== undefined) {
      md.push("#### Example Value");
      md.push("");
      renderExample(example, "application/json");
      md.push("");
    }
  }
}

function renderSchemaPropertiesTable(schema) {
  const resolvedSchema = resolveRef(schema);

  if (!resolvedSchema) {
    return;
  }

  if (resolvedSchema.type === "array") {
    const itemSchema = resolveRef(resolvedSchema.items ?? {});

    md.push("**Array of:**");
    md.push("");
    renderSchemaPropertiesTable(itemSchema);
    return;
  }

  const properties = resolvedSchema.properties ?? {};
  const required = new Set(resolvedSchema.required ?? []);

  if (!Object.keys(properties).length) {
    const type = formatSchemaType(resolvedSchema);
    md.push(`\`${type}\``);
    md.push("");
    return;
  }

  md.push("| Property | Type | Required | Description |");
  md.push("|---|---|---|---|");

  for (const [propertyName, propertySchema] of Object.entries(properties)) {
    const resolvedProperty = resolveRef(propertySchema);

    md.push(
      `| \`${escapePipes(propertyName)}\` | ${escapePipes(formatSchemaType(resolvedProperty))} | ${required.has(propertyName) ? "yes" : "no"} | ${escapePipes(resolvedProperty.description ?? "none")} |`
    );
  }

  md.push("");
}

function getSchemas() {
  return spec.components?.schemas ?? spec.definitions ?? {};
}

/* ==========================================================================
   Examples and schema formatting
   ========================================================================== */

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
    return buildExample(resolveRef(mediaType.schema));
  }

  return undefined;
}

function buildExample(schema) {
  const resolved = resolveRef(schema);

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

  if (resolved.allOf?.length) {
    return mergeExamples(resolved.allOf.map((item) => buildExample(resolveRef(item))));
  }

  if (resolved.oneOf?.length) {
    return buildExample(resolveRef(resolved.oneOf[0]));
  }

  if (resolved.anyOf?.length) {
    return buildExample(resolveRef(resolved.anyOf[0]));
  }

  if (resolved.type === "array") {
    return [buildExample(resolveRef(resolved.items ?? {}))];
  }

  if (resolved.type === "object" || resolved.properties) {
    const result = {};
    const properties = resolved.properties ?? {};

    for (const [propertyName, propertySchema] of Object.entries(properties)) {
      result[propertyName] = buildExample(resolveRef(propertySchema));
    }

    return result;
  }

  if (resolved.type === "integer" || resolved.type === "number") {
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

function renderExample(example, contentType) {
  if (contentType?.includes("xml")) {
    md.push("```xml");
    md.push(typeof example === "string" ? example : "<!-- XML example not generated -->");
    md.push("```");
    return;
  }

  md.push("```json");
  md.push(JSON.stringify(example, null, 2));
  md.push("```");
}

function formatSchemaType(schema) {
  const resolved = resolveRef(schema);

  if (!resolved) {
    return "object";
  }

  if (schema?.$ref) {
    return `[${extractRefName(schema.$ref)}](#${extractRefName(schema.$ref)})`;
  }

  if (resolved.type === "array") {
    return `array[${formatSchemaType(resolveRef(resolved.items ?? {}))}]`;
  }

  if (resolved.allOf?.length) {
    return resolved.allOf.map((item) => formatSchemaType(item)).join(" & ");
  }

  if (resolved.oneOf?.length) {
    return resolved.oneOf.map((item) => formatSchemaType(item)).join(" | ");
  }

  if (resolved.anyOf?.length) {
    return resolved.anyOf.map((item) => formatSchemaType(item)).join(" | ");
  }

  if (resolved.format) {
    return `${resolved.type}($${resolved.format})`;
  }

  return resolved.type ?? "object";
}

/* ==========================================================================
   $ref resolution
   ========================================================================== */

function resolveRef(value) {
  if (!value?.$ref) {
    return value;
  }

  const ref = value.$ref;
  const parts = ref.replace(/^#\//, "").split("/").map(decodeURIComponent);

  let current = spec;

  for (const part of parts) {
    current = current?.[part];

    if (current === undefined) {
      return value;
    }
  }

  return current;
}

function extractRefName(ref) {
  return decodeURIComponent(ref.split("/").pop() ?? ref);
}

/* ==========================================================================
   Escaping
   ========================================================================== */

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapePipes(value) {
  return String(value)
    .replaceAll("|", "\\|")
    .replaceAll("\n", "<br>");
}