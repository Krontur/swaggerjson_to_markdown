# OpenAPI Swagger-like Markdown Generator

Generador simple de documentación API en Markdown a partir de un fichero `swagger.json` u `openapi.json`.

El objetivo de esta herramienta es generar una documentación en Markdown con una estructura similar a Swagger UI, pero compatible con Obsidian y exportable a PDF.

## Características

- Convierte ficheros Swagger/OpenAPI en documentación Markdown.
- Soporta Swagger 2.0 y OpenAPI 3.x.
- Agrupa las operaciones por `tags`.
- Genera secciones para:
  - información general de la API;
  - servidores;
  - endpoints;
  - parámetros;
  - request body;
  - responses;
  - examples;
  - schemas.
- Añade bloques HTML simples con clases específicas `api-*` para poder aplicar estilos tipo Swagger en Obsidian.
- Compatible con CSS snippets de Obsidian.
- Permite generar documentación completa o fragmentos reutilizables.
- Permite filtrar endpoints por:
  - `tag`;
  - `operationId`;
  - método HTTP;
  - path.
- Añade gestión de errores y validaciones de entrada.
- Informa al usuario mediante mensajes claros si el JSON, los argumentos o la especificación no son válidos.
- Muestra warnings no bloqueantes para referencias `$ref` no resueltas.
- Pensado para documentación técnica exportable a PDF.

## Requisitos

Necesitas tener instalado:

- Node.js 18 o superior.
- npm, pnpm o yarn.

Puedes comprobar tu versión de Node.js con:

```bash
node -v
```

## Instalación desde GitHub

Clona el repositorio:

```bash
git clone https://github.com/Krontur/swaggerjson_to_markdown.git
```

Entra en la carpeta del proyecto:

```bash
cd swaggerjson_to_markdown
```

Instala las dependencias:

```bash
npm install
```

O si usas `pnpm`:

```bash
pnpm install
```

## Uso básico

Ejecuta el generador indicando:

1. el fichero JSON de entrada;
2. el fichero Markdown de salida.

Con Node.js directamente:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.swagger-like.md
```

Ejemplo:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/petstore.json ./docs/generated/petstore.md
```

## Uso con npm

Si el `package.json` contiene este script:

```json
{
  "type": "module",
  "scripts": {
    "api:docs": "node ./scripts/openapi-swagger-like-md.mjs"
  }
}
```

Puedes ejecutar:

```bash
npm run api:docs -- ./swagger.json ./api.swagger-like.md
```

Ejemplo:

```bash
npm run api:docs -- ./docs/openapi/petstore.json ./docs/generated/petstore.md
```

## Uso con pnpm

```bash
pnpm run api:docs -- ./swagger.json ./api.swagger-like.md
```

Ejemplo:

```bash
pnpm run api:docs -- ./docs/openapi/petstore.json ./docs/generated/petstore.md
```

## Ayuda del comando

Puedes mostrar la ayuda del generador con:

```bash
node ./scripts/openapi-swagger-like-md.mjs --help
```

O también:

```bash
node ./scripts/openapi-swagger-like-md.mjs -h
```

La ayuda muestra los argumentos obligatorios, opciones disponibles y ejemplos de uso.

## Modos de generación

La herramienta permite generar dos tipos de salida:

- `full`: genera una documentación completa de la API.
- `fragment`: genera un fragmento reutilizable para incrustarlo dentro de otra nota Markdown de Obsidian.

### Modo full

El modo `full` genera un documento completo con:

- información general de la API;
- servidores;
- operaciones agrupadas por tags;
- schemas;
- frontmatter de Obsidian con `cssclasses`.

Ejemplo:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api-full.md --mode full
```

También puedes omitir `--mode full`, ya que es el modo por defecto:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api-full.md
```

La salida generada incluye al inicio:

```md
---
cssclasses:
  - swagger-api-doc
---
```

y envuelve el contenido principal en:

```html
<div class="api-full-document">
...
</div>
```

### Modo fragment

El modo `fragment` genera un bloque reutilizable para insertarlo en una documentación mayor.

Ejemplo:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api-fragment.md --mode fragment
```

La salida generada también incluye:

```md
---
cssclasses:
  - swagger-api-doc
---
```

y envuelve el contenido del fragmento en:

```html
<div class="api-fragment">
...
</div>
```

Esto permite aplicar estilos específicos al bloque API sin modificar el estilo del resto del documento, siempre que la nota donde se visualiza tenga la clase CSS `swagger-api-doc`.

## Filtros disponibles

Además de generar toda la API, puedes generar fragmentos específicos usando filtros.

### Filtrar por tag

Genera solo las operaciones asociadas a un tag concreto:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./pet-fragment.md --mode fragment --tag pet
```

