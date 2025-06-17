import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { globby } from 'globby';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function remarkTailwindBlocks() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        if (!node.data) node.data = {};
        if (node.name === 'hero') {
          node.data.hName = 'section';
          node.data.hProperties = { className: 'bg-blue-600 text-white p-8 text-center' };
        } else if (node.name === 'cards') {
          node.data.hName = 'div';
          node.data.hProperties = { className: 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6' };
        } else if (node.name === 'list') {
          node.data.hName = 'ul';
          node.data.hProperties = { className: 'list-disc list-inside space-y-2 p-4' };
        }
      }
    });
  };
}

async function build() {
  const docsDir = path.join(root, 'docs');
  const publicDir = path.join(root, 'public');
  const templatePath = path.join(root, 'src', 'template.html');

  await fs.mkdir(publicDir, { recursive: true });
  await fs.cp(path.join(root, 'assets'), path.join(publicDir, 'assets'), { recursive: true });
  await fs.copyFile(path.join(root, 'src', 'client.js'), path.join(publicDir, 'client.js'));

  const files = await globby('*.md', { cwd: docsDir });
  const template = await fs.readFile(templatePath, 'utf8');

  const navLinks = files.map(f => {
    const name = path.basename(f, '.md');
    return `<a class="text-gray-700 hover:underline" href="${name}.html">${capitalize(name)}</a>`;
  }).join(' | ');
  const navHtml = `<nav class="p-4 bg-gray-100 text-center">${navLinks}</nav>`;

  for (const file of files) {
    const name = path.basename(file, '.md');
    const md = await fs.readFile(path.join(docsDir, file), 'utf8');
    const htmlContent = String(await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkTailwindBlocks)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(md));

    let page = template.replace('{{nav}}', navHtml);
    page = page.replace('{{title}}', capitalize(name));
    page = page.replace('<main id="content"></main>', `<main id="content">${htmlContent}</main>`);
    await fs.writeFile(path.join(publicDir, `${name}.html`), page);
  }
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
