import { readdir, readFile, writeFile } from 'node:fs/promises';
const files = await readdir(new URL('../src/content/articles/', import.meta.url));
const slugs = [];
for (const file of files.filter(f => f.endsWith('.md'))) {
  const content = await readFile(new URL(`../src/content/articles/${file}`, import.meta.url), 'utf8');
  const frontmatter = content.split('---')[1] || '';
  if (!/^draft:\s*true\s*$/m.test(frontmatter)) slugs.push(file.replace(/\.md$/, ''));
}
await writeFile(new URL('../src/server/article-slugs.json', import.meta.url), JSON.stringify(slugs.sort(), null, 2) + '\n');