Ejemplo con `pnpm`:

```bash
pnpm run api:docs -- ./swagger.json ./pet-fragment.md --mode fragment --tag pet
```

### Filtrar por operationId

Genera solo una operación concreta usando su `operationId`:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./add-pet.md --mode fragment --operation-id addPet
```

Ejemplo:

```bash
pnpm run api:docs -- ./swagger.json ./add-pet.md --mode fragment --operation-id addPet
```

### Filtrar por método HTTP y path

Genera solo una operación concreta usando método HTTP y path:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./post-pet.md --mode fragment --method POST --path /pet
```

Ejemplo:

```bash
pnpm run api:docs -- ./swagger.json ./post-pet.md --mode fragment --method POST --path /pet
```

### Filtros sin coincidencias

Si los filtros no encuentran ninguna operación, el generador detiene la ejecución e informa del problema.

Ejemplo:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./missing.md --mode fragment --operation-id doesNotExist
```

Salida esperada:

```text
Input error: No operations matched the provided filters.
--operation-id doesNotExist
```

## Estructura recomendada

Una estructura sencilla para trabajar con Obsidian sería:

```text
mi-vault/
  docs/
    openapi/
      swagger.json
    generated/
      api.swagger-like.md
      fragments/
        add-pet.md
        get-pet-by-id.md
  scripts/
    openapi-swagger-like-md.mjs
  css/
    swagger-api-doc.css
  package.json
```

Para generar la documentación completa:

```bash
pnpm run api:docs -- ./docs/openapi/swagger.json ./docs/generated/api.swagger-like.md --mode full
```

Para generar un fragmento concreto:

```bash
pnpm run api:docs -- ./docs/openapi/swagger.json ./docs/generated/fragments/add-pet.md --mode fragment --operation-id addPet
```

Después puedes abrir el fichero generado directamente en Obsidian:

```text
docs/generated/api.swagger-like.md
```

O incrustarlo desde otra nota:

```md
![[docs/generated/api.swagger-like.md]]
```

## Uso de fragmentos dentro de documentación manual

Puedes generar fragmentos API e intercalarlos dentro de documentación funcional escrita manualmente.

Por ejemplo:

```md
---
cssclasses:
  - swagger-api-doc
---

# Guía funcional de integración

Esta sección explica cómo una aplicación externa debe crear una mascota en el sistema.

Antes de invocar el endpoint, el cliente debe preparar un cuerpo JSON válido.

![[docs/generated/fragments/add-pet.md]]

Después de recibir la petición, el backend validará el payload y devolverá el estado correspondiente.
```

Es importante que la nota donde se visualiza el fragmento tenga:

```md
---
cssclasses:
  - swagger-api-doc
---
```

El CSS está diseñado para aplicar estilos solo a elementos con clases `api-*`, por lo que el texto normal de la documentación mantiene su estilo propio.

## Ejemplo de salida

Para una operación como:

```json
{
  "summary": "Add a new pet to the store",
  "method": "POST",
  "path": "/pet"
}
```

La herramienta genera una estructura similar a:

```md
---
cssclasses:
  - swagger-api-doc
---

<div class="api-fragment">

<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet</code>
</div>

<div class="api-operation-title">Add a new pet to the store</div>

<div class="api-section api-section-request">Request Body</div>

<div class="api-content-type">Content-Type: <code>application/json</code></div>

<div class="api-section api-section-responses">Responses</div>

<table class="api-table api-responses-table">
  <thead>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>200</code></td>
      <td>successful operation</td>
    </tr>
  </tbody>
</table>

