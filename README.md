# OpenAPI Swagger-like Markdown Generator

Generador de documentacion API en Markdown a partir de un fichero `swagger.json` u `openapi.json`.

El objetivo del proyecto es producir una documentacion parecida a Swagger UI, pero pensada para Obsidian, para lectura estatica y para exportacion a PDF. No intenta reproducir controles interactivos como `Try it out`, campos de texto o botones `Execute`, porque esos elementos no funcionan dentro de un PDF.

## Caracteristicas

- Convierte Swagger 2.0 y OpenAPI 3.x a Markdown.
- Genera documentacion completa (`full`) o fragmentos reutilizables (`fragment`).
- Agrupa operaciones por `tags`.
- Permite filtrar por `tag`, `operationId`, metodo HTTP y path.
- Genera secciones para informacion general, servidores, endpoints, parametros, request body, responses, examples y schemas.
- Usa headings Markdown reales para que Obsidian y los exportadores PDF puedan crear indice y marcadores.
- Mantiene bloques HTML controlados con clases `api-*` para aplicar estilos tipo Swagger con CSS snippets de Obsidian.
- Sanitiza HTML enriquecido en `description`, incluyendo tablas, listas, `code`, `tt`, enlaces y saltos de linea.
- Renderiza tablas HTML de descriptions de forma segura para PDF, evitando que se salgan del margen.
- Renderiza todos los `examples` nombrados de request bodies, responses y parametros.
- Renderiza el detalle de cada response status code, no solo el primer response.
- Genera ejemplos como bloques Markdown fenced, por ejemplo ` ```json ` o ` ```xml `, para que el codigo se vea limpio y no aparezca como `&lt;env:Header&gt;` en el Markdown.
- Resuelve `$ref` internos y muestra warnings para `$ref` no resueltos o externos.

## Requisitos

- Node.js 18 o superior.
- npm, pnpm o yarn.

Instala las dependencias:

```bash
npm install
```

Los ejemplos del README usan `node` directamente para evitar duplicar comandos. Si prefieres usar el script del `package.json`, este formato es equivalente:

```bash
npm run api:docs -- <input.json> <output.md> [options]
```

El mismo comando es compatible con pnpm/yarn usando el equivalente de cada gestor:

```bash
pnpm run api:docs -- <input.json> <output.md> [options]
yarn api:docs <input.json> <output.md> [options]
```

## Uso basico

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.swagger-like.md
```

Ejemplo con el fichero de este proyecto:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/20260506_MW_api-docs.json ./docs/generated/20260506_MW_api-docs_full.md --mode full
```

## Opciones

```text
--mode full|fragment          Output mode. Default: full
--tag <tagName>               Generate only operations with this tag
--operation-id <operationId>  Generate only one operation by operationId
--method <HTTP_METHOD>        Filter by HTTP method: GET, POST, PUT, DELETE, PATCH...
--path <apiPath>              Filter by API path, for example /pet/{petId}
--headings                    Generate Markdown headings for PDF bookmarks. Default: enabled
--no-headings                 Disable Markdown headings and use HTML title blocks only
--heading-offset <1..5>       Base heading level for fragments. Default: 2
--help, -h                    Show help
```

Ver ayuda:

```bash
node ./scripts/openapi-swagger-like-md.mjs --help
```

## Modos de generacion

### Modo full

Genera una documentacion completa con:

- frontmatter de Obsidian;
- titulo principal;
- informacion general de la API;
- servidores;
- operaciones agrupadas por tags;
- schemas.

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api-full.md --mode full
```

El documento generado incluye:

```md
---
cssclasses:
  - swagger-api-doc
  - swagger-api-full
---
```

### Modo fragment

Genera un fragmento reutilizable para incrustar en otra nota de Obsidian.

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet
```

El fragmento generado incluye:

```md
---
cssclasses:
  - swagger-api-doc
  - swagger-api-fragment
---
```

Si se incrusta con `![[...]]`, la nota padre tambien debe tener `cssclasses: swagger-api-doc`.

## Filtros

Generar solo un tag:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./pet.md --mode fragment --tag pet
```

Generar solo una operacion por `operationId`:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet
```

