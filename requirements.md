# Developer Specification

Este repositorio implementa el proyecto *site-md-tailwind* descrito en el `README.md` y utiliza Node.js con módulos ESM.
- El script `src/build.js` convierte cada archivo Markdown de `docs/` en una página HTML usando la plantilla común.
- Los contenedores `::: hero`, `::: cards` y `::: list` se reemplazan por secciones con clases de Tailwind.
- Todos los archivos de `assets/` se copian a `public/assets` para que estén disponibles sin modificaciones.
- La hoja de estilos se genera ejecutando `tailwindcss` con el plugin `@tailwindcss/typography` y se guarda como `public/styles.css`.
Para generar el sitio localmente ejecuta:

```bash
npm install
npm test
```

De esta forma se crea el HTML y la hoja de estilos en `public/`.
