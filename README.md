# site-md-tailwind

This project converts Markdown files in the `docs/` folder into HTML pages styled with Tailwind CSS. Pages share a common layout defined in `src/template.html`. Custom Markdown directives such as `::: hero`, `::: cards` and `::: list` are rendered as ready‑made UI sections.

## Usage

```bash
npm run build   # build the HTML files
npm run tailwind # generate public/styles.css
```

The generated files appear in `public/` and can be deployed to any static host.