Generar solo una operacion por metodo y path:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./post-pet.md --mode fragment --method POST --path /pet
```

## Contenido generado

Para cada operacion, la salida incluye contenido estatico equivalente a lo que se consulta en Swagger UI:

- summary y description;
- metodo HTTP y path;
- parametros, incluyendo ejemplos declarados en `example` o `examples`;
- request body con description, schema y todos los examples nombrados;
- responses con tabla resumen;
- detalle por cada status code;
- content-type de cada response;
- examples nombrados de cada response;
- modelo/schema de cada response;
- schemas globales.

Los controles interactivos de Swagger UI no se generan, porque no aportan valor en Obsidian/PDF:

- `Try it out`;
- inputs editables;
- botones `Execute`;
- selectores interactivos.

## Examples y codigo XML/JSON

Los examples se generan como bloques Markdown fenced:

````md
```xml
<env:Header>
  <ns3:Action>...</ns3:Action>
</env:Header>
```
````

Esto evita que el Markdown contenga entidades visibles como:

```text
&lt;env:Header&gt;
```

En el PDF se vera el XML/JSON como codigo, sin convertir las etiquetas en HTML real.

## Rich text en descriptions

Las descriptions de OpenAPI pueden contener HTML. El generador lo sanitiza y conserva contenido util como:

- parrafos;
- saltos de linea;
- listas;
- tablas;
- `code` y `tt`;
- enlaces seguros `http`, `https` y `mailto`;
- `colspan` y `rowspan` en tablas.

Las tablas de descriptions reciben la clase `api-description-table` y el CSS las fuerza a ser compatibles con PDF:

- `table-layout: fixed`;
- `width: 100%`;
- `word-break: break-word`;
- `overflow-wrap: anywhere`;
- tamano de fuente reducido en impresion.

## CSS en Obsidian

El proyecto incluye el snippet:

```text
css/swagger-api-doc.css
```

Para activarlo en Obsidian:

1. Copia `css/swagger-api-doc.css` a:

```text
TU_VAULT/.obsidian/snippets/swagger-api-doc.css
```

2. Abre Obsidian.
3. Ve a `Settings -> Appearance -> CSS snippets`.
4. Recarga snippets.
5. Activa `swagger-api-doc`.

El documento generado ya incluye el frontmatter necesario:

```md
---
cssclasses:
  - swagger-api-doc
  - swagger-api-full
---
```

Para fragmentos embebidos, la nota padre tambien debe incluir:

```md
---
cssclasses:
  - swagger-api-doc
---
```

## Exportar a PDF con marcadores

Recomendacion importante: para que el PDF contenga marcadores/bookmarks fiables, exporta desde Obsidian usando el plugin **Better Export PDF**.

El exportador PDF nativo de Obsidian no genera bien los marcadores en algunos casos, especialmente cuando el documento combina Markdown, HTML, tablas grandes, bloques de codigo y fragmentos embebidos.

Para obtener marcadores correctos:

1. Genera un documento en modo `full`.
2. Abre directamente ese `.md` generado en Obsidian.
3. Asegurate de tener activado el CSS snippet `swagger-api-doc`.
4. Exporta con **Better Export PDF**.

Ejemplo recomendado:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/20260506_MW_api-docs.json ./docs/generated/20260506_MW_api-docs_full.md --mode full
```

Exporta este fichero directamente:

```text
docs/generated/20260506_MW_api-docs_full.md
```

Evita exportar una nota padre que solo embeba el documento con:

```md
![[docs/generated/20260506_MW_api-docs_full.md]]
```

Los fragments son utiles para documentacion manual, pero para un PDF formal con marcadores es mas fiable exportar el fichero `full` directamente.

## Estructura recomendada

```text
mi-vault/
  docs/
    openapi/
      swagger.json
    generated/
      api-full.md
      fragments/
        add-pet.md
  css/
    swagger-api-doc.css
```

Generar documentacion completa:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/swagger.json ./docs/generated/api-full.md --mode full
```

Generar un fragmento:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/swagger.json ./docs/generated/fragments/add-pet.md --mode fragment --operation-id addPet
```

## Errores y warnings

El proceso termina con codigo `1` para errores de entrada o configuracion:

- fichero inexistente;
- JSON invalido;
- documento sin `openapi` ni `swagger`;
- documento sin `info`;
- documento sin `paths`;
- modo no valido;
- opcion desconocida;
- filtros sin coincidencias.

Los warnings no detienen la generacion. Se usan para casos como:

