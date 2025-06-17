# Developer Specification

This repository follows the *site-md-tailwind* project outlined in `README.md`.
It uses Node.js with ESM modules.

- Markdown in `docs/` is transformed to HTML with a common template.
- Custom directives `hero`, `cards` and `list` become Tailwind styled sections.
- Assets from `assets/` are copied to `public/`.
- Tailwind CSS is compiled to `public/styles.css` using the CLI and the
  `@tailwindcss/typography` plugin.

Run `npm test` to build the site and CSS.
