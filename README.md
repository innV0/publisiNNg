Este proyecto transforma los archivos Markdown que se encuentran en `docs/` en páginas HTML estáticas. Todas comparten la plantilla `src/template.html` y se estilizan con Tailwind CSS. Los bloques personalizados `::: hero`, `::: cards` y `::: list` se convierten en secciones prediseñadas listas para usar.

# instala las dependencias la primera vez
npm install

# convierte Markdown a HTML
npm run build

# genera public/styles.css
npm run tailwind
También puedes ejecutar `npm test` para realizar ambos pasos de forma consecutiva.

Los archivos generados quedan en `public/` y pueden publicarse en cualquier servicio de hosting estático.

```bash
npm run build   # build the HTML files
npm run tailwind # generate public/styles.css
```

The generated files appear in `public/` and can be deployed to any static host.

### Client-rendered mode

If you prefer to skip the build step you can serve the Markdown files directly.
`client.js` runs in the browser, fetches the `.md` documents from `docs/` and
converts them on the fly using Unified. Simply host the repository as-is and
open `src/template.html` (or any generated page). The script will inject the
HTML inside `#content`.