- `$ref` interno no resuelto;
- `$ref` externo a otro fichero;
- `$ref` remoto por URL.

Ejemplo:

```text
Warnings:
- Unresolved internal $ref: #/components/schemas/MissingSchema
- External file $ref is not resolved: ./schemas/Pet.json
```

## Limitaciones conocidas

- No se resuelven `$ref` externos a otros ficheros.
- No se resuelven `$ref` remotos por URL.
- La generacion XML automatica es limitada; si el OpenAPI trae XML en examples, se conserva y se renderiza como codigo.
- Schemas extremadamente complejos pueden requerir ajustes adicionales.
- El resultado visual depende del snippet CSS y del tema activo de Obsidian.

## Problemas habituales

### Los estilos no se ven en Obsidian

Comprueba:

- que `swagger-api-doc.css` esta dentro de `.obsidian/snippets`;
- que el snippet esta activado;
- que estas en Reading View;
- que la nota contiene `cssclasses: swagger-api-doc`.

### El PDF no tiene marcadores

Usa **Better Export PDF**. El exportador nativo de Obsidian puede no generar marcadores correctamente.

Tambien comprueba que:

- estas exportando el fichero generado en modo `full`;
- el documento tiene headings Markdown reales;
- no estas exportando una nota padre que embebe el documento generado.

### Aparecen `&lt;` y `&gt;` en examples XML

En la version actual, los examples se generan como fenced code blocks y no deberian aparecer entidades como `&lt;env:Header&gt;` en el Markdown generado.

Regenera el documento:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/20260506_MW_api-docs.json ./docs/generated/20260506_MW_api-docs_full.md --mode full
```

### Hay warnings de `$ref` no resueltos

Revisa que el schema, parameter o response referenciado existe en el JSON. Si usas referencias externas, haz bundle del OpenAPI antes de ejecutar este generador.

## Changelog

### v0.5.0

#### Aniadido

- Headings Markdown reales para generar indices y marcadores PDF.
- Opcion `--headings`, `--no-headings` y `--heading-offset`.
- Frontmatter diferenciado para `swagger-api-full` y `swagger-api-fragment`.
- Sanitizado de rich text en descriptions.
- Soporte para tablas HTML dentro de descriptions.
- Soporte para todos los `examples` nombrados en request bodies y responses.
- Soporte para examples en parametros.
- Detalle por cada response status code.
- Examples como fenced code blocks para JSON, XML y texto.
- CSS mas robusto para PDF, tablas grandes y bloques de codigo.
- Recomendacion de exportar PDFs con Better Export PDF para marcadores fiables.

#### Cambiado

- Los examples ya no se renderizan como `<pre><code>` HTML escapado, sino como bloques Markdown fenced.
- Responses ya no muestran solo el primer schema/example; ahora recorren todos los status codes y content-types.
- Las descriptions HTML se limpian sin romper tablas con comentarios HTML usados como separadores.
- `compactJoin()` conserva separadores vacios para no romper headings Markdown.

#### Limitaciones conocidas

- El exportador nativo de Obsidian puede no generar marcadores PDF correctamente.
- Para PDFs finales se recomienda exportar el documento `full` directamente con Better Export PDF.

### v0.4.0

- Gestion de errores de usuario mediante mensajes claros.
- Soporte para `--help` y `-h`.
- Validacion del fichero de entrada y JSON invalido.
- Validacion de estructura minima OpenAPI/Swagger.
- Validacion de filtros y opciones.
- Sistema de warnings no bloqueantes.
- Soporte mejorado para `allOf`, `oneOf`, `anyOf`, arrays, objects y `additionalProperties`.
- Resolucion de `$ref` internos.

### v0.3.0

- Modo `full`.
- Modo `fragment`.
- Filtros por `tag`, `operationId`, metodo y path.
- Frontmatter de Obsidian.
- CSS snippet para estilo Swagger.

### v0.2.0

- CSS snippet inicial.
- Colores por metodo HTTP.
- Estructura visual para operaciones, tablas, ejemplos y schemas.

### v0.1.0

- Primera version.
- Conversion basica de Swagger/OpenAPI JSON a Markdown.

## Licencia

MIT.

## Autor

Desarrollado por `Oscar Gonzalez Tur`.

Repositorio:

```text
https://github.com/Krontur/swaggerjson_to_markdown
```
