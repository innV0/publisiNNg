import { unified } from 'https://esm.sh/unified';
import remarkParse from 'https://esm.sh/remark-parse';
import remarkDirective from 'https://esm.sh/remark-directive';
import remarkRehype from 'https://esm.sh/remark-rehype';
import rehypeStringify from 'https://esm.sh/rehype-stringify';
import { visit } from 'https://esm.sh/unist-util-visit';

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

async function render() {
  const name = (location.pathname.split('/').pop() || 'home').replace('.html', '');
  const res = await fetch(`../docs/${name}.md`);
  const md = await res.text();
  const html = String(await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkTailwindBlocks)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md));
  document.getElementById('content').innerHTML = html;
}

render();