</div>
```

## Soporte para OpenAPI 3.x complejos

El generador incluye soporte mejorado para estructuras OpenAPI 3.x habituales:

- `components.schemas`;
- `components.parameters`;
- `requestBody`;
- `responses`;
- `content`;
- `examples`;
- `$ref` internos;
- `allOf`;
- `oneOf`;
- `anyOf`;
- arrays;
- objetos anidados;
- `additionalProperties`.

### `$ref` internos

El generador resuelve referencias internas como:

```json
{
  "$ref": "#/components/schemas/Pet"
}
```

También soporta referencias Swagger 2.0 como:

```json
{
  "$ref": "#/definitions/Pet"
}
```

### `$ref` no resueltos

Si una referencia interna no puede resolverse, el generador no detiene necesariamente la generación. En su lugar, muestra un warning:

```text
Warnings:
- Unresolved internal $ref: #/components/schemas/MissingSchema
```

Esto permite generar documentación parcial y detectar problemas en el contrato OpenAPI.

### `$ref` externos

Actualmente, los `$ref` externos a otros ficheros o URLs no se resuelven.

Ejemplos no resueltos:

```json
{
  "$ref": "./schemas/Pet.json"
}
```

```json
{
  "$ref": "https://example.com/schemas/Pet.json"
}
```

En estos casos, el generador muestra un warning:

```text
Warnings:
- External file $ref is not resolved: ./schemas/Pet.json
```

o:

```text
Warnings:
- External or remote $ref is not resolved: https://example.com/schemas/Pet.json
```

## Gestión de errores

El generador incluye validaciones para detectar problemas antes o durante la generación.

Cuando se produce un error de entrada o configuración, el proceso termina con código de salida `1`.

### Fichero de entrada inexistente

Comando:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./missing.json ./api.md
```

Salida:

```text
Input error: Input file not found: /ruta/absoluta/missing.json
```

### JSON inválido

Si el fichero JSON no es válido:

```text
Input error: Invalid JSON file: /ruta/absoluta/swagger.json
Expected double-quoted property name in JSON at position 67
```

### Documento sin `openapi` ni `swagger`

Si el fichero no parece una especificación OpenAPI o Swagger:

```text
Input error: The document is neither OpenAPI nor Swagger. Missing 'openapi' or 'swagger' field.
```

### Documento sin `info`

Si falta el objeto `info`:

```text
Input error: Missing required 'info' object.
```

### Documento sin `paths`

Si falta el objeto `paths`:

```text
Input error: Missing or invalid required 'paths' object.
```

### Documento sin operaciones

Si existe `paths`, pero no contiene operaciones HTTP:

```text
Input error: No operations found under 'paths'.
```

### Modo inválido

Si se indica un modo no soportado:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.md --mode invalid
```

Salida:

```text
Input error: Invalid mode: invalid. Allowed values: full, fragment.
```

### Opción desconocida

Si se usa una opción no soportada:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.md --unknown
```

Salida:

```text
Input error: Unknown option: --unknown
```

### Opción sin valor

Si una opción espera valor y no se proporciona:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./api.md --tag
```

Salida:

```text
Input error: Missing value for option --tag.
```

## Warnings

Los warnings no detienen la generación. Sirven para informar de posibles problemas en la especificación.

Ejemplos:

```text
Warnings:
- OpenAPI version '3.0.0' detected. The generator is mainly tested with OpenAPI 3.x.
- Unresolved internal $ref: #/components/schemas/MissingSchema
- External file $ref is not resolved: ./schemas/Pet.json
```

## Estilo Swagger en Obsidian

El proyecto incluye un archivo CSS con estilos tipo Swagger para mejorar la visualización del Markdown generado dentro de Obsidian.

El archivo se encuentra en:

```text
css/swagger-api-doc.css
```

Para usarlo en Obsidian:

1. Copia el archivo `css/swagger-api-doc.css` dentro de la carpeta de snippets de tu vault:

```text
TU_VAULT/.obsidian/snippets/swagger-api-doc.css
```

2. Abre Obsidian.

3. Ve a:

```text
Settings → Appearance → CSS snippets
```

4. Pulsa en recargar snippets.

5. Activa el snippet `swagger-api-doc`.

Una vez activado, abre el Markdown generado en **Reading View** para ver la documentación con un estilo similar a Swagger UI.

> Nota: los estilos solo afectan a las notas que tengan `cssclasses: swagger-api-doc` y a los elementos generados con clases `api-*`.

## Uso de `cssclasses`

Para que Obsidian aplique correctamente los estilos del snippet, el documento debe incluir al inicio:

```md
---
cssclasses:
  - swagger-api-doc
---
```

El generador añade este bloque automáticamente tanto en modo `full` como en modo `fragment`.

Si incrustas un fragmento dentro de otra nota, la nota principal también debe incluir:

```md
---
cssclasses:
  - swagger-api-doc
---
```

Ejemplo:

```md
---
cssclasses:
  - swagger-api-doc
---

# Documentación funcional

Texto normal de la documentación.

![[docs/generated/fragments/add-pet.md]]

