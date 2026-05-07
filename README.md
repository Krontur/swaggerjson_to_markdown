# OpenAPI Swagger-like Markdown Generator

Generador simple de documentación API en Markdown a partir de un fichero `swagger.json` u `openapi.json`.

El objetivo de esta herramienta es generar una documentación en Markdown con una estructura similar a Swagger UI, pero compatible con Obsidian y exportable a PDF.

## Características

- Convierte ficheros Swagger/OpenAPI en documentación Markdown.
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
- Añade bloques HTML simples para poder aplicar estilos tipo Swagger en Obsidian.
- Compatible con CSS snippets de Obsidian.
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
git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

Entra en la carpeta del proyecto:

```bash
cd TU_REPOSITORIO
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

## Estructura recomendada

Una estructura sencilla para trabajar con Obsidian sería:

```text
mi-vault/
  docs/
    openapi/
      swagger.json
    generated/
      api.swagger-like.md
  scripts/
    openapi-swagger-like-md.mjs
  package.json
```

El comando sería:

```bash
pnpm run api:docs -- ./docs/openapi/swagger.json ./docs/generated/api.swagger-like.md
```

Después puedes abrir el fichero generado directamente en Obsidian:

```text
docs/generated/api.swagger-like.md
```

O incrustarlo desde otra nota:

```md
![[docs/generated/api.swagger-like.md]]
```

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
<div class="api-operation api-post">
  <span class="api-method">POST</span>
  <code class="api-path">/pet</code>
</div>

## Add a new pet to the store

### Request Body

**Content-Type:** `application/json`

### Responses

| Code | Description |
|---|---|
| `200` | successful operation |
```

## Estilo Swagger en Obsidian

El proyecto incluye un archivo CSS con estilos tipo Swagger para mejorar la visualización del Markdown generado dentro de Obsidian.

El archivo se encuentra en:

```
css/swagger-api-doc.css
```

Para usarlo en Obsidian:

1. Copia el archivo `css/swagger-api-doc.css` dentro de la carpeta de snippets de tu vault:

```
TU_VAULT/.obsidian/snippets/swagger-api-doc.css
```

2. Abre Obsidian.
3. Ve a:

```
Settings → Appearance → CSS snippets
```

4. Activa el snippet `swagger-api-doc`.

Una vez activado, abre el Markdown generado en **Reading View** para ver la documentación con un estilo similar a Swagger UI.

> Nota: los estilos solo afectan a la visualización dentro de Obsidian. El Markdown generado sigue siendo portable y puede abrirse sin el CSS, aunque con un aspecto más básico.

## Exportar a PDF desde Obsidian

Una vez generado el Markdown y activado el snippet CSS:

1. Abre el fichero `.md` generado en Obsidian.
2. Cambia a **Reading View**.
3. Exporta la nota a PDF desde Obsidian.
4. Comprueba que las tablas, bloques de código y estilos se renderizan correctamente.

## Notas importantes

Esta herramienta no pretende replicar Swagger UI al 100%. El objetivo es generar una documentación Markdown limpia, portable y exportable a PDF.

El resultado visual depende del CSS aplicado en Obsidian. Sin el snippet CSS, el Markdown seguirá siendo funcional, pero tendrá un aspecto más básico.

## Problemas habituales

### El comando no encuentra el fichero JSON

Comprueba que la ruta del fichero de entrada es correcta:

```bash
node ./scripts/openapi-swagger-like-md.mjs ./docs/openapi/swagger.json ./docs/generated/api.md
```

### El JSON no es válido

Valida el fichero antes de ejecutarlo. El script espera un JSON válido.

### Los estilos no se ven en Obsidian

Comprueba que el CSS snippet está activado:

```text
Settings → Appearance → CSS snippets
```

También asegúrate de estar en Reading View, no en Source Mode.

### Problemas instalando dependencias en Google Drive, OneDrive o Dropbox

Evita instalar `node_modules` dentro de carpetas sincronizadas como:

```text
Google Drive
OneDrive
Dropbox
```

Es recomendable trabajar en una carpeta local, por ejemplo:

```text
C:\Temp\openapi-md-generator
```

Después puedes copiar el Markdown generado a tu vault de Obsidian.

## Licencia

Añade aquí la licencia del proyecto.

Por ejemplo:

```text
Este proyecto está publicado bajo licencia MIT.  
  
Puedes usarlo, modificarlo y distribuirlo libremente, siempre que mantengas el aviso de copyright y la licencia original.
```

## Autor

Desarrollado por `Oscar González Tur`.

Repositorio:

```text
https://github.com/Krontur/swaggerjson_to_markdown
```