Más texto normal.
```

El CSS no modifica estilos globales como `h1`, `h2`, `table`, `pre` o `code` de forma general. Solo aplica estilos a elementos específicos del generador:

```text
.api-operation
.api-method
.api-path
.api-section
.api-table
.api-example
.api-schema-card
.api-required
```

Esto permite intercalar bloques Swagger dentro de documentación normal sin que todo el documento adopte el estilo Swagger.

## Exportar a PDF desde Obsidian

Una vez generado el Markdown y activado el snippet CSS:

1. Abre el fichero `.md` generado en Obsidian.
2. Cambia a **Reading View**.
3. Exporta la nota a PDF desde Obsidian.
4. Comprueba que las tablas, bloques de código y estilos se renderizan correctamente.

## Notas importantes

Esta herramienta no pretende replicar Swagger UI al 100%. El objetivo es generar una documentación Markdown limpia, portable y exportable a PDF.

El resultado visual depende del CSS aplicado en Obsidian. Sin el snippet CSS, el Markdown seguirá siendo funcional, pero tendrá un aspecto más básico.

Para que los estilos HTML se apliquen correctamente en Obsidian, la nota debe incluir:

```md
---
cssclasses:
  - swagger-api-doc
---
```

Actualmente no se resuelven `$ref` externos a otros ficheros o URLs. Si necesitas ese caso, se recomienda preprocesar la especificación con una herramienta que haga bundle del OpenAPI en un único JSON.

## Problemas habituales

### El comando no encuentra el fichero JSON

Comprueba que la ruta del fichero de entrada es correcta:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/swagger.json ./docs/generated/api.md
```

### El JSON no es válido

Valida el fichero antes de ejecutarlo. El script espera un JSON válido.

### El documento no se reconoce como OpenAPI o Swagger

Comprueba que el JSON contiene uno de estos campos:

```json
{
  "openapi": "3.1.0"
}
```

o:

```json
{
  "swagger": "2.0"
}
```

### Los estilos no se ven en Obsidian

Comprueba que el CSS snippet está activado:

```text
Settings → Appearance → CSS snippets
```

También asegúrate de estar en **Reading View**, no en Source Mode.

Además, comprueba que el documento tiene:

```md
---
cssclasses:
  - swagger-api-doc
---
```

Si estás usando fragmentos embebidos, comprueba que la nota principal donde se embebe el fragmento también tiene:

```md
---
cssclasses:
  - swagger-api-doc
---
```

### El CSS está en la carpeta `css`, pero no se aplica

Obsidian no carga automáticamente CSS desde una carpeta `css/`.

Debes copiar el archivo:

```text
css/swagger-api-doc.css
```

a:

```text
TU_VAULT/.obsidian/snippets/swagger-api-doc.css
```

Después debes activarlo desde:

```text
Settings → Appearance → CSS snippets
```

### Los fragmentos se ven sin estilo al embeberlos

Asegúrate de que la nota padre contiene:

```md
---
cssclasses:
  - swagger-api-doc
---
```

Ejemplo correcto:

```md
---
cssclasses:
  - swagger-api-doc
---

# Mi documentación

Texto normal.

![[docs/generated/fragments/add-pet.md]]
```

### Los filtros no generan ningún fichero útil

Si usas filtros como `--tag`, `--operation-id`, `--method` o `--path`, comprueba que los valores existen exactamente igual en el JSON.

Ejemplo:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./swagger.json ./fragment.md --mode fragment --operation-id addPet
```

Si `addPet` no existe como `operationId`, el generador mostrará:

```text
Input error: No operations matched the provided filters.
--operation-id addPet
```

### Hay warnings de `$ref` no resueltos

Si ves warnings de este tipo:

```text
Warnings:
- Unresolved internal $ref: #/components/schemas/MissingSchema
```

significa que el JSON referencia un schema, parameter o response que no existe en el documento.

Si ves warnings de este tipo:

```text
Warnings:
- External file $ref is not resolved: ./schemas/Pet.json
```

significa que la especificación usa referencias externas, que actualmente no se resuelven.

### Problemas instalando dependencias en Google Drive, OneDrive o Dropbox

Evita instalar `node_modules` dentro de carpetas sincronizadas como:

```text
Google Drive
OneDrive
Dropbox
G:\Mi unidad
```

Es recomendable trabajar en una carpeta local, por ejemplo:

```text
C:\Temp\openapi-md-generator
```

Después puedes copiar el Markdown generado a tu vault de Obsidian.

## Changelog

### v0.4.0

#### Añadido

- Gestión de errores de usuario mediante mensajes claros.
- Soporte para `--help` y `-h`.
- Validación del fichero de entrada.
- Validación de JSON inválido.
- Validación de estructura mínima OpenAPI/Swagger:
  - `openapi` o `swagger`;
  - `info`;
  - `paths`;
  - operaciones HTTP dentro de `paths`.
- Validación de modo `full` o `fragment`.
- Validación de opciones desconocidas.
- Validación de opciones sin valor.
- Error controlado cuando los filtros no devuelven operaciones.
- Sistema de warnings no bloqueantes.
- Warnings para `$ref` internos no resueltos.
- Warnings para `$ref` externos no soportados.
- Soporte mejorado para OpenAPI 3.x complejos:
  - `allOf`;
  - `oneOf`;
  - `anyOf`;
  - `additionalProperties`;
  - arrays;
  - objects;
  - schemas referenciados;
  - requestBody;
  - responses con content types.
- Mejora de generación de ejemplos para:
  - strings;
  - integers;
  - numbers;
  - booleans;
  - arrays;
  - objects;
  - date;
  - date-time;
  - binary;
  - enums;
  - defaults;
  - additionalProperties.

#### Cambiado

- El script ahora termina con código de salida `1` ante errores de entrada o configuración.
- Los errores inesperados muestran stack trace para facilitar depuración.
- Los `$ref` no resueltos se reportan como warnings cuando no bloquean la generación.
- Los schemas compuestos mediante `allOf` se normalizan para mostrar propiedades combinadas.

#### Limitaciones conocidas

- No se resuelven `$ref` externos a otros ficheros.
- No se resuelven `$ref` remotos por URL.
- La generación XML es limitada.
- El soporte para schemas extremadamente complejos puede requerir ajustes adicionales.

### v0.3.0

#### Añadido

- Nuevo modo `full` para generar una documentación completa de la API.
- Nuevo modo `fragment` para generar fragmentos reutilizables dentro de otras notas de Obsidian.
- Soporte para frontmatter de Obsidian mediante:

```md
---
cssclasses:
  - swagger-api-doc
---
```

- Generación automática de contenedores diferenciados:
  - `api-full-document` para documentación completa;
  - `api-fragment` para fragmentos insertables.
- Nuevos filtros de generación:
  - `--tag`;
  - `--operation-id`;
  - `--method`;
  - `--path`.
- CSS adaptado para que solo se apliquen estilos a elementos con clases específicas `api-*`.
- Soporte para intercalar fragmentos Swagger dentro de documentación Markdown normal.
- Nueva estructura visual para:
  - operaciones;
  - parámetros;
  - request body;
  - responses;
  - ejemplos;
  - schemas;
  - campos requeridos;
  - operaciones deprecated.
- Mejora del soporte para exportación a PDF desde Obsidian.

#### Cambiado

- Se deja de depender de estilos globales sobre elementos Markdown genéricos como `h1`, `h2`, `table` o `pre`.
- El estilo visual se basa ahora en clases específicas como:
  - `api-operation`;
  - `api-method`;
  - `api-path`;
  - `api-table`;
  - `api-section`;
  - `api-example`;
  - `api-schema-card`.
- El documento generado usa HTML simple y controlado para mejorar la compatibilidad con Obsidian.
- Los fragmentos generados están pensados para ser embebidos con `![[...]]`.

#### Notas

Para que los estilos se apliquen correctamente en Obsidian, la nota debe tener la clase CSS:

```md
---
cssclasses:
  - swagger-api-doc
---
```

En caso de usar fragmentos embebidos, la nota padre también debe incluir esa clase.

### v0.2.0

#### Añadido

- CSS snippet para estilo visual similar a Swagger UI.
- Clases visuales para métodos HTTP:
  - `GET`;
  - `POST`;
  - `PUT`;
  - `DELETE`;
  - `PATCH`;
  - `OPTIONS`;
  - `HEAD`.

#### Cambiado

- Mejora de la estructura HTML generada para facilitar el estilado en Obsidian.

### v0.1.0

#### Añadido

- Primera versión del generador.
- Conversión básica de Swagger/OpenAPI JSON a Markdown.
- Generación de:
  - información general;
  - servidores;
  - operaciones;
  - parámetros;
  - request body;
  - responses;
  - ejemplos;
  - schemas.

## Licencia

Este proyecto está publicado bajo licencia MIT.

Puedes usarlo, modificarlo y distribuirlo libremente, siempre que mantengas el aviso de copyright y la licencia original.

## Autor

Desarrollado por `Oscar González Tur`.

Repositorio:

```text
https://github.com/Krontur/swaggerjson_to_markdown
```